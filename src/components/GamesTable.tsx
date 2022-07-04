import { Link } from 'react-router-dom';

import AuthService from '../services/AuthService';

import Game from '../models/Game';
import SortCol from '../models/SortCol';

import Table from './common/Table';

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
  const user: any = AuthService.getUser();

  const columns = [
    {
      path: 'title',
      label: 'Title',
      content: (game: any) => (
        <Link to={user ? `/games/${game._id}` : '/login'}>{game.title}</Link>
      ),
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
  ];

  const deleteColumn = {
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
  };

  if (user && user.isAdmin) columns.push(deleteColumn);

  return (
    <Table
      columns={columns}
      data={games}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
}

export default GamesTable;
