import { useEffect, useState } from 'react';
import Game from './models/Game';
import GameService from './services/GameService';
import GameList from './components/GameList';
import './App.css';

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    setIsLoading(true);
    const gamesFromDb = await GameService.getGames();
    setIsLoading(false);
    setGames(gamesFromDb);
  };

  const removeGame = async (id: number) => {
    // await GameService.removeGame(id);
    setGames(games.filter((game) => game._id !== id));
  };

  return (
    <main className="container">
      {isLoading && <p>Loading...</p>}
      <GameList games={games} onRemoveGame={removeGame} />
    </main>
  );
}

export default App;
