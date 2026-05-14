import mongoose from 'mongoose';
import { NOTIFICATION_TYPE_VALUES } from '../constants/notificationTypes.js';

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: NOTIFICATION_TYPE_VALUES,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    relatedRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BloodRequest',
    },
    deliveryChannel: {
      type: String,
      enum: ['sms', 'email', 'push', 'in_app'],
      default: 'in_app',
    },
    status: {
      type: String,
      enum: ['pending', 'sent', 'failed', 'read'],
      default: 'pending',
    },
    sentAt: {
      type: Date,
    },
    readAt: {
      type: Date,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed, // Allows flexible payload storage without breaking schema
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// ==========================================
// INDEXING STRATEGY FOR NOTIFICATIONS
// ==========================================

// 1. Inbox Retrieval Index
// Heavily optimizes "Get my unread notifications" queries for the user dashboard
notificationSchema.index({ recipient: 1, status: 1 });

// 2. Related Request Index
// Allows quick deletion or status updates for all notifications tied to a specific blood request
notificationSchema.index({ relatedRequest: 1 });

// 3. TTL/Chronological Index
// Optimizes fetching recent notifications and supports future auto-deletion of old logs
notificationSchema.index({ createdAt: -1 });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
