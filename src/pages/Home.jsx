import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../utils/constants'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Header = styled.div`
  background-color: black;
  color: orangered;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const MovieImage = styled.img`
  width: 55px;
  height: 48px;
  margin: 15px;
`;

const RegisterButton = styled.button`
  background-color: orangered;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const LoginButton = styled.button`
  background-color: orangered;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;


const RegisterFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;  // Align to the right
    justify-content: center;
    height: 100vh;
    padding: 20px;
    background-image: url('/moviebackground.jpg');
    background-size: cover;
    background-position: center;
    justify-content: start;
`;

const RegisterForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    
`
const RegisterFormInput = styled.input`
  margin-top: 30px;
  margin-bottom: 10px;
  padding: 15px;
  width: 88%;
`;

const BackgroundCard = styled.div`
  width: 38%;
  padding: 20px;
  border-radius: 10px;
  background-color: white;  // Set the background color to white
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  // Optional: Add a box shadow for a card-like appearance
  height: 40vh;
`;

const Home = () => {
  // Registration form
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate()

  const handleRegisterFormSubmit = async(e) => {
    e.preventDefault();
    console.log("User registered:", {
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
    });
    try {
      if (registerEmail && registerPassword && registerUsername) {
        const result = await axios.post(`${API_URL}/auth/register`, {
          username: registerUsername,
          password: registerPassword,
          email: registerEmail
        })
        console.log('rre', result)
        if(result.status===201) {
          navigate('/login')
        } else {
          toast('User registration failed, contact Administrator')
        }
      }
    } catch (error) {
      toast('User registration failed, contact Administrator')
    }

  };


  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="logo12.jpg" />
          Marvo Movies
        </AppName>
        <LoginButton>
          Login
        </LoginButton>
      </Header>
      <RegisterFormContainer onSubmit={handleRegisterFormSubmit}>
        <RegisterForm >
          <BackgroundCard>
            <RegisterFormInput
              type="text"
              placeholder="Username"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
              required
            />
            <RegisterFormInput
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
            <RegisterFormInput
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
            <RegisterButton type="submit">Get Started</RegisterButton>
          </BackgroundCard>
        </RegisterForm>
      </RegisterFormContainer>
      <ToastContainer />
    </Container>
  )
}

export default Home;