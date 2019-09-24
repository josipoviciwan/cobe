import React, { useState, useEffect } from "react";
import { MovieCard } from "./";

const btnStyle = {
  borderRadius: "100%",
  width: "60px",
  height: "60px"
};

function MainScreen() {
  const [page, setPage] = useState(1);
  const [movieData, setMovieData] = useState([]);

  const handlePage = () => {
    fetchPage(page + 1);
  };

  const fetchPage = pageNum =>
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=f57efe1486f26a1000ecc7f73ebf0005&language=en-US&page=" +
        pageNum
    )
      .then(result => {
        return result.json();
      })
      .then(data => {
        setMovieData(movieData => [...movieData, ...data.results]);
        setPage(page => page + 1);
      })
      .catch(err => {
        console.log(err);
      });

  useEffect(() => {
    if (!movieData.length) fetchPage(page);
  });
  return movieData.length ? (
    <div className="text-center">
      <div className="row">
        {movieData.map(movie => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-dark "
        style={btnStyle}
        onClick={handlePage}
      >
        Load
      </button>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
export { MainScreen };
