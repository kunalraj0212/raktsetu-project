import express from 'express';
import { getMatchesForRequest } from '../controllers/matchingController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles, ownsResource } from '../middleware/authorizationMiddleware.js';
import { ROLE_VALUES } from '../constants/roles.js';
import { getBloodRequestOwnerId } from '../services/bloodRequestService.js';

const router = express.Router();

// Route: GET /api/v1/blood-requests/:id/matches
router.get(
  '/blood-requests/:id/matches',
  protect,
  authorizeRoles(...ROLE_VALUES),
  ownsResource((req) => getBloodRequestOwnerId(req.params.id)),
  getMatchesForRequest
);

export default router;
