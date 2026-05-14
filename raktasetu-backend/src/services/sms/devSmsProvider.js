import SmsProvider from './smsProvider.js';

class DevSmsProvider extends SmsProvider {
  async sendOtp(phone, otp) {
    // In development mode, we do NOT send real SMS.
    // We log it securely to the console for the developer to use.
    console.log(`\n==============================================`);
    console.log(`[DEV OTP NOTIFICATION]`);
    console.log(`Recipient: ${phone}`);
    console.log(`OTP Code : ${otp}`);
    console.log(`==============================================\n`);
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    return true;
  }

  async sendSms(phone, message) {
    console.log(`\n==============================================`);
    console.log(`[DEV SMS NOTIFICATION]`);
    console.log(`Recipient: ${phone}`);
    console.log(`Message  : ${message}`);
    console.log(`==============================================\n`);
    
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    return true;
  }
}

export default DevSmsProvider;
