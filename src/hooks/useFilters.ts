import { useState, useMemo } from 'react';
import { Exercise, FilterState } from '../types';

const initialFilters: FilterState = {
  goal: [],
  equipment: [],
  bodyPart: [],
  bodyArea: [],
  location: [],
  difficulty: [],
  special: [],
  search: '',
};

export function useFilters(exercises: Exercise[]) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const toggleFilter = <K extends keyof Omit<FilterState, 'search' | 'difficulty'>>(
    category: K,
    value: FilterState[K][number]
  ) => {
    setFilters(prev => {
      const current = prev[category] as string[];
      const val = value as string;
      const updated = current.includes(val)
        ? current.filter(v => v !== val)
        : [...current, val];
      return { ...prev, [category]: updated };
    });
  };

  const toggleDifficulty = (value: string) => {
    setFilters(prev => {
      const current = prev.difficulty;
      const updated = current.includes(value as any)
        ? current.filter(v => v !== value)
        : [...current, value as any];
      return { ...prev, difficulty: updated };
    });
  };

  const setSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const clearFilters = () => setFilters(initialFilters);

  const filtered = useMemo(() => {
    return exercises.filter(ex => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!ex.title.toLowerCase().includes(q) && !ex.shortDescription.toLowerCase().includes(q)) {
          return false;
        }
      }
      if (filters.goal.length && !filters.goal.some(g => ex.tags.goal.includes(g))) return false;
      if (filters.equipment.length && !filters.equipment.some(e => ex.tags.equipment.includes(e))) return false;
      if (filters.bodyPart.length && !filters.bodyPart.some(b => ex.tags.bodyPart.includes(b))) return false;
      if (filters.bodyArea.length && !filters.bodyArea.some(a => ex.tags.bodyArea.includes(a))) return false;
      if (filters.location.length && !filters.location.some(l => ex.tags.location.includes(l))) return false;
      if (filters.difficulty.length && !filters.difficulty.includes(ex.tags.difficulty)) return false;
      if (filters.special.length && !filters.special.some(s => ex.tags.special.includes(s))) return false;
      return true;
    });
  }, [exercises, filters]);

  const hasActiveFilters = Object.entries(filters).some(([key, val]) => {
    if (key === 'search') return val !== '';
    return (val as string[]).length > 0;
  });

  return { filters, filtered, toggleFilter, toggleDifficulty, setSearch, clearFilters, hasActiveFilters };
}
