import { useState } from 'react';
import { NotificationSettings } from './NotificationSettings';
import { PowerSettings } from './PowerSettings';
import { MaintenanceSettings } from './MaintenanceSettings';
import type { SystemSettings, SettingsKey } from '../../types/settings';

interface SettingsTabsProps {
  settings: SystemSettings;
  onUpdate: <K extends SettingsKey>(key: K, value: SystemSettings[K]) => void;
}

const tabs = [
  { id: 'notifications', label: 'Уведомления', icon: '🔔' },
  { id: 'power', label: 'Энергопотребление', icon: '⚡' },
  { id: 'maintenance', label: 'Обслуживание', icon: '🔧' }
] as const;

export function SettingsTabs({ settings, onUpdate }: SettingsTabsProps) {
  const [activeTab, setActiveTab] = useState<SettingsKey>('notifications');

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4">
          {tabs.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
                flex items-center space-x-2 py-2 px-3 border-b-2 text-sm font-medium
                ${activeTab === id 
                  ? 'border-indigo-500 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'notifications' && (
          <NotificationSettings
            settings={settings.notifications}
            onUpdate={(value) => onUpdate('notifications', value)}
          />
        )}
        {activeTab === 'power' && (
          <PowerSettings
            settings={settings.power}
            onUpdate={(value) => onUpdate('power', value)}
          />
        )}
        {activeTab === 'maintenance' && (
          <MaintenanceSettings
            settings={settings.maintenance}
            onUpdate={(value) => onUpdate('maintenance', value)}
          />
        )}
      </div>
    </div>
  );
}