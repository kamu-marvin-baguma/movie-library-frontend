import React, { useState } from 'react'
import styled from "styled-components";
import Axios from "axios";

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

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;

const MovieImage = styled.img`
  width: 55px;
  height: 48px;
  margin: 15px;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const RegisterButton = styled.button`
  background-color: orangered;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Dashboard = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  // eslint-disable-next-line
  const [movieList, updateMovieList] = useState([]);
  // eslint-disable-next-line
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    const backendUrl = "http://localhost:6060/api/v1/movies";
    const response = await Axios.get(backendUrl);
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("");
    updateSearchQuery(e.target.value);
    fetchData(e.target.value);
  };

  return (
    <>
      <Container>
        <Header>
          <AppName>
            <MovieImage src="logo12.jpg" />
            Marvo Movies
          </AppName>
          <SearchBox>
          <SearchIcon src="../../public/search-icon.svg" />
            <SearchInput
              placeholder="Search Movie"
              value={searchQuery}
              onChange={onTextChange}
            />
          </SearchBox>
          <RegisterButton>
            Logout
          </RegisterButton>
        </Header>
      </Container>
    </>
  )
}

export default Dashboard;