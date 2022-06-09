import { useState } from 'react';

import Game from '../models/Game';
import Genre from '../models/Genre';

import Pagination from './common/Pagination';
import paginate from '../utils/paginate';

import ListGroup from './GenreList';

interface GameListProps {
  games: Game[];
  onRemoveGame: (id: number) => void;
  genres: Genre[];
}

function GameList({ games: allGames, onRemoveGame, genres }: GameListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<Genre>();

  const { length: gamesCount } = allGames;
  const pageSize = 3;

  if (gamesCount === 0) return <p>There are no games in the database.</p>;

  const changePage = (page: number) => setCurrentPage(page);

  const selectGenre = (genre: Genre) => {
    setSelectedGenre(genre);
  };

  const games = paginate(allGames, currentPage, pageSize);

  return (
    <div className="row">
      <div className="col-2">
        <ListGroup
          genres={genres}
          onGenreSelect={selectGenre}
          selectedGenre={selectedGenre!}
        />
      </div>
      <div className="col">
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
      </div>
    </div>
  );
}

export default GameList;
