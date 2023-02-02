import React from "react";
import styled from "@emotion/styled";
import { useState } from "react";
import Link from "next/link";

const Page = styled.div`
  height: 844px;
  background-image: url('/bg.png');
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
    opacity:0.7;
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
    opacity:0.7;
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
    opacity:0.7;
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
    opacity:0.7;
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
    opacity:0.7;
`;

const ButtonSignUp = styled.button`
position: absolute;
 border: none;
 margin-top: 340px;
margin-left: -140px;
  padding: 10px;
  width: 280px;
  background-color:white;
  color: #1E1E1E;
  font-weight: 700;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0px 3px rgba(0, 0, 0, 0.3);
`;

const UnderlinedText = styled.span`
  text-decoration: underline;
`;

const Login = styled.span`
position:absolute;
margin-top: 46vh;
font-weight: 300;
font-size: 12px;
color: white;
margin-left: -10vh;
`;


const SignUp = () => {

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        phonenumber: '',
        birthdate: '',
        password: ''
    })

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        console.log(formData)
        // Add code to send the form data to the server and authenticate register request
    }

    return (

        <Page>
            <Title>Create an account,</Title>
            <Subtitle>Lets get started, please enter your details</Subtitle>
            
            <Form onSubmit={handleSubmit}>
                <InputFirstname
                    type="email"
                    name="email"
                    placeholder="Firstname"
                    value={formData.email}
                    onChange={handleChange}
                    css={{ color: 'hotpink' }}
                />
                <InputLastname
                    type="email"
                    name="email"
                    placeholder="Lastname"
                    value={formData.email}
                    onChange={handleChange}
                    css={{ color: 'hotpink' }}
                />
                <InputEmail
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    css={{ color: 'hotpink' }}
                />
                <InputAddress
                    type="email"
                    name="email"
                    placeholder="Address"
                    value={formData.email}
                    onChange={handleChange}
                    css={{ color: 'hotpink' }}
                />

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