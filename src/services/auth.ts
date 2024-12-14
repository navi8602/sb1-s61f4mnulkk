```typescript
import { User } from '../types/user';

interface AuthResponse {
  token: string;
  user: User;
}

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;

  private constructor() {
    this.token = localStorage.getItem('token');
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Ошибка входа');
    }

    const data = await response.json();
    this.setToken(data.token);
    return data;
  }

  async register(userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }): Promise<AuthResponse> {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Ошибка регистрации');
    }

    const data = await response.json();
    this.setToken(data.token);
    return data;
  }

  async verifyPhone(phone: string, code: string): Promise<boolean> {
    const response = await fetch('/api/auth/verify-phone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify({ phone, code }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Ошибка верификации');
    }

    return true;
  }

  async logout(): Promise<void> {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });
    } finally {
      this.clearToken();
    }
  }

  async refreshToken(): Promise<string> {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      this.clearToken();
      throw new Error('Не удалось обновить токен');
    }

    const { token } = await response.json();
    this.setToken(token);
    return token;
  }

  getToken(): string | null {
    return this.token;
  }

  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  private clearToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}

export const authService = AuthService.getInstance();
```