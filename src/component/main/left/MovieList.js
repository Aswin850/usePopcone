import React from "react";
import Movie from "./Movie";

export default function MovieList({ movies, submitSelectedMove }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          submitSelectedMove={submitSelectedMove}
        />
      ))}
    </ul>
  );
}
