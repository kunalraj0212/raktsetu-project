/**
 * Wraps async Express routes/controllers to seamlessly pass rejected promises (errors) 
 * to the global error handling middleware, eliminating the need for repetitive try/catch blocks.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
