import ApiError from '../utils/ApiError.js';
import { ROLES } from '../constants/roles.js';

export const authorizeRoles = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, 'Not authorized. Authentication is required first.');
  }

  if (!allowedRoles.includes(req.user.role)) {
    throw new ApiError(403, 'Forbidden. You do not have permission for this action.');
  }

  next();
};

export const ownsResource = (getOwnerId) => async (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, 'Not authorized. Authentication is required first.');
  }

  if (req.user.role === ROLES.ADMIN) {
    return next();
  }

  const ownerId = await getOwnerId(req);
  if (!ownerId) {
    throw new ApiError(403, 'Forbidden. Resource ownership could not be verified.');
  }

  if (String(ownerId) !== String(req.user._id)) {
    throw new ApiError(403, 'Forbidden. You do not own this resource.');
  }

  next();
};
