import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
  async login(email, password) {
    const response = await axios
      .post(API_URL + "signin", {
        email,
        password
      });
    if (response.data.jwtToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(firstname, lastname, email, password, address, phoneNumber, birthdate) {
    return axios.post(API_URL + "signup", {
      firstname,
      lastname,
      email,
      password,
      address,
      phoneNumber,
      birthdate
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
