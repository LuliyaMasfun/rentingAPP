
import React, { useState } from 'react'
import { css, styled } from '@emotion/react';

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


  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input 
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  )

  const Button = styled.button`
  border: none;
  `
}

export default Login