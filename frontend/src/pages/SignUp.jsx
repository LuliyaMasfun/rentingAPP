"use client";
import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import Link from "next/link";
import "../styles/globals.css";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";


const Page = styled.div`
  height: 844px;
  background-image: url("/bg.png");
  background-size: cover;
  background-position: center;
  background-color: #1e1e1e;
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
const SignUpForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
const InputFirstname = styled(Input)`
  position: absolute;
  margin-top: -130px;
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
const InputLastname = styled(Input)`
  position: absolute;
  margin-top: -10px;
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
const InputEmail = styled(Input)`
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
    opacity: 0.7;
  }
`;
const InputAddress = styled(Input)`
  position: absolute;
  margin-top: 210px;
  border: none;
  padding: 10px;
  width: 260px;
  background: transparent;
  border-bottom: 1px solid white;
  color: white;
  ::placeholder {
    color: #fff;
    opacity: 0.7;
  }
`;
const InputPhonenumber = styled(Input)`
  position: absolute;
  margin-top: 320px;
  border: none;
  padding: 10px;
  width: 260px;
  background: transparent;
  border-bottom: 1px solid white;
  color: white;
  ::placeholder {
    color: #fff;
    opacity: 0.7;
  }
`;
const InputBirthdate = styled(Input)`
  position: absolute;
  margin-top: 430px;
  border: none;
  padding: 10px;
  width: 260px;
  background: transparent;
  border-bottom: 1px solid white;
  color: white;
  ::placeholder {
    color: #fff;
    opacity: 0.7;
  }
`;
const InputPassword = styled(Input)`
  position: absolute;
  margin-top: 540px;
  border: none;
  padding: 10px;
  width: 260px;
  background: transparent;
  border-bottom: 0.5px solid white;
  color: white;
  ::placeholder {
    color: #fff;
    opacity: 0.7;
  }
`;

const ButtonSignUp = styled.button`
  position: absolute;
  border: none;
  margin: 50px; 
  padding: 10px;
  width: 280px;
  background-color: white;
  color: #1e1e1e;
  font-weight: 700;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0px 3px rgba(0, 0, 0, 0.3);
`;

const UnderlinedText = styled.span`
  text-decoration: underline;
`;

const Login = styled.span`
  position: absolute;
  margin-top: 12vh;
  font-weight: 300;
  font-size: 12px;
  color: white;
  margin-left: 10vh;
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

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const SignUp = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);


  const onChangeFirstName = e => {
    setFirstName({
      firstName: e.target.value
    });
  };
  const onChangeLastname = e => {
    setLastName({
      lastName: e.target.value
    });
  };
  const onChangeEmail = e => {
    setEmail({
      email: e.target.value
    });
  };

  const onChangeAddress = e => {
    setAddress({
      address: e.target.value
    });
  };
  const onChangePhoneNumber = e => {
    setPhoneNumber({
      phoneNumber: e.target.value
    });
  };
  const onChangeBirthdate = e => {
    setBirthdate({
      birthdate: e.target.value
    });
  };

  const onChangePassword = e => {
    setPassword({
      password: e.target.value
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <Page>
      <Title>Create an account,</Title>
      <Subtitle>Lets get started, enter your details</Subtitle>
      <SignUpForm
        onSubmit={handleRegister}
      >
        <InputFirstname
          type="text"
          name="firstname"
          placeholder="Firstname"
          value={firstName}
          onChange={onChangeFirstName}
          validations={[required]}
        />
        <InputLastname
          type="text"
          name="lastname"
          placeholder="Lastname"
          value={lastName}
          onChange={onChangeLastname}
          validations={[required]}
        />
        <InputEmail
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChangeEmail}
          validations={[required, vemail]}
        />
        <InputAddress
          type="text"
          name="address"
          placeholder="Address"
          value={address}
          onChange={onChangeAddress}
          validations={[required]}
        />

        <InputPhonenumber
          type="number"
          name="phonenumber"
          placeholder="Phonenumber"
          value={phoneNumber}
          onChange={onChangePhoneNumber}
          validations={[required]}
        />
        <InputBirthdate
          type="date"
          name="birthdate"
          placeholder="Birthdate"
          value={birthdate}
          onChange={onChangeBirthdate}
          validations={[required]}
        />
        <InputPassword
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
          validations={[required, vpassword]}
        />

      </SignUpForm>
      <Link href={{
        pathname: "/LandingPage"
      }}>
        <ButtonSignUp type="submit">Sign Up</ButtonSignUp>
      </Link>

      <Link href={{
        pathname: "/Login"
      }}>
        <Login>
          Already have an account? <UnderlinedText>Log in</UnderlinedText>
        </Login>
      </Link>
    </Page>
  );
};
}
export default SignUp;

