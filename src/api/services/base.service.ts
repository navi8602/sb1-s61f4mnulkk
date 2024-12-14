import api from '../api';
import { AxiosRequestConfig } from 'axios';

export class BaseService {
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await api.get<T>(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await api.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await api.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await api.delete<T>(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: any) {
    if (error.response) {
      // Server error response
      console.error('Server Error:', error.response.data);
    } else if (error.request) {
      // No response received
      console.error('No Response:', error.request);
    } else {
      // Request setup error
      console.error('Request Error:', error.message);
    }
  }
}