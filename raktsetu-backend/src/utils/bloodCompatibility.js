/**
 * Centralized Blood Compatibility Rules.
 * Maps a RECIPIENT blood group to an array of valid DONOR blood groups.
 */
const compatibilityMap = {
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'A-': ['A-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Universal Recipient
  'AB-': ['AB-', 'A-', 'B-', 'O-'],
  'O+': ['O+', 'O-'],
  'O-': ['O-'] // Universal Donor
};

/**
 * Returns an array of valid donor blood groups for a given recipient.
 * @param {string} recipientGroup 
 * @returns {string[]} Array of compatible blood groups
 */
export const getCompatibleDonorGroups = (recipientGroup) => {
  return compatibilityMap[recipientGroup] || [];
};

/**
 * Checks if a specific donor group is compatible with a recipient group.
 * @param {string} donorGroup 
 * @param {string} recipientGroup 
 * @returns {boolean} true if compatible
 */
export const isCompatible = (donorGroup, recipientGroup) => {
  const compatibleDonors = getCompatibleDonorGroups(recipientGroup);
  return compatibleDonors.includes(donorGroup);
};
