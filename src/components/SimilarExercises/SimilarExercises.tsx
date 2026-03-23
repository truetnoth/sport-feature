import { Exercise } from '../../types';
import { Link } from 'react-router-dom';
import styles from './SimilarExercises.module.css';

interface Props {
  current: Exercise;
  all: Exercise[];
  onToggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

function getSimilar(current: Exercise, all: Exercise[]): Exercise[] {
  return all
    .filter(ex => ex.id !== current.id)
    .map(ex => {
      let score = 0;
      current.tags.bodyPart.forEach(bp => { if (ex.tags.bodyPart.includes(bp)) score += 2; });
      current.tags.equipment.forEach(eq => { if (ex.tags.equipment.includes(eq)) score += 1; });
      current.tags.goal.forEach(g => { if (ex.tags.goal.includes(g)) score += 1; });
      return { ex, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ ex }) => ex);
}

export default function SimilarExercises({ current, all, onToggleFavorite, isFavorite }: Props) {
  const similar = getSimilar(current, all);

  if (similar.length === 0) return null;

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>Похожие упражнения</h2>
      <div className={styles.grid}>
        {similar.map(ex => (
          <Link key={ex.id} to={`/exercise/${ex.slug}`} className={styles.card}>
            <div className={styles.placeholder}>
              <span className={styles.placeholderText}>{ex.title}</span>
            </div>
            <div className={styles.info}>
              <h4 className={styles.title}>{ex.title}</h4>
              <p className={styles.desc}>{ex.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
