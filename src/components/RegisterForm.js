import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { API_URL } from '../utils/constants';

const RegisterButton = styled.button`
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
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  background: #141414;
`;

const RegisterFormElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const RegisterFormInput = styled.input`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 15px;
  width: 88%;
`;

const BackgroundCard = styled.div`
  width: 80%;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AboveFormText = styled.p`
  color: #ffffff;
  font-size: 48px;
  font-family: Arial, Helvetica, sans-serif
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
`;

const AnotherAboveFormText = styled.p`
  color: white; 
  font-size: 30px; 
  font-family: Arial, Helvetica, sans-serif
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px;
`;

const BelowFormText = styled.p`
  color: white; 
  font-size: 20px;
  font-family: 'Verdana', sans-serif; 
  text-align: center;
  font-weight: bold;
  margin-top: 5px;
`;

const RegisterForm = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const navigate = useNavigate();

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (registerEmail && registerPassword && registerUsername) {
        const result = await axios.post(`${API_URL}/auth/register`, {
          username: registerUsername,
          password: registerPassword,
          email: registerEmail,
        });
        if (result && result.data?.token) {
          navigate('/dashboard');
          localStorage.setItem('token', result.data.token);
        } else {
          toast('User registration failed, contact Administrator');
        }
      }
    } catch (error) {
      toast('User registration failed, contact Administrator');
    }
  };

  return (
    <RegisterFormContainer onSubmit={handleRegisterFormSubmit}>
      <AboveFormText>Your best local and international movie palour.</AboveFormText>
      <AnotherAboveFormText>Register and start your enjoyment now</AnotherAboveFormText>
      
      <RegisterFormElement>
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
          <RegisterButton type="submit">Let's Watch</RegisterButton>
        </BackgroundCard>
      </RegisterFormElement>
      <BelowFormText>Source Of Happiness.</BelowFormText>
      
    </RegisterFormContainer>
  );
};

export default RegisterForm;