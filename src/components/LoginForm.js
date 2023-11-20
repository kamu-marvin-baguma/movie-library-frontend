// LoginForm.js

import React, { useState } from "react";
import styled from "styled-components";


const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const LoginFormInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
`;

const LoginButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // My logic
        console.log("User logged in:", { username, password });
    };

    return (
        <LoginFormContainer>
            <form>
                <LoginFormInput
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <LoginFormInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <LoginButton onClick={handleLogin}>Login</LoginButton>
            </form>
        </LoginFormContainer>
    );
};

export default LoginForm;