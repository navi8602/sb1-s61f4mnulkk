import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { errorHandler } from './middleware/errorHandler.js';
import { authRoutes } from './routes/auth.routes.js';
import { systemRoutes } from './routes/system.routes.js';
import { plantRoutes } from './routes/plant.routes.js';
import { userRoutes } from './routes/user.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/systems', systemRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use(errorHandler);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });