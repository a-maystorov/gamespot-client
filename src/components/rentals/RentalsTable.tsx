import { Link } from 'react-router-dom';
import Rental from '../../models/Rental';
import SortCol from '../../models/SortCol';
import Table from '../common/Table';

interface RentalsTableProps {
  rentals: Rental[];
  onRemoveRental: (id: string, gameId: string, customerId: string) => void;
  onSort: (sortColumn: SortCol) => void;
  sortColumn: SortCol;
}

function RentalsTable({
  onRemoveRental,
  onSort,
  rentals,
  sortColumn,
}: RentalsTableProps) {
  const columns = [
    {
      path: 'customer.name',
      label: 'Customer Name',
      content: (rental: any) => (
        <Link to={`/customers/${rental.customer._id}`}>
          {rental.customer.name}
        </Link>
      ),
    },
    {
      path: 'game.title',
      label: 'Game Title',
      content: (rental: any) => (
        <Link to={`/games/${rental.game._id}`}>{rental.game.title}</Link>
      ),
    },
    {
      path: 'dateOut',
      label: 'Date Out',
      content: (rental: any) => (
        <td>{new Date(rental.dateOut).toDateString()}</td>
      ),
    },
    {
      path: '',
      label: '',
      key: 'return',
      content: (rental: any) => (
        <button
          className="btn btn-warning btn-sm rounded-pill"
          onClick={() =>
            onRemoveRental(rental._id, rental.game._id, rental.customer._id)
          }>
          Return
        </button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={rentals}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
}

export default RentalsTable;
