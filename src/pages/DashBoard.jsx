import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import MovieComponent from '../components/MovieComponent';
import MovieInfoComponent from '../components/MovieInfoComponent';


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


const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const RegisterButton = styled.button`
  background-color: orangered;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

const Dashboard = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const navigate = useNavigate();

  

  const onTextChange = (e) => {
    onMovieSelect("");
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => searchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  const searchData = async (searchString) => {
    try {
      const backendUrl = `http://localhost:6060/movies/search?search=${encodeURIComponent(searchString)}`;
      const response = await fetch(backendUrl);
      if (response.ok) {
        const data = await response.json();
        updateMovieList(data);
      } else {
        console.error('Error searching movie data:', response.statusText);
      }
    } catch (error) {
      console.error('Error searching movie data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');  navigate('/');
  };

  // const onSearchButtonClick = () => {
  //   searchData(searchQuery);
  // };

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const backendUrl = `http://localhost:4100/movies?search=${searchQuery}`;
        const response = await axios.get(backendUrl);

        if (response && response.data) {
          updateMovieList(response.data);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    }

    fetchMovieData();
  }, [searchQuery]);

  return (
    <>
      <Container>
        <Header>
          <AppName>
            Marvo Movies
          </AppName>
          <SearchBox>
          <SearchIcon src="../../public/search-icon.svg" />
            <SearchInput
              placeholder="Search Movie..."
              value={searchQuery}
              onChange={onTextChange}
            />
          </SearchBox>
          <RegisterButton onClick={handleLogout}>
            Logout
          </RegisterButton>
        </Header>
        {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="/react-movie-app/movie-icon.svg" />
         )}
      </MovieListContainer>
      </Container>
    </>
  )
}

export default Dashboard;