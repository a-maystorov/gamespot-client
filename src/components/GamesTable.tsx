import Game from '../models/Game';

interface GamesTableProps {
  games: Game[];
  onRemoveGame: (id: string) => void;
  onSort: (path: string) => void;
}

function GamesTable({ games, onRemoveGame, onSort }: GamesTableProps) {
  return (
    <table className="table">
      <thead className="table-dark">
        <tr>
          <th onClick={() => onSort('title')} className="clickable">
            Title
          </th>
          <th onClick={() => onSort('genre.name')} className="clickable">
            Genre
          </th>
          <th onClick={() => onSort('numberInStock')} className="clickable">
            Stock
          </th>
          <th onClick={() => onSort('dailyRentalRate')} className="clickable">
            Rate
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {games.map((game) => (
          <tr key={game._id}>
            <td>{game.title}</td>
            <td>{game.genre.name}</td>
            <td>{game.numberInStock}</td>
            <td>{game.dailyRentalRate}&euro;</td>
            <td>
              <button
                className="btn btn-danger btn-sm rounded-pill"
                onClick={() => onRemoveGame(game._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GamesTable;
