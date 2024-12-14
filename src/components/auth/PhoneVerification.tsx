```tsx
import { useState, useEffect } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';

interface PhoneVerificationProps {
  phone: string;
  onVerified: () => void;
  onCancel: () => void;
}

export function PhoneVerification({ 
  phone, 
  onVerified, 
  onCancel 
}: PhoneVerificationProps) {
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotifications();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleResendCode = async () => {
    try {
      const response = await fetch('/api/auth/resend-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки кода');
      }

      setTimeLeft(60);
      addNotification({
        title: 'Код отправлен',
        message: 'Новый код подтверждения отправлен на ваш телефон',
        type: 'success'
      });
    } catch (error) {
      addNotification({
        title: 'Ошибка',
        message: 'Не удалось отправить код подтверждения',
        type: 'error'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/verify-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, code }),
      });

      if (!response.ok) {
        throw new Error('Неверный код подтверждения');
      }

      addNotification({
        title: 'Успешно',
        message: 'Номер телефона подтвержден',
        type: 'success'
      });

      onVerified();
    } catch (error) {
      addNotification({
        title: 'Ошибка',
        message: 'Неверный код подтверждения',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium">Подтверждение телефона</h3>
        <p className="mt-2 text-sm text-gray-500">
          Код подтверждения отправлен на номер {phone}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Код подтверждения
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            maxLength={6}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={timeLeft > 0}
            className="text-sm text-indigo-600 hover:text-indigo-500 disabled:text-gray-400"
          >
            {timeLeft > 0 
              ? `Отправить код повторно (${timeLeft}с)` 
              : 'Отправить код повторно'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Отмена
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading || code.length !== 6}
          className="w-full flex justify-center py-2 px-4 border border-transparent 
                   rounded-md shadow-sm text-sm font-medium text-white 
                   bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                   focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                   disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Проверка...' : 'Подтвердить'}
        </button>
      </form>
    </div>
  );
}
```