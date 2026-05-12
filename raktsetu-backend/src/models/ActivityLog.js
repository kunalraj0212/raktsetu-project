import mongoose from 'mongoose';
import { ACTIVITY_TYPE_VALUES } from '../constants/activityTypes.js';

const activityLogSchema = new mongoose.Schema(
  {
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Who triggered the event (null if system-triggered)
    },
    activityType: {
      type: String,
      enum: ACTIVITY_TYPE_VALUES,
      required: true,
    },
    entityType: {
      type: String, // e.g., 'User', 'BloodRequest', 'Notification'
      required: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId, // The specific ID of the entity affected
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed, // Deeply nested telemetry data (sanitized)
    },
    ipAddress: {
      type: String, // Useful for security auditing
    },
    userAgent: {
      type: String, // Useful for tracing client issues
    },
    severity: {
      type: String,
      enum: ['info', 'warning', 'critical'],
      default: 'info',
    },
  },
  {
    timestamps: true, // Auto-generates createdAt for time-series analysis
  }
);

// ==========================================
// INDEXING STRATEGY FOR OBSERVABILITY
// ==========================================

// 1. Core Timeline Index (Time-Series)
// Optimizes fetching the chronological history of the entire system or dashboard
activityLogSchema.index({ createdAt: -1 });

// 2. Activity Type Index
// Allows immediate filtering (e.g., "Show me all BLOOD_REQUEST_CREATED events today")
activityLogSchema.index({ activityType: 1, createdAt: -1 });

// 3. User Audit Index
// Crucial for security audits (e.g., "What did User X do across the platform?")
activityLogSchema.index({ actor: 1, createdAt: -1 });

// 4. Severity Alert Index
// Optimizes pulling critical alerts for an admin dashboard
activityLogSchema.index({ severity: 1, createdAt: -1 });

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

export default ActivityLog;
