```tsx
import { useState } from 'react';
import { MetricsOverview } from './metrics/MetricsOverview';
import { SystemsOverview } from './systems/SystemsOverview';
import { DeleteSystemDialog } from './DeleteSystemDialog';
import { useNotifications } from '../../contexts/NotificationContext';
import type { RentedSystem } from '../../types/system';

interface DashboardPageProps {
  systems: RentedSystem[];
  onRemoveSystem: (systemId: string) => void;
}

export function DashboardPage({ 
  systems,
  onRemoveSystem 
}: DashboardPageProps) {
  const [systemToDelete, setSystemToDelete] = useState<RentedSystem | null>(null);
  const { addNotification } = useNotifications();

  const handleDeleteSystem = (systemId: string) => {
    const system = systems.find(s => s.id === systemId);
    if (system) {
      setSystemToDelete(system);
    }
  };

  const handleConfirmDelete = () => {
    if (systemToDelete) {
      onRemoveSystem(systemToDelete.id);
      addNotification({
        title: 'Система удалена',
        message: `Система ${systemToDelete.name} успешно удалена`,
        type: 'success'
      });
      setSystemToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Панель управления</h1>
        <p className="mt-1 text-sm text-gray-500">
          Обзор ваших гидропонных систем и их состояния
        </p>
      </div>

      <MetricsOverview systems={systems} />

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Ваши системы
        </h2>
        <SystemsOverview
          systems={systems}
          onRemoveSystem={handleDeleteSystem}
        />
      </div>

      {systemToDelete && (
        <DeleteSystemDialog
          isOpen={!!systemToDelete}
          onClose={() => setSystemToDelete(null)}
          onConfirm={handleConfirmDelete}
          system={systemToDelete}
        />
      )}
    </div>
  );
}
```