import Game from '../models/Game';
import SortCol from '../models/SortCol';

import TableBody from './common/TableBody';
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
    {
      path: '',
      label: '',
      key: 'delete',
      content: (game: any) => (
        <button
          className="btn btn-danger btn-sm rounded-pill"
          onClick={() => onRemoveGame(game._id)}>
          Delete
        </button>
      ),
    },
  ];

  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={games} columns={columns} />
    </table>
  );
}

export default GamesTable;
