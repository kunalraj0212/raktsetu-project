import Notification from '../models/Notification.js';
import { NOTIFICATION_TYPES } from '../constants/notificationTypes.js';
import { generateEmergencyRequestTemplate } from '../utils/notificationTemplates.js';
import { logActivityInBackground } from '../services/activityService.js';
import { ACTIVITY_TYPES } from '../constants/activityTypes.js';
import { formatNotificationEvent } from '../utils/activityFormatter.js';

const TEMPLATE_KEYS = Object.freeze({
  EMERGENCY_BLOOD_REQUEST: 'EMERGENCY_BLOOD_REQUEST',
});

const buildTemplate = (templateKey, payload) => {
  if (templateKey === TEMPLATE_KEYS.EMERGENCY_BLOOD_REQUEST) {
    return generateEmergencyRequestTemplate(
      payload.requiredGroup,
      payload.hospital,
      payload.location
    );
  }

  throw new Error(`Unsupported notification template key: ${templateKey}`);
};

export const processNotificationJob = async (job) => {
  try {
    const template = buildTemplate(job.templateKey, job.payload);

    const notifications = job.recipientIds.map((recipientId) => ({
      recipient: recipientId,
      type: job.notificationType || NOTIFICATION_TYPES.EMERGENCY_BLOOD_REQUEST,
      title: template.title,
      message: template.message,
      relatedRequest: job.requestId,
      deliveryChannel: job.channel || 'in_app',
      status: 'pending',
    }));

    if (notifications.length === 0) {
      return { processedCount: 0 };
    }

    const savedNotifications = await Notification.insertMany(notifications);
    return { processedCount: savedNotifications.length };
  } catch (error) {
    logActivityInBackground({
      actor: job.initiatedBy || undefined,
      activityType: ACTIVITY_TYPES.NOTIFICATION_JOB_FAILED,
      entityType: 'BloodRequest',
      entityId: job.requestId,
      message: formatNotificationEvent('NOTIFICATION_JOB_FAILED', job.requestId),
      metadata: {
        templateKey: job.templateKey,
        channel: job.channel,
        recipientCount: job.recipientIds?.length || 0,
        error: error.message,
      },
      severity: 'warning',
    });

    console.error(`[NOTIFICATION_JOB_ERROR] ${error.message}`);
    return { processedCount: 0, error: error.message };
  }
};

export const enqueueNotificationBatch = async (jobData) => {
  const job = {
    requestId: jobData.requestId,
    initiatedBy: jobData.initiatedBy || null,
    recipientIds: jobData.recipientIds || [],
    channel: jobData.channel || 'in_app',
    notificationType: jobData.notificationType || NOTIFICATION_TYPES.EMERGENCY_BLOOD_REQUEST,
    templateKey: jobData.templateKey || TEMPLATE_KEYS.EMERGENCY_BLOOD_REQUEST,
    payload: jobData.payload || {},
  };

  setImmediate(() => {
    void processNotificationJob(job);
  });

  return {
    enqueued: true,
    enqueuedCount: job.recipientIds.length,
  };
};
