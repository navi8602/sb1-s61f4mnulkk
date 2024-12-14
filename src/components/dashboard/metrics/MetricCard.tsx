```tsx
import { ReactNode } from 'react';
import { Icon } from '../../icons';
import type { IconName } from '../../icons/types';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: IconName;
  trend?: {
    value: number;
    label: string;
  };
  color: string;
  children?: ReactNode;
}

export function MetricCard({ 
  title, 
  value, 
  icon, 
  trend, 
  color,
  children 
}: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${color.replace('text', 'bg').replace('600', '100')}`}>
          <Icon name={icon} className={`h-6 w-6 ${color}`} />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${
            trend.value >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            <Icon 
              name={trend.value >= 0 ? 'TrendingUp' : 'TrendingDown'} 
              size="sm" 
              className="mr-1" 
            />
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="mt-2 text-3xl font-semibold">{value}</p>
        {trend && (
          <p className="mt-1 text-sm text-gray-500">{trend.label}</p>
        )}
      </div>

      {children && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
}
```