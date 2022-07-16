import { useCallback, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import Rental from '../models/Rental';
import RentalService from '../services/RentalService';

function Returns() {
  const [currentReturn, setCurrentReturn] = useState<Rental>();
  const { id } = useParams();

  const loadCurrentReturn = useCallback(async () => {
    const res = await RentalService.getRental(id!);
    setCurrentReturn({ ...res });
  }, [id]);

  useEffect(() => {
    loadCurrentReturn();
  }, [loadCurrentReturn]);

  return (
    <Card>
      <Card.Header>Rental with id: {currentReturn?._id}</Card.Header>
      <Card.Body>
        <Card.Title>{`${currentReturn?.game.title} rented by ${currentReturn?.customer.name}`}</Card.Title>
        <br />
        <Card.Text>
          Date out:{' '}
          {currentReturn && new Date(currentReturn!.dateOut).toDateString()}
          <br />
          <br />
          Date returned:{' '}
          {currentReturn?.dateReturned
            ? new Date(currentReturn!.dateReturned as Date).toDateString()
            : 'Rental not yet returned'}
          <br />
          <br />
          Rental fee: {currentReturn?.rentalFee}
        </Card.Text>
        <Link className="btn btn-secondary" to={'/rentals'}>
          Go Back
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Returns;
