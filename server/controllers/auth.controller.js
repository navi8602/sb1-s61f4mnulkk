import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { hashPassword, comparePasswords } from '../utils/auth.js';
import { ApiError } from '../utils/ApiError.js';

export const authController = {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new ApiError(400, 'User with this email already exists');
      }

      const hashedPassword = await hashPassword(password);
      const user = await User.create({
        name,
        email,
        password: hashedPassword
      });

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        throw new ApiError(401, 'Invalid credentials');
      }

      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid credentials');
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      next(error);
    }
  }
};