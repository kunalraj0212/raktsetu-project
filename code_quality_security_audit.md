# RaktSetu — Code Quality & Security Audit Report

> **Audit Date:** 2026-05-12  
> **Auditor Role:** Principal Software Engineer & Security Auditor  
> **Scope:** Full-stack codebase — `raktsetu-backend` (Node.js/Express/Mongoose) + `raksetuportalnew` (React/Vite)  
> **Methodology:** Manual deep-dive of all source files including models, services, controllers, middleware, routes, validations, utilities, constants, queues, and frontend pages/hooks/services.

---

## Executive Summary

The backend follows a commendably structured service-oriented architecture with strong separation of concerns. The frontend is a polished MVP that is **architecturally disconnected** from the backend it is supposed to drive. The most critical risks are a **live MongoDB Atlas credential committed to disk** and **a wholly mocked frontend that gives users false confidence** — both of which must be resolved before any form of production deployment.

---

## 🔴 P0 — CRITICAL

> Issues that are active security vulnerabilities or will cause immediate production failure.

---

### [P0-1] Live MongoDB Atlas Credentials Committed to the Repository

**File:** `raktsetu-backend/.env`  
**Lines:** 1–2

```
MONGO_URI=mongodb://razzkunal7_db_user:C4tsWf1MBPxmWfoM@ac-vpqqghz-shard-00-00...
```

**Severity:** CRITICAL — Data breach risk.

The `.env` file contains a **real, live MongoDB Atlas connection string with embedded username and password** (`razzkunal7_db_user` / `C4tsWf1MBPxmWfoM`). This file is **present in the project root** and the `.gitignore` only has 4 lines — while `.env` is listed, **git does not retroactively remove files already committed**. If this file was ever committed before the `.gitignore` entry was added (which is common in new projects), these credentials live in git history indefinitely.

**Risk:** Any person with access to the repository can connect directly to the production Atlas cluster, read all donor PII (full names, phone numbers, blood groups, locations), and either exfiltrate or destroy data.

**Required Action:**
1. **Rotate the Atlas database user password immediately.**
2. Confirm the `.env` file was never committed: `git log --all --full-history -- .env`
3. If it was committed, purge it from git history using `git filter-repo` and force-push.
4. The `.env.example` file (which *is* present and correct) is the right pattern — ensure `.env` stays untracked.

---

### [P0-2] `JWT_SECRET` Is Absent from the `.env` File

**File:** `raktsetu-backend/.env`  
**Related:** `raktsetu-backend/src/config/envConfig.js` (line 19)

The `.env` file only contains `PORT` and `MONGO_URI`. The `envConfig.js` calls `getRequiredEnv('JWT_SECRET')` which **will throw on startup**, crashing the application immediately in any environment where `JWT_SECRET` is not separately injected.

```js
// envConfig.js — will throw at startup if JWT_SECRET is missing
JWT_SECRET: getRequiredEnv('JWT_SECRET'),
```

**This means the current `.env` makes the server unbootable.** The `tests/setup/env.js` injects a test secret, which is why tests pass, but the real server will not start.

**Required Action:** Add `JWT_SECRET` to `.env` with a strong random value (minimum 32 bytes of entropy). Use `openssl rand -base64 32` to generate one.

---

### [P0-3] Frontend Entirely Bypasses the Backend — All Data Is Mocked

**Files:** `raksetuportalnew/src/services/bloodBankService.js`, `raksetuportalnew/src/data/storage.js`

The entire frontend service layer wraps **local mock data and `localStorage`** — it never makes a single HTTP call to the backend API:

```js
// bloodBankService.js — ALL functions resolve with mock data
export const createDonor = async (donor) => Promise.resolve(registerDonorSync(donor));
export const createEmergencyRequest = async (request) => Promise.resolve(submitEmergencyRequestSync(request));
```

```js
// storage.js — "registration" writes to localStorage only
export const registerDonor = (donor) => {
  const donors = getStore(DONORS_KEY); // reads from localStorage
  // ...
  setStore(DONORS_KEY, donors);        // writes to localStorage
};
```

**Consequence:**
- Donor registrations submitted via the form are **never sent to the backend**. They disappear on page refresh.
- Emergency requests are stored locally and **never received by the server**, never trigger donor matching, and never create notifications.
- The `DonorRegistration.jsx` form also collects a `password` field that is **not present in its `initialValues`** — the password for the actual user account is never captured or transmitted.
- The `EmergencyRequest.jsx` page displays a hardcoded phone number (`+91 123 456 7890`) as a "Blood Helpline" — this is fabricated UI that looks real to users.

**Required Action:** Replace the mock service layer with real `fetch`/`axios` calls to the backend API endpoints. This is the #1 development priority for the frontend.

---

## 🟠 P1 — HIGH

> Major architectural flaws, critical missing error handling, or patterns that will cause bugs at scale.

---

### [P1-1] Custom Rate Limiter Uses an In-Memory `Map` — Resets on Every Server Restart and Doesn't Work Across Instances

**File:** `raktsetu-backend/src/middleware/rateLimiter.js`

```js
const createRateLimiter = ({ windowMs, maxRequests }) => {
  const requestStore = new Map(); // in-process, not shared
  // ...
};
```

The rate limiter is a closure over a module-level `Map`. This means:
1. **Every server restart resets all rate limit counters** — a brute-force attacker can just wait for a deploy.
2. **It cannot work at all in a multi-instance or load-balanced deployment** since each process has its own map.
3. The rate limiter on `authRateLimiter` is meant to protect against credential stuffing (10 requests / 15 min) but is trivially bypassed by restarting the server.

**Required Action:** Replace with `express-rate-limit` + `rate-limit-redis` (or the `mongo-store` adapter). A Redis-backed store persists across restarts and is shared by all instances.

---

### [P1-2] `ownsResource` Middleware Makes an Extra DB Query on Every Protected Request

**File:** `raktsetu-backend/src/middleware/authorizationMiddleware.js` + `matchingRoutes.js`, `notificationRoutes.js`

```js
// matchingRoutes.js
ownsResource((req) => getBloodRequestOwnerId(req.params.id)),
```
```js
// notificationRoutes.js
ownsResource((req) => getNotificationRecipientId(req.params.id)),
```

And then inside the controller, the same document is fetched *again*:
```js
// matchingService.js
const request = await BloodRequest.findById(requestId); // second fetch
```
```js
// notificationService.js
const notification = await Notification.findOne({ _id: notificationId, recipient: userId }); // third fetch
```

The authorization middleware fetches the document, the service fetches it again. For the matching endpoint this is **3 database round-trips** where 1 or 2 would suffice. At high concurrency this is a measurable latency problem and wastes Atlas read units.

**Required Action:** Either (a) attach the fetched resource to `req` inside `ownsResource` so downstream services can reuse it, or (b) push the ownership check into the service layer where the first query already has the document.

---

### [P1-3] `authMiddleware.js` Swallows All JWT Errors Identically — Hides Expired Token vs. Malformed Token

**File:** `raktsetu-backend/src/middleware/authMiddleware.js` (lines 36–39)

```js
try {
  const decoded = jwt.verify(token, envConfig.JWT_SECRET);
  // ...
} catch (error) {
  // Catch malformed, modified, or expired tokens
  throw new ApiError(401, 'Not authorized to access this route. Invalid token.');
}
```

The catch block throws the same error for **all JWT failure modes**: expired token (`TokenExpiredError`), malformed token (`JsonWebTokenError`), wrong algorithm, etc. A client cannot distinguish between "my token expired, please log me in again" vs. "the token was tampered with." This forces clients to always redirect to login even when a simple token refresh would have been sufficient.

**Required Action:** Differentiate error types:
```js
} catch (error) {
  if (error.name === 'TokenExpiredError') throw new ApiError(401, 'Session expired. Please log in again.');
  throw new ApiError(401, 'Invalid authentication token.');
}
```

---

### [P1-4] `BloodAvailability.jsx` Handles All Async Operations Without Error Handling

**File:** `raksetuportalnew/src/pages/BloodAvailability.jsx` (lines 22–48, 59–65)

```js
useEffect(() => {
  let isMounted = true;
  (async () => {
    const [nextStates, nextBankCount] = await Promise.all([
      fetchStates(),       // No try/catch
      fetchBloodBankCount(), // No try/catch
    ]);
    // ...
  })();
}, []);

const handleSearch = async (e) => {
  e.preventDefault();
  const searchResults = await searchBloodAvailability(filters); // No try/catch
  // ...
};
```

If either service call throws (network error, server 500, etc.), the component will render nothing and the error will be swallowed silently. Users see a blank page with no feedback.

**Required Action:** Add `try/catch` with a user-visible error state. The `useForm` hook already handles this pattern correctly — the same pattern should be applied to data-fetching operations.

---

### [P1-5] Frontend Form Validation Is Duplicated Verbatim Across Two Pages

**Files:** `raksetuportalnew/src/pages/DonorRegistration.jsx` (lines 23–44) and `raksetuportalnew/src/pages/EmergencyRequest.jsx` (lines 23–34)

Both pages define their own inline `validate` function with nearly identical phone number validation:

```js
// DonorRegistration.jsx
else if (!/^[6-9]\d{9}$/.test(data.phone.replace(/\s/g, '')))
    err.phone = 'Enter a valid 10-digit Indian phone number';

// EmergencyRequest.jsx — identical regex
else if (!/^[6-9]\d{9}$/.test(data.contactPhone.replace(/\s/g, '')))
    err.contactPhone = 'Enter a valid 10-digit Indian phone number';
```

Similarly, the blood group array is **hardcoded as a literal in both pages**:
```js
// DonorRegistration.jsx line 12
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// EmergencyRequest.jsx line 12 — identical
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
```

**Required Action:** Extract to a shared `src/utils/validators.js` file and a `src/constants/bloodGroups.js` file. The backend already has `src/constants/bloodGroups.js` — consider a shared monorepo constants package.

---

### [P1-6] The `activityService.js` Has Two Parallel APIs for the Same Operation

**File:** `raktsetu-backend/src/services/activityService.js`

The file exports **two generations of the same API** that are both actively used:

```js
// Generation 1 — Generic orchestrators (high-level, used internally)
export const logAuthEvent = async (type, user, req = null) => { ... }
export const logBloodRequestEvent = async (type, request, actorId = null) => { ... }
export const logMatchingEvent = async (requestId, matchCount) => { ... }

// Generation 2 — Specific named events (used by services)
export const logLoginSuccessEvent = ({ user, ipAddress, userAgent }) => { ... }
export const logLoginFailedEvent = ({ redactedEmail, ipAddress, userAgent }) => { ... }
export const logMatchingTriggeredEvent = ({ actorId, requestId, matchCount }) => { ... }
export const logNotificationBatchCreatedEvent = ({ actorId, requestId, ... }) => { ... }
```

`logAuthEvent`, `logBloodRequestEvent`, and `logMatchingEvent` are defined but **not called anywhere in the active service code** — they are dead code left over from a refactor. The new specific-event functions replaced them but weren't cleaned up.

**Required Action:** Remove the three unused generic orchestrators or consolidate both APIs into one consistent pattern.

---

## 🟡 P2 — MEDIUM

> Code style issues, magic numbers, missing optimizations, and technical debt that accumulates over time.

---

### [P2-1] CORS Is Configured to Allow All Origins (`*`)

**File:** `raktsetu-backend/src/app.js` (line 19)

```js
app.use(cors()); // No options = allows all origins
```

`cors()` with no arguments sets `Access-Control-Allow-Origin: *`, which means **any website on the internet can make authenticated requests to this API** if a user's browser has a valid session cookie. For a healthcare application handling PII, this should be explicitly locked to known frontend origins.

**Required Action:**
```js
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:5173',
  credentials: true,
}));
```

---

### [P2-2] `server.js` Does Not Handle Unhandled Promise Rejections or Uncaught Exceptions

**File:** `raktsetu-backend/src/server.js`

```js
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
```

There are no global safety nets:
- No `.catch()` on the `connectDB().then()` chain — if `connectDB` rejects after `envConfig` loads successfully, the error is silently swallowed.
- No `process.on('unhandledRejection', ...)` handler.
- No `process.on('uncaughtException', ...)` handler.

Node.js will terminate on unhandled rejections in modern versions, but without logging the crash reason first, post-mortem debugging is blind.

**Required Action:**
```js
connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => { console.error('Fatal startup error:', err); process.exit(1); });

process.on('unhandledRejection', (reason) => {
  console.error('[UNHANDLED REJECTION]', reason);
  process.exit(1);
});
```

---

### [P2-3] `BloodAvailability.jsx` Implements Frontend Pagination Over an Already-Paginated API Result

**File:** `raksetuportalnew/src/pages/BloodAvailability.jsx` (lines 20, 73–74)

```js
const perPage = 8; // magic number, not extracted
// ...
const totalPages = Math.ceil(results.length / perPage);
const paginatedResults = results.slice((currentPage - 1) * perPage, currentPage * perPage);
```

All results are fetched in a single call and then paginated client-side. This means:
1. The full dataset is loaded into memory in the browser.
2. The `perPage` magic number is not a named constant.
3. When connected to a real API, this pattern will break — the backend already implements server-side pagination (`parsePaginationParams`) which should be used instead.

**Required Action:** Pass `page` and `limit` query params to the API call and use the `pagination` metadata from the response.

---

### [P2-4] `matchingService.js` Has a Hardcoded 90-Day Donation Cooldown

**File:** `raktsetu-backend/src/services/matchingService.js` (lines 27–28)

```js
// 3. Calculate Cooldown Deadline (90 Days)
const ninetyDaysAgo = new Date();
ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90); // magic number
```

The `90` is a hardcoded magic number appearing in the comments too, but it is not exported from a constants file. If the WHO or Indian blood bank guidelines change this cooldown (e.g., to 56 days for plasma), this number must be hunted across files.

**Required Action:** Add `DONATION_COOLDOWN_DAYS = 90` to `src/constants/bloodGroups.js` or a new `src/constants/donorRules.js` file.

---

### [P2-5] `notificationJobQueue.js` Uses `setImmediate` Instead of a Real Queue

**File:** `raktsetu-backend/src/queues/notificationJobQueue.js` (lines 76–78)

```js
setImmediate(() => {
  void processNotificationJob(job);
});
```

The "queue" is a fire-and-forget `setImmediate` call — a thin wrapper with no retry logic, no dead-letter queue, no persistence, and no visibility. If the Node.js process crashes between enqueueing and processing (which `setImmediate` only defers to the next iteration of the event loop), the notification batch is silently lost.

The comment at the top of `notificationService.js` acknowledges this: _"This acts as the entry point for future message queues"_ — which is honest, but the current implementation should be documented more visibly as a known limitation at the queue level.

**Required Action (medium-term):** Replace `setImmediate` with a real job queue (BullMQ + Redis, or `agenda` for Mongo-native queues) with at-least-once delivery guarantees.

---

### [P2-6] `DonorRegistration.jsx` Has an Artificial `1500ms` Delay on Submission

**File:** `raksetuportalnew/src/pages/DonorRegistration.jsx` (line 50)

```js
await new Promise(r => setTimeout(r, 1500)); // artificial delay simulating network
```

Similarly in `EmergencyRequest.jsx`:
```js
await new Promise(r => setTimeout(r, 2000)); // artificial 2-second delay
```

These are simulation delays masquerading as real network latency. In the real integration, actual `fetch` calls will introduce their own latency, making these both redundant and misleading. They also make the test suite slower if these pages are ever unit-tested.

**Required Action:** Remove both artificial delays when the real API integration is implemented.

---

### [P2-7] `BloodAvailability.jsx` Magic Number `perPage = 8` Conflicts with Backend Default of `20`

**File:** `raksetuportalnew/src/pages/BloodAvailability.jsx` (line 20)

The frontend uses `perPage = 8`, but `raktsetu-backend/src/utils/pagination.js` has `DEFAULT_LIMIT = 20`. When integrated, unless the frontend explicitly passes `?limit=8`, the backend will return 20 results per page while the frontend slices to 8, creating confusing UI.

---

### [P2-8] `validate.js` Error Mapping Accesses `error.errors` Without Guarding for Non-Zod Errors

**File:** `raktsetu-backend/src/middleware/validate.js` (line 18)

```js
} catch (error) {
  const errorMessage = error.errors.map((err) => err.message).join(', ');
  next(new ApiError(400, errorMessage));
}
```

If a non-Zod error is thrown inside `schema.parse()` (e.g., a programming error in a `.refine()` callback that accidentally throws a plain `Error`), accessing `error.errors` will throw a `TypeError: Cannot read properties of undefined (reading 'map')`, which will bubble as a 500 error with no useful message.

**Required Action:**
```js
} catch (error) {
  if (error?.errors) {
    const errorMessage = error.errors.map((e) => e.message).join(', ');
    return next(new ApiError(400, errorMessage));
  }
  next(error); // pass unexpected errors to global handler
}
```

---

### [P2-9] `server.js` Logs the MongoDB Connection Host to stdout in Production

**File:** `raktsetu-backend/src/config/db.js` (line 7)

```js
console.log(`MongoDB Connected: ${conn.connection.host}`);
```

Printing the Atlas cluster hostname to application logs is an unnecessary information disclosure. If logs are shipped to a third-party log aggregation service (Datadog, Papertrail, etc.), the cluster hostname is now in a third-party system.

**Required Action:** In production, replace with a generic message: `console.log('Database connection established')`. Log the host only in development.

---

### [P2-10] `useForm.js` Hook Is Exported as Both Named and Default Export

**File:** `raksetuportalnew/src/hooks/useForm.js` (lines 11, 55)

```js
export const useForm = ...  // named export
export default useForm;     // default export
```

`DonorRegistration.jsx` imports it as `import useForm from '../hooks/useForm'` (default), while the hook file also provides a named export. Having both export styles for the same entity is an inconsistency that can cause confusion in a team setting.

---

## ✅ PRAISE

> Patterns being done well that should be actively preserved and extended.

---

### [PRAISE-1] Textbook Service-Oriented Architecture — Controllers Are Perfectly Thin

Every controller in the backend (`authController`, `bloodRequestController`, `matchingController`, `notificationController`) follows the same clean pattern: extract from `req`, delegate to the service, return the response. Zero business logic lives in the route or controller layer. The services do the heavy lifting; the controllers are pure HTTP adapters. This is exactly correct and makes the codebase testable in isolation.

```js
// authController.js — the ideal controller form
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUser(email, password, { ipAddress: req.ip, userAgent: req.get('User-Agent') });
  res.status(200).json({ success: true, data: user });
});
```

---

### [PRAISE-2] MongoDB Index Strategy Is Thoughtful and Well-Documented

All four Mongoose schemas (`User`, `BloodRequest`, `Notification`, `ActivityLog`) define compound indexes with explicit comments explaining the query pattern each index supports. This is production-grade database design. The compound index on `User` `{ bloodGroup, state, district, availabilityStatus }` directly matches the matching engine's query filter, which is the correct way to index for a specific access pattern.

```js
// User.js — index designed around the exact matching query
userSchema.index({ bloodGroup: 1, state: 1, district: 1, availabilityStatus: 1 });
```

The fact that the matching service comment even references this index shows intentional design, not coincidence.

---

### [PRAISE-3] Integration Test Infrastructure Is Production-Grade

The test setup (in-memory MongoDB via `mongodb-memory-server`, a singleton app instance per test run, helper factories in `testClient.js`) is correctly structured. Tests are isolated, run against a real Mongoose connection (not mocked), use real HTTP via `supertest`, and validate actual security invariants (the `matching.authorization.test.js` test validates that a non-owner gets a 403). This is the correct approach to integration testing for an Express/Mongoose app, and the test coverage for the endpoints that exist is meaningful.

---

## Summary Table

| ID | Severity | Area | Title |
|---|---|---|---|
| P0-1 | 🔴 CRITICAL | Security | Live MongoDB credentials on disk |
| P0-2 | 🔴 CRITICAL | Startup | `JWT_SECRET` missing from `.env` — server won't boot |
| P0-3 | 🔴 CRITICAL | Architecture | Frontend is fully mocked — never calls the backend |
| P1-1 | 🟠 HIGH | Security | In-memory rate limiter bypassed by restarts |
| P1-2 | 🟠 HIGH | Performance | Double/triple DB queries in `ownsResource` + service |
| P1-3 | 🟠 HIGH | UX/Auth | JWT error types swallowed — clients can't differentiate |
| P1-4 | 🟠 HIGH | Error Handling | `BloodAvailability.jsx` async calls have no error handling |
| P1-5 | 🟠 HIGH | DRY | Phone regex + blood group array duplicated across pages |
| P1-6 | 🟠 HIGH | Code Quality | Dead code — two generations of logging API in `activityService` |
| P2-1 | 🟡 MEDIUM | Security | CORS wildcard `*` allows all origins |
| P2-2 | 🟡 MEDIUM | Reliability | No unhandled rejection / uncaught exception handlers |
| P2-3 | 🟡 MEDIUM | Performance | Client-side pagination over full dataset |
| P2-4 | 🟡 MEDIUM | Config | 90-day cooldown is a hardcoded magic number |
| P2-5 | 🟡 MEDIUM | Reliability | Notification "queue" is a fire-and-forget `setImmediate` |
| P2-6 | 🟡 MEDIUM | Code Quality | Artificial submit delays in two forms |
| P2-7 | 🟡 MEDIUM | Config | Frontend/backend pagination limit mismatch (8 vs 20) |
| P2-8 | 🟡 MEDIUM | Error Handling | `validate.js` will throw if a non-Zod error reaches the catch |
| P2-9 | 🟡 MEDIUM | Security | MongoDB host logged to stdout |
| P2-10 | 🟡 MEDIUM | Style | `useForm` has both named and default exports |

---

## Recommended Fix Priority Order

1. **Immediately:** Rotate MongoDB Atlas password (P0-1)
2. **Before next commit:** Add `JWT_SECRET` to `.env` (P0-2)  
3. **Sprint 1:** Replace frontend mock service layer with real API calls (P0-3)
4. **Sprint 1:** Lock down CORS origins (P2-1)
5. **Sprint 1:** Add global unhandled rejection handlers (P2-2)
6. **Sprint 2:** Replace in-memory rate limiter with Redis-backed solution (P1-1)
7. **Sprint 2:** Fix `validate.js` non-Zod error handling (P2-8)
8. **Sprint 2:** Add error states to `BloodAvailability.jsx` (P1-4)
9. **Sprint 3:** Extract shared constants and validators to eliminate duplication (P1-5)
10. **Sprint 3:** Remove dead `activityService` exports (P1-6)
