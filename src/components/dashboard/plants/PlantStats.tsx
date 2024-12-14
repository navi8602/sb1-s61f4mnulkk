```tsx
import { Plant } from '../../../types/system';
import { Icon } from '../../icons';

interface PlantStatsProps {
  plants: Plant[];
}

export function PlantStats({ plants }: PlantStatsProps) {
  const totalPlants = plants.length;
  const healthyPlants = plants.filter(p => p.status === 'healthy').length;
  const warningPlants = plants.filter(p => p.status === 'warning').length;
  const criticalPlants = plants.filter(p => p.status === 'critical').length;

  const stats = [
    {
      label: 'Здоровые растения',
      value: healthyPlants,
      icon: 'CheckCircle',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Требуют внимания',
      value: warningPlants,
      icon: 'AlertTriangle',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      label: 'Критическое состояние',
      value: criticalPlants,
      icon: 'AlertOctagon',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map(stat => (
        <div
          key={stat.label}
          className="bg-white p-4 rounded-lg border border-gray-200"
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <Icon name={stat.icon} className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <div className="flex items-baseline space-x-2">
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="text-sm text-gray-500">
                  из {totalPlants}
                </p>
              </div>
              {totalPlants > 0 && (
                <div className="mt-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${stat.color.replace('text', 'bg')}`}
                    style={{ width: `${(stat.value / totalPlants) * 100}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```