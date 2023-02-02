"use client";
import React from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { useState } from "react";
import axios from "axios";
import bg from "../../public/bgLogin.png";
import Image from "next/image";

const API_URL = "http://localhost:8080/createUser";

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    birthdate: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    try {
      axios.post(API_URL, user).then((res) => {
        console.log(`${res.data} was successfully created`);
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="bg black">
      <Image
        alt="background"
        src={bg}
        quality={100}
        width="auto"
        height="auto"
      />
      <Navbar />
      <main className="flex justify-center w-full ">
        <div className="flex justify-center ">
          <form action={API_URL} method="post" className="flex flex-col">
            <label className="" for="firstName">
              First Name:
            </label>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              type="text"
              id="firstName"
              name="firstName"
              required
              value={user.firstName}
              onChange={(e) => {
                setUser({ ...user, firstName: e.target.value });
              }}
            />

            <label for="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={user.lastName}
              onChange={(e) => {
                setUser({ ...user, lastName: e.target.value });
              }}
            />

            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />

            <label for="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={user.address}
              onChange={(e) => {
                setUser({ ...user, address: e.target.value });
              }}
            />

            <label for="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              value={user.phoneNumber}
              onChange={(e) => {
                setUser({ ...user, phoneNumber: e.target.value });
              }}
            />

            <label for="birthdate">Birthdate:</label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              required
              value={user.birthdate}
              onChange={(e) => {
                setUser({ ...user, birthdate: e.target.value });
              }}
            />

            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />

            <button className="bg-blue" onClick={handleSubmit} type="submit">
              Sign up
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
export default Register;
