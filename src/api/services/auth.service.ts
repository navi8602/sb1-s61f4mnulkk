import { BaseService } from './base.service';
import type { User } from '../../types/user';

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

class AuthService extends BaseService {
  async login(email: string, password: string): Promise<LoginResponse> {
    return this.post<LoginResponse>('/auth/login', { email, password });
  }

  async register(userData: RegisterData): Promise<LoginResponse> {
    return this.post<LoginResponse>('/auth/register', userData);
  }

  async verifySms(phone: string, code: string): Promise<boolean> {
    const { success } = await this.post<{ success: boolean }>('/auth/verify-sms', {
      phone,
      code
    });
    return success;
  }

  async getCurrentUser(): Promise<User> {
    return this.get<User>('/users/me');
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
  }
}

export const authService = new AuthService();