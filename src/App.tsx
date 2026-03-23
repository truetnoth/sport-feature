import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import ExerciseDetailPage from './pages/ExerciseDetailPage/ExerciseDetailPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import PlaylistPage from './pages/PlaylistPage/PlaylistPage';
import { useFavorites } from './hooks/useFavorites';
import { usePlaylists } from './hooks/usePlaylists';
import exercises from './data/exercises.json';
import { Exercise } from './types';

const exerciseData = exercises as Exercise[];

function App() {
  const favoritesHook = useFavorites();
  const playlistsHook = usePlaylists();

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                exercises={exerciseData}
                favoritesHook={favoritesHook}
                playlistsHook={playlistsHook}
              />
            }
          />
          <Route
            path="/exercise/:slug"
            element={
              <ExerciseDetailPage
                exercises={exerciseData}
                favoritesHook={favoritesHook}
                playlistsHook={playlistsHook}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                exercises={exerciseData}
                favoritesHook={favoritesHook}
                playlistsHook={playlistsHook}
              />
            }
          />
          <Route
            path="/playlist/:id"
            element={
              <PlaylistPage
                exercises={exerciseData}
                playlistsHook={playlistsHook}
                favoritesHook={favoritesHook}
              />
            }
          />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
