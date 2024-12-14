import { useSettings } from '../../hooks/useSettings';
import { Card } from '../ui/Card';
import { SettingsTabs } from './SettingsTabs';

export function SystemSettings() {
  const { settings, updateSetting } = useSettings();

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-xl">⚙️</span>
        <h2 className="text-xl font-semibold">Настройки системы</h2>
      </div>

      <SettingsTabs
        settings={settings}
        onUpdate={updateSetting}
      />
    </Card>
  );
}