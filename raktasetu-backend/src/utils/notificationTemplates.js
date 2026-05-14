/**
 * Centralized Notification Templates.
 * Isolating message logic ensures identical phrasing across SMS, Email, and Push channels,
 * and allows easy localization/translation in the future.
 */

export const generateEmergencyRequestTemplate = (bloodGroup, hospital, location) => ({
  title: `URGENT: ${bloodGroup} Blood Required`,
  message: `An emergency request for ${bloodGroup} blood has been posted at ${hospital} in ${location}. You are a compatible match! Please respond immediately if you can donate.`
});

export const generateRequestFulfilledTemplate = (patientName) => ({
  title: 'Request Fulfilled',
  message: `Good news! The blood request for ${patientName} has been successfully fulfilled. Thank you to everyone who stepped up to help.`
});

export const generateReminderTemplate = (userName) => ({
  title: 'Time to Save a Life!',
  message: `Hi ${userName}, it has been over 90 days since your last donation. You are now eligible to donate blood again and save lives.`
});
