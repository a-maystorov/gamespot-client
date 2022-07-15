import { useCallback, useEffect, useState } from 'react';

import LoadingSpinner from '../components/LoadingSpinner';
import RentalList from '../components/rentals/RentalList';

import Rental from '../models/Rental';

import RentalService from '../services/RentalService';

interface RentalsProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Rentals({ isLoading, setIsLoading }: RentalsProps) {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [returnedRental, setReturnedRental] = useState<Rental>();

  const loadRentals = useCallback(async () => {
    setIsLoading(true);
    const rentalsFromDb = await RentalService.getRentals();
    setIsLoading(false);
    setRentals(rentalsFromDb);
  }, [setIsLoading]);

  useEffect(() => {
    loadRentals();
  }, [loadRentals]);

  const returnRental = async (gameId: string, customerId: string) => {
    const returnedRental = await RentalService.returnRental(gameId, customerId);
    setReturnedRental(returnedRental);
  };

  return (
    <div className="d-flex flex-column">
      {isLoading && <LoadingSpinner />}

      <RentalList
        rentals={rentals}
        onReturnRental={returnRental}
        returnedRental={returnedRental}
      />
    </div>
  );
}

export default Rentals;
