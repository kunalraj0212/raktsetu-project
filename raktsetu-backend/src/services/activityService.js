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

export const logActivityInBackground = (logData) => {
  // Fire-and-forget: logging failures are already contained inside logActivity.
  void logActivity(logData);
};



export const logLoginSuccessEvent = ({ user, ipAddress, userAgent }) => {
  logActivityInBackground({
    actor: user._id,
    activityType: ACTIVITY_TYPES.USER_LOGGED_IN,
    entityType: 'User',
    entityId: user._id,
    message: formatter.formatAuthEvent('USER_LOGGED_IN', user.email),
    metadata: { role: user.role },
    ipAddress,
    userAgent,
    severity: 'info',
  });
};

export const logLoginFailedEvent = ({ redactedEmail, ipAddress, userAgent }) => {
  logActivityInBackground({
    activityType: ACTIVITY_TYPES.AUTH_LOGIN_FAILED,
    entityType: 'User',
    message: formatter.formatAuthEvent('AUTH_LOGIN_FAILED', redactedEmail),
    metadata: { attemptedEmail: redactedEmail },
    ipAddress,
    userAgent,
    severity: 'warning',
  });
};

export const logMatchingTriggeredEvent = ({ actorId, requestId, matchCount }) => {
  logActivityInBackground({
    actor: actorId || undefined,
    activityType: ACTIVITY_TYPES.MATCHING_TRIGGERED,
    entityType: 'BloodRequest',
    entityId: requestId,
    message: formatter.formatMatchingEvent(matchCount, requestId),
    metadata: { matchCount },
    severity: 'info',
  });
};

export const logNotificationBatchCreatedEvent = ({ actorId, requestId, count, channel, notificationType }) => {
  logActivityInBackground({
    actor: actorId || undefined,
    activityType: ACTIVITY_TYPES.NOTIFICATIONS_CREATED_FOR_REQUEST,
    entityType: 'BloodRequest',
    entityId: requestId,
    message: formatter.formatNotificationEvent('NOTIFICATIONS_CREATED_FOR_REQUEST', requestId),
    metadata: {
      count,
      channel,
      notificationType,
    },
    severity: 'info',
  });
};
