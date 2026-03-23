import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Exercise } from '../../types';
import { useFavorites } from '../../hooks/useFavorites';
import { usePlaylists } from '../../hooks/usePlaylists';
import SimilarExercises from '../../components/SimilarExercises/SimilarExercises';
import PlaylistManager from '../../components/PlaylistManager/PlaylistManager';
import filtersConfig from '../../data/filters.json';
import styles from './ExerciseDetailPage.module.css';

interface Props {
  exercises: Exercise[];
  favoritesHook: ReturnType<typeof useFavorites>;
  playlistsHook: ReturnType<typeof usePlaylists>;
}

function getLabel(config: { value: string; label: string }[], value: string) {
  return config.find(c => c.value === value)?.label ?? value;
}

const difficultyLabel: Record<string, string> = {
  beginner: 'Начинающий',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
};

export default function ExerciseDetailPage({ exercises, favoritesHook, playlistsHook }: Props) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const exercise = exercises.find(ex => ex.slug === slug);
  const [showPlaylist, setShowPlaylist] = useState(false);

  if (!exercise) {
    return (
      <div className={styles.notFound}>
        <p>Упражнение не найдено.</p>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>← Назад</button>
      </div>
    );
  }

  const isFav = favoritesHook.isFavorite(exercise.id);

  const handleAddToPlaylist = (playlistId: string) => {
    playlistsHook.addToPlaylist(playlistId, exercise.id);
  };

  const handleCreateAndAdd = (title: string) => {
    const pl = playlistsHook.createPlaylist(title);
    playlistsHook.addToPlaylist(pl.id, exercise.id);
    setShowPlaylist(false);
  };

  return (
    <div className={styles.root}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Назад к списку
      </button>

      <div className={styles.header}>
        <div className={styles.tagRow}>
          {exercise.tags.goal.map(g => (
            <span key={g} className={styles.tagGoal}>{getLabel(filtersConfig.goal, g)}</span>
          ))}
          {exercise.tags.equipment.map(e => (
            <span key={e} className={styles.tagEquip}>{getLabel(filtersConfig.equipment, e)}</span>
          ))}
          <span className={styles.tagDiff}>{difficultyLabel[exercise.tags.difficulty]}</span>
        </div>
        <h1 className={styles.title}>{exercise.title}</h1>
        <p className={styles.shortDesc}>{exercise.shortDescription}</p>
      </div>

      <div className={styles.media}>
        <div className={styles.mainMedia}>
          <div className={styles.mediaPlaceholder}>
            <span className={styles.mediaLabel}>GIF / Видео</span>
          </div>
        </div>
        <div className={styles.thumbRow}>
          <div className={styles.thumb}><span>Фото 1</span></div>
          <div className={styles.thumb}><span>Фото 2</span></div>
          <div className={styles.thumb}><span>Фото 3</span></div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.main}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Как выполнять</h2>
            <ol className={styles.steps}>
              {exercise.steps.map((step, i) => (
                <li key={i} className={styles.step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Описание</h2>
            <p className={styles.fullDesc}>{exercise.fullDescription}</p>
          </section>
        </div>

        <aside className={styles.aside}>
          <div className={styles.meta}>
            {exercise.tags.bodyPart.length > 0 && (
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Группы мышц</span>
                <div className={styles.metaTags}>
                  {exercise.tags.bodyPart.map(bp => (
                    <span key={bp} className={styles.metaTag}>{getLabel(filtersConfig.bodyPart, bp)}</span>
                  ))}
                </div>
              </div>
            )}
            {exercise.tags.bodyArea.length > 0 && (
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Область тела</span>
                <div className={styles.metaTags}>
                  {exercise.tags.bodyArea.map(ba => (
                    <span key={ba} className={styles.metaTag}>{getLabel(filtersConfig.bodyArea, ba)}</span>
                  ))}
                </div>
              </div>
            )}
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Оборудование</span>
              <div className={styles.metaTags}>
                {exercise.tags.equipment.map(e => (
                  <span key={e} className={styles.metaTag}>{getLabel(filtersConfig.equipment, e)}</span>
                ))}
              </div>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Место</span>
              <div className={styles.metaTags}>
                {exercise.tags.location.map(l => (
                  <span key={l} className={styles.metaTag}>{getLabel(filtersConfig.location, l)}</span>
                ))}
              </div>
            </div>
            {exercise.tags.special.length > 0 && (
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Особые состояния</span>
                <div className={styles.metaTags}>
                  {exercise.tags.special.map(s => (
                    <span key={s} className={styles.metaTag}>{getLabel(filtersConfig.special, s)}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.actionBtn} ${isFav ? styles.actionBtnFav : ''}`}
              onClick={() => favoritesHook.toggle(exercise.id)}
            >
              {isFav ? '♥ В избранном' : '♡ В избранное'}
            </button>
            <button
              className={styles.actionBtn}
              onClick={() => setShowPlaylist(true)}
            >
              + В плейлист
            </button>
            {exercise.sourceArticleUrl && (
              <a
                href={exercise.sourceArticleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sourceLink}
              >
                Читать статью на Т—Ж →
              </a>
            )}
          </div>
        </aside>
      </div>

      <SimilarExercises
        current={exercise}
        all={exercises}
        onToggleFavorite={favoritesHook.toggle}
        isFavorite={favoritesHook.isFavorite}
      />

      {showPlaylist && (
        <PlaylistManager
          playlists={playlistsHook.playlists}
          exerciseId={exercise.id}
          onAddTo={handleAddToPlaylist}
          onCreateAndAdd={handleCreateAndAdd}
          isInPlaylist={(plId) => playlistsHook.isInPlaylist(plId, exercise.id)}
          onClose={() => setShowPlaylist(false)}
        />
      )}
    </div>
  );
}
