import { useState } from 'react';
import { Dialog } from '../ui/Dialog';
import { HydroponicSystem, RentalPeriod } from '../../types/system';
import { RENTAL_PERIODS } from '../../data/systems';
import { SystemCard } from './SystemCard';
import { calculateRentalPrice } from '../../utils/rental';
import { useNotifications } from '../../contexts/NotificationContext';

interface SystemRentalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRent: (systemId: string, months: number) => void;
  selectedSystem: HydroponicSystem;
}

export function SystemRentalDialog({
  isOpen,
  onClose,
  onRent,
  selectedSystem
}: SystemRentalDialogProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<RentalPeriod>(RENTAL_PERIODS[0]);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addNotification } = useNotifications();

  const { price, discount } = calculateRentalPrice(
    selectedPeriod.months,
    selectedSystem.monthlyPrice
  );

  const handleConfirm = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addNotification({
      title: 'Оплата прошла успешно',
      message: `Оплата аренды системы ${selectedSystem.name} выполнена успешно`,
      type: 'success'
    });

    addNotification({
      title: 'Система добавлена',
      message: 'Система успешно добавлена на ваш дашборд',
      type: 'info',
      actionLabel: 'Перейти к системе',
      onAction: () => {
        window.location.href = '/';
      }
    });

    onRent(selectedSystem.id, selectedPeriod.months);
    setIsProcessing(false);
    onClose();
  };

  return (
    <Dialog 
      isOpen={isOpen} 
      onClose={onClose}
      title={isConfirming ? "Подтверждение аренды" : "Аренда системы"}
    >
      {/* Rest of the component remains the same, just using emoji icons */}
      <div className="space-y-6">
        {!isConfirming ? (
          <>
            <SystemCard system={selectedSystem} />
            {/* Period selection UI */}
          </>
        ) : (
          <>
            <div className="space-y-4">
              {/* Order details */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <span>📅</span>
                  <span>Доставка в течение 2-3 рабочих дней</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <span>📦</span>
                  <span>Бесплатная установка и настройка</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <span>💳</span>
                  <span>Оплата при получении</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              {!isProcessing ? (
                <>
                  <button
                    onClick={() => setIsConfirming(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 
                             bg-white border border-gray-300 rounded-md 
                             hover:bg-gray-50"
                  >
                    Назад
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="px-4 py-2 text-sm font-medium text-white 
                             bg-indigo-600 border border-transparent 
                             rounded-md hover:bg-indigo-700"
                  >
                    Подтвердить аренду
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-2 text-indigo-600">
                  <span className="animate-spin">🔄</span>
                  <span>Обработка платежа...</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}