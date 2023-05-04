"use client"
import axios from "axios";
import { useEffect, useState } from "react";

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
  const response = await axios.post(API_URL + "signin", {
    email,
    password,
  });

  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  //const currentUser = getCurrentUser();
  //const userId = currentUser ? JSON.parse(currentUser).id : null;

  return response.data;
};

const getCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return user;
};

const logout = () => {
  localStorage.removeItem("user");
};



const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
