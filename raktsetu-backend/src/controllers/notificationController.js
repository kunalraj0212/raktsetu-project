import * as notificationService from '../services/notificationService.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * @desc    Get all notifications for the logged-in user
 * @route   GET /api/v1/notifications
 * @access  Private
 */
export const getUserNotifications = asyncHandler(async (req, res) => {
  const notifications = await notificationService.getUserNotifications(req.user.id);
  
  res.status(200).json({
    success: true,
    count: notifications.length,
    data: notifications
  });
});

/**
 * @desc    Mark a single notification as read
 * @route   PATCH /api/v1/notifications/:id/read
 * @access  Private
 */
export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await notificationService.markAsRead(req.params.id, req.user.id);
  
  res.status(200).json({
    success: true,
    data: notification
  });
});
