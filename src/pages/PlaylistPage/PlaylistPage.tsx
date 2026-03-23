import { useParams, useNavigate, Link } from 'react-router-dom';
import { Exercise } from '../../types';
import { useFavorites } from '../../hooks/useFavorites';
import { usePlaylists } from '../../hooks/usePlaylists';
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard';
import styles from './PlaylistPage.module.css';

interface Props {
  exercises: Exercise[];
  playlistsHook: ReturnType<typeof usePlaylists>;
  favoritesHook: ReturnType<typeof useFavorites>;
}

export default function PlaylistPage({ exercises, playlistsHook, favoritesHook }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const playlist = playlistsHook.playlists.find(pl => pl.id === id);

  if (!playlist) {
    return (
      <div className={styles.notFound}>
        <p>Плейлист не найден.</p>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>← Назад</button>
      </div>
    );
  }

  const playlistExercises = exercises.filter(ex => playlist.exerciseIds.includes(ex.id));

  return (
    <div className={styles.root}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Назад
      </button>
      <div className={styles.header}>
        <h1 className={styles.heading}>{playlist.title}</h1>
        <p className={styles.count}>{playlistExercises.length} упражнений</p>
      </div>
      {playlistExercises.length === 0 ? (
        <div className={styles.empty}>
          <p>Плейлист пуст.</p>
          <Link to="/" className={styles.link}>Добавить упражнения →</Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {playlistExercises.map(ex => (
            <div key={ex.id} className={styles.cardWrapper}>
              <ExerciseCard
                exercise={ex}
                isFavorite={favoritesHook.isFavorite(ex.id)}
                onToggleFavorite={favoritesHook.toggle}
              />
              <button
                className={styles.removeBtn}
                onClick={() => playlistsHook.removeFromPlaylist(playlist.id, ex.id)}
              >
                Убрать из плейлиста
              </button>
            </div>
          ))}
        </div>
      )}
      <div className={styles.dangerZone}>
        <button
          className={styles.deleteBtn}
          onClick={() => {
            playlistsHook.deletePlaylist(playlist.id);
            navigate('/favorites');
          }}
        >
          Удалить плейлист
        </button>
      </div>
    </div>
  );
}
