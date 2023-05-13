import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "sign-in", {
      email,
      password,
    });
    console.log(response.data);
    if (response.data.token) {
      sessionStorage.setItem("user", JSON.stringify(response.data));
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
  sessionStorage.removeItem("user");
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
  return axios.post(API_URL + "sign-up", {
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
  return JSON.parse(sessionStorage.getItem("user"));
};

const AuthService = {
  login,
  register,
  logout,
  getCurrentUser,
};

export default AuthService;
