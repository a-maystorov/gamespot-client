import Game from '../models/Game';
import SortCol from '../models/SortCol';

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
  const raiseSort = (path: string) => {
    const sortCol = { ...sortColumn };
    if (sortCol.path === path)
      sortCol.order = sortCol.order === 'asc' ? 'desc' : 'asc';
    else {
      sortCol.path = path;
      sortCol.order = 'asc';
    }
    onSort(sortCol);
  };

  return (
    <table className="table">
      <thead className="table-dark">
        <tr>
          <th onClick={() => raiseSort('title')} className="clickable">
            Title
          </th>
          <th onClick={() => raiseSort('genre.name')} className="clickable">
            Genre
          </th>
          <th onClick={() => raiseSort('numberInStock')} className="clickable">
            Stock
          </th>
          <th
            onClick={() => raiseSort('dailyRentalRate')}
            className="clickable">
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
