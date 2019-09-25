import React, { useEffect } from "react";
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

function MovieCard({ movie }) {
  useEffect(() => {
    // console.log(movie);
  });
  return (
    <div className="col col-12  col-md-6 col-lg-4 col-xl-3 p-4">
      <Link to={"/movie/" + movie.id}>
        <div className="card h-100 ">
          <img
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            className="card-img-top"
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
