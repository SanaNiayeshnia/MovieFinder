import "./Watchedmovie.css";
export default function Watchedmovie({
  watchedmovie,
  selectedId,
  setSelectedId,
  deleteWatchedMovieHandler,
}) {
  return (
    <li
      className="movie watched-movie"
      onClick={() =>
        setSelectedId(
          selectedId === watchedmovie.imdbID ? null : watchedmovie.imdbID
        )
      }
    >
      <div>
        <img src={watchedmovie.Poster} alt="pic" className="movie-pic" />
        <div className="movie-info">
          <p className="movie-title">{watchedmovie.Title}</p>
          <div>
            <p className="imdb-rating">⭐{watchedmovie.imdbRating}</p>
            <p className="user-rating">🌟{watchedmovie.userRating}</p>
            <p className="movie-duration">⌛{watchedmovie.Runtime} min</p>
          </div>
        </div>
      </div>

      <i
        className="fa-solid fa-minus delete-watched-btn"
        onClick={(event) =>
          deleteWatchedMovieHandler(event, watchedmovie.imdbID)
        }
      ></i>
    </li>
  );
}
