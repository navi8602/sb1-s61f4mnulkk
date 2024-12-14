```tsx
import { Plant } from '../../../types/system';
import { PlantCard } from './PlantCard';
import { EmptyPlantState } from './EmptyPlantState';
import { Icon } from '../../icons';

interface PlantListProps {
  plants: Plant[];
  capacity: number;
  onAddPlant?: () => void;
  onRemovePlant?: (plantId: string) => void;
}

export function PlantList({
  plants,
  capacity,
  onAddPlant,
  onRemovePlant
}: PlantListProps) {
  const emptySlots = capacity - plants.length;

  if (plants.length === 0) {
    return <EmptyPlantState onAddPlant={onAddPlant} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Растения в системе</h3>
          <p className="text-sm text-gray-500">
            Занято позиций: {plants.length} из {capacity}
          </p>
        </div>
        {emptySlots > 0 && onAddPlant && (
          <button
            onClick={onAddPlant}
            className="flex items-center px-3 py-1.5 text-sm font-medium 
                     text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            <Icon name="Plus" size="sm" className="mr-1" />
            Добавить растение
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plants.map(plant => (
          <PlantCard
            key={plant.id}
            plant={plant}
            onRemove={onRemovePlant ? () => onRemovePlant(plant.id) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
```