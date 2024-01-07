import React from "react";
import WatchedMovie from "./WatchedMovie";

export default function WatchMovieList({ watched, submitDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          submitDeleteWatched={submitDeleteWatched}
        />
      ))}
    </ul>
  );
}
