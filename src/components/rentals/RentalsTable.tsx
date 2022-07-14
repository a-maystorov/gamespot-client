import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Rental from '../../models/Rental';
import SortCol from '../../models/SortCol';

import Table from '../common/Table';

import ReturnModal from './ReturnModal';

interface RentalsTableProps {
  rentals: Rental[];
  onReturnRental: (gameId: string, customerId: string) => Promise<void>;
  returnedRental?: Rental;
  onSort: (sortColumn: SortCol) => void;
  sortColumn: SortCol;
}

function RentalsTable({
  onReturnRental,
  returnedRental,
  onSort,
  rentals,
  sortColumn,
}: RentalsTableProps) {
  const [isModalShowing, setIsModalShowing] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalShowing(false);
    navigate('/');
  };
  const showModal = () => setIsModalShowing(true);

  const columns = [
    {
      path: 'customer.name',
      label: 'Customer Name',
      content: (rental: any) => (
        <Link to={`/returns/${rental._id}`}>{rental.customer.name}</Link>
      ),
    },
    {
      path: 'game.title',
      label: 'Game Title',
      content: (rental: any) => (
        <Link to={`/returns/${rental._id}`}>{rental.game.title}</Link>
      ),
    },
    {
      path: 'dateOut',
      label: 'Date Out',
      content: (rental: any) => <>{new Date(rental.dateOut).toDateString()}</>,
    },
    {
      path: '',
      label: '',
      key: 'return',
      content: (rental: any) =>
        !rental.dateReturned ? (
          <button
            className="btn btn-warning btn-sm rounded-pill"
            onClick={async () => {
              showModal();
              onReturnRental(rental.game._id, rental.customer._id);
            }}>
            Return
          </button>
        ) : (
          <button className="btn btn-warning btn-sm rounded-pill disabled">
            Return already processed
          </button>
        ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={rentals}
        onSort={onSort}
        sortColumn={sortColumn}
      />

      {returnedRental && (
        <ReturnModal
          handleClose={closeModal}
          show={isModalShowing}
          returnedRental={returnedRental}
        />
      )}
    </>
  );
}

export default RentalsTable;
