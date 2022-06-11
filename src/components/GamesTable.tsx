import Game from '../models/Game';
import SortCol from '../models/SortCol';

import TableHeader from './common/TableHeader';

interface GamesTableProps {
  games: Game[];
  onRemoveGame: (id: string) => void;
  onSort: (sortColumn: SortCol) => void;
  sortColumn: SortCol;
}

function GamesTable({
  games,
  onRemoveGame,
  onSort,
  sortColumn,
}: GamesTableProps) {
  const columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    { path: '', label: '', key: 'delete' },
  ];

  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
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
