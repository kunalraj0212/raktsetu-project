import { registerUser, loginUser, getUserById } from '../services/authService.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  // Controller ONLY extracts data and calls the service. 
  // All business logic and validation happens in authService.
  const user = await registerUser(req.body);
  
  res.status(201).json({ success: true, data: user });
});

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await loginUser(email, password);
  
  res.status(200).json({ success: true, data: user });
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
