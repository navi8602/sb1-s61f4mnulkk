import { ApiError } from '../utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      error: {
        message: err.message,
        status: err.status
      }
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: {
        message: 'Validation Error',
        details: Object.values(err.errors).map(e => e.message)
      }
    });
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: {
        message: 'Invalid token'
      }
    });
  }

  // Default error
  res.status(500).json({
    error: {
      message: 'Internal Server Error'
    }
  });
};