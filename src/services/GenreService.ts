import axios from 'axios';
import Genre from '../models/Genre';
import AuthService from './AuthService';

const token = AuthService.getToken();

const headers = {
  'x-auth-token': token!,
};

class GenreService {
  http = axios.create({
    baseURL: 'https://gamespot-api.herokuapp.com/api',
  });

  async getGenres() {
    const res = await this.http.get<Genre[]>('/genres');
    return res.data;
  }

  async getGenre(id: string) {
    const res = await this.http.get<Genre>('/genres/' + id);
    return res.data;
  }

  async updateGenre({ name }: Genre, id: string) {
    const res = await this.http.put('/genres/' + id, { name }, { headers });
    return res.data;
  }

  async addGenre({ name }: Genre) {
    const res = await this.http.post<Genre>('/genres', { name }, { headers });

    return res.data;
  }

  async removeGenre(id: string) {
    const res = await this.http.delete('/genres/' + id, { headers });
    return res.data;
  }
}

export default new GenreService();
