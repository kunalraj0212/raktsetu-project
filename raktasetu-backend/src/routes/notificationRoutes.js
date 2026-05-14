import express from 'express';
import { getUserNotifications, markAsRead } from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { ownsResource } from '../middleware/authorizationMiddleware.js';
import { getNotificationRecipientId } from '../services/notificationService.js';

const router = express.Router();

// All notification endpoints strictly require authentication
router.use(protect);

router.get('/', getUserNotifications);
router.patch(
  '/:id/read',
  ownsResource((req) => getNotificationRecipientId(req.params.id)),
  markAsRead
);

export default router;
