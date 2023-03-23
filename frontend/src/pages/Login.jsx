"use client";
import React, { useState, useRef } from 'react'
import styled from "@emotion/styled";
import Link from 'next/link';
import Image from 'next/image';
import bankid from "../../public/bankidIcon.png"
import "../styles/globals.css";
import "../styles/Body.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useRouter } from 'next/router';

import AuthService from "../services/auth.service";

const Page = styled.div`
  height: 100vh;
  background-image: url('/bgLogin.png');
  background-size: cover;
  background-position: center;
  background-color: #1E1E1E;
  width: auto;
`;

const Title = styled.h1`
  position: absolute;
  margin-top:14vh;
  margin-left: 6vh;
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 20px;
  color: white;
`;

const Subtitle = styled.p`
  position: absolute;
  margin-top:18vh;
  margin-left: 6vh;
  font-size: 18px;
  margin-bottom: 40px;
  color:white;
`;


const FormLogin = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const InputEmail = styled(Input)`
  position: absolute;
  border: none;
  padding: 10px;
  width: 260px;
  background: transparent;
  border-bottom: 1px solid white;
  color: white;
  ::placeholder {
    color: #fff;
  }
  margin-left: -16.5vh;
  margin-top: 110px;
`;
const InputPassword = styled(Input)`
 position: absolute;
 margin-top: 180px;
  border: none;
  padding: 10px;
  width: 260px;
  background: transparent;
  border-bottom: 1px solid white;
  color: white;
  ::placeholder {
    color: #fff;
  }
  margin-left: -16.5vh;
`;
const ForgotPasswordLink = styled.p`
position: absolute;
margin-top: 28vh;
margin-left: 2.5vh;
font-size: 12px;
text-decoration: underline;
cursor: pointer;
color: #FFFFFF;
&:hover {
color: #777;
}
`;

const ButtonLogin = styled.button`
position: absolute;
 border: none;
 margin-top: 350px;
  padding: 10px;
  width: 275px;
  background-color:white;
  color: #1E1E1E;
  font-weight: 700;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0px 3px rgba(0, 0, 0, 0.3);
`;

const Borders = styled.div`
display: flex;
flex-direction: row;
margin-left: 0vh;
margin-top: 53vh;
`;
const Border1 = styled.div`
margin: 10px;
  height: 0px;
  width: 100px;
  border: 1px solid white;
  opacity: 0.5;
`;
const Or = styled.p`
color: white;
font-weight: 300;
font-size: 14px;
`;
const Border2 = styled.div`
margin: 10px;
height: 0px;
width: 100px;
border: 1px solid white;
opacity: 0.5;
`;
const ButtonBankid = styled.div`
position:absolute;
border: 1px solid white;
 margin-top: 550px;
  padding: 10px;
 width: 275px;
  font-weight: 400;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0px 3px rgba(0, 0, 0, 0.3);
  color: white;
  text-align: center;

`;
const BankIdImg = styled(Image)`
position:absolute;
width: 25px;
height: 19px;
margin-top: 0.3vh;
`;
const UnderlinedText = styled.span`
  text-decoration: underline;
`;

const SignUp = styled.span`
position:absolute;
margin-top: 10vh;
font-weight: 300;
font-size: 12px;
color: white;
margin-left: -10vh;
`;

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const Login = () => {
  // let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {

          router.push('/user/LandingPage');
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };


  return (

    <Page>
      <Title>Welcome Back,</Title>
      <Subtitle>please enter your credentials</Subtitle>
      <FormLogin onSubmit={handleLogin} ref={form}>
        <InputEmail
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChangeEmail}
          validations={[required]}
        />
        <InputPassword
          type="text"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
          validations={[required]}
        />
        <Link href={{
          pathname: "/resetPassword"
        }}>
          <ForgotPasswordLink>
            Forgot password
          </ForgotPasswordLink>
        </Link>

        <ButtonLogin onClick={handleLogin}>Log in</ButtonLogin>
        <CheckButton ref={checkBtn} />
        <Borders>
          <Border1 />
          <Or>or</Or>
          <Border2 />
        </Borders>
        <ButtonBankid type="submit"> <BankIdImg src={bankid}></BankIdImg>
          Log in with Bank id
        </ButtonBankid>

        <Link href={{
          pathname: "/signup"
        }}>
          <SignUp>
            Dont have an account? <UnderlinedText>Sign up</UnderlinedText>
          </SignUp>
        </Link>
      </FormLogin>
    </Page>
  )
}

export default Login;