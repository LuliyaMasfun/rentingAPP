"use client";
import React from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

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
    <div
      className="bg-no-repeat bg-cover bg-fixed mx-auto"
      style={{ backgroundImage: "url(/bgSignUp.png)", height: "100vh" }}
    >
      <Navbar />
      <main className=" container flex justify-center w-full ">
        <div className="flex justify-center my-10 w-full py-20 ">
          <form
            action={API_URL}
            method="post"
            className="flex flex-col w-96 p-10"
          >
            <label className="" for="firstName"></label>
            <input
              className="bg-transparent border-b py-2 px-4 block w-full appearance-none leading-normal placeholder-white text-white mb-3"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              required
              value={user.firstName}
              onChange={(e) => {
                setUser({ ...user, firstName: e.target.value });
              }}
            />

            <label for="lastName"></label>
            <input
              className="bg-transparent focus:outline-none focus:shadow-outline border-b py-2 px-4 block w-full appearance-none placeholder-white text-white leading-normal mb-3"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              required
              value={user.lastName}
              onChange={(e) => {
                setUser({ ...user, lastName: e.target.value });
              }}
            />

            <label for="email"></label>
            <input
              className="bg-transparent focus:outline-none focus:shadow-outline border-b py-2 px-4 block w-full appearance-none placeholder-white text-white leading-normal mb-3"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />

            <label for="address"></label>
            <input
              className="bg-transparent focus:outline-none focus:shadow-outline border-b py-2 px-4 block w-full appearance-none leading-normal placeholder-white text-white mb-3"
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              required
              value={user.address}
              onChange={(e) => {
                setUser({ ...user, address: e.target.value });
              }}
            />

            <label for="phoneNumber"></label>
            <input
              className="bg-transparent focus:outline-none focus:shadow-outline border-b py-2 px-4 block w-full appearance-none leading-normal placeholder-white text-white mb-3"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number(+46)"
              required
              value={user.phoneNumber}
              onChange={(e) => {
                setUser({ ...user, phoneNumber: e.target.value });
              }}
            />

            <label for="birthdate"></label>
            <input
              className="bg-transparent focus:outline-none focus:shadow-outline border-b py-2 px-4 block w-full appearance-none leading-normal placeholder-white text-white mb-3"
              type="date"
              id="birthdate"
              name="birthdate"
              required
              value={user.birthdate}
              onChange={(e) => {
                setUser({ ...user, birthdate: e.target.value });
              }}
            />

            <label for="password"></label>
            <input
              className="bg-transparent focus:outline-none focus:shadow-outline border-b py-2 px-4 block w-full appearance-none leading-normal placeholder-white text-white mb-3"
              type="password"
              id="password"
              name="password"
              placeholder="password"
              required
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />

            <button
              className="bg-white mt-10 rounded-md w-65 h-9 font-bold"
              onClick={handleSubmit}
              type="submit"
            >
              Sign up
            </button>

            <div className="flex items-center justify-center">
              <p> Already have an account? </p>
              <Link href="/login">Login</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
export default Register;
