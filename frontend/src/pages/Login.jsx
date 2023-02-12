"use client";
import React, { useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import bankid from "../../public/bankidIcon.png";
import "../styles/globals.css";
import "../styles/Body.css";

const Page = styled.div`
  height: 100vh;
  background-image: url("/bgLogin.png");
  background-size: cover;
  background-position: center;
  background-color: #1e1e1e;
  width: auto;
`;

const Title = styled.h1`
  position: absolute;
  margin-top: 14vh;
  margin-left: 6vh;
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 20px;
  color: white;
`;

const Subtitle = styled.p`
  position: absolute;
  margin-top: 18vh;
  margin-left: 6vh;
  font-size: 18px;
  margin-bottom: 40px;
  color: white;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

const InputEmail = styled.input`
  position: absolute;
  margin-top: -30px;
  border: none;
  padding: 10px;
  width: 260px;
  background: transparent;
  border-bottom: 1px solid white;
  color: white;
  ::placeholder {
    color: #fff;
  }
`;
const InputPassword = styled.input`
  position: absolute;
  margin-top: 100px;
  border: none;
  padding: 10px;
  width: 260px;
  background: transparent;
  border-bottom: 1px solid white;
  color: white;
  ::placeholder {
    color: #fff;
  }
`;
const ForgotPasswordLink = styled.p`
  position: absolute;
  margin-top: 36.5vh;
  margin-left: 7vh;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: #ffffff;
  &:hover {
    color: #777;
  }
`;

const ButtonLogin = styled.button`
  position: absolute;
  border: none;
  margin-top: 500px;
  margin-left: -135px;
  padding: 10px;
  width: 275px;
  background-color: white;
  color: #1e1e1e;
  font-weight: 700;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0px 3px rgba(0, 0, 0, 0.3);
`;
const Border1 = styled.div`
  display: flex;
  flex-direction: row;
  height: 0px;
  width: 100px;
  border: 1px solid white;
  margin-left: -20vh;
  margin-top: 55vh;
  opacity: 0.5;
`;
const Or = styled.p`
  display: flex;
  flex-direction: row;
  color: white;
  margin-left: 0vh;
  margin-top: -1vh;
  font-weight: 300;
  font-size: 14px;
`;
const Border2 = styled.div`
  display: flex;
  flex-direction: row;
  height: 0px;
  width: 100px;
  border: 1px solid white;
  margin-left: 20vh;
  margin-top: -2.8vh;
  opacity: 0.5;
`;
const ButtonBankid = styled.div`
  position: absolute;
  border: 1px solid white;
  margin-top: 550px;
  padding: 10px;
  width: 255px;
  font-weight: 400;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0px 3px rgba(0, 0, 0, 0.3);
  color: white;
  text-align: center;
`;
const BankIdImg = styled(Image)`
  position: absolute;
  width: 25px;
  height: 19px;
  margin-left: -3.5vh;
  margin-top: 0.3vh;
`;
const UnderlinedText = styled.span`
  text-decoration: underline;
`;

const SignUp = styled.span`
  position: absolute;
  margin-top: 10vh;
  font-weight: 300;
  font-size: 12px;
  color: white;
  margin-left: -10vh;
`;

const Login = () => {
  const [jwt, setJWT] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const API_URL = "http://localhost:8080/auth/signin";

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(API_URL, formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetchData();
    return response;
  };

  // Add code to send the form data to the server and authenticate user
  return (
    <Page>
      <Title>Welcome Back,</Title>
      <Subtitle>please enter your credentials</Subtitle>
      <Form onSubmit={handleSubmit}>
        <InputEmail
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          css={{ color: "hotpink" }}
        />
        <InputPassword
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          minLength={10}
        />
        <Link
          href={{
            pathname: "/resetPassword",
          }}
        >
          <ForgotPasswordLink>Forgot password</ForgotPasswordLink>
        </Link>

        <ButtonLogin onClick={handleSubmit} type="submit">
          Log in
        </ButtonLogin>
        {/* <Link
          href={{
            pathname: "/resetPassword",
          }}
        > 
        </Link>*/}
        <Border1 />
        <Or>or</Or>
        <Border2 />
        <ButtonBankid type="submit">
          {" "}
          <BankIdImg src={bankid}></BankIdImg>
          Log in with Bank id
        </ButtonBankid>

<<<<<<< HEAD
        <Link
          href={{
            pathname: "/signup",
          }}
        >
=======
        <Link href={{
          pathname: "/signUp"
        }}>
>>>>>>> cadf66dd20c8ea81fe91d08c45b09a779b463fe9
          <SignUp>
            Dont have an account? <UnderlinedText>Sign up</UnderlinedText>
          </SignUp>
        </Link>
      </Form>
    </Page>
  );
};

export default Login;
