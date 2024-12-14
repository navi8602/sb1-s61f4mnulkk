interface PlantFiltersProps {
  filters: {
    categories: string[];
    difficulty: ('easy' | 'medium' | 'hard')[];
    growthTime: {
      min: number;
      max: number;
    };
    searchQuery: string;
  };
  onFiltersChange: (filters: PlantFiltersProps['filters']) => void;
  categories: Record<string, string>;
}

export function PlantFilters({ 
  filters, 
  onFiltersChange,
  categories 
}: PlantFiltersProps) {
  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const toggleDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    const newDifficulty = filters.difficulty.includes(difficulty)
      ? filters.difficulty.filter(d => d !== difficulty)
      : [...filters.difficulty, difficulty];
    onFiltersChange({ ...filters, difficulty: newDifficulty });
  };

  const clearFilters = () => {
    onFiltersChange({
      categories: [],
      difficulty: [],
      growthTime: {
        min: 0,
        max: Math.max(...Object.values(categories).map(c => c.length))
      },
      searchQuery: ''
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || 
    filters.difficulty.length > 0 || 
    filters.searchQuery || 
    filters.growthTime.min > 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Фильтры</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-700 flex items-center"
            >
              ✕ Сбросить
            </button>
          )}
        </div>

        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 
                         text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Поиск растений..."
            value={filters.searchQuery}
            onChange={(e) => onFiltersChange({
              ...filters,
              searchQuery: e.target.value
            })}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Rest of the component remains the same, just replace Lucide icons with emojis */}
    </div>
  );
}