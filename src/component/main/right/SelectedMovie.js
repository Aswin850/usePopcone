import React, { useEffect, useRef, useState } from "react";

import StartRating from "../../supportComponent/StartRating";
import ErrorMessage from "../../supportComponent/ErrorMessage";
import Loader from "../../supportComponent/Loader";
import { useKey } from "../../../customHooks/useKey";

const KEY = "ce7d3c5f";

export default function SelectedMovie({
  selectedMovieID,
  onCloseMovie,
  submitWatchedMovie,
  watched,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [rating, setRating] = useState(0);

  const countRef = useRef(0);

  const isWatched = watched.find((mov) => mov.imdbID === selectedMovieID);

  const watchedUserRating = watched.filter(
    (mov) => mov.imdbID === selectedMovieID
  )[0]?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  function handleAdd() {
    const newWatchedMovieData = {
      userRating: rating,
      imdbID: selectedMovieID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      countRatingDecisions: countRef.current,
    };

    submitWatchedMovie(newWatchedMovieData);
    onCloseMovie();
  }

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie| ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovieDetails() {
        try {
          setIsLoading(true);
          setErr("");
          const res = await fetch(
            `http://www.omdbapi.com/?i=${selectedMovieID}&apikey=${KEY}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }
          const data = await res.json();

          if (data?.Response === "False") throw new Error("Movie not found");
          setMovieDetails(data);
          setErr("");
        } catch (error) {
          setErr(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovieDetails();
      return function () {
        controller.abort();
      };
    },
    [selectedMovieID]
  );

  useEffect(() => {
    if (rating) countRef.current = countRef.current + 1;
  }, [rating]);

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && !err && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating}
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {isWatched ? (
                <p> You rated this movie: {watchedUserRating} ⭐️</p>
              ) : (
                <>
                  <StartRating
                    rating={rating}
                    setRating={setRating}
                    maxRating={10}
                    size={24}
                  />
                  {rating > 0 ? (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to list
                    </button>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {err && <ErrorMessage message={err} />}
    </div>
  );
}
