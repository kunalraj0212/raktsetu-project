/**
 * Centralized Activity Formatter.
 * Ensures that log messages are perfectly uniform and readable across the entire platform.
 */

export const formatAuthEvent = (type, email) => {
  if (type === 'USER_REGISTERED') return `New user registered with email: ${email}`;
  if (type === 'USER_LOGGED_IN') return `User logged in: ${email}`;
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
  return `Notification [${type}] dispatched to user ${recipientId}`;
};
