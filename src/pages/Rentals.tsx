import { useCallback, useEffect, useState } from 'react';

import RentalList from '../components/rentals/RentalList';

import Rental from '../models/Rental';

import RentalService from '../services/RentalService';

interface RentalsProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Rentals({ isLoading, setIsLoading }: RentalsProps) {
  const [rentals, setRentals] = useState<Rental[]>([]);

  const loadRentals = useCallback(async () => {
    setIsLoading(true);
    const rentalsFromDb = await RentalService.getRentals();
    setIsLoading(false);
    setRentals(rentalsFromDb);
  }, [setIsLoading]);

  useEffect(() => {
    loadRentals();
  }, [loadRentals]);

  const removeRental = async (
    id: string,
    gameId: string,
    customerId: string
  ) => {
    setRentals(rentals.filter((rental) => rental._id !== id));
    await RentalService.returnRental(gameId, customerId);
    await RentalService.removeRental(id);
  };

  return (
    <>
      <RentalList onRemoveRental={removeRental} rentals={rentals} />
    </>
  );
}

export default Rentals;
