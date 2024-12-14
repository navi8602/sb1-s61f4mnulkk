```tsx
import { RentedSystem } from '../../../types/system';
import { SystemCard } from './SystemCard';
import { EmptyOverviewState } from '../EmptyOverviewState';

interface SystemsOverviewProps {
  systems: RentedSystem[];
  onRemoveSystem?: (systemId: string) => void;
}

export function SystemsOverview({ 
  systems,
  onRemoveSystem 
}: SystemsOverviewProps) {
  if (systems.length === 0) {
    return <EmptyOverviewState />;
  }

  // Сортируем системы: сначала те, что требуют внимания
  const sortedSystems = [...systems].sort((a, b) => {
    const aWarnings = a.plants.filter(p => p.status !== 'healthy').length;
    const bWarnings = b.plants.filter(p => p.status !== 'healthy').length;
    return bWarnings - aWarnings;
  });

  return (
    <div className="space-y-6">
      {sortedSystems.map(system => (
        <SystemCard
          key={system.id}
          system={system}
          onRemove={onRemoveSystem ? () => onRemoveSystem(system.id) : undefined}
        />
      ))}
    </div>
  );
}
```