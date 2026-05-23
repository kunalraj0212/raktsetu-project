import express from 'express';
import { register, login, getCurrentUser, resetPassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { registerSchema, loginSchema, resetPasswordSchema } from '../validations/authValidation.js';
import { apiRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', apiRateLimiter, validate(registerSchema), register);
router.post('/login', apiRateLimiter, validate(loginSchema), login);
router.post('/reset-password-direct', apiRateLimiter, validate(resetPasswordSchema), resetPassword);

// Protected Routes
router.get('/me', protect, getCurrentUser);

export default router;
