import axios from 'axios';
import User from '../models/User';

class UserService {
  http = axios.create({
    baseURL: 'https://gamespot-api.herokuapp.com/api',
  });

  async register(user: User) {
    await this.http.post('/users', {
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}

export default new UserService();
