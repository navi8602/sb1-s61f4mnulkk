```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../contexts/NotificationContext';
import { validatePassword } from '../../utils/validation';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Валидация пароля
    const { isValid, errors } = validatePassword(formData.password);
    if (!isValid) {
      addNotification({
        title: 'Ошибка валидации',
        message: errors.join('\n'),
        type: 'error'
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка регистрации');
      }

      // Сохраняем токен
      localStorage.setItem('token', data.token);

      addNotification({
        title: 'Успешная регистрация',
        message: 'Аккаунт успешно создан',
        type: 'success'
      });

      onSuccess?.();
      navigate('/');
    } catch (error) {
      addNotification({
        title: 'Ошибка регистрации',
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
          Имя
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Телефон
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
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
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
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
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}
```