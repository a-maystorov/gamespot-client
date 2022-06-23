import { useState, useEffect } from 'react';

import Game from '../models/Game';
import Genre from '../models/Genre';

import GameService from '../services/GameService';
import GenreService from '../services/GenreService';

import GameList from '../components/GameList';

function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadGames();
    loadGenres();
  }, []);

  const loadGames = async () => {
    setIsLoading(true);
    const gamesFromDb = await GameService.getGames();
    setIsLoading(false);
    setGames(gamesFromDb);
  };

  const removeGame = async (id: string) => {
    // await GameService.removeGame(id);
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
      {isLoading && <p>Loading...</p>}
      <GameList games={games} onRemoveGame={removeGame} genres={genres} />
    </>
  );
}

export default Games;