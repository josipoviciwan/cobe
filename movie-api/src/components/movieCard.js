import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ratingStyle = {
  width: "80px",
  height: "80px",
  borderBottomLeftRadius: "50px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  flexDirection: "column",
  position: "absolute",
  right: "0",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  fontSize: "30px",
  fontWeight: "bold"
};

const linkStyle = {
  textDecoration: "none",
  color: "black"
};
const linkStyleHover = {
  textDecoration: "none",
  color: "#606060"
};
function MovieCard({ movie }) {
  const [hover, setHover] = useState(false);
  useEffect(() => {});
  function handleHover() {
    setHover(hover => !hover);
  }

  return (
    <div
      className={
        "col col-12  col-md-6 col-lg-4 col-xl-3 " + (hover ? "p-2" : "p-1")
      }
    >
      <Link
        to={"/movie/" + movie.id}
        style={hover ? linkStyleHover : linkStyle}
      >
        <div
          className="card h-100 "
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
          <img
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            className="card-img-top rounded-0"
            alt="..."
          ></img>
          <div className="" style={ratingStyle}>
            {movie.vote_average}
          </div>
          <div className="card-body">
            <h5 className="card-title">
              {movie.title} ({movie.release_date.slice(0, 4)})
            </h5>
            <p className="card-text">
              Language: {movie.original_language.toUpperCase()}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
export { MovieCard };
