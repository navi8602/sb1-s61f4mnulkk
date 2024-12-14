import { PlantStats } from '../../types/plants';
import { Plant } from '../../types/system';

interface PlantStatisticsProps {
  plant: Plant;
  stats: PlantStats;
}

export function PlantStatistics({ plant, stats }: PlantStatisticsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-indigo-600">📈</span>
            <div>
              <p className="text-sm text-gray-500">Всего урожаев</p>
              <p className="text-lg font-semibold">{stats.totalHarvests}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-indigo-600">📅</span>
            <div>
              <p className="text-sm text-gray-500">Последний урожай</p>
              <p className="text-lg font-semibold">
                {stats.lastHarvestDate 
                  ? new Date(stats.lastHarvestDate).toLocaleDateString()
                  : 'Нет данных'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-indigo-600">⏱️</span>
            <div>
              <p className="text-sm text-gray-500">Среднее время роста</p>
              <p className="text-lg font-semibold">
                {stats.averageGrowthTime} дней
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-green-600">✅</span>
            <div>
              <p className="text-sm text-gray-500">Успешность</p>
              <p className="text-lg font-semibold">
                {Math.round(stats.successRate * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {stats.issues > 0 && (
        <div className="flex items-center space-x-2 text-sm text-yellow-700 
                      bg-yellow-50 p-3 rounded-lg">
          <span className="text-yellow-600">⚠️</span>
          <p>
            Зафиксировано проблем: <strong>{stats.issues}</strong>
            {stats.issues > 2 && 
              '. Рекомендуется проверить условия выращивания.'}
          </p>
        </div>
      )}
    </div>
  );
}