import GameList from '../components/GameList';

import Game from '../models/Game';
import Genre from '../models/Genre';
import User from '../models/User';

interface GamesProps {
  games: Game[];
  removeGame: (id: string) => void;
  genres: Genre[];
  isLoading: boolean;
  user: User;
}

function Games({ games, genres, isLoading, removeGame, user }: GamesProps) {
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <GameList
        games={games}
        onRemoveGame={removeGame}
        genres={genres}
        user={user}
      />
    </>
  );
}

export default Games;
