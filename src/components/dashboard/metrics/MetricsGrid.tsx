```tsx
import { MetricCard } from './MetricCard';
import { RentedSystem } from '../../../types/system';

interface MetricsGridProps {
  systems: RentedSystem[];
}

export function MetricsGrid({ systems }: MetricsGridProps) {
  const totalPlants = systems.reduce((sum, s) => sum + s.plants.length, 0);
  const totalCapacity = systems.reduce((sum, s) => sum + s.capacity, 0);
  const healthyPlants = systems.reduce(
    (sum, s) => sum + s.plants.filter(p => p.status === 'healthy').length, 
    0
  );
  const warningPlants = systems.reduce(
    (sum, s) => sum + s.plants.filter(p => p.status === 'warning').length, 
    0
  );

  const metrics = [
    {
      title: 'Активные системы',
      value: systems.length,
      icon: 'Package' as const,
      color: 'text-blue-600',
      trend: {
        value: 10,
        label: 'По сравнению с прошлым месяцем'
      }
    },
    {
      title: 'Занятость систем',
      value: `${totalPlants}/${totalCapacity}`,
      icon: 'Sprout' as const,
      color: 'text-green-600',
      trend: {
        value: (totalPlants / totalCapacity) * 100,
        label: 'Общая загруженность'
      }
    },
    {
      title: 'Здоровые растения',
      value: healthyPlants,
      icon: 'CheckCircle' as const,
      color: 'text-emerald-600',
      trend: {
        value: (healthyPlants / totalPlants) * 100,
        label: 'От общего количества'
      }
    },
    {
      title: 'Требуют внимания',
      value: warningPlants,
      icon: 'AlertTriangle' as const,
      color: 'text-yellow-600',
      trend: {
        value: -((warningPlants / totalPlants) * 100),
        label: 'Растения с проблемами'
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}
```