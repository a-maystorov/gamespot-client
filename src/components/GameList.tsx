import Game from '../models/Game';

interface GameListProps {
  games: Game[];
}

function GameList({ games }: GameListProps) {
  return (
    <ul className="list-group">
      {games.map((game) => (
        <li key={game._id} className="list-group-item">
          {game.title}
        </li>
      ))}
    </ul>
  );
}

export default GameList;
