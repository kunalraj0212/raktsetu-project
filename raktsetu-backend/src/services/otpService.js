import crypto from 'crypto';
import OtpVerification from '../models/OtpVerification.js';
import DevSmsProvider from './sms/devSmsProvider.js';
import TwilioSmsProvider from './sms/twilioSmsProvider.js';
import ApiError from '../utils/ApiError.js';

// Dynamically select provider based on ENV variables
const isProduction = process.env.NODE_ENV === 'production';
export const smsProvider = isProduction ? new TwilioSmsProvider() : new DevSmsProvider();

/**
 * Generate a 6-digit numerical OTP.
 */
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

/**
 * Creates and sends a secure OTP.
 */
export const sendOtp = async (phone) => {
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

  // Optional: clear any existing unverified OTPs for this phone
  await OtpVerification.deleteMany({ phone, verified: false });

  // Store securely (Schema hashes the OTP)
  await OtpVerification.create({
    phone,
    otpHash: otp,
    expiresAt,
  });

  // Send via Provider Abstraction
  const sent = await smsProvider.sendOtp(phone, otp);
  
  if (!sent) {
    throw new ApiError(500, 'Failed to send OTP via SMS provider');
  }

  return { success: true, message: 'OTP sent successfully' };
};

/**
 * Verifies the provided OTP for the given phone.
 */
export const verifyOtp = async (phone, otp) => {
  const otpRecord = await OtpVerification.findOne({ phone }).sort({ createdAt: -1 });

  if (!otpRecord) {
    throw new ApiError(400, 'No OTP request found for this number');
  }

  if (otpRecord.verified) {
    throw new ApiError(400, 'OTP is already verified');
  }

  if (Date.now() > otpRecord.expiresAt.getTime()) {
    throw new ApiError(400, 'OTP has expired. Please request a new one.');
  }

  if (otpRecord.attempts >= 5) {
    throw new ApiError(400, 'Too many failed attempts. Please request a new OTP.');
  }

  const isMatch = await otpRecord.matchOtp(otp);

  if (!isMatch) {
    otpRecord.attempts += 1;
    await otpRecord.save();
    throw new ApiError(400, 'Invalid OTP provided');
  }

  // Mark as verified
  otpRecord.verified = true;
  await otpRecord.save();

  return { success: true, message: 'Phone number verified successfully' };
};
