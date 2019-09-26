import React, { useState, useEffect } from "react";
import { MovieCard, MovieModal } from "./";

const btnStyle = {
  position: "fixed",
  right: "10px",
  bottom: "10px",
  zIndex: "1",
  border: "10px solid black",
  color: "black",
  fontWeight: "bold"
};

function MainScreen(props) {
  const [page, setPage] = useState(1);
  const [movieData, setMovieData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  function hideModal() {
    setShowModal(() => false);
  }
  function displayModal() {
    setShowModal(() => true);
  }
  const handlePage = () => {
    fetchPage(page + 1);
  };

  const fetchPage = pageNum =>
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=f57efe1486f26a1000ecc7f73ebf0005&language=en-US&page=" +
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
      <button
        className="btn btn-warning "
        style={btnStyle}
        type="button"
        onClick={displayModal}
      >
        RANDOM
      </button>
      <MovieModal
        show={showModal}
        hideModal={hideModal}
        history={props.history}
      ></MovieModal>
      <div className="row">
        {movieData.map(movie => (
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
      </div>
      <button type="button" className="btn btn-dark my-5 " onClick={handlePage}>
        Load more . . .
      </button>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
export { MainScreen };
