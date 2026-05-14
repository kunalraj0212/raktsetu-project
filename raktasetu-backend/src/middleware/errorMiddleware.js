import ApiError from '../utils/ApiError.js';

/**
 * Catch-all for undefined routes (e.g., hitting /api/v1/invalid-route)
 */
export const notFound = (req, res, next) => {
  const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
  next(error); // Pass to global error handler
};

/**
 * Global Error Handler Middleware
 * Intercepts all thrown errors and ApiErrors, returning a clean JSON format.
 */
export const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    error = new ApiError(404, message);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ApiError(400, message);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message).join(', ');
    error = new ApiError(400, message);
  }

  const statusCode = error.statusCode || err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: error.message || 'Server Error',
    // Hide stack trace in production for security
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};
