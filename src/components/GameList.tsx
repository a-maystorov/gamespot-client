import { useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Game from '../models/Game';
import Genre from '../models/Genre';
import SortCol from '../models/SortCol';
import User from '../models/User';

import Pagination from './common/Pagination';
import paginate from '../utils/paginate';

import GenreList from './GenreList';
import GamesTable from './GamesTable';
import SearchBar from './SearchBar';

interface GameListProps {
  games: Game[];
  onRemoveGame: (id: string) => void;
  genres: Genre[];
  user: User;
}

const pageSize = 3;

function GameList({
  games: allGames,
  onRemoveGame,
  genres,
  user,
}: GameListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>();
  const [sortColumn, setSortColumn] = useState<SortCol>({
    path: 'title',
    order: 'asc',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const search = (query: string) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setCurrentPage(1);
  };

  const selectGenre = (genre: Genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const changePage = (page: number) => setCurrentPage(page);

  const sort = (sortColumn: SortCol) => setSortColumn(sortColumn);

  const getPagedData = () => {
    const filteredGames =
      selectedGenre && selectedGenre._id
        ? allGames.filter((game) => game.genre._id === selectedGenre?._id)
        : searchQuery
        ? allGames.filter((game) =>
            game.title.toLowerCase().startsWith(searchQuery.toLowerCase())
          )
        : allGames;

    const sortedGames = _.orderBy(
      filteredGames,
      [sortColumn.path],
      [sortColumn.order]
    );

    const games = paginate(sortedGames, currentPage, pageSize);

    return { totalCount: filteredGames.length, data: games };
  };

  const { totalCount, data: games } = getPagedData();

  if (!totalCount)
    return (
      <>
        <p>There are currently no games in the database.</p>
        <SearchBar
          value={searchQuery}
          onChange={(e) => search(e.target.value)}
        />
      </>
    );

  return (
    <div className="row">
      <div className="col-2">
        <GenreList
          genres={genres}
          onGenreSelect={selectGenre}
          selectedGenre={selectedGenre!}
        />
      </div>
      <div className="col">
        {user && (
          <Link to="/games/new" className="btn btn-primary rounded-pill mb-3">
            Add Game
          </Link>
        )}

        <p>Showing {totalCount} games in the database.</p>

        <SearchBar
          value={searchQuery}
          onChange={(e) => search(e.target.value)}
        />

        <GamesTable
          games={games}
          onRemoveGame={onRemoveGame}
          onSort={sort}
          sortColumn={sortColumn}
        />

        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}

export default GameList;
