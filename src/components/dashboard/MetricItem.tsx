```tsx
import { LucideIcon } from 'lucide-react';
import { getMetricStatusColor, formatMetricValue } from '../../utils/metrics';
import { SYSTEM_THRESHOLDS } from '../../utils/constants';

interface MetricItemProps {
  icon: LucideIcon;
  label: string;
  value: number;
  metricKey: keyof typeof SYSTEM_THRESHOLDS;
  trend?: {
    value: number;
    label: string;
  };
}

export function MetricItem({ 
  icon: Icon, 
  label, 
  value, 
  metricKey,
  trend 
}: MetricItemProps) {
  const statusColor = getMetricStatusColor(value, SYSTEM_THRESHOLDS[metricKey]);
  const formattedValue = formatMetricValue(value, metricKey);
  const threshold = SYSTEM_THRESHOLDS[metricKey];

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${statusColor.replace('text', 'bg').replace('600', '100')}`}>
          <Icon className={`h-5 w-5 ${statusColor}`} />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="font-medium">{formattedValue}</p>
          <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${statusColor.replace('text', 'bg')}`}
              style={{
                width: `${Math.min(100, (value / threshold.max) * 100)}%`,
              }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Диапазон: {threshold.min}{threshold.unit} - {threshold.max}{threshold.unit}
          </p>
        </div>
      </div>

      {trend && (
        <div className={`text-sm ${
          trend.value >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          <div className="flex items-center">
            {trend.value >= 0 ? '↑' : '↓'}
            <span className="ml-1">{Math.abs(trend.value)}%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{trend.label}</p>
        </div>
      )}
    </div>
  );
}
```