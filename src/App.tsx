import { useEffect, useState } from 'react';
import Game from './models/Game';
import GameService from './services/GameService';
import GameList from './components/GameList';
import './App.css';

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    const gamesFromDb = await GameService.getGames();
    setGames(gamesFromDb);
  };

  return (
    <main className="container">
      <GameList games={games} />
    </main>
  );
}

export default App;
