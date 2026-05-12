import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import ApiError from '../utils/ApiError.js';
import { logLoginSuccessEvent, logLoginFailedEvent } from './activityService.js';
import { sendOtp as sendOtpInternal, verifyOtp as verifyOtpInternal } from './otpService.js';
import OtpVerification from '../models/OtpVerification.js';

export const requestOtp = async (phone) => {
  return await sendOtpInternal(phone);
};

export const processOtpVerification = async (phone, otp, requestContext = {}) => {
  // Verify the OTP via OtpService
  await verifyOtpInternal(phone, otp);

  // Check if user already exists with this phone
  const user = await User.findOne({ phone });

  if (user) {
    // Existing user: Log them in
    const token = generateToken(user._id, user.role);
    
    // Log success
    logLoginSuccessEvent({
      user,
      ipAddress: requestContext.ipAddress,
      userAgent: requestContext.userAgent,
    });

    return {
      isNewUser: false,
      user: {
        _id: user._id,
        fullName: user.fullName,
        phone: user.phone,
        role: user.role,
        bloodGroup: user.bloodGroup,
        token
      }
    };
  } else {
    // New User: Return response indicating profile completion needed
    return {
      isNewUser: true,
      message: 'OTP verified successfully. Please complete your profile.',
    };
  }
};

export const completeProfile = async (userData) => {
  const { phone } = userData;

  // Security validation: Ensure phone was actually verified recently
  const verifiedRecord = await OtpVerification.findOne({ phone, verified: true })
    .sort({ createdAt: -1 });

  if (!verifiedRecord) {
    throw new ApiError(401, 'Phone number not verified or verification expired.');
  }

  // Double check if user exists to prevent duplicate creation race conditions
  const userExists = await User.findOne({ phone });
  if (userExists) {
    throw new ApiError(400, 'A user with this phone number already exists');
  }

  // Create User
  const user = await User.create({
    ...userData,
    isPhoneVerified: true,
  });

  // Token Generation
  const token = generateToken(user._id, user.role);

  return {
    _id: user._id,
    fullName: user.fullName,
    phone: user.phone,
    role: user.role,
    bloodGroup: user.bloodGroup,
    token
  };
};



/**
 * Safely fetches a user by ID. The schema naturally excludes the password.
 */
export const getUserById = async (userId) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};
