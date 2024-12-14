```tsx
import { Line } from 'react-chartjs-2';
import { SystemMetrics } from '../../../types/system';

interface MetricsChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  height?: number;
}

export function MetricsChart({ data, height = 300 }: MetricsChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div style={{ height }}>
      <Line data={data} options={options} />
    </div>
  );
}
```