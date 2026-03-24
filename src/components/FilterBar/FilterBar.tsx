import { FilterState } from '../../types';
import filtersConfig from '../../data/filters.json';
import styles from './FilterBar.module.css';

interface Props {
  filters: FilterState;
  onToggle: (category: keyof Omit<FilterState, 'search' | 'difficulty'>, value: string) => void;
  onToggleDifficulty: (value: string) => void;
  onClear: () => void;
  hasActive: boolean;
}

type FilterCategory = {
  key: keyof FilterState;
  label: string;
  options: { value: string; label: string }[];
};

const categories: FilterCategory[] = [
  { key: 'goal', label: 'Цель', options: filtersConfig.goal },
  { key: 'difficulty', label: 'Сложность', options: filtersConfig.difficulty },
  { key: 'equipment', label: 'Оборудование', options: filtersConfig.equipment },
  { key: 'bodyPart', label: 'Область тела', options: filtersConfig.bodyPart },
  { key: 'bodyArea', label: 'Мышцы', options: filtersConfig.bodyArea },
  { key: 'special', label: 'Особые состояния', options: filtersConfig.special },
];

export default function FilterBar({ filters, onToggle, onToggleDifficulty, onClear, hasActive }: Props) {
  const isActive = (key: keyof FilterState, value: string): boolean => {
    const arr = filters[key];
    if (Array.isArray(arr)) return (arr as string[]).includes(value);
    return false;
  };

  const handleToggle = (key: keyof FilterState, value: string) => {
    if (key === 'difficulty') {
      onToggleDifficulty(value);
    } else if (key !== 'search') {
      onToggle(key as keyof Omit<FilterState, 'search' | 'difficulty'>, value);
    }
  };

  return (
    <div className={styles.root}>
      {categories.map(cat => (
        <div key={cat.key} className={styles.group}>
          <span className={styles.groupLabel}>{cat.label}:</span>
          <div className={styles.chips}>
            {cat.options.map(opt => (
              <button
                key={opt.value}
                className={`${styles.chip} ${isActive(cat.key, opt.value) ? styles.chipActive : ''}`}
                onClick={() => handleToggle(cat.key, opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ))}
      {hasActive && (
        <button className={styles.clearBtn} onClick={onClear}>
          Сбросить все фильтры
        </button>
      )}
    </div>
  );
}
