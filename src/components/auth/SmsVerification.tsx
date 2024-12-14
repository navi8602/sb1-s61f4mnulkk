```tsx
import { useState, useEffect } from 'react';
import { useNotifications } from '../../contexts/NotificationContext';
import { Icon } from '../icons';

interface SmsVerificationProps {
  phone: string;
  onVerified: () => void;
  onCancel: () => void;
}

export function SmsVerification({
  phone,
  onVerified,
  onCancel
}: SmsVerificationProps) {
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
        message: 'Новый код подтверждения отправлен',
        type: 'success'
      });
    } catch (error) {
      addNotification({
        title: 'Ошибка',
        message: 'Не удалось отправить код',
        type: 'error'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/verify-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, code }),
      });

      if (!response.ok) {
        throw new Error('Неверный код');
      }

      addNotification({
        title: 'Успешно',
        message: 'Телефон подтвержден',
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
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Icon name="Phone" className="h-6 w-6 text-indigo-600" />
          </div>
        </div>
        <h3 className="text-lg font-medium">Подтверждение телефона</h3>
        <p className="mt-2 text-sm text-gray-500">
          Код отправлен на номер {phone}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={code[index] || ''}
              onChange={(e) => {
                const newCode = code.split('');
                newCode[index] = e.target.value;
                setCode(newCode.join(''));
                
                // Автоматический переход к следующему полю
                if (e.target.value && index < 5) {
                  const nextInput = document.querySelector(
                    `input[name=code-${index + 1}]`
                  ) as HTMLInputElement;
                  if (nextInput) nextInput.focus();
                }
              }}
              name={`code-${index}`}
              className="w-full h-12 text-center text-lg font-medium border-gray-300 
                       rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={timeLeft > 0}
            className="text-indigo-600 hover:text-indigo-500 disabled:text-gray-400"
          >
            {timeLeft > 0 
              ? `Отправить повторно (${timeLeft}с)` 
              : 'Отправить повторно'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
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