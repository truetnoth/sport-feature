import { useState } from 'react';
import { Playlist } from '../../types';
import styles from './PlaylistManager.module.css';

interface Props {
  playlists: Playlist[];
  exerciseId: string;
  onAddTo: (playlistId: string) => void;
  onCreateAndAdd: (title: string) => void;
  isInPlaylist: (playlistId: string) => boolean;
  onClose: () => void;
}

export default function PlaylistManager({ playlists, exerciseId, onAddTo, onCreateAndAdd, isInPlaylist, onClose }: Props) {
  const [newTitle, setNewTitle] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  const handleCreate = () => {
    if (newTitle.trim()) {
      onCreateAndAdd(newTitle.trim());
      setNewTitle('');
      setShowCreate(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h4 className={styles.title}>Добавить в плейлист</h4>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        <div className={styles.list}>
          {playlists.length === 0 && !showCreate && (
            <p className={styles.empty}>Нет плейлистов</p>
          )}
          {playlists.map(pl => (
            <button
              key={pl.id}
              className={`${styles.playlistItem} ${isInPlaylist(pl.id) ? styles.playlistItemAdded : ''}`}
              onClick={() => onAddTo(pl.id)}
            >
              <span>{pl.title}</span>
              {isInPlaylist(pl.id) && <span className={styles.check}>✓</span>}
            </button>
          ))}
        </div>
        {showCreate ? (
          <div className={styles.createForm}>
            <input
              className={styles.createInput}
              type="text"
              placeholder="Название плейлиста"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
              autoFocus
            />
            <div className={styles.createActions}>
              <button className={styles.createConfirm} onClick={handleCreate} disabled={!newTitle.trim()}>
                Создать
              </button>
              <button className={styles.createCancel} onClick={() => setShowCreate(false)}>
                Отмена
              </button>
            </div>
          </div>
        ) : (
          <button className={styles.newBtn} onClick={() => setShowCreate(true)}>
            + Новый плейлист
          </button>
        )}
      </div>
    </div>
  );
}
