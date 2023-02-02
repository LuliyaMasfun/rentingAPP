
import React, { useState } from 'react'
import styled from "@emotion/styled";
import { useHistory } from 'react-router-dom';

const Page = styled.div`
  height: 100vh;
  background-image: url('/bgImgSignUp.png');
  background-size: cover;
  background-position: center;
  background-color: #1E1E1E;
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
`;

const Button = styled.button`
 border: none;
 margin-top: 412px;
  padding: 10px;
  width: 260px;
  background-color:white;
  color: #1E1E1E;
  font-weight: 700;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0px 3px rgba(0, 0, 0, 0.3);
`
const ForgotPasswordLink = styled.a`
text-decoration: underline;
cursor: pointer;
color: #FFFFF;

&:hover {
  color: #777;
}
`;








const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(formData)
    // Add code to send the form data to the server and authenticate the user
  }

  const history = useHistory();

  function handleForgotPassword() {
    history.push('/reset-password');
  }



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
        css={{ color: 'hotpink' }}
      />
      <InputPassword 
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
       <ForgotPasswordLink onClick={handleForgotPassword}>
      Forgot password
    </ForgotPasswordLink>
    
      <Button type="submit">Log in</Button>
    </Form>
    </Page>
  )
}

export default Login