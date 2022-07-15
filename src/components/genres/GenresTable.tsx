import { Link } from 'react-router-dom';
import Genre from '../../models/Genre';
import SortCol from '../../models/SortCol';
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

  const columns = [
    {
      path: 'name',
      label: 'Name',
      content: (genre: any) => (
        <Link to={`/genres/${genre._id}`}>{genre.name}</Link>
      ),
    },
    {
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
    },
  ];
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
