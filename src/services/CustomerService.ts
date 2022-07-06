import axios from 'axios';
import AuthService from './AuthService';
import Customer from '../models/Customer';

const token = AuthService.getToken();

const headers = {
  'x-auth-token': token!,
};

class CustomerService {
  http = axios.create({
    baseURL: 'https://gamespot-api.herokuapp.com/api',
  });

  async getCustomers() {
    const res = await this.http.get<Customer[]>('/customers', { headers });
    return res.data;
  }

  async removeCustomer(id: string) {
    const res = await this.http.delete('/customers/' + id, { headers });
    return res.data;
  }
}

export default new CustomerService();
