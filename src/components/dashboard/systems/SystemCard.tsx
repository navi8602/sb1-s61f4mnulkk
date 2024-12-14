```tsx
import { useState } from 'react';
import { RentedSystem } from '../../../types/system';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Icon } from '../../icons';
import { calculateDaysRemaining } from '../../../utils/rental';
import { formatDate } from '../../../utils/date';

interface SystemCardProps {
  system: RentedSystem;
  onRemove?: () => void;
}

export function SystemCard({ system, onRemove }: SystemCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const daysRemaining = calculateDaysRemaining(system.endDate);
  const healthyPlants = system.plants.filter(p => p.status === 'healthy').length;

  const getStatusInfo = () => {
    if (daysRemaining < 7) {
      return {
        label: 'Скоро завершение',
        variant: 'warning' as const
      };
    }
    if (system.plants.some(p => p.status !== 'healthy')) {
      return {
        label: 'Требует внимания',
        variant: 'error' as const
      };
    }
    return {
      label: 'Активна',
      variant: 'success' as const
    };
  };

  const status = getStatusInfo();

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Icon name="Package" className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h3 className="font-medium">{system.name}</h3>
            <p className="text-sm text-gray-500">
              {system.plants.length} из {system.capacity} позиций занято
            </p>
          </div>
        </div>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Icon name="Calendar" size="sm" className="mr-2" />
          <span>
            {daysRemaining} {
              daysRemaining === 1 ? 'день' :
              daysRemaining < 5 ? 'дня' : 'дней'
            }
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Icon name="Sprout" size="sm" className="mr-2" />
          <span>{healthyPlants} здоровых растений</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Icon name="Thermometer" size="sm" className="mr-2" />
          <span>{system.metrics.temperature}°C</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Icon name="Droplets" size="sm" className="mr-2" />
          <span>{system.metrics.humidity}%</span>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">pH уровень</p>
              <p className="font-medium">{system.metrics.phLevel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Питательные в-ва</p>
              <p className="font-medium">{system.metrics.nutrientLevel}%</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Последнее обновление</p>
            <p className="font-medium">
              {formatDate(system.metrics.lastUpdated)}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 mt-4 border-t">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          {showDetails ? 'Скрыть детали' : 'Показать детали'}
        </button>
        {onRemove && (
          <button
            onClick={onRemove}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Удалить систему
          </button>
        )}
      </div>
    </Card>
  );
}
```