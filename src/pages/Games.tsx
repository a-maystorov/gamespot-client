import { useCallback, useEffect, useState } from 'react';

import GameList from '../components/games/GameList';
import LoadingSpinner from '../components/LoadingSpinner';

import Game from '../models/Game';
import Genre from '../models/Genre';

import GameService from '../services/GameService';

interface GamesProps {
  genres: Genre[];
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Games({ genres, isLoading, setIsLoading }: GamesProps) {
  const [games, setGames] = useState<Game[]>([]);

  const loadGames = useCallback(async () => {
    setIsLoading(true);
    const gamesFromDb = await GameService.getGames();
    setIsLoading(false);
    setGames(gamesFromDb);
  }, [setIsLoading]);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  const removeGame = async (id: string) => {
    setGames(games.filter((game) => game._id !== id));
    await GameService.removeGame(id);
  };

  return (
    <div className="d-flex flex-column">
      {isLoading && <LoadingSpinner />}
      <GameList games={games} onRemoveGame={removeGame} genres={genres} />
    </div>
  );
}

export default Games;
