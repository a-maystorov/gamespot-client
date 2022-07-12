import { useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Customer from '../../models/Customer';
import SortCol from '../../models/SortCol';

import paginate from '../../utils/paginate';
import Pagination from '../common/Pagination';

import SearchBar from '../SearchBar';
import CustomersTable from './CustomersTable';

interface CustomersListProps {
  customers: Customer[];
  onRemoveCustomer: (id: string) => void;
}

const pageSize = 3;

function CustomerList({
  customers: allCustomers,
  onRemoveCustomer,
}: CustomersListProps) {
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
    const filteredCustomers = searchQuery
      ? allCustomers.filter((customer) =>
          customer.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      : allCustomers;

    const sortedCustomers = _.orderBy(
      filteredCustomers,
      [sortColumn.path],
      [sortColumn.order]
    );

    const customers = paginate(sortedCustomers, currentPage, pageSize);

    return { totalCount: filteredCustomers.length, data: customers };
  };

  const { data: customers, totalCount } = getPagedData();

  if (!totalCount)
    return (
      <div className="col-8">
        <p>There are currently no customers in the database.</p>
        <SearchBar
          value={searchQuery}
          onChange={(e) => search(e.target.value)}
        />
      </div>
    );

  return (
    <div className="col-8">
      <Link to="/customers/new" className="btn btn-primary rounded-pill mb-3">
        Add Customer
      </Link>

      <p>Showing {totalCount} customers in the database.</p>

      <SearchBar value={searchQuery} onChange={(e) => search(e.target.value)} />

      <CustomersTable
        customers={customers}
        onSort={sort}
        sortColumn={sortColumn}
        onRemoveCustomer={onRemoveCustomer}
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

export default CustomerList;
