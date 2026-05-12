import { requestOtp, processOtpVerification, completeProfile, getUserById } from '../services/authService.js';
import asyncHandler from '../utils/asyncHandler.js';

export const sendOtp = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  const result = await requestOtp(phone);
  res.status(200).json({ success: true, message: result.message });
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;
  const result = await processOtpVerification(phone, otp, {
    ipAddress: req.ip,
    userAgent: req.get('User-Agent'),
  });
  
  res.status(200).json({ success: true, data: result });
});

export const profileComplete = asyncHandler(async (req, res) => {
  const user = await completeProfile(req.body);
  res.status(201).json({ success: true, data: user });
});

/**
 * @desc    Get current logged in user
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
export const getCurrentUser = asyncHandler(async (req, res) => {
  // req.user is attached by the protect middleware
  const user = await getUserById(req.user.id);
  
  res.status(200).json({ success: true, data: user });
});
