import { Link } from 'react-router-dom';
import { Exercise } from '../../types';
import { useFavorites } from '../../hooks/useFavorites';
import { usePlaylists } from '../../hooks/usePlaylists';
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard';
import styles from './FavoritesPage.module.css';

interface Props {
  exercises: Exercise[];
  favoritesHook: ReturnType<typeof useFavorites>;
  playlistsHook: ReturnType<typeof usePlaylists>;
}

export default function FavoritesPage({ exercises, favoritesHook, playlistsHook }: Props) {
  const favoriteExercises = exercises.filter(ex => favoritesHook.isFavorite(ex.id));

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Избранное</h1>
        <p className={styles.count}>{favoriteExercises.length} упражнений</p>
      </div>

      {favoriteExercises.length === 0 ? (
        <div className={styles.empty}>
          <p>Здесь пока пусто.</p>
          <Link to="/" className={styles.link}>Перейти к упражнениям →</Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {favoriteExercises.map(ex => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              isFavorite={favoritesHook.isFavorite(ex.id)}
              onToggleFavorite={favoritesHook.toggle}
            />
          ))}
        </div>
      )}

      {playlistsHook.playlists.length > 0 && (
        <div className={styles.playlists}>
          <h2 className={styles.playlistsHeading}>Мои плейлисты</h2>
          <div className={styles.playlistGrid}>
            {playlistsHook.playlists.map(pl => (
              <Link key={pl.id} to={`/playlist/${pl.id}`} className={styles.playlistCard}>
                <span className={styles.playlistTitle}>{pl.title}</span>
                <span className={styles.playlistCount}>{pl.exerciseIds.length} упр.</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
