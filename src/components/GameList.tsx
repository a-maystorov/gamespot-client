import { useState } from 'react';
import _ from 'lodash';

import Game from '../models/Game';
import Genre from '../models/Genre';
import SortCol from '../models/SortCol';

import Pagination from './common/Pagination';
import paginate from '../utils/paginate';

import ListGroup from './GenreList';
import GamesTable from './GamesTable';

interface GameListProps {
  games: Game[];
  onRemoveGame: (id: string) => void;
  genres: Genre[];
}

const pageSize = 3;

function GameList({ games: allGames, onRemoveGame, genres }: GameListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<Genre>();
  const [sortColumn, setSortColumn] = useState<SortCol>({
    path: 'title',
    order: 'asc',
  });

  const { length: gamesCount } = allGames;

  if (gamesCount === 0) return <p>There are no games in the database.</p>;

  const changePage = (page: number) => setCurrentPage(page);

  const selectGenre = (genre: Genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const filteredGames =
    selectedGenre && selectedGenre._id
      ? allGames.filter((game) => game.genre._id === selectedGenre?._id)
      : allGames;

  const sortedGames = _.orderBy(
    filteredGames,
    [sortColumn.path],
    [sortColumn.order]
  );

  const games = paginate(sortedGames, currentPage, pageSize);

  const sort = (sortColumn: SortCol) => setSortColumn(sortColumn);

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
        <p>Showing {filteredGames.length} games in the database.</p>
        <GamesTable
          games={games}
          onRemoveGame={onRemoveGame}
          onSort={sort}
          sortColumn={sortColumn}
        />
        <Pagination
          itemsCount={filteredGames.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}

export default GameList;
