import BloodRequest from '../models/BloodRequest.js';
import ApiError from '../utils/ApiError.js';
import { logActivityInBackground } from './activityService.js';
import { ACTIVITY_TYPES } from '../constants/activityTypes.js';
import { formatBloodRequestEvent } from '../utils/activityFormatter.js';

const toPublicBloodRequest = (requestDoc) => ({
  _id: requestDoc._id,
  patientName: requestDoc.patientName,
  bloodGroup: requestDoc.bloodGroup,
  unitsRequired: requestDoc.unitsRequired,
  hospitalName: requestDoc.hospitalName,
  state: requestDoc.state,
  district: requestDoc.district,
  urgencyLevel: requestDoc.urgencyLevel,
  requiredBy: requestDoc.requiredBy,
  status: requestDoc.status,
  additionalNotes: requestDoc.additionalNotes,
  createdAt: requestDoc.createdAt,
  updatedAt: requestDoc.updatedAt,
});

/**
 * Creates a new blood request linked to the requester.
 * Ensures data is persisted properly.
 */
export const createBloodRequest = async (requesterId, requestData) => {
  const bloodRequest = await BloodRequest.create({
    ...requestData,
    requester: requesterId,
  });

  logActivityInBackground({
    actor: requesterId,
    activityType: ACTIVITY_TYPES.BLOOD_REQUEST_CREATED,
    entityType: 'BloodRequest',
    entityId: bloodRequest._id,
    message: formatBloodRequestEvent('BLOOD_REQUEST_CREATED', bloodRequest.bloodGroup, bloodRequest.district),
    metadata: {
      bloodGroup: bloodRequest.bloodGroup,
      district: bloodRequest.district,
      urgencyLevel: bloodRequest.urgencyLevel,
    },
    severity: bloodRequest.urgencyLevel === 'critical' ? 'warning' : 'info',
  });

  return bloodRequest;
};

/**
 * Fetches all active (pending) blood requests, sorted by urgency and requiredBy date.
 * Populates the requester details securely.
 */
export const getAllActiveRequests = async ({ skip, limit }) => {
  const filter = { status: 'pending' };
  const [requests, total] = await Promise.all([
    BloodRequest.find(filter)
    .sort({ requiredBy: 1 }) // Nearest deadlines first
    .skip(skip)
    .limit(limit)
    .lean(),
    BloodRequest.countDocuments(filter),
  ]);

  return {
    items: requests.map(toPublicBloodRequest),
    total,
  };
};

/**
 * Safely fetches a single blood request by ID, including requester details.
 */
export const getRequestById = async (requestId) => {
  const request = await BloodRequest.findById(requestId).lean();
  
  if (!request) {
    throw new ApiError(404, 'Blood request not found');
  }

  return toPublicBloodRequest(request);
};

export const getBloodRequestOwnerId = async (requestId) => {
  const request = await BloodRequest.findById(requestId).select('requester').lean();

  if (!request) {
    throw new ApiError(404, 'Blood request not found');
  }

  return request.requester;
};
