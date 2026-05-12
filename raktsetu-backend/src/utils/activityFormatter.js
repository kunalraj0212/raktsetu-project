/**
 * Centralized Activity Formatter.
 * Ensures that log messages are perfectly uniform and readable across the entire platform.
 */

export const formatAuthEvent = (type, email) => {
  if (type === 'USER_REGISTERED') return `New user registered with email: ${email}`;
  if (type === 'USER_LOGGED_IN') return `User logged in: ${email}`;
  if (type === 'AUTH_LOGIN_FAILED') return `Failed login attempt for email: ${email}`;
  return `Authentication event for ${email}`;
};

export const formatBloodRequestEvent = (type, bloodGroup, district) => {
  if (type === 'BLOOD_REQUEST_CREATED') return `Emergency blood request created for ${bloodGroup} in ${district}`;
  if (type === 'REQUEST_FULFILLED') return `Blood request fulfilled for ${bloodGroup} in ${district}`;
  return `Blood request event updated`;
};

export const formatMatchingEvent = (matchCount, requestId) => {
  return `Matching engine identified ${matchCount} eligible donors for request ${requestId}`;
};

export const formatNotificationEvent = (type, recipientId) => {
  if (type === 'NOTIFICATIONS_CREATED_FOR_REQUEST') {
    return `Batch notifications created for request ${recipientId}`;
  }
  if (type === 'NOTIFICATION_JOB_FAILED') {
    return `Notification job failed for request ${recipientId}`;
  }
  return `Notification [${type}] dispatched to user ${recipientId}`;
};
