```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user';
import { authService } from '../services/auth';
import { useNotifications } from './NotificationContext';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  verifyPhone: (phone: string, code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addNotification } = useNotifications();

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          // Здесь можно добавить запрос данных пользователя
          const response = await fetch('/api/users/me', {
            headers: {
              'Authorization': `Bearer ${authService.getToken()}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            throw new Error('Не удалось получить данные пользователя');
          }
        }
      } catch (error) {
        authService.logout();
        addNotification({
          title: 'Ошибка аутентификации',
          message: 'Пожалуйста, войдите снова',
          type: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [addNotification]);

  const login = async (email: string, password: string) => {
    try {
      const { user } = await authService.login(email, password);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    try {
      const { user } = await authService.register(userData);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  const verifyPhone = async (phone: string, code: string) => {
    return await authService.verifyPhone(phone, code);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        verifyPhone
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```