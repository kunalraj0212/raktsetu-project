import Notification from '../models/Notification.js';
import ApiError from '../utils/ApiError.js';
import { NOTIFICATION_TYPES } from '../constants/notificationTypes.js';
import { logNotificationBatchCreatedEvent } from './activityService.js';
import { enqueueNotificationBatch } from '../queues/notificationJobQueue.js';
import { smsProvider } from './otpService.js';

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
export const notifyMatchedDonors = async (donors, requestInfo, requestId, initiatedBy = null) => {
  const enqueueResult = await enqueueNotificationBatch({
    requestId,
    initiatedBy,
    recipientIds: donors.map((donor) => donor._id),
    channel: 'in_app',
    notificationType: NOTIFICATION_TYPES.EMERGENCY_BLOOD_REQUEST,
    templateKey: 'EMERGENCY_BLOOD_REQUEST',
    payload: {
      requiredGroup: requestInfo.requiredGroup,
      hospital: requestInfo.hospital,
      location: requestInfo.location,
    },
  });

  // Dispatch real-time emergency broadcast SMS alerts
  const smsMessage = `URGENT: ${requestInfo.requiredGroup} blood needed at ${requestInfo.hospital}, ${requestInfo.location}. Please help save a life! Log in to RaktSetu to respond.`;
  
  // Fire and forget SMS dispatch to avoid blocking the API response
  Promise.allSettled(
    donors
      .filter((donor) => donor.phone && donor.isPhoneVerified !== false)
      .map((donor) => smsProvider.sendSms(donor.phone, smsMessage))
  ).catch(err => console.error('Error dispatching batch SMS:', err));

  logNotificationBatchCreatedEvent({
    actorId: initiatedBy,
    requestId,
    count: enqueueResult.enqueuedCount,
    channel: 'in_app',
    notificationType: NOTIFICATION_TYPES.EMERGENCY_BLOOD_REQUEST,
  });
  
  return enqueueResult;
};

/**
 * Fetches chronologically sorted notifications for a specific user dashboard.
 */
export const getUserNotifications = async (userId, { skip, limit, status }) => {
  const filter = { recipient: userId };
  if (status === 'unread') {
    filter.status = { $ne: 'read' };
  } else if (status && status !== 'all') {
    filter.status = status;
  }

  const [items, total] = await Promise.all([
    Notification.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Notification.countDocuments(filter),
  ]);

  return { items, total };
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

export const getNotificationRecipientId = async (notificationId) => {
  const notification = await Notification.findById(notificationId).select('recipient').lean();

  if (!notification) {
    throw new ApiError(404, 'Notification not found');
  }

  return notification.recipient;
};
