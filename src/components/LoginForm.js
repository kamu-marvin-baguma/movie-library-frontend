import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";


const LoginFormContainer = styled.form`
    display: flex;
    justify-content: center;
    padding: 200px;
    height: 100vh;
    background-image: url('/moviebg5.jpg');
    background-size: cover;
    background-position: center;
    
`;

const LoginFormElement = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
`;

const LoginFormInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
   
`;

const LoginButton = styled.button`
  background-color: #2ecc71;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-items: center; 
`;

const BackgroundCard = styled.div`
  width: auto;
  padding: 25px;
  align-items: center;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: auto;
`;

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (email && password) {
                const result = await axios.post(`${API_URL}/auth/login`, {
                    password: password,
                    email: email
                })
                if (result && result.data?.token) {
                    navigate('/dashboard');
                    localStorage.setItem('token', result.data.token);
                } else {
                    toast('User Login failed, contact Administrator');
                }
            }
        } catch (error) {
            toast('User Login failed, contact Administrator');
        }
    };

         
        return (
            <LoginFormContainer onSubmit={handleLogin}>
                <LoginFormElement>
                    <BackgroundCard>
                        <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
                            Welcome! Please login to access your account.
                        </p>
                        <LoginFormInput
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <LoginFormInput
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <LoginButton type="submit">Login</LoginButton>
                        <p style={{ textAlign: 'center', marginTop: '20px' }}>
                            Don't have an account? <a href="/">Sign up here</a>.
                        </p>
                    </BackgroundCard>
                </LoginFormElement>
            </LoginFormContainer>
        );

        
    }
    
    export default LoginForm;
