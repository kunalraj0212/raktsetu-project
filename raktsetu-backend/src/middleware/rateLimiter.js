import rateLimit from 'express-rate-limit';
import ApiError from '../utils/ApiError.js';

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next) => {
    next(new ApiError(429, 'Too many auth requests. Please try again later.'));
  },
  skip: () => process.env.NODE_ENV === 'test',
});

export const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120, // Limit each IP to 120 requests per `window`
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new ApiError(429, 'Too many API requests. Please try again later.'));
  },
  skip: () => process.env.NODE_ENV === 'test',
});

// Specific strict rate limiter for OTP generation to prevent SMS spam
export const otpRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 OTP requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new ApiError(429, 'Too many OTP requests. Please try again after 15 minutes.'));
  },
  skip: () => process.env.NODE_ENV === 'test',
});
