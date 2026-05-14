import request from 'supertest';
import Notification from '../../src/models/Notification.js';

let appInstance;

export const getApp = async () => {
  if (!appInstance) {
    const module = await import('../../src/app.js');
    appInstance = module.default;
  }
  return appInstance;
};

export const createTestUser = async (overrides = {}) => {
  const app = await getApp();
  const uniqueSuffix = `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  const password = overrides.password || 'Password@123';

  const payload = {
    fullName: 'Test User',
    email: `user_${uniqueSuffix}@test.com`,
    password,
    phone: '9876543210',
    state: 'Maharashtra',
    district: 'Pune',
    bloodGroup: 'O+',
    ...overrides,
    password,
  };

  const response = await request(app)
    .post('/api/v1/auth/register')
    .send(payload);

  if (response.status !== 201) {
    throw new Error(`Failed to create test user: ${JSON.stringify(response.body)}`);
  }

  return {
    user: response.body.data,
    credentials: {
      email: payload.email,
      password,
    },
    response,
  };
};

export const loginTestUser = async ({ email, password }) => {
  const app = await getApp();
  const response = await request(app)
    .post('/api/v1/auth/login')
    .send({ email, password });

  if (response.status !== 200) {
    throw new Error(`Failed to login test user: ${JSON.stringify(response.body)}`);
  }

  return {
    token: response.body?.data?.token,
    response,
  };
};

export const createTestBloodRequest = async (token, overrides = {}) => {
  const app = await getApp();
  const payload = {
    patientName: 'Patient A',
    bloodGroup: 'A+',
    unitsRequired: 2,
    hospitalName: 'City Care Hospital',
    state: 'Maharashtra',
    district: 'Pune',
    urgencyLevel: 'high',
    requiredBy: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    additionalNotes: 'Urgent requirement',
    ...overrides,
  };

  const response = await request(app)
    .post('/api/v1/blood-requests')
    .set('Authorization', `Bearer ${token}`)
    .send(payload);

  return { response, payload };
};

export const createTestNotification = async (notificationData) => {
  return Notification.create(notificationData);
};
