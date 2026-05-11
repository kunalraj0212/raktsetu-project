import express from 'express';
import { createRequest, getActiveRequests, getRequestById } from '../controllers/bloodRequestController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { createBloodRequestSchema } from '../validations/bloodRequestValidation.js';

const router = express.Router();

router
  .route('/')
  .post(protect, validate(createBloodRequestSchema), createRequest)
  .get(getActiveRequests);

router
  .route('/:id')
  .get(getRequestById);

export default router;
