import request from 'supertest';
import { createTestUser, getApp, loginTestUser } from '../utils/testClient.js';

describe('Blood Request Creation', () => {
  test('creates a blood request for authenticated user', async () => {
    const app = await getApp();
    const { credentials } = await createTestUser();
    const { token } = await loginTestUser(credentials);

    const payload = {
      patientName: 'Patient One',
      bloodGroup: 'B+',
      unitsRequired: 1,
      hospitalName: 'Hope Hospital',
      state: 'Maharashtra',
      district: 'Pune',
      urgencyLevel: 'critical',
      requiredBy: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
      additionalNotes: 'Immediate assistance needed',
    };

    const response = await request(app)
      .post('/api/v1/blood-requests')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject({
      patientName: payload.patientName,
      bloodGroup: payload.bloodGroup,
      district: payload.district,
      urgencyLevel: payload.urgencyLevel,
      status: 'pending',
    });
  });

  test('rejects blood request creation without authentication', async () => {
    const app = await getApp();
    const payload = {
      patientName: 'Patient Two',
      bloodGroup: 'A+',
      unitsRequired: 2,
      hospitalName: 'City Hospital',
      state: 'Maharashtra',
      district: 'Pune',
      urgencyLevel: 'high',
      requiredBy: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    };

    const response = await request(app)
      .post('/api/v1/blood-requests')
      .send(payload);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
