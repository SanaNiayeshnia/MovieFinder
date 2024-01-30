import { useEffect, useState } from "react";
import "./MovieDetails.css";
import RatingStars from "./RatingStars";
import Loader from "./Loader";
import Error from "./Error";
export default function MovieDetails({
  selectedId,
  setSelectedId,
  watchedMovieData,
  setWatchedMovieData,
}) {
  const key = 56290255;
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isPlotCollapsed, setIsPlotCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [error, setError] = useState(null);

  const isMovieRatedbefore = watchedMovieData.find(
    (watchedMovie) => watchedMovie.imdbID === selectedId
  );

  function addWatchedMovieHandler() {
    const newWatchedMovie = {
      imdbID: selectedMovie.imdbID,
      Title: selectedMovie.Title,
      Year: selectedMovie.Year,
      Poster: selectedMovie.Poster,
      Runtime: Number(selectedMovie.Runtime.split(" ").at(0)),
      imdbRating: Number(selectedMovie.imdbRating),
      userRating: userRating,
    };
    setWatchedMovieData((watchedMovieData) => [
      ...watchedMovieData,
      newWatchedMovie,
    ]);
    setSelectedId(null);
  }

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}&plot=full`
        );
        if (res.status !== 200) throw new Error("Fetching data has failed");
        const data = await res.json();
        if (data.Response === "False")
          throw new Error("fetching data has failed");
        setSelectedMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    document.title = "Movie | " + selectedMovie?.Title;
    return () => {
      document.title = "UsePopCorn";
    };
  }, [selectedMovie?.Title]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Escape") setSelectedId(null);
    });
  }, [setSelectedId]);

  const collapsedPlot =
    selectedMovie?.Plot.split(" ").slice(0, 30).join(" ") + "...";

  return (
    <div className="movie-details">
      {isLoading ? (
        <Loader />
      ) : !isLoading && !error ? (
        <>
          <div className="top">
            <i
              className="fa-solid fa-arrow-left close-movie-details-btn"
              onClick={() => setSelectedId(null)}
            ></i>
            <img
              className="movie-pic"
              src={selectedMovie?.Poster}
              alt={selectedMovie?.Title}
            />
            <div className="movie-info">
              <h3>{selectedMovie?.Title}</h3>
              <p>
                {selectedMovie?.Released} - {selectedMovie?.Runtime}
              </p>
              <p>{selectedMovie?.Genre}</p>
              <p>⭐ {selectedMovie?.imdbRating} IMDB rating</p>
            </div>
          </div>
          {isMovieRatedbefore ? (
            <p>
              You've rated this movie before: {isMovieRatedbefore.userRating} ⭐
            </p>
          ) : (
            <section className="mid-sec">
              <RatingStars setUserRating={setUserRating} />
              {userRating > 0 && (
                <button onClick={addWatchedMovieHandler}>+ add to list</button>
              )}
            </section>
          )}

          <div className="bottom">
            <div className="plot">
              {isPlotCollapsed ? collapsedPlot : selectedMovie?.Plot}
              <span
                className="expand-text-btn"
                onClick={() =>
                  setIsPlotCollapsed((isPlotCollapsed) => !isPlotCollapsed)
                }
              >
                {isPlotCollapsed ? "read more" : "read less"}
              </span>
            </div>
            <p className="stars">Starring {selectedMovie?.Actors}</p>
            <p className="directors">Directed by {selectedMovie?.Director}</p>
          </div>
        </>
      ) : (
        <Error />
      )}
    </div>
  );
}
