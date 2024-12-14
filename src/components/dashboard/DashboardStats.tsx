interface DashboardStat {
  name: string;
  value: number;
  total?: number;
  color: string;
  bgColor: string;
}

interface DashboardStatsProps {
  stats: DashboardStat[];
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="hover:border-gray-300 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.name}</p>
              {stat.total && (
                <div className="flex items-baseline space-x-2">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-gray-500">
                    из {stat.total}
                  </p>
                </div>
              )}
              {stat.total && (
                <div className="mt-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${stat.color.replace('text', 'bg')}`}
                    style={{ width: `${(stat.value / stat.total) * 100}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}