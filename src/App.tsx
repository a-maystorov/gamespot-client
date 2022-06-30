import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Customers from './pages/Customers';
import Games from './pages/Games';
import Rentals from './pages/Rentals';

import NavBar from './components/NavBar';
import GameForm from './components/GameForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import NotFound from './components/NotFound';

import GenreService from './services/GenreService';
import GameService from './services/GameService';

import Genre from './models/Genre';
import Game from './models/Game';

import './App.css';

function App() {
  const [user, setUser] = useState();
  const [games, setGames] = useState<Game[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadGames();
    loadGenres();
    const jwt = localStorage.getItem('authToken');
    if (jwt) setUser(jwtDecode(jwt));
  }, []);

  const loadGames = async () => {
    setIsLoading(true);
    const gamesFromDb = await GameService.getGames();
    setIsLoading(false);
    setGames(gamesFromDb);
  };

  const removeGame = async (id: string) => {
    await GameService.removeGame(id);
    setGames(games.filter((game) => game._id !== id));
  };

  const loadGenres = async () => {
    const allGenres: Genre = { _id: '', name: 'All Genres' };
    setIsLoading(true);
    const genresFromDb = await GenreService.getGenres();
    setIsLoading(false);
    const genres = [allGenres, ...genresFromDb];
    setGenres(genres);
  };

  return (
    <>
      <NavBar user={user!} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to={'/games'} />} />
          <Route path="/customers" element={<Customers />} />
          <Route
            path="/games"
            element={
              <Games
                games={games}
                genres={genres}
                isLoading={isLoading}
                removeGame={removeGame}
                user={user!}
              />
            }
          />
          <Route
            path="/games/:id"
            element={<GameForm games={games} genres={genres} />}
          />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
