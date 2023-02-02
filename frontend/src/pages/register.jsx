"use client";
import React from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { useState } from "react";

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
  };

  return (
    <div>
      <Navbar />
      <main className="flex justify-center w-full">
        <form action="your-server-side-script-URL" method="post">
          <label for="firstName">First Name:</label>
          <input
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

          <button onClick={handleSubmit} type="submit">
            Sign up
          </button>
        </form>
      </main>
    </div>
  );
};
export default Register;
