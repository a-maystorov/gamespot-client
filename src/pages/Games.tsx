import GameList from '../components/GameList';

import Game from '../models/Game';
import Genre from '../models/Genre';

interface GamesProps {
  games: Game[];
  removeGame: (id: string) => void;
  genres: Genre[];
  isLoading: boolean;
}

function Games({ games, genres, isLoading, removeGame }: GamesProps) {
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <GameList games={games} onRemoveGame={removeGame} genres={genres} />
    </>
  );
}

export default Games;
