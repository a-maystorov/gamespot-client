import { Link } from 'react-router-dom';
import Genre from '../../models/Genre';
import SortCol from '../../models/SortCol';
import AuthService from '../../services/AuthService';
import Table from '../common/Table';

interface GenresTableProps {
  genres: Genre[];
  onRemoveGenre: (id: string) => void;
  onSort: (sortColumn: SortCol) => void;
  sortColumn: SortCol;
}

function GenresTable({
  genres,
  onRemoveGenre,
  onSort,
  sortColumn,
}: GenresTableProps) {
  const filteredGenre = genres.filter((genre) => genre.name !== 'All Genres');
  const user: any = AuthService.getUser();

  const columns = [
    {
      path: 'name',
      label: 'Name',
      content: (genre: any) => (
        <Link to={user ? `/genres/${genre._id}` : '/login'}>{genre.name}</Link>
      ),
    },
  ];

  const deleteColumn = {
    path: '',
    label: '',
    key: 'delete',
    content: (genre: any) => (
      <button
        className="btn btn-danger btn-sm rounded-pill"
        onClick={() => onRemoveGenre(genre._id)}>
        Delete
      </button>
    ),
  };

  if (user && user.isAdmin) columns.push(deleteColumn);

  return (
    <Table
      columns={columns}
      data={filteredGenre}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
}

export default GenresTable;
