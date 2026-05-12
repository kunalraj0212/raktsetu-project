import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/User.js';
import { envConfig } from '../config/envConfig.js';

/**
 * Middleware to protect routes. 
 * Extracts Bearer token, verifies it, and attaches the user document to req.user.
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Extract Token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2. Reject if no token
  if (!token) {
    throw new ApiError(401, 'Not authorized to access this route. No token provided.');
  }

  try {
    // 3. Verify Token
    const decoded = jwt.verify(token, envConfig.JWT_SECRET);

    // 4. Attach user to request (Safely excluding password)
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      throw new ApiError(401, 'The user belonging to this token no longer exists.');
    }

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Session expired. Please log in again.');
    }
    throw new ApiError(401, 'Invalid authentication token.');
  }
});
