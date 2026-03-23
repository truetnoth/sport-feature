import { Link } from 'react-router-dom';
import { Exercise } from '../../types';
import styles from './ExerciseCard.module.css';
import filtersConfig from '../../data/filters.json';

interface Props {
  exercise: Exercise;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const difficultyLabel: Record<string, string> = {
  beginner: 'Начинающий',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
};

const difficultyColor: Record<string, string> = {
  beginner: '#4CAF50',
  intermediate: '#FF9800',
  advanced: '#F44336',
};

function getLabel(config: { value: string; label: string }[], value: string) {
  return config.find(c => c.value === value)?.label ?? value;
}

export default function ExerciseCard({ exercise, isFavorite, onToggleFavorite }: Props) {
  return (
    <div className={styles.card}>
      <Link to={`/exercise/${exercise.slug}`} className={styles.imageLink}>
        <div className={styles.imagePlaceholder}>
          <span className={styles.imagePlaceholderText}>{exercise.title}</span>
        </div>
      </Link>
      <div className={styles.body}>
        <div className={styles.tags}>
          {exercise.tags.goal.map(g => (
            <span key={g} className={styles.tag}>
              {getLabel(filtersConfig.goal, g)}
            </span>
          ))}
          {exercise.tags.equipment.map(e => (
            <span key={e} className={`${styles.tag} ${styles.tagEquipment}`}>
              {getLabel(filtersConfig.equipment, e)}
            </span>
          ))}
        </div>
        <Link to={`/exercise/${exercise.slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>{exercise.title}</h3>
        </Link>
        <p className={styles.description}>{exercise.shortDescription}</p>
        <div className={styles.footer}>
          <span
            className={styles.difficulty}
            style={{ color: difficultyColor[exercise.tags.difficulty] }}
          >
            {difficultyLabel[exercise.tags.difficulty]}
          </span>
          <button
            className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteBtnActive : ''}`}
            onClick={e => {
              e.preventDefault();
              onToggleFavorite(exercise.id);
            }}
            aria-label={isFavorite ? 'Убрать из избранного' : 'В избранное'}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </div>
  );
}
