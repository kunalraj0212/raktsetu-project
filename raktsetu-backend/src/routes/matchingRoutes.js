import express from 'express';
import { getMatchesForRequest } from '../controllers/matchingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route: GET /api/v1/blood-requests/:id/matches
router.get('/blood-requests/:id/matches', protect, getMatchesForRequest);

export default router;
