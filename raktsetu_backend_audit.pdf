# RaktSetu Backend — Architectural Progress Audit

**Date:** 2026-05-11  
**Scope:** `raktsetu-backend/src/**`, config, and project root  
**Auditor:** Automated deep-read of every source file in the repository

---

## 1. Executive Summary

The RaktSetu backend is a **well-structured but incomplete** Node.js/Express/MongoDB API for blood donation and emergency blood request management. The codebase demonstrates solid architectural instincts — clean separation of concerns across routes/controllers/services/models, centralized validation via Zod, and a thoughtful indexing strategy on Mongoose models. Several foundational utilities (blood compatibility map, notification templates, activity formatters) are in place and well-isolated.

### Major Strengths
- **Layered architecture** is genuinely enforced: controllers are thin, business logic lives in services, models own schema + indexes.
- **Input validation** via Zod is properly centralized with a reusable `validate()` middleware.
- **Matching engine** is correctly implementing real-world blood compatibility rules with a 90-day cooldown check and self-match exclusion.
- **Error handling** is consistent: `ApiError` + `asyncHandler` + global error middleware form a clean chain.
- **Index design** on all four models is deliberate and documented with rationale comments.

### Major Weaknesses
- **Activity logging is entirely unwired.** The `activityService.js` defines `logAuthEvent`, `logBloodRequestEvent`, and `logMatchingEvent` — but **none of these are called anywhere** in the controllers or services. Zero audit trail is being produced at runtime.
- **Notification dispatch is disconnected.** `notifyMatchedDonors()` exists in `notificationService.js` but is **never invoked** from the matching flow. Running the matching endpoint returns donors but sends zero notifications.
- **JWT secret falls back to a hardcoded string** (`'fallback_dev_secret_only'`) in both `generateToken.js` and `authMiddleware.js`. The `.env` file has no `JWT_SECRET` defined. In its current state, all tokens are signed with a publicly visible key.
- **No tests exist.** No `jest.config.js`, no `tests/` directory, no test scripts in `package.json`.
- **No rate limiting, no RBAC middleware, no pagination, no request queue** — all mentioned in the task brief as planned P0/P1 work, but none are present in the actual code.
- **CORS is fully open** (`app.use(cors())` with no origin restrictions).

### Production Readiness Assessment

| Scenario | Verdict |
|---|---|
| **Controlled pilot** (trusted users, demo) | ⚠️ **Possible with caveats** — JWT secret must be set, CORS locked down, activity logging wired up. Core CRUD flows work. |
| **Healthcare-grade production** | ❌ **Not ready.** Missing rate limiting, RBAC, pagination, tests, CI/CD, monitoring, and the JWT fallback is a critical vulnerability. |

---

## 2. Architecture Overview

### Tech Stack
- **Runtime:** Node.js with ES Modules (`"type": "module"`)
- **Framework:** Express 5.2
- **Database:** MongoDB via Mongoose 9.6 (connecting to Atlas)
- **Validation:** Zod 4.4
- **Auth:** JWT (`jsonwebtoken`) + bcrypt (`bcryptjs`)
- **Security headers:** Helmet 8.1
- **CORS:** `cors` package (no origin config)
- **Dev tooling:** Nodemon (no test runner, no linter configured)

### Layered Architecture

```
Routes → (validate middleware) → (protect middleware) → Controllers → Services → Models
                                                                         ↓
                                                                    Utils / Constants
```

- **Routes** ([authRoutes.js](file:///c:/Users/kunal/Desktop/project%20update%20end%20sem/raktsetu-backend/src/routes/authRoutes.js), [bloodRequestRoutes.js](file:///c:/Users/kunal/Desktop/project%20update%20end%20sem/raktsetu-backend/src/routes/bloodRequestRoutes.js), [matchingRoutes.js](file:///c:/Users/kunal/Desktop/project%20update%20end%20sem/raktsetu-backend/src/routes/matchingRoutes.js), [notificationRoutes.js](file:///c:/Users/kunal/Desktop/project%20update%20end%20sem/raktsetu-backend/src/routes/notificationRoutes.js)): Declare HTTP verbs, paths, and middleware chains.
- **Controllers** (4 files): Extract request data, delegate to services, format responses. Genuinely thin.
- **Services** (5 files): All business logic — auth, CRUD, matching algorithm, notification creation, activity logging.
- **Models** (4 files): `User`, `BloodRequest`, `Notification`, `ActivityLog` — each with schema, indexes, and relevant middleware.
- **Middleware** (3 files): `protect` (JWT auth), `validate` (Zod), `errorMiddleware` (404 + global handler).
- **Utils** (6 files): `ApiError`, `asyncHandler`, `generateToken`, `bloodCompatibility`, `notificationTemplates`, `activityFormatter`.
- **Constants** (4 files): `activityTypes`, `bloodGroups`, `notificationTypes`, `roles`.
- **Validations** (2 files): Zod schemas for auth and blood request payloads.

### Domain Modules
1. **Auth** — Register, login, get-current-user.
2. **BloodRequest** — Create, list active, get by ID.
3. **Matching** — Find eligible donors for a given blood request.
4. **Notification** — List user notifications, mark as read, bulk-create for matched donors.
5. **ActivityLog** — Event logging infrastructure (defined but not wired).

### Request Lifecycle

**Public request** (e.g., `GET /api/v1/blood-requests`):
```
Client → Helmet/CORS/JSON → Route → Controller → Service → Mongoose → Response
                                                                    ↘ globalErrorHandler (on error)
```

**Authenticated request** (e.g., `POST /api/v1/blood-requests`):
```
Client → Helmet/CORS/JSON → Route → validate(zodSchema) → protect(JWT) → Controller → Service → Mongoose → Response
```

---

## 3. Security & Privacy State

### Environment & JWT Configuration

| Concern | Status | Details |
|---|---|---|
| `.env` in `.gitignore` | ✅ | Properly excluded from version control |
| `MONGO_URI` fail-fast | ✅ | [db.js](file:///c:/Users/kunal/Desktop/project%20update%20end%20sem/raktsetu-backend/src/config/db.js) throws and exits if undefined |
| `JWT_SECRET` fail-fast | ❌ **Critical** | Both [generateToken.js:9](file:///c:/Users/kunal/Desktop/project%20update%20end%20sem/raktsetu-backend/src/utils/generateToken.js#L9) and [authMiddleware.js:25](file:///c:/Users/kunal/Desktop/project%20update%20end%20sem/raktsetu-backend/src/middleware/authMiddleware.js#L25) fall back to `'fallback_dev_secret_only'`. `.env` has no `JWT_SECRET`. All tokens are signed with a known key. |
| `.env.example` guidance | ⚠️ | Exists but does not mention `JWT_SECRET` or `JWT_EXPIRES_IN` |

### Authentication & Authorization

- **`protect` middleware** ([authMiddleware.js](file:///c:/Users/kunal/Desktop/project%20update%20end%20sem/raktsetu-backend/src/middleware/authMiddleware.js)): Extracts Bearer token, verifies JWT, attaches `req.user` from DB. Handles missing/invalid/expired tokens.
- **Password security**: `select: false` on password field; bcrypt hashing in `pre('save')` hook; `matchPassword` instance method with constant-time compare via bcrypt.
- **Login error messages**: Correctly generic ("Invalid email or password") — does not leak whether email exists.

**RBAC:** The `ROLES` constant is defined ([roles.js](file:///c:/Users/kunal/Desktop/project%20update%20end%20sem/raktsetu-backend/src/constants/roles.js)) and the JWT payload includes `role`, but **no authorization middleware exists**. There is no `authorize('admin')` or similar gating anywhere. Any authenticated user can:
- Trigger matching on any blood request (not just their own).
- No admin-only endpoints are gated.

**Ownership checks:**
- `markAsRead` in [notificationService.js:55](file:///c:/Users/kunal/Desktop/project%20update%20end%20sem/raktsetu-backend/src/services/notificationService.js#L55) correctly scopes the query to `{ _id: notificationId, recipient: userId }` — a user cannot mark someone else's notification.
- Blood request creation binds `requester: req.user.id` server-side — users cannot impersonate.
- **Missing:** No ownership check on matching — any authenticated user can call `GET /blood-requests/:id/matches` for any request.

### Rate Limiting
**Not implemented.** No `express-rate-limit` or equivalent. Auth endpoints (`/register`, `/login`) are fully open to brute-force.

### PII Control
- Public blood request listings (`GET /blood-requests`) populate requester with `'fullName phone email role'` — this **leaks email and phone** to unauthenticated callers.
- Matching endpoint returns donor `fullName`, `email`, `phone` to any authenticated user.
- No DTO layer or field-level redaction for public vs. authenticated views.

### Remaining Security Gaps

> [!CAUTION]
> 1. **Hardcoded JWT fallback secret** — anyone reading the source can forge valid tokens.
> 2. **No rate limiting** — login/register are vulnerable to credential stuffing and brute-force.
> 3. **No RBAC middleware** — role field exists but is never enforced.
> 4. **CORS wide open** — `cors()` with no origin whitelist.
> 5. **PII exposed on public endpoints** — requester email/phone on unauthenticated blood request listings.
> 6. **No `express.json()` body size limit** — vulnerable to large-payload DoS.

---

## 4. Scalability & Performance Readiness

### Pagination
**Not implemented.** `getAllActiveRequests()` in [bloodRequestService.js:22](file:///c:/Users/kunal/Desktop/project%20update%20end%20sem/raktsetu-backend/src/services/bloodRequestService.js#L22) returns **all** pending blood requests with no limit. `getUserNotifications()` returns **all** notifications for a user. At scale, these become full-collection scans returned as unbounded arrays.

### Indexing Strategy
The index design is one of the strongest aspects of this codebase:

| Model | Index | Purpose |
|---|---|---|
| **User** | `{ bloodGroup, state, district, availabilityStatus }` | Compound index optimizing the matching query |
| **User** | `{ role, bloodGroup }` | Admin filtering |
| **User** | `email` (unique) | Login lookups |
| **BloodRequest** | `{ bloodGroup, district, urgencyLevel }` | Emergency geo-matching |
| **BloodRequest** | `{ status, requiredBy }` | Deadline-sorted pending queries |
| **BloodRequest** | `requester` | Per-user request history |
| **Notification** | `{ recipient, status }` | Inbox retrieval |
| **Notification** | `relatedRequest` | Cascading operations |
| **Notification** | `createdAt: -1` | Chronological listing |
| **ActivityLog** | `createdAt: -1`, `{ activityType, createdAt }`, `{ actor, createdAt }`, `{ severity, createdAt }` | Time-series, filtering, audit, alerting |

These indexes directly support the current queries and are well-documented with inline rationale.

### Async Notification Boundary
The `notifyMatchedDonors()` function uses `Notification.insertMany()` for bulk writes — this is correctly optimized over individual saves. However:
- There is **no actual queue** (no Bull, no BullMQ, no Redis). The `notificationJobQueue.js` mentioned in the task brief does not exist.
- Notification creation is synchronous within the request if it were wired — no background processing.
- The `deliveryChannel` field supports `sms/email/push/in_app` but only `in_app` is implemented.

### Potential Bottlenecks at Scale
1. **Unbounded queries** — No pagination on any list endpoint.
2. **No caching** — Matching queries hit MongoDB on every request. Blood compatibility map is static and could be cached, but the donor query cannot without invalidation logic.
3. **Synchronous notification creation** — When wired, creating notifications for 500+ donors would block the matching response.
4. **No connection pooling config** — Using Mongoose defaults for MongoDB connection pool.
5. **`.lean()` usage** — Correctly used in matching and notification listing for read performance.

---

## 5. Domain Workflow Details

### Auth Flow
- **Register** (`POST /api/v1/auth/register`): Zod validates body → service checks email uniqueness → `User.create()` triggers bcrypt `pre('save')` → JWT generated with `{id, role}` → sanitized response (no password).
- **Login** (`POST /api/v1/auth/login`): Zod validates → `.findOne().select('+password')` → `matchPassword()` → JWT → sanitized response.
- **Get Current User** (`GET /api/v1/auth/me`): `protect` middleware → `findById` (password excluded by schema default).
- **Logging:** Activity service has `logAuthEvent` ready but **it is never called** from `authService.js` or `authController.js`. Zero auth events are logged.

### Blood Request Flow
- **Create** (`POST /api/v1/blood-requests`): Protected + Zod validated → requester ID injected server-side → `BloodRequest.create()`.
- **List Active** (`GET /api/v1/blood-requests`): **Public** — returns all pending requests sorted by `requiredBy`, populated with requester name/phone/email/role.
- **Get By ID** (`GET /api/v1/blood-requests/:id`): **Public** — returns single request with requester details.
- **Missing:** No update, cancel, or fulfill endpoints. No ownership check on any operation beyond creation.

### Matching Flow
- **Trigger** (`GET /api/v1/blood-requests/:id/matches`): Protected (any authenticated user) → fetches blood request → computes compatible donor groups → queries users with: matching blood group, same state/district, available, past 90-day cooldown, not self-matching → returns structured response with `requestInfo` + `donors` array.
- **Robustness:** Handles invalid blood groups (empty compatible array → 400), missing request (404), excludes requester from self-match. Uses `.lean()` for performance.
- **Gap:** Does not trigger notification dispatch. Does not log the matching event. Any authenticated user can query matches for any request.

### Notification Flow
- **Create Bulk** (`notifyMatchedDonors`): Accepts donor array + request info → generates template → `insertMany()`. **Never called from anywhere.**
- **List** (`GET /api/v1/notifications`): Protected → returns all notifications for `req.user.id`, sorted newest-first.
- **Mark Read** (`PATCH /api/v1/notifications/:id/read`): Protected → scoped query ensures ownership → sets `status: 'read'` and `readAt`.
- **Gap:** No endpoint to create individual notifications. No deletion. No filtering by status/type.

### Activity Logging
- **Defined types:** `USER_REGISTERED`, `USER_LOGGED_IN`, `BLOOD_REQUEST_CREATED`, `REQUEST_FULFILLED`, `REQUEST_CANCELLED`, `DONOR_MATCH_FOUND`, `NOTIFICATION_CREATED`, `NOTIFICATION_SENT`, `UNAUTHORIZED_ACCESS_ATTEMPT`, `SYSTEM_ERROR`.
- **Formatters:** Produce uniform human-readable messages.
- **Safety:** `logActivity` wraps in try/catch — a logging failure will `console.error` but never crash the primary transaction.
- **Password sanitization:** Explicitly `delete`s `password` and `token` from metadata before persisting.
- **Wiring status:** ❌ **Zero callers.** No events are logged at runtime.

---

## 6. Observability & Auditability

### Current State
The `ActivityLog` model and `activityService` are **architecturally complete** but **operationally dead**. The infrastructure is solid:

- Schema captures `actor`, `activityType`, `entityType`, `entityId`, `message`, `metadata`, `ipAddress`, `userAgent`, `severity`.
- Four indexes support time-series queries, type filtering, user auditing, and severity alerting.
- The service has three orchestrators (`logAuthEvent`, `logBloodRequestEvent`, `logMatchingEvent`) that correctly format and sanitize data.
- Failure isolation is properly implemented (catch → console.error, no re-throw).

### What the Logs Could Answer (Once Wired)
- "Who registered in the last 24 hours?" → `activityType: USER_REGISTERED, createdAt`
- "Show all actions by User X" → `actor: userId`
- "How many matching events fired today?" → `activityType: DONOR_MATCH_FOUND`
- "Were there any critical-urgency requests?" → `severity: warning` (set when urgency is 'critical')
- "What IP did a user log in from?" → `ipAddress` field

### What Cannot Be Answered Today
Everything. No events are being written. `console.log` in `server.js` and `db.js` are the only runtime output.

---

## 7. Testing & Quality

### Current State
**No tests exist.** There is:
- No `jest.config.js`
- No `tests/` directory
- No test script in `package.json`
- No test runner in `devDependencies` (no Jest, no Supertest, no mongodb-memory-server)

The items mentioned in the task brief (Jest, Supertest, in-memory Mongo, integration tests) describe **planned** infrastructure, not actual code in the repository.

### Validation Coverage
Zod schemas exist for `register`, `login`, and `createBloodRequest`. There is **no validation schema** for:
- Matching endpoints (no input beyond URL param)
- Notification mark-as-read (no input beyond URL param)
- Query parameters on any list endpoint

### Code Quality Observations
- Consistent use of `asyncHandler` across all controllers.
- JSDoc comments on all controller/service functions.
- Clean separation — no business logic leaks into controllers.
- Consistent error response format (`{ success: false, error: message }`).

---

## 8. Infrastructure & Operational Readiness

### What Exists
| Item | Status |
|---|---|
| Express app with versioned API (`/api/v1/`) | ✅ |
| Health check endpoint (`/api/v1/health`) | ✅ |
| Helmet security headers | ✅ |
| `.env` / `.env.example` separation | ✅ |
| `.gitignore` covering `.env` and `node_modules` | ✅ |
| Nodemon for dev | ✅ |
| MongoDB Atlas connection | ✅ |

### What Is Missing

| Item | Impact |
|---|---|
| **CI/CD pipeline** | No automated testing, linting, or deployment on push |
| **Dockerfile / docker-compose** | Cannot containerize or deploy reproducibly |
| **Staging/prod environment config** | No `NODE_ENV` awareness beyond stack trace hiding |
| **Monitoring / metrics** | No Prometheus, no health metrics beyond the basic endpoint |
| **Structured logging** | Only `console.log`/`console.error` — not parseable by log aggregators |
| **API documentation** | No Swagger/OpenAPI spec — consumers have no contract reference |
| **Graceful shutdown** | No `SIGTERM`/`SIGINT` handling for connection draining |
| **Process manager** | No PM2 or equivalent for production |

---

## 9. Risk Register

### P0 — Must Fix Before Any Production Use

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| 1 | **JWT secret hardcoded fallback** in `generateToken.js` and `authMiddleware.js` | Anyone can forge valid tokens with admin roles | Remove fallback; fail-fast if `JWT_SECRET` is missing; add to `.env.example` |
| 2 | **Activity logging is unwired** | Zero audit trail for auth, blood requests, matching — regulatory and debugging blindspot | Wire `logAuthEvent` into auth service, `logBloodRequestEvent` into blood request service, `logMatchingEvent` into matching service |
| 3 | **No rate limiting on auth endpoints** | Brute-force credential attacks on login; registration spam | Add `express-rate-limit` on `/auth/login` (strict) and `/auth/register` |
| 4 | **PII leaked on public endpoints** | Requester email/phone exposed to unauthenticated users on blood request listings | Create separate DTOs for public vs. authenticated views; strip email/phone from public listings |
| 5 | **No request body size limit** | Large-payload DoS via `express.json()` | Add `app.use(express.json({ limit: '10kb' }))` |

### P1 — Important for Stability / Maintainability

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| 1 | **No pagination** on list endpoints | Unbounded response payloads at scale; memory exhaustion, slow responses | Implement cursor-based or skip/limit pagination with a `paginationHelper` utility |
| 2 | **No RBAC middleware** | Any authenticated user can trigger matching, access any data | Create `authorize(...roles)` middleware; apply to matching (owner or admin) and future admin routes |
| 3 | **Matching → Notification flow disconnected** | Donors are identified but never notified — core feature is broken end-to-end | Wire `notifyMatchedDonors` into matching service after donor query |
| 4 | **No test infrastructure** | No regression protection; no confidence in refactoring | Set up Jest + Supertest + mongodb-memory-server; cover auth + blood request + matching flows |
| 5 | **CORS fully open** | Cross-origin requests from any domain accepted | Configure `cors({ origin: [allowed_origins] })` |

### P2 — Enhancements / Long-Term Scaling

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| 1 | **No async notification queue** | At high donor counts, `insertMany` during request processing blocks response | Introduce Bull/BullMQ with Redis for background notification processing |
| 2 | **No caching layer** | Repeated identical matching queries hit MongoDB each time | Add Redis caching for blood request lookups with TTL invalidation |
| 3 | **No API documentation** | Frontend team and third-party consumers have no contract | Generate OpenAPI/Swagger spec from route definitions |
| 4 | **No CI/CD or containerization** | Manual deployment; no automated quality gates | GitHub Actions + Dockerfile + docker-compose for dev parity |
| 5 | **No blood request lifecycle management** | Cannot cancel, fulfill, or update requests | Add PATCH endpoints with status transitions and ownership checks |

---

## 10. Recommended Next Steps & Roadmap

### Phase 1: Critical Hardening & Wiring (Immediate)
**Why first:** The backend's core value proposition (match donors → notify them → log everything) is architecturally built but not connected. The JWT vulnerability makes any deployment unsafe.

1. Remove JWT fallback secrets; add `JWT_SECRET` and `JWT_EXPIRES_IN` to `.env` and `.env.example`; fail-fast if missing.
2. Wire `logAuthEvent` into `authService.registerUser` and `authService.loginUser`.
3. Wire `logBloodRequestEvent` into `bloodRequestService.createBloodRequest`.
4. Wire `notifyMatchedDonors` + `logMatchingEvent` into `matchingService.findEligibleDonors`.
5. Add `express.json({ limit: '10kb' })`.
6. Add `express-rate-limit` on auth endpoints.
7. Create public vs. authenticated DTOs for blood request listings (strip PII from public view).

### Phase 2: Authorization, Pagination & Testing
**Why second:** Once core flows are wired and secured, the next priority is preventing unauthorized access and ensuring the API can handle real data volumes, with tests to lock it all in.

1. Build `authorize(...allowedRoles)` middleware using the existing `ROLES` constants.
2. Apply RBAC to matching (requester or admin), future admin routes.
3. Implement pagination helper; apply to blood request listing and notification inbox.
4. Set up Jest + Supertest + `mongodb-memory-server`.
5. Write integration tests for: auth (register/login/protect), blood request CRUD, matching + notification dispatch, notification ownership.
6. Add blood request lifecycle endpoints (cancel, fulfill) with ownership checks.

### Phase 3: DevOps, Documentation & Scale Prep
**Why third:** With a tested, secured, fully-wired backend, the focus shifts to operational maturity for real deployment.

1. Dockerfile + docker-compose (app + MongoDB for local dev).
2. GitHub Actions CI pipeline (lint → test → build).
3. Swagger/OpenAPI spec generation.
4. Structured logging (Winston or Pino) replacing `console.log`.
5. CORS origin whitelist configuration.
6. Graceful shutdown handling.
7. Evaluate Bull/Redis for async notification processing if donor volumes warrant it.
