import Notification from '../models/Notification.js';
import ApiError from '../utils/ApiError.js';
import { NOTIFICATION_TYPES } from '../constants/notificationTypes.js';
import { generateEmergencyRequestTemplate } from '../utils/notificationTemplates.js';

/**
 * Creates a generic notification record.
 * This acts as the entry point for future message queues.
 */
export const createNotification = async (notificationData) => {
  return await Notification.create(notificationData);
};

/**
 * High-volume orchestrator.
 * Accepts an array of matched donors and generates notifications for all of them simultaneously.
 */
export const notifyMatchedDonors = async (donors, requestInfo, requestId) => {
  const template = generateEmergencyRequestTemplate(
    requestInfo.requiredGroup,
    requestInfo.hospital,
    requestInfo.location
  );
  
  // Map donors into a bulk insertion array
  const notifications = donors.map(donor => ({
    recipient: donor._id,
    type: NOTIFICATION_TYPES.EMERGENCY_BLOOD_REQUEST,
    title: template.title,
    message: template.message,
    relatedRequest: requestId,
    deliveryChannel: 'in_app', // Default baseline channel
    status: 'pending' // Queued for processing
  }));

  // Perform a high-performance bulk insert (faster than saving in a for-loop)
  const savedNotifications = await Notification.insertMany(notifications);
  
  return savedNotifications;
};

/**
 * Fetches chronologically sorted notifications for a specific user dashboard.
 */
export const getUserNotifications = async (userId) => {
  return await Notification.find({ recipient: userId })
    .sort({ createdAt: -1 })
    .lean();
};

/**
 * Marks a specific notification as read, ensuring security checks so users can only update their own.
 */
export const markAsRead = async (notificationId, userId) => {
  const notification = await Notification.findOne({ _id: notificationId, recipient: userId });
  
  if (!notification) {
    throw new ApiError(404, 'Notification not found or unauthorized access');
  }
  
  notification.status = 'read';
  notification.readAt = new Date();
  
  await notification.save();
  return notification;
};
