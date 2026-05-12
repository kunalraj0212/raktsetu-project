import request from 'supertest';
import { createTestUser, getApp } from '../utils/testClient.js';

describe('Auth Login', () => {
  test('logs in successfully with valid credentials', async () => {
    const app = await getApp();
    const { credentials } = await createTestUser();

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send(credentials);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('token');
    expect(typeof response.body.data.token).toBe('string');
  });

  test('rejects login with invalid credentials', async () => {
    const app = await getApp();
    const { credentials } = await createTestUser();

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: credentials.email,
        password: 'WrongPassword@123',
      });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.data?.token).toBeUndefined();
  });
});
