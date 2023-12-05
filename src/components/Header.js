import styled from "styled-components";
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderContainer = styled.div`
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



const RegisterButton = styled.button`
  background-color: orangered;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const LoginButton = styled.button`
  background-color:orangered;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Header = ({showLogin, setShowLogin }) => {
  return (
      <HeaderContainer>
        <AppName>
          Marvo Movies
        </AppName>
        {showLogin ?<RegisterButton type="submit" onClick={() => setShowLogin(false)}>Register</RegisterButton> : <LoginButton onClick={() => setShowLogin(true)}>
          Login
        </LoginButton>
        }
      </HeaderContainer>
  )
}

export default Header;