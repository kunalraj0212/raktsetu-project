import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import ApiError from '../utils/ApiError.js';

/**
 * Validates and persists a new user, returning sanitized data and a JWT token.
 * Throws an ApiError if the email is already registered.
 */
export const registerUser = async (userData) => {
  const { email } = userData;

  // 1. Business Validation: Enforce unique email
  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) {
    throw new ApiError(400, 'A user with this email already exists');
  }

  // 2. Database Orchestration
  const user = await User.create(userData);

  // 3. Token Generation
  const token = generateToken(user._id, user.role);

  // 4. Return sanitized object (Never return raw document with password)
  return {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    bloodGroup: user.bloodGroup,
    token
  };
};

/**
 * Authenticates a user based on email and password.
 * Throws a 401 ApiError for invalid credentials.
 */
export const loginUser = async (email, password) => {
  // 1. Explicitly select the password field because our Schema drops it by default
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  
  if (!user) {
    throw new ApiError(401, 'Invalid email or password'); // Security: Do not specify whether email or password failed
  }

  // 2. Validate Credentials
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // 3. Token Generation
  const token = generateToken(user._id, user.role);

  return {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
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
