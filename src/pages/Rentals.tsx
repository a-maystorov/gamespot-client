import RentalList from '../components/rentals/RentalList';

interface RentalsProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Rentals({ isLoading, setIsLoading }: RentalsProps) {
  return (
    <>
      <RentalList />
    </>
  );
}

export default Rentals;
