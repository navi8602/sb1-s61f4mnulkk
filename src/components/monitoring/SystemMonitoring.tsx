import { useState } from 'react';
import { RentedSystem } from '../../types/system';
import { EmptySystemState } from './EmptySystemState';
import { useNotifications } from '../../contexts/NotificationContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { EnvironmentMonitor } from './EnvironmentMonitor';
import { AlertsList } from './AlertsList';
import { MaintenanceSchedule } from './MaintenanceSchedule';
import { GrowthPhaseTimeline } from './GrowthPhaseTimeline';
import { SystemAnalytics } from '../dashboard/SystemAnalytics';
import { Icon } from '../icons';
import { 
  generateEnvironmentData, 
  generateAlerts,
  generateMaintenanceTasks,
  generateGrowthPhases,
  generateAnalyticsData
} from '../../utils/mockDataGenerator';

interface SystemMonitoringProps {
  system: RentedSystem;
}

export function SystemMonitoring({ system }: SystemMonitoringProps) {
  const [isActive, setIsActive] = useState(system.plants.length > 0);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const { addNotification } = useNotifications();

  const handleActivateSystem = () => {
    if (system.plants.length === 0) {
      addNotification({
        title: 'Cannot Activate System',
        message: 'Add at least one plant to activate the system',
        type: 'warning',
        systemId: system.id
      });
      return;
    }

    setIsActive(true);
    addNotification({
      title: 'System Activated',
      message: 'System has been successfully activated',
      type: 'success',
      systemId: system.id
    });
  };

  if (!isActive || system.plants.length === 0) {
    return <EmptySystemState onActivate={handleActivateSystem} />;
  }

  const hours = timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720;
  const environmentData = generateEnvironmentData(hours);
  const alerts = generateAlerts(system.id);
  const maintenanceTasks = generateMaintenanceTasks(system.id);
  const analyticsData = generateAnalyticsData();
  const growthPhases = system.plants[0] 
    ? generateGrowthPhases(system.plants[0])
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="Activity" size="lg" className="text-indigo-600" />
        <h2 className="text-xl font-semibold">System Monitoring</h2>
      </div>

      <Tabs defaultValue="environment">
        <TabsList>
          <TabsTrigger value="environment">
            <Icon name="Leaf" size="sm" className="mr-2" />
            Environment
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <Icon name="AlertTriangle" size="sm" className="mr-2" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="maintenance">
            <Icon name="Settings" size="sm" className="mr-2" />
            Maintenance
          </TabsTrigger>
          <TabsTrigger value="growth">
            <Icon name="Sprout" size="sm" className="mr-2" />
            Growth
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <Icon name="Activity" size="sm" className="mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="environment">
            <EnvironmentMonitor
              data={environmentData}
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
            />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsList
              alerts={alerts}
              onResolveAlert={(alertId) => {
                addNotification({
                  title: 'Alert Resolved',
                  message: 'The alert has been marked as resolved',
                  type: 'success',
                  systemId: system.id
                });
              }}
            />
          </TabsContent>

          <TabsContent value="maintenance">
            <MaintenanceSchedule
              tasks={maintenanceTasks}
              onCompleteTask={(taskId) => {
                addNotification({
                  title: 'Task Completed',
                  message: 'Maintenance task marked as complete',
                  type: 'success',
                  systemId: system.id
                });
              }}
            />
          </TabsContent>

          <TabsContent value="growth">
            {system.plants[0] ? (
              <GrowthPhaseTimeline
                plant={system.plants[0]}
                phases={growthPhases}
              />
            ) : (
              <div className="text-center py-12">
                <Icon name="Plant" size="lg" className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">
                  Add plants to track their growth
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics">
            <SystemAnalytics
              data={analyticsData}
              predictions={{
                nextHarvest: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
                expectedYield: 2.5,
                potentialIssues: [
                  'Possible humidity drop in coming days',
                  'pH levels need attention'
                ]
              }}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}