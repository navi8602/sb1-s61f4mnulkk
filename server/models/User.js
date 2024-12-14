import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    trim: true
  },
  avatar: {
    type: String
  },
  address: {
    type: String
  },
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: false }
    },
    language: { type: String, default: 'ru' },
    theme: { type: String, default: 'light' }
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export const User = mongoose.model('User', userSchema);