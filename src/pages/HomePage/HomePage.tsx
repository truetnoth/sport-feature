import { Exercise } from '../../types';
import { useFilters } from '../../hooks/useFilters';
import { useFavorites } from '../../hooks/useFavorites';
import { usePlaylists } from '../../hooks/usePlaylists';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterBar from '../../components/FilterBar/FilterBar';
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard';
import styles from './HomePage.module.css';

interface Props {
  exercises: Exercise[];
  favoritesHook: ReturnType<typeof useFavorites>;
  playlistsHook: ReturnType<typeof usePlaylists>;
}

export default function HomePage({ exercises, favoritesHook, playlistsHook }: Props) {
  const { filters, filtered, toggleFilter, toggleDifficulty, setSearch, clearFilters, hasActiveFilters } = useFilters(exercises);

  return (
    <div className={styles.root}>
      <div className={styles.pageHeader}>
        <h1 className={styles.heading}>Навигатор упражнений</h1>
        <p className={styles.subheading}>Более {exercises.length} упражнений из редакции Т—Ж Спорт</p>
      </div>
      <SearchBar value={filters.search} onChange={setSearch} />
      <FilterBar
        filters={filters}
        onToggle={(cat, val) => toggleFilter(cat, val as never)}
        onToggleDifficulty={toggleDifficulty}
        onClear={clearFilters}
        hasActive={hasActiveFilters}
      />
      <div className={styles.resultsHeader}>
        <span className={styles.count}>Нашли {filtered.length} упражнений</span>
        {hasActiveFilters && (
          <button className={styles.resetBtn} onClick={clearFilters}>Сбросить</button>
        )}
      </div>
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>Ничего не найдено. Попробуйте изменить фильтры.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(ex => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              isFavorite={favoritesHook.isFavorite(ex.id)}
              onToggleFavorite={favoritesHook.toggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
