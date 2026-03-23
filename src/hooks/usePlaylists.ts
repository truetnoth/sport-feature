import { useState, useEffect } from 'react';
import { Playlist } from '../types';

const KEY = 'exercise_playlists';

export function usePlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(playlists));
  }, [playlists]);

  const createPlaylist = (title: string): Playlist => {
    const playlist: Playlist = {
      id: `pl_${Date.now()}`,
      title,
      exerciseIds: [],
      createdAt: new Date().toISOString(),
    };
    setPlaylists(prev => [...prev, playlist]);
    return playlist;
  };

  const addToPlaylist = (playlistId: string, exerciseId: string) => {
    setPlaylists(prev =>
      prev.map(pl =>
        pl.id === playlistId && !pl.exerciseIds.includes(exerciseId)
          ? { ...pl, exerciseIds: [...pl.exerciseIds, exerciseId] }
          : pl
      )
    );
  };

  const removeFromPlaylist = (playlistId: string, exerciseId: string) => {
    setPlaylists(prev =>
      prev.map(pl =>
        pl.id === playlistId
          ? { ...pl, exerciseIds: pl.exerciseIds.filter(id => id !== exerciseId) }
          : pl
      )
    );
  };

  const deletePlaylist = (playlistId: string) => {
    setPlaylists(prev => prev.filter(pl => pl.id !== playlistId));
  };

  const isInPlaylist = (playlistId: string, exerciseId: string) => {
    return playlists.find(pl => pl.id === playlistId)?.exerciseIds.includes(exerciseId) ?? false;
  };

  return { playlists, createPlaylist, addToPlaylist, removeFromPlaylist, deletePlaylist, isInPlaylist };
}
