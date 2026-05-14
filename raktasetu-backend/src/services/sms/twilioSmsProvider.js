import twilio from 'twilio';
import SmsProvider from './smsProvider.js';

class TwilioSmsProvider extends SmsProvider {
  constructor() {
    super();
    // Initialize Twilio client
    // Expects TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER in .env
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      this.fromPhone = process.env.TWILIO_PHONE_NUMBER;
    } else {
      console.warn('Twilio credentials not found. TwilioSmsProvider will fail if used.');
    }
  }

  async sendOtp(phone, otp) {
    try {
      await this.client.messages.create({
        body: `Your RaktaSetu verification code is: ${otp}. This code expires in 10 minutes.`,
        from: this.fromPhone,
        to: `+91${phone}` // Assuming India country code
      });
      return true;
    } catch (error) {
      console.error('Twilio Send OTP Error:', error);
      return false;
    }
  }

  async sendSms(phone, message) {
    try {
      await this.client.messages.create({
        body: message,
        from: this.fromPhone,
        to: `+91${phone}`
      });
      return true;
    } catch (error) {
      console.error('Twilio Send SMS Error:', error);
      return false;
    }
  }
}

export default TwilioSmsProvider;
