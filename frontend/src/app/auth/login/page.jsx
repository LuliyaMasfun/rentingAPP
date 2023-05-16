"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import bankid from "../../../../public/bankidIcon.png";
import "../../../styles/globals.css";
import "../../../styles/Body.css";

import AuthService from "../../../services/auth-service";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useFormik } from "formik";
import * as Yup from "yup";

import { signIn } from "next-auth/react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string()
        .max(20, "Must between 5 and 20 charakters")
        .min(5, "Must between 5 and 20 charakters")
        .required("Required"),
    }),

    onSubmit: (values) => {
      // const res = signIn("credentials", {
      //   email: formik.values.email,
      //   password: formik.values.password,
      //   redirect: false,
      // });

      console.log(res);
      setLoading(true);
      setErrorMessage("");
      console.log(JSON.stringify(values));

      try {
        const res = signIn("credentials", {
          email: formik.values.email,
          password: formik.values.password,
          redirect: false,
        });
        console.log(res);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
  });

  function handlePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }
  return (
    <div
      className="h-screen max-h-screen relative bg-black bg-cover bg-no-repeat w-screen bg-center"
      style={{ backgroundImage: "url('/bgLogin.png')" }}
    >
      <div className=" ">
        <div className="flex flex-col justify-center items-start pl-6 pt-24">
          <h1 className="py-5 text-3xl font-bold text-white">Welcome Back,</h1>
          <p className="text-white text-xl">Please enter your credentials</p>
        </div>{" "}
        <div className="flex h-full w-screen flex-col bg-transparent items-center justify-center text-center p-12">
          <form
            className="flex flex-col bg-transparent w-96 p-10 "
            onSubmit={formik.handleSubmit}
          >
            <label htmlFor="email"></label>
            <input
              className=" border-b p-3 w-260 bg-transparent active:border-b focus:border-b rounded-sm border-white text-white placeholder-white "
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Email"
            />

            {formik.touched.email && formik.errors.email ? (
              <p2 className="error">{formik.errors.email}</p2>
            ) : null}

            <div className="flex w-full relative justify-center items-center">
              <label className="" htmlFor="password"></label>
              <div
                onClick={handlePasswordVisibility}
                className="flex-col left-0 justify-end items-end hover:cursor"
              >
                {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
              <input
                className="border-b py-2 w-full w-260 bg-transparent rounded-sm focus:border focus:border-b-white text-white placeholder-white mt-5 justify-end text-start"
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="password"
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <p className="error">{formik.errors.password}</p>
            ) : null}

            {errorMessage && <div className="error">{errorMessage}</div>}

            <div className="flex pt-5 w-full items-center justify-center ">
              <Link href="/">
                <p className="border-b text-white items-center w-full justify-center pt-5">
                  Forgot password
                </p>
              </Link>
            </div>

            <div className="container w-full mt-32">
              <div className="text-center mb-4">
                <button
                  className="flex border-none h-2 p-6 w-full text-center items-center justify-center bg-white text-#1e1e1e font-bold text-lg rounded-md shadow-md "
                  type="submit"
                  onClick={() => signIn()}
                >
                  Log in
                </button>
              </div>

              <div className="flex p-2 bg-transparent border border-white mt-5 justify-start rounded-md shadow-sm shadow-black">
                <Image src={bankid} alt="bankId logga" />
                <button
                  className="w-full text-center text-white font-bold text-lg "
                  type="submit"
                >
                  Log in with Bank id
                </button>
              </div>
            </div>

            <div className="pt-24">
              <Link href="/signup">
                <p className="text-white">Dont have an account? Sign Up</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
