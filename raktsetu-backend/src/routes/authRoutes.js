import express from 'express';
import { sendOtp, verifyOtp, profileComplete, getCurrentUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { sendOtpSchema, verifyOtpSchema, completeProfileSchema } from '../validations/authValidation.js';
import { otpRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/send-otp', otpRateLimiter, validate(sendOtpSchema), sendOtp);
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtp);
router.post('/complete-profile', validate(completeProfileSchema), profileComplete);

// Protected Routes
router.get('/me', protect, getCurrentUser);

export default router;
