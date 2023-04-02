import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/auth/authenticate";

const login = async (email, password) => {
  const response = await axios.post(API_URL + "signin", {
    email,
    password,
  });
  if (response.data.jwtToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = (
  firstname,
  lastname,
  email,
  password,
  address,
  phoneNumber,
  birthdate
) => {
  return axios.post(API_URL + "signup", {
    firstname,
    lastname,
    email,
    password,
    address,
    phoneNumber,
    birthdate,
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  register,
  logout,
  getCurrentUser,
};

export default AuthService;
