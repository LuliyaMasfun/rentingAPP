import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/"; //Specifika apier baserat på roller

const API_URL1 = "http://localhost:8080/user/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getUserByEmail = async (email) => {
  try {
    const res = await axios.get(API_URL1 + "users/" + email);
    console.log(res.data);
    if (res.status === 200) {
      console.log("det funkar");
      return res.data;
    }
    return;
  } catch (error) {
    console.log(error.message);
  }
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getUserByEmail,
};

export default UserService;
