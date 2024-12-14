```tsx
import { Icon } from '../../icons';

interface EmptyPlantStateProps {
  onAddPlant?: () => void;
}

export function EmptyPlantState({ onAddPlant }: EmptyPlantStateProps) {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-yellow-100 animate-pulse" />
          <div className="relative p-4 bg-white rounded-full">
            <Icon name="AlertTriangle" className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Система пуста
      </h3>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        Добавьте первое растение, чтобы начать мониторинг системы и получать данные 
        о росте растений и состоянии окружающей среды.
      </p>

      {onAddPlant && (
        <button
          onClick={onAddPlant}
          className="inline-flex items-center px-4 py-2 border border-transparent 
                   text-sm font-medium rounded-md shadow-sm text-white 
                   bg-indigo-600 hover:bg-indigo-700"
        >
          <Icon name="Plus" size="sm" className="mr-2" />
          Добавить растение
        </button>
      )}
    </div>
  );
}
```