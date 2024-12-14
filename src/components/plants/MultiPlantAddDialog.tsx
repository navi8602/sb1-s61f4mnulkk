import { useState } from 'react';
import { Dialog } from '../ui/Dialog';
import { Plant } from '../../types/system';
import { PlantType } from '../../types/plants';
import { PLANTS } from '../../data/plants';
import { PlantCategorySelector } from './PlantCategorySelector';
import { PlantCard } from './PlantCard';
import { 
  checkPlantCompatibility, 
  getCurrentPlantQuantity,
  getPlantQuantityLimit,
  checkSpaceRequirements,
  calculateTotalSpaceRequired,
  validatePlantCombination
} from '../../utils/plantCompatibility';
import { getAvailablePositions } from '../../utils/plants';

interface MultiPlantAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (plants: Omit<Plant, 'id' | 'status'>[]) => void;
  occupiedPositions: number[];
  capacity: number;
  currentPlants: Plant[];
}

interface PlantEntry {
  plantId: string;
  quantity: number;
  notes?: string;
}

export function MultiPlantAddDialog({
  isOpen,
  onClose,
  onAdd,
  occupiedPositions,
  capacity,
  currentPlants
}: MultiPlantAddDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [entries, setEntries] = useState<PlantEntry[]>([{
    plantId: '',
    quantity: 1
  }]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const remainingSpace = capacity - occupiedPositions.length;
  const totalSpaceRequired = calculateTotalSpaceRequired(entries);

  const filteredPlants = PLANTS.filter(plant => {
    const matchesCategory = !selectedCategory || plant.category === selectedCategory;
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addEntry = () => {
    setEntries([...entries, { plantId: '', quantity: 1 }]);
  };

  const removeEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
    validateEntries(newEntries);
  };

  const updateEntry = (index: number, field: keyof PlantEntry, value: any) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
    validateEntries(newEntries);
  };

  const validateEntries = (currentEntries: PlantEntry[]) => {
    const { isValid, errors } = validatePlantCombination(currentEntries);
    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateEntries(entries)) return;

    const plantsToAdd = entries.flatMap(entry => {
      const plant = PLANTS.find(p => p.id === entry.plantId);
      if (!plant) return [];

      return Array(entry.quantity).fill(null).map(() => ({
        name: plant.name,
        position: 0,
        plantedDate: new Date().toISOString(),
        expectedHarvestDate: new Date(
          Date.now() + plant.growthDays * 24 * 60 * 60 * 1000
        ).toISOString(),
        notes: entry.notes
      }));
    });

    onAdd(plantsToAdd);
    onClose();
  };

  return (
    <Dialog 
      isOpen={isOpen} 
      onClose={onClose}
      title="Добавление растений"
    >
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Доступное место:</span>
            <span className="font-medium">{remainingSpace} позиций</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Требуется места:</span>
            <span className={`font-medium ${
              totalSpaceRequired > remainingSpace ? 'text-red-600' : ''
            }`}>
              {totalSpaceRequired} позиций
            </span>
          </div>
        </div>

        {validationErrors.length > 0 && (
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-start space-x-2">
              <span className="text-red-600">⚠️</span>
              <div>
                <h4 className="font-medium text-red-800">Обнаружены проблемы:</h4>
                <ul className="mt-1 text-sm text-red-700 space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {entries.map((entry, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Растение {index + 1}</h4>
                {index > 0 && (
                  <button
                    onClick={() => removeEntry(index)}
                    className="text-red-600 hover:text-red-700 px-2 py-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Тип растения
                  </label>
                  <select
                    value={entry.plantId}
                    onChange={(e) => updateEntry(index, 'plantId', e.target.value)}
                    className="w-full rounded-md border-gray-300"
                  >
                    <option value="">Выберите растение</option>
                    {filteredPlants.map(plant => {
                      const isCompatible = checkPlantCompatibility(currentPlants, plant.id);
                      const currentQuantity = getCurrentPlantQuantity(plant.id, currentPlants);
                      const hasSpace = checkSpaceRequirements(plant.id, remainingSpace);
                      const canAdd = isCompatible && hasSpace && 
                        getPlantQuantityLimit(plant.id, currentQuantity);

                      return (
                        <option
                          key={plant.id}
                          value={plant.id}
                          disabled={!canAdd}
                        >
                          {plant.name} {!canAdd && '(недоступно)'}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {entry.plantId && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Количество
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={entry.quantity}
                        onChange={(e) => updateEntry(index, 'quantity', parseInt(e.target.value))}
                        className="w-full rounded-md border-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Заметки
                      </label>
                      <input
                        type="text"
                        value={entry.notes || ''}
                        onChange={(e) => updateEntry(index, 'notes', e.target.value)}
                        className="w-full rounded-md border-gray-300"
                        placeholder="Необязательно"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addEntry}
          className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
        >
          + Добавить еще растение
        </button>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white 
                     border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            disabled={validationErrors.length > 0 || entries.some(e => !e.plantId)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 
                     border border-transparent rounded-md hover:bg-indigo-700
                     disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Добавить растения
          </button>
        </div>
      </div>
    </Dialog>
  );
}