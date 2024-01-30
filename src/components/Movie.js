import "./Movie.css";
export default function Movie({ movie, selectedId, setSelectedId }) {
  return (
    <li
      className={`${selectedId === movie.imdbID && "selected"} movie`}
      onClick={() =>
        setSelectedId(selectedId === movie.imdbID ? null : movie.imdbID)
      }
    >
      <img src={movie.Poster} alt="pic" className="movie-pic" />
      <div className="movie-info">
        <p className="movie-title">{movie.Title}</p>
        <p>
          📅
          <span className="movie-pub-year">{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
