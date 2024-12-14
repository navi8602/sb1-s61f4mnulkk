```tsx
import { Plant } from '../../../types/system';
import { PLANTS } from '../../../data/plants';
import { calculateGrowthProgress } from '../../../utils/plants';
import { formatDate } from '../../../utils/date';
import { Icon } from '../../icons';
import { Badge } from '../../ui/Badge';

interface PlantCardProps {
  plant: Plant;
  onRemove?: () => void;
}

export function PlantCard({ plant, onRemove }: PlantCardProps) {
  const plantType = PLANTS.find(p => p.name === plant.name);
  if (!plantType) return null;

  const progress = calculateGrowthProgress(plant.plantedDate, plant.expectedHarvestDate);
  const isNearHarvest = progress >= 75;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          {plantType.imageUrl ? (
            <img 
              src={plantType.imageUrl} 
              alt={plant.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Icon name="Sprout" className="h-5 w-5 text-indigo-600" />
            </div>
          )}
          <div>
            <h4 className="font-medium">{plant.name}</h4>
            <p className="text-sm text-gray-500">Позиция {plant.position}</p>
          </div>
        </div>
        <Badge variant={plant.status === 'healthy' ? 'success' : 'warning'}>
          {plant.status === 'healthy' ? 'Здоровое' : 'Требует внимания'}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Прогресс роста</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              progress >= 90 ? 'bg-red-500' :
              progress >= 75 ? 'bg-yellow-500' :
              'bg-green-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="flex items-center text-sm text-gray-600">
          <Icon name="Calendar" size="sm" className="mr-2" />
          <span>Посажено: {formatDate(plant.plantedDate)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Icon name="Calendar" size="sm" className="mr-2" />
          <span>Сбор: {formatDate(plant.expectedHarvestDate)}</span>
        </div>
      </div>

      {isNearHarvest && (
        <div className="mt-3 flex items-start space-x-2 text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
          <Icon name="AlertTriangle" size="sm" className="mt-0.5" />
          <p>Приближается время сбора урожая</p>
        </div>
      )}

      {onRemove && (
        <div className="mt-3 pt-3 border-t">
          <button
            onClick={onRemove}
            className="flex items-center text-sm text-red-600 hover:text-red-700"
          >
            <Icon name="Trash2" size="sm" className="mr-1" />
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}
```