import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;

const List = styled.div`
  font-size: 40px;
  position: relative;
  color: #0f2027;
  flex-basis: 50%;
  bottom: -50px;
  left: -230px;
`;

const Suggestions = styled.div``;

const ListContainer = styled.div`
  background-image: linear-gradient(#000000, #434343);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 5px;
  align-items: center
  width: 70%;
  position: relative;
  height: 700px;
  border-radius: 7px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
  top: -10px;
`;
const ListPoster = styled.div`
  background-image: url(${props => props.bg});
  height: 50%;
  width: 70%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
  position: relative;
  top: 100px;
  left: 45px;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) }
  });
  return (
    <>
      <Container>
        <Column>
          <Title>
            {loading
              ? 'Loading...'
              : `${data.movie.title} ${data.movie.isLiked ? '👍' : '👎'}`}
          </Title>
          <Subtitle>
            {data?.movie?.language} · {data?.movie?.rating}
          </Subtitle>
          <Description>{data?.movie?.description_intro}</Description>
        </Column>
        <Poster bg={data?.movie?.medium_cover_image}></Poster>
        <List>Similar Contents</List>
      </Container>
      <ListContainer>
        {data?.suggestions?.map(m => (
          <ListPoster bg={m.medium_cover_image} />
        ))}
      </ListContainer>
    </>
  );
};
