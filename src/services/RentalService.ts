import axios from 'axios';
import AuthService from './AuthService';
import Rental from '../models/Rental';

const token = AuthService.getToken();

const headers = {
  'x-auth-token': token!,
};

class RentalService {
  http = axios.create({
    baseURL: 'https://gamespot-api.herokuapp.com/api',
  });

  async getRentals() {
    const res = await this.http.get<Rental[]>('/rentals', { headers });
    return res.data;
  }

  async getRental(id: string) {
    const res = await this.http.get<Rental>('/rentals/' + id, { headers });
    return res.data;
  }

  async addRental({ gameId, customerId }: Rental) {
    const res = await this.http.post<Rental>(
      '/rentals',
      { gameId, customerId },
      { headers }
    );

    return res.data;
  }

  async removeRental(id: string) {
    const res = await this.http.delete('/rentals/' + id, { headers });
    return res.data;
  }
}

export default new RentalService();
