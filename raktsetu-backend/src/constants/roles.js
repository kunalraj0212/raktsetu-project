/**
 * Centralized Role Constants.
 * Using constants prevents typos and ensures single-source-of-truth for RBAC.
 */
export const ROLES = {
  DONOR: 'donor',
  ADMIN: 'admin',
  HOSPITAL: 'hospital',
  BLOODBANK: 'bloodbank'
};

export const ROLE_VALUES = Object.values(ROLES);
