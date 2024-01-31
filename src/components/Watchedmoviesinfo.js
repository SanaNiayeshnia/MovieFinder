import { useState } from "react";
import "./Watchedmoviesinfo.css";
export default function WatchedMoviesInfo({ watchedMovieData = [] }) {
  const watchedCount = watchedMovieData.length;
  const avgImdbRating = (
    watchedMovieData.reduce((sum, movie) => {
      sum += movie.imdbRating;
      return sum;
    }, 0) / watchedCount
  ).toFixed(1);

  const avgUserRating = (
    watchedMovieData.reduce((sum, movie) => (sum += movie.userRating), 0) /
    watchedCount
  ).toFixed(1);

  const avgRuntime = (
    watchedMovieData.reduce((sum, movie) => (sum += movie.Runtime), 0) /
    watchedCount
  ).toFixed(0);

  return (
    <div className="watchedmovies-info">
      <p className="box-title">Movies You Watched</p>
      <div className="watched-result">
        <p className="watched-count">
          🔢{isNaN(watchedCount) ? 0 : watchedCount} movies
        </p>
        <p className="avg-imdb-rating">
          ⭐{isNaN(avgImdbRating) ? 0 : avgImdbRating}
        </p>
        <p className="avg-user-rating">
          🌟{isNaN(avgUserRating) ? 0 : avgUserRating}
        </p>
        <p className="avg-movie-duration">
          ⌛{isNaN(avgRuntime) ? 0 : avgRuntime} min
        </p>
      </div>
    </div>
  );
}
