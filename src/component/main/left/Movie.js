import React from "react";

export default function Movie({
  movie,

  submitSelectedMove,
}) {
  return (
    <>
      <li
        onClick={() => {
          submitSelectedMove(movie.imdbID);
        }}
      >
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    </>
  );
}
