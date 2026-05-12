async function testAuth() {
  const baseUrl = 'http://localhost:5000/api/v1';

  try {
    console.log('1. Testing Registration...');
    const regRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'testauth@example.com',
        phone: '9876543210',
        password: 'password123',
        state: 'TestState',
        district: 'TestDistrict',
        bloodGroup: 'A+'
      })
    });
    const regData = await regRes.json();
    console.log('Registration Status:', regRes.status);
    if (!regRes.ok && regData.message !== 'A user with this email already exists') {
      console.log('Registration Error:', regData);
    } else {
      console.log('Registration Data:', regData.success ? 'Success' : regData.message);
    }

    console.log('\n2. Testing Login...');
    const loginRes = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'testauth@example.com',
        password: 'password123'
      })
    });
    const loginData = await loginRes.json();
    console.log('Login Status:', loginRes.status);
    let token = '';
    if (loginRes.ok) {
      token = loginData.data.token;
      console.log('Login Success. Token acquired.');
    } else {
      console.log('Login Error:', loginData);
      return;
    }

    console.log('\n3. Testing Protected Route (/auth/me)...');
    const meRes = await fetch(`${baseUrl}/auth/me`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const meData = await meRes.json();
    console.log('/auth/me Status:', meRes.status);
    if (meRes.ok) {
      console.log('/auth/me Success. User fetched:', meData.data.email);
    } else {
      console.log('/auth/me Error:', meData);
    }

  } catch (err) {
    console.error('Test script error:', err);
  }
}

testAuth();
