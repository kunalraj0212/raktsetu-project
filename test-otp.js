async function testOtpAuth() {
  const baseUrl = 'http://localhost:5000/api/v1';
  const testPhone = '8888888888';
  const otpCode = '835183';

  try {
    console.log('2. Testing Verify OTP...');
    const verifyRes = await fetch(`${baseUrl}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: testPhone, otp: otpCode })
    });
    const verifyData = await verifyRes.json();
    console.log('Verify OTP Status:', verifyRes.status, verifyData);

    console.log('\n3. Testing Complete Profile...');
    const profileRes = await fetch(`${baseUrl}/auth/complete-profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: testPhone,
        fullName: 'Test OTP User',
        state: 'TestState',
        district: 'TestDistrict',
        bloodGroup: 'B+'
      })
    });
    const profileData = await profileRes.json();
    console.log('Complete Profile Status:', profileRes.status, profileData);
  } catch (err) {
    console.error('Test script error:', err);
  }
}

testOtpAuth();
