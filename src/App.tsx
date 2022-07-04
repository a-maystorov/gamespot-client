import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Customers from './pages/Customers';
import Games from './pages/Games';
import Rentals from './pages/Rentals';

import NavBar from './components/NavBar';
import GameForm from './components/GameForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import NotFound from './components/NotFound';

import GenreService from './services/GenreService';

import Genre from './models/Genre';

import './App.css';
import AuthService from './services/AuthService';

function App() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const user: any = AuthService.getUser();

  useEffect(() => {
    loadGenres();
  }, []);

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
      <NavBar user={user} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to={'/games'} />} />
          <Route path="/customers" element={<Customers />} />
          <Route
            path="/games"
            element={
              <Games
                genres={genres}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route path="/games/:id" element={<GameForm genres={genres} />} />
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
