import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Authentication required');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, 'Invalid token'));
  }
};