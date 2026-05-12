import express from 'express';
import { register, login, getCurrentUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../validations/authValidation.js';
import { apiRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', apiRateLimiter, validate(registerSchema), register);
router.post('/login', apiRateLimiter, validate(loginSchema), login);

// Protected Routes
router.get('/me', protect, getCurrentUser);

export default router;
