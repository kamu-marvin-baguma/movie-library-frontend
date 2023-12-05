import React from "react";
import styled from "styled-components";

const MovieContainer = styled.div`
display: flex;
flex-direction: column;
padding: 15px;
width: 300px;
box-shadow: 0 3px 10px 0 black;
cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 420px;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;


const MovieComponent = ({ movie, onMovieSelect }) => {
  
  const { title, price, rating, year, genre, imageUrl, id } = movie;

  return (
    <MovieContainer
      onClick={() => {
        onMovieSelect(id);  
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <CoverImage src={imageUrl} alt={title} />
      <MovieName>{title}</MovieName>
      <InfoColumn>
        <MovieInfo>Year : {year}</MovieInfo>
      </InfoColumn>
      <InfoColumn>
        <MovieInfo>Price : {price}</MovieInfo>
        <MovieInfo>Rating : {rating}</MovieInfo>
      </InfoColumn>
      <InfoColumn>
      <MovieInfo>Type : {genre}</MovieInfo>

      </InfoColumn>
    </MovieContainer>
  );
};
export default MovieComponent;