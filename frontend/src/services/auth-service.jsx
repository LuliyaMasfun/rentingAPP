import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "signin", {
      email,
      password,
    });
    console.log(response);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    } else {
      alert("Session storage funkar inte");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
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
