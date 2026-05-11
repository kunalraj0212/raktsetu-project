import * as bloodRequestService from '../services/bloodRequestService.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * @desc    Create a new blood request
 * @route   POST /api/v1/blood-requests
 * @access  Private (Authenticated users only)
 */
export const createRequest = asyncHandler(async (req, res) => {
  // req.body is already validated and sanitized by Zod middleware
  // req.user.id comes from the protect auth middleware
  const newRequest = await bloodRequestService.createBloodRequest(req.user.id, req.body);
  
  res.status(201).json({ success: true, data: newRequest });
});

/**
 * @desc    Get all active blood requests
 * @route   GET /api/v1/blood-requests
 * @access  Public
 */
export const getActiveRequests = asyncHandler(async (req, res) => {
  const requests = await bloodRequestService.getAllActiveRequests();
  
  res.status(200).json({ success: true, count: requests.length, data: requests });
});

/**
 * @desc    Get single blood request by ID
 * @route   GET /api/v1/blood-requests/:id
 * @access  Public
 */
export const getRequestById = asyncHandler(async (req, res) => {
  const request = await bloodRequestService.getRequestById(req.params.id);
  
  res.status(200).json({ success: true, data: request });
});
