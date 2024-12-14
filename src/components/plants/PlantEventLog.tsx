interface PlantEvent {
  id: string;
  plantId: string;
  type: 'watering' | 'harvesting' | 'pruning' | 'fertilizing' | 'issue' | 'note';
  timestamp: string;
  description: string;
}

interface PlantEventLogProps {
  events: PlantEvent[];
  onAddEvent: (event: Omit<PlantEvent, 'id'>) => void;
}

const EVENT_ICONS = {
  watering: '💧',
  harvesting: '🌾',
  pruning: '✂️',
  fertilizing: '🧪',
  issue: '⚠️',
  note: '📝'
} as const;

const EVENT_LABELS = {
  watering: 'Полив',
  harvesting: 'Сбор урожая',
  pruning: 'Обрезка',
  fertilizing: 'Подкормка',
  issue: 'Проблема',
  note: 'Заметка'
} as const;

export function PlantEventLog({ events, onAddEvent }: PlantEventLogProps) {
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    type: 'note' as PlantEvent['type'],
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvent({
      ...newEvent,
      plantId: events[0]?.plantId || '',
      timestamp: new Date().toISOString()
    });
    setIsAddingEvent(false);
    setNewEvent({ type: 'note', description: '' });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">История событий</h3>
        <button
          onClick={() => setIsAddingEvent(!isAddingEvent)}
          className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
        >
          + Добавить событие
        </button>
      </div>

      {/* Rest of the component remains the same, just using emoji icons */}
    </div>
  );
}