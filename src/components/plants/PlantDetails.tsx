import { PlantType } from '../../types/plants';
import { PLANTS } from '../../data/plants';

interface PlantDetailsProps {
  plant: PlantType;
}

export function PlantDetails({ plant }: PlantDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center">
          <span className="text-gray-500 mr-1">🌡️</span>
          <span>
            {plant.optimalTemp.min}-{plant.optimalTemp.max}°C
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-500 mr-1">💧</span>
          <span>
            {plant.optimalHumidity.min}-{plant.optimalHumidity.max}%
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-500 mr-1">🌱</span>
          <span>{plant.growthDays} дней до урожая</span>
        </div>
      </div>
      
      <div className="text-sm">
        <strong className="text-gray-700">Необходимые питательные вещества:</strong>
        <div className="flex flex-wrap gap-2 mt-1">
          {plant.nutrients.map((nutrient) => (
            <span
              key={nutrient}
              className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
            >
              {nutrient}
            </span>
          ))}
        </div>
      </div>

      {plant.companionPlants.length > 0 && (
        <div className="text-sm">
          <strong className="text-gray-700">Растения-компаньоны:</strong>
          <div className="flex flex-wrap gap-2 mt-1">
            {plant.companionPlants.map((id) => {
              const companion = PLANTS.find(p => p.id === id);
              return companion ? (
                <span
                  key={id}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                >
                  {companion.name}
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}

      {plant.incompatiblePlants.length > 0 && (
        <div className="text-sm">
          <strong className="text-gray-700">Несовместимые растения:</strong>
          <div className="flex flex-wrap gap-2 mt-1">
            {plant.incompatiblePlants.map((id) => {
              const incompatible = PLANTS.find(p => p.id === id);
              return incompatible ? (
                <span
                  key={id}
                  className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs"
                >
                  {incompatible.name}
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 text-sm text-gray-600">
        <span className="text-gray-500">ℹ️</span>
        <p>{plant.description}</p>
      </div>
    </div>
  );
}