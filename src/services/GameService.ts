import axios from 'axios';
import Game from '../models/Game';

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

  async removeGame(id: string) {
    const res = await this.http.delete('/games/' + id);
    return res.data;
  }
}

export default new GameService();
