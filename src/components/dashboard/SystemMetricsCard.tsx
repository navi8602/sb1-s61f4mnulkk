```tsx
import { SystemMetrics } from '../../types/system';
import { MetricItem } from './MetricItem';
import { Thermometer, Droplets, Beaker, Activity } from 'lucide-react';
import { formatDateTime } from '../../utils/date';

interface SystemMetricsCardProps {
  metrics: SystemMetrics;
  trends?: {
    temperature?: { value: number; label: string };
    humidity?: { value: number; label: string };
    nutrientLevel?: { value: number; label: string };
    phLevel?: { value: number; label: string };
  };
}

export function SystemMetricsCard({ metrics, trends }: SystemMetricsCardProps) {
  const metricItems = [
    {
      icon: Thermometer,
      label: "Температура",
      value: metrics.temperature,
      metricKey: "temperature" as const,
      trend: trends?.temperature
    },
    {
      icon: Droplets,
      label: "Влажность",
      value: metrics.humidity,
      metricKey: "humidity" as const,
      trend: trends?.humidity
    },
    {
      icon: Beaker,
      label: "Питательные в-ва",
      value: metrics.nutrientLevel,
      metricKey: "nutrientLevel" as const,
      trend: trends?.nutrientLevel
    },
    {
      icon: Activity,
      label: "pH",
      value: metrics.phLevel,
      metricKey: "phLevel" as const,
      trend: trends?.phLevel
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Показатели системы</h3>
        <p className="text-sm text-gray-500">
          Обновлено: {formatDateTime(metrics.lastUpdated)}
        </p>
      </div>

      <div className="grid gap-4">
        {metricItems.map(item => (
          <MetricItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}
```