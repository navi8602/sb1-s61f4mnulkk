import { PlantType } from '../../types/plants';
import { Plant } from '../../types/system';

interface PlantMaintenanceScheduleProps {
  plant: Plant;
  plantType: PlantType;
}

export function PlantMaintenanceSchedule({ 
  plant, 
  plantType 
}: PlantMaintenanceScheduleProps) {
  if (!plantType.maintenanceSchedule) return null;

  const schedule = plantType.maintenanceSchedule;
  const now = new Date();
  const planted = new Date(plant.plantedDate);
  const daysSincePlanting = Math.floor(
    (now.getTime() - planted.getTime()) / (1000 * 60 * 60 * 24)
  );

  const getNextDate = (intervalDays: number) => {
    const daysUntilNext = intervalDays - (daysSincePlanting % intervalDays);
    const nextDate = new Date(now);
    nextDate.setDate(nextDate.getDate() + daysUntilNext);
    return nextDate.toLocaleDateString();
  };

  const tasks = [
    {
      icon: '💧',
      label: 'Следующий полив',
      date: getNextDate(schedule.watering),
      interval: `Каждые ${schedule.watering} дн.`
    },
    {
      icon: '🧪',
      label: 'Следующая подкормка',
      date: getNextDate(schedule.fertilizing),
      interval: `Каждые ${schedule.fertilizing} дн.`
    },
    ...(schedule.pruning ? [{
      icon: '✂️',
      label: 'Следующая обрезка',
      date: getNextDate(schedule.pruning),
      interval: `Каждые ${schedule.pruning} дн.`
    }] : [])
  ];

  return (
    <div className="space-y-4">
      <h4 className="font-medium">График обслуживания</h4>
      <div className="grid gap-3">
        {tasks.map(({ icon, label, date, interval }) => (
          <div
            key={label}
            className="flex items-center justify-between p-3 
                     bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded-lg">
                <span className="text-xl">{icon}</span>
              </div>
              <div>
                <p className="font-medium text-sm">{label}</p>
                <p className="text-xs text-gray-500">{interval}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">📅 {date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}