import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { RentedSystem } from '../../types/system';
import { GrowthRecord } from '../../types/user';

interface GrowthAnalyticsProps {
  systems: RentedSystem[];
}

// Моковые данные для аналитики
const mockGrowthRecords: GrowthRecord[] = [
  {
    systemId: '1',
    plantName: 'Базилик',
    plantedDate: '2024-01-01',
    harvestedDate: '2024-02-01',
    success: true,
    yield: 0.5,
    issues: []
  },
  {
    systemId: '1',
    plantName: 'Салат',
    plantedDate: '2024-02-01',
    harvestedDate: '2024-03-15',
    success: false,
    yield: 0.2,
    issues: ['Недостаточная влажность']
  }
];

export function GrowthAnalytics({ systems }: GrowthAnalyticsProps) {
  const [timeRange, setTimeRange] = useState('3months');
  const [selectedSystem, setSelectedSystem] = useState<string | 'all'>('all');

  // Подготовка данных для графика
  const chartData = {
    labels: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь'],
    datasets: [
      {
        label: 'Успешные урожаи',
        data: [4, 3, 5, 4, 6, 5],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)'
      },
      {
        label: 'Неудачные урожаи',
        data: [1, 2, 1, 0, 1, 0],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Расчет статистики
  const totalHarvests = mockGrowthRecords.length;
  const successfulHarvests = mockGrowthRecords.filter(r => r.success).length;
  const successRate = (successfulHarvests / totalHarvests) * 100;
  const totalYield = mockGrowthRecords.reduce((sum, r) => sum + r.yield, 0);

  const stats = [
    {
      icon: '🌱',
      label: 'Всего урожаев',
      value: totalHarvests,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: '📈',
      label: 'Успешность',
      value: `${successRate.toFixed(1)}%`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: '⚠️',
      label: 'Проблемы',
      value: mockGrowthRecords.filter(r => r.issues.length > 0).length,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: '✅',
      label: 'Общий урожай',
      value: `${totalYield.toFixed(1)} кг`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <span className="text-xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-medium mb-4">Динамика урожайности</h4>
        <div className="h-[400px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Growth Records */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium">История урожаев</h4>
        <div className="space-y-3">
          {mockGrowthRecords.map((record, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    record.success ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <span className="text-xl">
                      {record.success ? '✅' : '⚠️'}
                    </span>
                  </div>
                  <div>
                    <h5 className="font-medium">{record.plantName}</h5>
                    <p className="text-sm text-gray-500">
                      Урожай: {record.yield} кг
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span>📅 {new Date(record.harvestedDate).toLocaleDateString()}</span>
                </div>
              </div>

              {record.issues.length > 0 && (
                <div className="mt-2 p-2 bg-red-50 rounded text-sm text-red-700">
                  <p className="font-medium">Проблемы:</p>
                  <ul className="list-disc list-inside">
                    {record.issues.map((issue, i) => (
                      <li key={i}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}