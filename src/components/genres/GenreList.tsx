import { useState } from 'react';
import _ from 'lodash';

import Genre from '../../models/Genre';
import SortCol from '../../models/SortCol';

import paginate from '../../utils/paginate';
import Pagination from '../common/Pagination';

import SearchBar from '../SearchBar';
import GenresTable from './GenresTable';
import AuthService from '../../services/AuthService';
import { Link } from 'react-router-dom';

const pageSize = 4;

interface GenreListProps {
  genres: Genre[];
  onRemoveGenre: (id: string) => void;
}

function GenreList({ genres: allGenres, onRemoveGenre }: GenreListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortCol>({
    path: 'name',
    order: 'asc',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const search = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const changePage = (page: number) => setCurrentPage(page);

  const sort = (sortColumn: SortCol) => setSortColumn(sortColumn);

  const getPagedData = () => {
    const filteredGenres = searchQuery
      ? allGenres.filter((genre) =>
          genre.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      : allGenres;

    const sortedGenres = _.orderBy(
      filteredGenres,
      [sortColumn.path],
      [sortColumn.order]
    );

    const genres = paginate(sortedGenres, currentPage, pageSize);

    return { totalCount: filteredGenres.length, data: genres };
  };

  const { data: genres, totalCount } = getPagedData();

  if (!totalCount)
    return (
      <div className="col-8 align-self-center">
        <p>Loading genres from database. Please wait...</p>

        <SearchBar
          value={searchQuery}
          onChange={(e) => search(e.target.value)}
        />
      </div>
    );

  const user: any = AuthService.getUser();

  return (
    <div className="col-4 align-self-center">
      {user && (
        <Link to="/genres/new" className="btn btn-primary rounded-pill mb-3">
          Add Genre
        </Link>
      )}

      <p>Showing {totalCount - 1} genres in the database.</p>

      <SearchBar value={searchQuery} onChange={(e) => search(e.target.value)} />

      <GenresTable
        genres={genres}
        onSort={sort}
        sortColumn={sortColumn}
        onRemoveGenre={onRemoveGenre}
      />

      <Pagination
        itemsCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={changePage}
      />
    </div>
  );
}

export default GenreList;
