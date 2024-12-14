import { HydroponicSystem } from '../../types/system';

interface SystemCardProps {
  system: HydroponicSystem;
  onSelect?: () => void;
}

export function SystemCard({ system, onSelect }: SystemCardProps) {
  return (
    <div 
      className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg 
                 transition-shadow cursor-pointer border border-gray-200"
      onClick={onSelect}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{system.name}</h3>
            <p className="text-sm text-gray-500">{system.model}</p>
          </div>
          <span className="text-lg font-bold text-indigo-600">
            {system.monthlyPrice} ₽/мес
          </span>
        </div>

        <p className="text-gray-600 mb-6">{system.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">📦</span>
            <span className="text-sm text-gray-600">
              {system.capacity} позиций
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">📏</span>
            <span className="text-sm text-gray-600">
              {system.dimensions.width}×{system.dimensions.depth} см
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">⚡</span>
            <span className="text-sm text-gray-600">
              {system.specifications.powerConsumption}W
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">💧</span>
            <span className="text-sm text-gray-600">
              {system.specifications.waterCapacity}L
            </span>
          </div>
        </div>

        {/* Rest of the component remains the same, just using emoji icons */}
      </div>
    </div>
  );
}