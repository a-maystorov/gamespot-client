import axios from 'axios';
import Genre from '../models/Genre';

class GenreService {
  http = axios.create({
    baseURL: 'https://gamespot-api.herokuapp.com/api',
  });

  async getGenres() {
    const res = await this.http.get<Genre[]>('/genres');
    return res.data;
  }
}

export default new GenreService();
