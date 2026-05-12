import jwt from 'jsonwebtoken';
import { envConfig } from '../config/envConfig.js';

/**
 * Generates a signed JWT token containing the user ID and role.
 * Relies on JWT_SECRET environment variable.
 */
const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    envConfig.JWT_SECRET,
    { expiresIn: envConfig.JWT_EXPIRES_IN }
  );
};

export default generateToken;
