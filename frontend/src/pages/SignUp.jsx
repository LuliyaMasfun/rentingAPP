import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import Link from "next/link";
import "../styles/globals.css";

const Page = styled.div`
  height: 844px;
  background-image: url("/bg.png");
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
const InputFirstname = styled.input`
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
const InputLastname = styled.input`
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
const InputEmail = styled.input`
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
const InputAddress = styled.input`
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
const InputPhonenumber = styled.input`
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
const InputBirthdate = styled.input`
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
const InputPassword = styled.input`
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
  position: relative;
  border: none;
  /* margin-top: 340px;
  margin-left: -140px; */
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
  margin-top: 46vh;
  font-weight: 300;
  font-size: 12px;
  color: white;
  margin-left: -10vh;
`;

const SignUp = () => {
  const [formData, setFormData] = useState({
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
    console.log(formData);
    // Add code to send the form data to the server and authenticate register request
  };

  return (
    <Page>
      <Title>Create an account,</Title>
      <Subtitle>Lets get started, please enter your details</Subtitle>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <InputFirstname
          type="email"
          name="email"
          placeholder="Firstname"
          value={formData.firstName}
          onChange={(e) => {
            setFormData({ ...formData, firstName: e.target.value });
          }}
          css={{ color: "hotpink" }}
          required
        />
        <InputLastname
          type="email"
          name="email"
          placeholder="Lastname"
          value={formData.lastName}
          onChange={(e) => {
            setFormData({ ...formData, lastName: e.target.value });
          }}
          css={{ color: "hotpink" }}
          required
        />
        <InputEmail
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          css={{ color: "hotpink" }}
          required
        />
        <InputAddress
          type="email"
          name="email"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => {
            setFormData({ ...formData, address: e.target.value });
          }}
          css={{ color: "hotpink" }}
          required
        />

        <InputPhonenumber
          type="email"
          name="email"
          placeholder="Phonenumber"
          value={formData.phoneNumber}
          onChange={(e) => {
            setFormData({ ...formData, phoneNumber: e.target.value });
          }}
          css={{ color: "hotpink" }}
          required
        />
        <InputBirthdate
          type="date"
          name="email"
          placeholder="Birthdate"
          value={formData.birthdate}
          onChange={(e) => {
            setFormData({ ...formData, birthdate: e.target.value });
          }}
          css={{ color: "hotpink" }}
          required
        />
        <InputPassword
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          css={{ color: "hotpink" }}
          required
        />
      </Form>
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

<<<<<<< HEAD
<<<<<<< HEAD
        {/* <Link href={{
          pathname: "/Login"
        }}>
          <Login>
            Already have an account? <UnderlinedText>Log in</UnderlinedText>
          </Login>
        </Link> */}
      </Form>
    </Page>
  );
};
export default SignUp;
=======
                <InputPhonenumber
                    type="email"
                    name="email"
                    placeholder="Phonenumber"
                    value={formData.email}
                    onChange={handleChange}
                    css={{ color: 'hotpink' }}
                />
                <InputBirthdate
                    type="email"
                    name="email"
                    placeholder="Birthdate"
                    value={formData.email}
                    onChange={handleChange}
                    css={{ color: 'hotpink' }}
                />
                <InputPassword
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <Link href={{
                    pathname: "/Equipments"
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
            </Form>
        </Page>
    )
}
export default SignUp;
>>>>>>> 346b79da2bc6570016fd8950a4486b5e631fab4d
=======
    </Page>
  )
}
export default SignUp;
>>>>>>> 3fe345e9b4d864aaf1a6a92f9c0cd7dfa2d2cd80
