import "./watchedmovielist.css";
import Watchedmovie from "./Watchedmovie";
export default function Watchedmovielist({
  watchedMovieData,
  setWatchedMovieData,
  selectedId,
  setSelectedId,
}) {
  function deleteWatchedMovieHandler(event, id) {
    event.stopPropagation();
    setWatchedMovieData((watchedMovieData) =>
      watchedMovieData.filter((watchedMovie) => watchedMovie.imdbID !== id)
    );
  }
  return (
    <ul className="watchedmovies-list">
      {watchedMovieData.map((watchedmovie) => (
        <Watchedmovie
          watchedmovie={watchedmovie}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          deleteWatchedMovieHandler={deleteWatchedMovieHandler}
          key={watchedmovie.imdbID}
        />
      ))}
    </ul>
  );
}
