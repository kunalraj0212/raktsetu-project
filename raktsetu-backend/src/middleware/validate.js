import ApiError from '../utils/ApiError.js';

/**
 * Reusable validation middleware.
 * Accepts any Zod schema, validates the request body, and intercepts errors before they reach controllers.
 */
export const validate = (schema) => (req, res, next) => {
  try {
    // 1. Validate and optionally strip unknown fields/sanitize types
    const parsedData = schema.parse(req.body);
    
    // 2. Overwrite req.body with the perfectly sanitized, strictly-typed data
    req.body = parsedData;
    
    next();
  } catch (error) {
    // 3. Intercept Zod errors, map them to a readable string, and throw ApiError
    const errorMessage = error.errors.map((err) => err.message).join(', ');
    next(new ApiError(400, errorMessage));
  }
};
