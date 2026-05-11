/**
 * Centralized Activity Types for Observability.
 * Defining these strictly ensures our logs are queryable and prevents typo-induced data fragmentation.
 */
export const ACTIVITY_TYPES = {
  // Authentication Events
  USER_REGISTERED: 'USER_REGISTERED',
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  
  // Blood Request Events
  BLOOD_REQUEST_CREATED: 'BLOOD_REQUEST_CREATED',
  REQUEST_FULFILLED: 'REQUEST_FULFILLED',
  REQUEST_CANCELLED: 'REQUEST_CANCELLED',
  
  // Matching Engine Events
  DONOR_MATCH_FOUND: 'DONOR_MATCH_FOUND',
  
  // Notification Events
  NOTIFICATION_CREATED: 'NOTIFICATION_CREATED',
  NOTIFICATION_SENT: 'NOTIFICATION_SENT',
  
  // Security & Admin
  UNAUTHORIZED_ACCESS_ATTEMPT: 'UNAUTHORIZED_ACCESS_ATTEMPT',
  SYSTEM_ERROR: 'SYSTEM_ERROR'
};

export const ACTIVITY_TYPE_VALUES = Object.values(ACTIVITY_TYPES);
