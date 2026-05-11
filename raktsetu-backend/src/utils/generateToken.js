import jwt from 'jsonwebtoken';

/**
 * Generates a signed JWT token containing the user ID and role.
 * Relies on JWT_SECRET environment variable.
 */
const generateToken = (userId, role) => {
  // Fail-safe if JWT_SECRET is missing during early development
  const secret = process.env.JWT_SECRET || 'fallback_dev_secret_only';
  const expiresIn = process.env.JWT_EXPIRES_IN || '30d';

  return jwt.sign(
    { id: userId, role },
    secret,
    { expiresIn }
  );
};

export default generateToken;
