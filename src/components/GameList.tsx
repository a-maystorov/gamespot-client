import { useState } from 'react';
import Game from '../models/Game';

import Pagination from './common/Pagination';
import paginate from '../utils/paginate';

interface GameListProps {
  games: Game[];
  onRemoveGame: (id: number) => void;
}

function GameList({ games: allGames, onRemoveGame }: GameListProps) {
  const pageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const changePage = (page: number) => setCurrentPage(page);

  const { length: gamesCount } = allGames;

  if (gamesCount === 0) return <p>There are no games in the database.</p>;

  const games = paginate(allGames, currentPage, pageSize);

  return (
    <>
      <p>Showing {gamesCount} games in the database.</p>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th></th>
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

      <Pagination
        itemsCount={gamesCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={changePage}
      />
    </>
  );
}

export default GameList;
