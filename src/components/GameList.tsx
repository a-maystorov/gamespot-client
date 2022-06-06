import Game from '../models/Game';

interface GameListProps {
  games: Game[];
}

function GameList({ games }: GameListProps) {
  return (
    <table className="table">
      <thead className="table-dark">
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody>
        {games.map((game) => (
          <tr>
            <td>{game.title}</td>
            <td>{game.genre.name}</td>
            <td>{game.numberInStock}</td>
            <td>{game.dailyRentalRate}&euro;</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GameList;
