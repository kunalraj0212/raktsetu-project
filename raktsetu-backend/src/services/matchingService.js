import BloodRequest from '../models/BloodRequest.js';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import { getCompatibleDonorGroups } from '../utils/bloodCompatibility.js';

/**
 * Core Matching Algorithm.
 * Finds all eligible, available, compatible donors for a specific emergency request.
 */
export const findEligibleDonors = async (requestId) => {
  // 1. Fetch the Blood Request
  const request = await BloodRequest.findById(requestId);
  
  if (!request) {
    throw new ApiError(404, 'Blood request not found');
  }

  // 2. Fetch Compatible Blood Groups using isolated utility
  const compatibleGroups = getCompatibleDonorGroups(request.bloodGroup);

  if (compatibleGroups.length === 0) {
    throw new ApiError(400, 'Invalid recipient blood group in request');
  }

  // 3. Calculate Cooldown Deadline (90 Days)
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  // 4. Query the Database for Eligible Donors
  // This query is heavily optimized by the { bloodGroup: 1, state: 1, district: 1, availabilityStatus: 1 } compound index
  const eligibleDonors = await User.find({
    role: 'donor',
    availabilityStatus: true,
    _id: { $ne: request.requester }, // Prevent matching the requester to their own request
    state: request.state, // Filter by broad location
    district: request.district, // Filter by specific location
    bloodGroup: { $in: compatibleGroups }, // Any compatible blood type
    $or: [
      { lastDonatedAt: { $exists: false } },
      { lastDonatedAt: null },
      { lastDonatedAt: { $lte: ninetyDaysAgo } } // Must have completed cooldown
    ]
  })
  .select('fullName email phone bloodGroup state district availabilityStatus lastDonatedAt') // Security: DO NOT select password or hidden fields
  .lean(); // Faster execution for read-only operations

  return {
    requestInfo: {
      patientName: request.patientName,
      requiredGroup: request.bloodGroup,
      compatibleGroups: compatibleGroups,
      urgencyLevel: request.urgencyLevel,
      hospital: request.hospitalName,
      location: `${request.district}, ${request.state}`
    },
    totalMatches: eligibleDonors.length,
    donors: eligibleDonors
  };
};
