```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../contexts/NotificationContext';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка входа');
      }

      // Сохраняем токен
      localStorage.setItem('token', data.token);

      addNotification({
        title: 'Успешный вход',
        message: 'Добро пожаловать в систему',
        type: 'success'
      });

      onSuccess?.();
      navigate('/');
    } catch (error) {
      addNotification({
        title: 'Ошибка входа',
        message: error instanceof Error ? error.message : 'Произошла ошибка',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Пароль
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
        {isLoading ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
}
```