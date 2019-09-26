import React, { useState, useEffect } from "react";

const modalStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.6)"
};

const modalMainStyle = {
  position: "fixed",
  background: "white",
  width: "80%",
  height: "auto",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)"
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function MovieModal({ show, hideModal, history }) {
  const [genres, setGenres] = useState([]);
  const [choice, setChoice] = useState(null);

  useEffect(() => {
    if (!genres.length) {
      fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=f57efe1486f26a1000ecc7f73ebf0005&language=en-US"
      )
        .then(resp => resp.json())
        .then(data => {
          setGenres(data.genres);
        });
    }
  });

  const showHideClassName = show ? "modal d-block" : "modal d-none";

  function handleChange({ target }) {
    setChoice(() => target.id);
  }

  function handleSubmit() {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=f57efe1486f26a1000ecc7f73ebf0005&language=en-US&include_adult=false&include_video=false&page=1&with_genres=" +
        choice
    )
      .then(resp => resp.json())
      .then(({ total_pages, results }) => {
        let rndPage = getRandomInt(1, total_pages);
        let rndIndex = getRandomInt(0, 19);
        fetch(
          "https://api.themoviedb.org/3/discover/movie?api_key=f57efe1486f26a1000ecc7f73ebf0005&language=en-US&include_adult=false&include_video=false&page=" +
            rndPage +
            "&with_genres=" +
            choice
        )
          .then(resp => resp.json())
          .then(({ results }) => {
            history.push("/movie/" + results[rndIndex].id);
          });
      });
  }

  return (
    <div className={showHideClassName} style={modalStyle}>
      <section className="modal-main p-2" style={modalMainStyle}>
        <button
          className="btn btn-danger d-block ml-auto"
          type="button"
          onClick={hideModal}
        >
          CLOSE
        </button>
        <h1>Pick a genre</h1>

        <div>
          <ul className="list-unstyled text-left d-inline-block">
            {genres.map(genre => (
              <li key={genre.id}>
                <input
                  type="radio"
                  name="genre"
                  value={genre.name}
                  onClick={handleChange}
                  id={genre.id}
                />{" "}
                {genre.name} <br />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-success "
        >
          Submit
        </button>
      </section>
    </div>
  );
}
export { MovieModal };
