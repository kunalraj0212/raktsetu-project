import BloodRequest from '../models/BloodRequest.js';
import ApiError from '../utils/ApiError.js';

/**
 * Creates a new blood request linked to the requester.
 * Ensures data is persisted properly.
 */
export const createBloodRequest = async (requesterId, requestData) => {
  const bloodRequest = await BloodRequest.create({
    ...requestData,
    requester: requesterId,
  });

  return bloodRequest;
};

/**
 * Fetches all active (pending) blood requests, sorted by urgency and requiredBy date.
 * Populates the requester details securely.
 */
export const getAllActiveRequests = async () => {
  const requests = await BloodRequest.find({ status: 'pending' })
    .sort({ requiredBy: 1 }) // Nearest deadlines first
    .populate('requester', 'fullName phone email role'); // Exclude password and sensitive info
  
  return requests;
};

/**
 * Safely fetches a single blood request by ID, including requester details.
 */
export const getRequestById = async (requestId) => {
  const request = await BloodRequest.findById(requestId)
    .populate('requester', 'fullName phone email role');
  
  if (!request) {
    throw new ApiError(404, 'Blood request not found');
  }

  return request;
};
