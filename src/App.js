// API KEY https://www.omdbapi.com/?i=tt3896198&apikey=ce7d3c5f
// `http://www.omdbapi.com/?s=${query}&apikey=${KEY}`
import { useState } from "react";

import "./index.css";

import NavBar from "./component/nav/NavBar";
import Main from "./component/main/Main";

import NumResult from "./component/nav/NumResult";
import Search from "./component/nav/Search";
import Box from "./component/main/Box";

import MovieList from "./component/main/left/MovieList";
import WatchedSummary from "./component/main/right/WatchedSummary";
import WatchMovieList from "./component/main/right/WatchMovieList";
import Loader from "./component/supportComponent/Loader";
import ErrorMessage from "./component/supportComponent/ErrorMessage";
import SelectedMovie from "./component/main/right/SelectedMovie";
import { useMovies } from "./customHooks/useMovies";
import { useLocalStorage } from "./customHooks/useLocalStorage";

export default function App() {
  const [selectedMovieID, setSelectedMovieID] = useState(null);
  const [query, setQuery] = useState("");
  // Custom hooks
  const [movies, isLoading, e] = useMovies(query);
  const [watched, setWatched] = useLocalStorage([], "watched");
  const noOfResults = movies?.length;

  function handleWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleSelectedMove(id) {
    setSelectedMovieID((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie(id) {
    setSelectedMovieID(null);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((mov) => mov.imdbID !== id));
  }

  return (
    <>
      {/* Navigation Bar */}
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResult noOfResults={noOfResults} />
      </NavBar>

      {/* The Main content */}
      <Main>
        {/* The left Box*/}
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !e && (
            <MovieList
              movies={movies}
              submitSelectedMove={handleSelectedMove}
            />
          )}
          {e && <ErrorMessage message={e} />}
        </Box>

        {/* The right Box*/}
        <Box>
          {selectedMovieID ? (
            <SelectedMovie
              selectedMovieID={selectedMovieID}
              onCloseMovie={handleCloseMovie}
              submitWatchedMovie={handleWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchMovieList
                watched={watched}
                submitDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
