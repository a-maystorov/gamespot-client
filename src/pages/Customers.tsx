import { useCallback, useEffect, useState } from 'react';
import CustomerList from '../components/customers/CustomerList';
import Customer from '../models/Customer';
import CustomerService from '../services/CustomerService';

interface CustomersProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Customers({ isLoading, setIsLoading }: CustomersProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const loadCustomers = useCallback(async () => {
    setIsLoading(true);
    const customersFromDb = await CustomerService.getCustomers();
    setIsLoading(false);
    setCustomers(customersFromDb);
  }, [setIsLoading]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const removeCustomer = async (id: string) => {
    setCustomers(customers.filter((customer) => customer._id !== id));
    await CustomerService.removeCustomer(id);
  };
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <CustomerList customers={customers} onRemoveCustomer={removeCustomer} />
    </>
  );
}

export default Customers;
