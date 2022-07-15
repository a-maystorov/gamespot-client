import { useState } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import Rental from '../../models/Rental';
import SortCol from '../../models/SortCol';

import paginate from '../../utils/paginate';
import Pagination from '../common/Pagination';

import SearchBar from '../SearchBar';
import RentalsTable from './RentalsTable';

interface RentalsListProps {
  rentals: Rental[];
  onReturnRental: (gameId: string, customerId: string) => Promise<void>;
  returnedRental?: Rental;
}

const pageSize = 3;

function RentalList({
  rentals: allRentals,
  returnedRental,
  onReturnRental,
}: RentalsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortCol>({
    path: 'customer.name',
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
    const filteredRentals = searchQuery
      ? allRentals.filter(
          (rental) =>
            rental.customer.name
              .toLowerCase()
              .startsWith(searchQuery.toLowerCase()) ||
            rental.game.title
              .toLowerCase()
              .startsWith(searchQuery.toLowerCase())
        )
      : allRentals;

    const sortedRentals = _.orderBy(
      filteredRentals,
      [sortColumn.path],
      [sortColumn.order]
    );

    const rentals = paginate(sortedRentals, currentPage, pageSize);

    return { totalCount: filteredRentals.length, data: rentals };
  };

  const { data: rentals, totalCount } = getPagedData();

  if (!totalCount)
    return (
      <div className="col-8 align-self-center">
        <Link to="/rentals/new" className="btn btn-primary rounded-pill mb-3">
          Add Rental
        </Link>

        <p>There are currently no rentals in the database.</p>

        <SearchBar
          value={searchQuery}
          onChange={(e) => search(e.target.value)}
        />
      </div>
    );

  return (
    <div className="col-8 align-self-center">
      <Link to="/rentals/new" className="btn btn-primary rounded-pill mb-3">
        Add Rental
      </Link>

      <p>Showing {totalCount} rentals in the database.</p>

      <SearchBar value={searchQuery} onChange={(e) => search(e.target.value)} />

      <RentalsTable
        onSort={sort}
        sortColumn={sortColumn}
        rentals={rentals}
        onReturnRental={onReturnRental}
        returnedRental={returnedRental}
      />

      <Pagination
        currentPage={currentPage}
        itemsCount={totalCount}
        onPageChange={changePage}
        pageSize={pageSize}
      />
    </div>
  );
}

export default RentalList;
