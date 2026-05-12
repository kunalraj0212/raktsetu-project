import * as matchingService from '../services/matchingService.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * @desc    Find eligible donors for a specific blood request
 * @route   GET /api/v1/blood-requests/:id/matches
 * @access  Private
 */
export const getMatchesForRequest = asyncHandler(async (req, res) => {
  // Controller remains thin: extracting ID, delegating to Service, formatting Response
  const matches = await matchingService.findEligibleDonors(req.params.id, req.user.id);
  
  res.status(200).json({
    success: true,
    data: matches
  });
});
