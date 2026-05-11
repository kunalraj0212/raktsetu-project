import express from 'express';
import { register, login, getCurrentUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../validations/authValidation.js';

const router = express.Router();

// Public Routes with Validation
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// Protected Routes
router.get('/me', protect, getCurrentUser);

export default router;
