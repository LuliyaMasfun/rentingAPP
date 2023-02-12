import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

const register = (firstName, lastName, email, address, phoneNumber, birthdate, password) => {
  return axios.post(API_URL + "signup", {
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
    birthdate,
    password
  });
};

const login = async (email, password) => {
  const response = await axios
    .post(API_URL + "signin", {
      email,
      password,
    });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
