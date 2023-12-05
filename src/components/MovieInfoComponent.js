import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 22px;
  font-weight: 400;

  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;
const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;

  const getSingleMovie = async() => {
    try {
      const backendUrl="http://localhost:6060/movies/:id"
      const response = await fetch(backendUrl.replace(":id", selectedMovie));
      if (response.ok) {
        const data = await response.json();
        setMovieInfo(data);
      } else {
        console.error('Error getting movie data:', response.statusText);
      }
    } catch (error) {
      console.error('Error searching movie data:', error);
    }
  };
// eslint-disable-next-line
  useEffect(async() => {
      await getSingleMovie()
      // eslint-disable-next-line
  }, [selectedMovie]);



  return (
    <Container>
      {movieInfo ? (
        <>
          <CoverImage src={movieInfo?.imageUrl} alt={movieInfo?.title} />
          <InfoColumn>
            <MovieName>
              {movieInfo?.genre}: <span>{movieInfo?.title}</span>
            </MovieName>
            <MovieInfo>
              IMDB Rating: <span>{movieInfo?.rating}</span>
            </MovieInfo>
            <MovieInfo>
              Released: <span>{movieInfo?.year}</span>
            </MovieInfo>
            <MovieInfo>
              Genre: <span>{movieInfo?.genre}</span>
            </MovieInfo>
          </InfoColumn>
          <Close onClick={() => props.onMovieSelect()}>X</Close>
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};
export default MovieInfoComponent;