import React from "react";

export default function WatchedMovie({ movie, submitDeleteWatched }) {
  return (
    <>
      <li>
        <img src={movie.poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
          <button
            className="btn-delete"
            onClick={() => submitDeleteWatched(movie.imdbID)}
          >
            X
          </button>
        </div>
      </li>
    </>
  );
}
