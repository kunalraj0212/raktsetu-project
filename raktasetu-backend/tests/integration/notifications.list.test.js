import request from 'supertest';
import { NOTIFICATION_TYPES } from '../../src/constants/notificationTypes.js';
import {
  createTestNotification,
  createTestUser,
  getApp,
  loginTestUser,
} from '../utils/testClient.js';

describe('Notification Listing', () => {
  test('returns only recipient notifications with default pagination metadata', async () => {
    const app = await getApp();
    const userA = await createTestUser();
    const userB = await createTestUser();
    const { token: tokenA } = await loginTestUser(userA.credentials);

    await createTestNotification({
      recipient: userA.user._id,
      type: NOTIFICATION_TYPES.EMERGENCY_BLOOD_REQUEST,
      title: 'A1',
      message: 'User A notification one',
      deliveryChannel: 'in_app',
      status: 'pending',
    });

    await createTestNotification({
      recipient: userA.user._id,
      type: NOTIFICATION_TYPES.REQUEST_FULFILLED,
      title: 'A2',
      message: 'User A notification two',
      deliveryChannel: 'in_app',
      status: 'read',
    });

    await createTestNotification({
      recipient: userB.user._id,
      type: NOTIFICATION_TYPES.DONATION_REMINDER,
      title: 'B1',
      message: 'User B notification one',
      deliveryChannel: 'in_app',
      status: 'pending',
    });

    const response = await request(app)
      .get('/api/v1/notifications')
      .set('Authorization', `Bearer ${tokenA}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.pagination).toMatchObject({
      page: 1,
      limit: 20,
      total: 2,
      totalPages: 1,
    });
    expect(response.body.data).toHaveLength(2);
    response.body.data.forEach((item) => {
      expect(String(item.recipient)).toBe(String(userA.user._id));
    });
  });

  test('honors pagination query parameters', async () => {
    const app = await getApp();
    const user = await createTestUser();
    const { token } = await loginTestUser(user.credentials);

    await Promise.all(
      Array.from({ length: 3 }).map((_, index) =>
        createTestNotification({
          recipient: user.user._id,
          type: NOTIFICATION_TYPES.EMERGENCY_BLOOD_REQUEST,
          title: `N-${index}`,
          message: `Notification ${index}`,
          deliveryChannel: 'in_app',
          status: 'pending',
        })
      )
    );

    const response = await request(app)
      .get('/api/v1/notifications?page=2&limit=1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.pagination).toMatchObject({
      page: 2,
      limit: 1,
      total: 3,
      totalPages: 3,
    });
  });
});
