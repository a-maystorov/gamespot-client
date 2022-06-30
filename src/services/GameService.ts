import axios from 'axios';
import Game from '../models/Game';
import AuthService from './AuthService';

const token = AuthService.getToken();

const headers = {
  'x-auth-token': token!,
};

class GameService {
  http = axios.create({
    baseURL: 'https://gamespot-api.herokuapp.com/api',
  });

  async getGames() {
    const res = await this.http.get<Game[]>('/games');
    return res.data;
  }

  async getGame(id: string) {
    const res = await this.http.get<Game>('/games/' + id);
    return res.data;
  }

  async addGame({ title, genreId, dailyRentalRate, numberInStock }: Game) {
    const res = await this.http.post<Game>(
      '/games',
      {
        title,
        genreId,
        numberInStock,
        dailyRentalRate,
      },
      { headers }
    );
    return res.data;
  }

  async removeGame(id: string) {
    const res = await this.http.delete('/games/' + id, { headers });
    return res.data;
  }
}

export default new GameService();
