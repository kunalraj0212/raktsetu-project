import request from 'supertest';
import {
  createTestUser,
  getApp,
  loginTestUser,
  createTestBloodRequest,
} from '../utils/testClient.js';

describe('Matching Endpoint Authorization', () => {
  test('allows request owner to fetch matches', async () => {
    const app = await getApp();
    const owner = await createTestUser({
      bloodGroup: 'A+',
      state: 'Maharashtra',
      district: 'Pune',
    });
    const donor = await createTestUser({
      bloodGroup: 'O+',
      state: 'Maharashtra',
      district: 'Pune',
    });
    const { token: ownerToken } = await loginTestUser(owner.credentials);
    await loginTestUser(donor.credentials);

    const { response: requestResponse } = await createTestBloodRequest(ownerToken, {
      bloodGroup: 'A+',
      state: 'Maharashtra',
      district: 'Pune',
    });
    const requestId = requestResponse.body.data._id;

    const response = await request(app)
      .get(`/api/v1/blood-requests/${requestId}/matches`)
      .set('Authorization', `Bearer ${ownerToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('totalMatches');
    expect(response.body.data).toHaveProperty('donors');
    expect(Array.isArray(response.body.data.donors)).toBe(true);
  });

  test('blocks non-owner non-admin user from fetching matches', async () => {
    const app = await getApp();
    const owner = await createTestUser();
    const otherUser = await createTestUser({ email: `other_${Date.now()}@test.com` });
    const { token: ownerToken } = await loginTestUser(owner.credentials);
    const { token: otherToken } = await loginTestUser(otherUser.credentials);

    const { response: requestResponse } = await createTestBloodRequest(ownerToken);
    const requestId = requestResponse.body.data._id;

    const response = await request(app)
      .get(`/api/v1/blood-requests/${requestId}/matches`)
      .set('Authorization', `Bearer ${otherToken}`);

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
  });
});
