import Movie from "./Movie";
import "./Movielist.css";
export default function Movielist({
  movieData = [],
  setSelectedId,
  selectedId,
}) {
  return (
    <ul className="movielist">
      {movieData.map((movie) => (
        <Movie
          movie={movie}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
