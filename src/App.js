import { useState } from 'react';
import styled from 'styled-components';
import MovieComponent from './Components/MovieComponent'
import axios from 'axios';
import MovieInfoComponent from './Components/MovieInfoComponent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  color: white;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;

`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MovieImage = styled.img`
  width: 48 px;
  height: 48px;
  margin: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  align-items: center;
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
  gap: 24px;
  justify-content: space-evenly;
`;

const PlaceHolder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

const App = () => {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString)=> {
    var url = 'http://www.omdbapi.com/?s=' + searchString + '&apikey=f502480c';
    const response = await axios.get(url);
    console.log(response.data.Search);
    updateMovieList(response.data.Search);
  }

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500)
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/movie-icon.svg"/>
            React Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.svg"/>
          <SearchInput placeholder='Search Movie' value={searchQuery} onChange={onTextChange}/>
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length? movieList.map((movie, index)=> (<MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect} />))
        : <PlaceHolder src='/movie-icon.svg'/> }
      </MovieListContainer>
    </Container>
  );
};

export default App;