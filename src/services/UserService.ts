import axios from "axios";
import User from "../models/User";

class UserService {
  http = axios.create({
    baseURL: "https://gamespot-api.onrender.com/api",
  });

  async register(user: User) {
    const res = await this.http.post("/users", {
      name: user.name,
      email: user.email,
      password: user.password,
    });
    localStorage.setItem("authToken", res.headers["x-auth-token"]);
  }
}

export default new UserService();
