import ActivityLog from '../models/ActivityLog.js';
import { ACTIVITY_TYPES } from '../constants/activityTypes.js';
import * as formatter from '../utils/activityFormatter.js';

/**
 * Core internal method for committing an activity to the persistent store.
 * Safe fallback mechanisms prevent logging failures from crashing business logic.
 */
export const logActivity = async (logData) => {
  try {
    // Sanitize metadata to absolutely guarantee passwords or tokens are never logged
    if (logData.metadata) {
      delete logData.metadata.password;
      delete logData.metadata.token;
    }

    await ActivityLog.create(logData);
  } catch (error) {
    // We intentionally catch this and console.error it. 
    // An audit log failure MUST NOT crash the user's primary transaction.
    console.error(`[CRITICAL] Failed to write audit log: ${error.message}`);
  }
};

/**
 * Orchestrator for Authentication Events
 */
export const logAuthEvent = async (type, user, req = null) => {
  const message = formatter.formatAuthEvent(type, user.email);
  
  await logActivity({
    actor: user._id,
    activityType: ACTIVITY_TYPES[type],
    entityType: 'User',
    entityId: user._id,
    message,
    metadata: { role: user.role, bloodGroup: user.bloodGroup },
    ipAddress: req?.ip,
    userAgent: req?.get('User-Agent'),
    severity: 'info'
  });
};

/**
 * Orchestrator for Blood Request Events
 */
export const logBloodRequestEvent = async (type, request, actorId = null) => {
  const message = formatter.formatBloodRequestEvent(type, request.bloodGroup, request.district);

  await logActivity({
    actor: actorId || request.requester,
    activityType: ACTIVITY_TYPES[type],
    entityType: 'BloodRequest',
    entityId: request._id,
    message,
    metadata: { urgencyLevel: request.urgencyLevel, units: request.unitsRequired },
    severity: type === 'BLOOD_REQUEST_CREATED' && request.urgencyLevel === 'critical' ? 'warning' : 'info'
  });
};

/**
 * Orchestrator for Matching & Notification Events
 */
export const logMatchingEvent = async (requestId, matchCount) => {
  const message = formatter.formatMatchingEvent(matchCount, requestId);

  await logActivity({
    activityType: ACTIVITY_TYPES.DONOR_MATCH_FOUND,
    entityType: 'BloodRequest',
    entityId: requestId,
    message,
    metadata: { matchCount },
    severity: 'info'
  });
};
