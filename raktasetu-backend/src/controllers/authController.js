import { registerUser, loginUser, getUserById, directResetPassword } from '../services/authService.js';
import asyncHandler from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({ success: true, data: user });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password, {
    ipAddress: req.ip,
    userAgent: req.get('User-Agent'),
  });
  
  res.status(200).json({ success: true, data: result });
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

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;
  const result = await directResetPassword(email, newPassword);
  res.status(200).json({ success: true, data: result });
});
