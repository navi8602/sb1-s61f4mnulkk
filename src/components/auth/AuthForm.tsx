```tsx
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { SmsVerification } from './SmsVerification';
import { Icon } from '../icons';

type AuthMode = 'login' | 'register';

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSmsVerification, setShowSmsVerification] = useState(false);
  
  const { login, register } = useAuth();
  const { addNotification } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register(formData);
        setShowSmsVerification(true);
      }
    } catch (error) {
      addNotification({
        title: mode === 'login' ? 'Ошибка входа' : 'Ошибка регистрации',
        message: error instanceof Error ? error.message : 'Произошла ошибка',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showSmsVerification) {
    return (
      <SmsVerification
        phone={formData.phone}
        onVerified={() => {
          addNotification({
            title: 'Успешная регистрация',
            message: 'Добро пожаловать в систему',
            type: 'success'
          });
        }}
        onCancel={() => setShowSmsVerification(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Icon 
              name={mode === 'login' ? 'LogIn' : 'UserPlus'} 
              className="h-6 w-6 text-indigo-600" 
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold">
          {mode === 'login' ? 'Вход в систему' : 'Регистрация'}
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          {mode === 'login' 
            ? 'Войдите в свой аккаунт для доступа к системе'
            : 'Создайте аккаунт для начала работы'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Имя
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                       focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                     focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        {mode === 'register' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Телефон
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                       focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Пароль
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
                     focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent 
                   rounded-md shadow-sm text-sm font-medium text-white 
                   bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                   focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                   disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading 
            ? (mode === 'login' ? 'Вход...' : 'Регистрация...') 
            : (mode === 'login' ? 'Войти' : 'Зарегистрироваться')}
        </button>
      </form>

      <div className="text-center">
        <button
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          {mode === 'login'
            ? 'Нет аккаунта? Зарегистрируйтесь'
            : 'Уже есть аккаунт? Войдите'}
        </button>
      </div>
    </div>
  );
}
```