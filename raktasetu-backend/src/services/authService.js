import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import ApiError from '../utils/ApiError.js';
import { logLoginSuccessEvent, logLoginFailedEvent } from './activityService.js';
import { sendOtp as sendOtpInternal, verifyOtp as verifyOtpInternal } from './otpService.js';
import OtpVerification from '../models/OtpVerification.js';

export const registerUser = async (userData) => {
  // Check if user already exists
  const userExists = await User.findOne({ email: userData.email });
  if (userExists) {
    throw new ApiError(400, 'A user with this email already exists');
  }

  const phoneExists = await User.findOne({ phone: userData.phone });
  if (phoneExists) {
    throw new ApiError(400, 'A user with this phone number already exists');
  }

  // Create User
  const user = await User.create({
    ...userData,
    isPhoneVerified: false, // OTP removed
  });

  // Token Generation
  const token = generateToken(user._id, user.role);

  return {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    bloodGroup: user.bloodGroup,
    token
  };
};

export const loginUser = async (email, password, requestContext = {}) => {
  // Find user by email and select password (since select: false in schema)
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Verify password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    // Log failed login
    logLoginFailedEvent({
      email,
      ipAddress: requestContext.ipAddress,
      userAgent: requestContext.userAgent,
      reason: 'Invalid credentials'
    });
    throw new ApiError(401, 'Invalid email or password');
  }

  // Generate token
  const token = generateToken(user._id, user.role);

  // Log success
  logLoginSuccessEvent({
    user,
    ipAddress: requestContext.ipAddress,
    userAgent: requestContext.userAgent,
  });

  return {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
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

export const directResetPassword = async (email, newPassword) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  user.password = newPassword;
  await user.save();
  return { message: 'Password reset successfully' };
};
