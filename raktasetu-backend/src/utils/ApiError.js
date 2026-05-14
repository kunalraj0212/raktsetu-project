/**
 * Custom Error class for centralized API error handling.
 * Allows throwing standard HTTP errors (e.g., throw new ApiError(404, 'Not Found'))
 * cleanly from the Service layer.
 */
class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational; // True for expected/handled errors, false for programming bugs
    
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
