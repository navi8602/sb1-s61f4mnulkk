```tsx
import { RentedSystem } from '../../../types/system';
import { MetricsGrid } from './MetricsGrid';
import { MetricsChart } from './MetricsChart';
import { Card } from '../../ui/Card';
import { generateMetricsData } from '../../../utils/mockDataGenerator';

interface MetricsOverviewProps {
  systems: RentedSystem[];
}

export function MetricsOverview({ systems }: MetricsOverviewProps) {
  const metricsData = generateMetricsData();

  return (
    <div className="space-y-6">
      <MetricsGrid systems={systems} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-medium mb-4">Температура и влажность</h3>
          <MetricsChart
            data={{
              labels: metricsData.labels,
              datasets: [
                {
                  label: 'Температура (°C)',
                  data: metricsData.temperature,
                  borderColor: 'rgb(239, 68, 68)',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)'
                },
                {
                  label: 'Влажность (%)',
                  data: metricsData.humidity,
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)'
                }
              ]
            }}
          />
        </Card>

        <Card>
          <h3 className="text-lg font-medium mb-4">Питательные вещества и pH</h3>
          <MetricsChart
            data={{
              labels: metricsData.labels,
              datasets: [
                {
                  label: 'Питательные в-ва (%)',
                  data: metricsData.nutrients,
                  borderColor: 'rgb(16, 185, 129)',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)'
                },
                {
                  label: 'pH',
                  data: metricsData.ph,
                  borderColor: 'rgb(139, 92, 246)',
                  backgroundColor: 'rgba(139, 92, 246, 0.1)'
                }
              ]
            }}
          />
        </Card>
      </div>
    </div>
  );
}
```