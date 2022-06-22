import axios from 'axios';
import jwtDecode from 'jwt-decode';

const key = 'authToken';

class AuthService {
  http = axios.create({
    baseURL: 'https://gamespot-api.herokuapp.com/api',
  });

  async login(email: string, password: string) {
    const { data: jwt } = await this.http.post('/auth', { email, password });
    localStorage.setItem(key, jwt);
  }

  loginWithJwt(jwt: string) {
    localStorage.setItem(key, jwt);
  }

  logout() {
    localStorage.removeItem(key);
  }

  getToken() {
    try {
      return localStorage.getItem(key);
    } catch (err) {
      console.log('Error getting the auth token: ', err);
    }
  }

  getUser() {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  setJwt(jwt: string) {
    if (axios.defaults?.headers && axios.defaults.headers.common) {
      axios.defaults.headers.common['x-auth-token'] = jwt;
    }
  }
}

export default new AuthService();
