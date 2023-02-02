"use client";
import React from "react";
import Navbar from "../components/Navbar";
import "../app/globals.css";
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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [socialSecurityNumber, setSocialSecurityNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
    setLastName(e.target.value);
    setEmail(e.target.value);
    setProfileImg(e.target.value);
    setSocialSecurityNumber(e.target.value);
    setPhoneNumber(e.target.value);
    setAddress(e.target.value);
    setPassword(e.target.value);
    setBirthDate(e.target.value);
  };

  return (
    <main>
      <Navbar />
    </main>
  );
};
export default Register;
