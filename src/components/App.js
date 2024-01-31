import "./App.css";
import Movielist from "./Movielist";
import Navbar from "./Navbar";
import Box from "./Box";
import Loader from "./Loader";
import Error from "./Error";
import Watchedmovielist from "./watchedmovielist";
import WatchedMoviesInfo from "./Watchedmoviesinfo";
import MovieDetails from "./MovieDetails";
import { useEffect, useState, useRef } from "react";

function App() {
  const [movieData, setMovieData] = useState([]);
  const [watchedMovieData, setWatchedMovieData] = useState(
    () => JSON.parse(localStorage.getItem("watchedList")) || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const searchInputEl = useRef(null);

  const key = 56290255;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
          { signal: controller.signal }
        );
        if (res.status !== 200) throw new Error("Something Went wrong!");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie Not Found!");

        setMovieData(data.Search);
        setTotalResults(data.Search.length);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setError("");
      setMovieData([]);
      return;
    }
    fetchMovies();
    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem("watchedList", JSON.stringify(watchedMovieData));
  }, [watchedMovieData]);

  useEffect(() => {
    searchInputEl.current.focus();
  }, []);

  return (
    <div className="App">
      <Navbar
        setQuery={setQuery}
        query={query}
        totalResults={totalResults}
        searchInputEl={searchInputEl}
      />
      <div className="lists-container">
        <Box width={"300px"}>
          {isLoading ? (
            <Loader />
          ) : !isLoading && !error ? (
            <Movielist
              movieData={movieData}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ) : (
            <Error message={error} />
          )}
        </Box>
        <Box width={"400px"}>
          {selectedId === null ? (
            <>
              <WatchedMoviesInfo watchedMovieData={watchedMovieData} />
              <Watchedmovielist
                watchedMovieData={watchedMovieData}
                setWatchedMovieData={setWatchedMovieData}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            </>
          ) : (
            <MovieDetails
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              watchedMovieData={watchedMovieData}
              setWatchedMovieData={setWatchedMovieData}
              key={selectedId}
            />
          )}
        </Box>
      </div>
    </div>
  );
}

export default App;
