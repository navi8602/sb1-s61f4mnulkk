import axios from 'axios';
import { useNotifications } from '../contexts/NotificationContext';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      // Network error
      console.error('Network Error:', error);
      return Promise.reject(new Error('Ошибка сети. Проверьте подключение.'));
    }

    // Handle specific error codes
    switch (error.response.status) {
      case 401:
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/auth';
        break;
      case 403:
        // Forbidden
        return Promise.reject(new Error('Доступ запрещен'));
      case 404:
        // Not found
        return Promise.reject(new Error('Ресурс не найден'));
      case 500:
        // Server error
        return Promise.reject(new Error('Ошибка сервера'));
      default:
        return Promise.reject(error);
    }
  }
);

export default api;