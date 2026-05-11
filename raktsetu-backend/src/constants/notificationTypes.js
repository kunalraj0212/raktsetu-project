/**
 * Centralized Notification Type Constants.
 * Ensures strict typing and prevents typos across the platform.
 */
export const NOTIFICATION_TYPES = {
  EMERGENCY_BLOOD_REQUEST: 'EMERGENCY_BLOOD_REQUEST',
  REQUEST_MATCH_FOUND: 'REQUEST_MATCH_FOUND',
  REQUEST_FULFILLED: 'REQUEST_FULFILLED',
  DONATION_REMINDER: 'DONATION_REMINDER'
};

export const NOTIFICATION_TYPE_VALUES = Object.values(NOTIFICATION_TYPES);
