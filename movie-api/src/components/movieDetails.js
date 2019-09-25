import React, { useState, useEffect } from "react";
import { RatingComponent } from "./";
function MovieDetails(props) {
  const [movie, fetchMovie] = useState({});
  useEffect(() => {
    // if (!movieData.length) fetchPage(page);
    if (Object.keys(movie).length === 0)
      fetch(
        "https://api.themoviedb.org/3/movie/" +
          props.match.params.id +
          "?api_key=f57efe1486f26a1000ecc7f73ebf0005&language=en-US"
      )
        .then(result => {
          return result.json();
        })
        .then(data => {
          fetchMovie(() => data);
        })
        .catch(err => {
          console.log(err);
        });
  });
  // language and production companies
  let {
    title,
    release_date,
    original_language,
    overview,
    backdrop_path,
    vote_average,
    popularity,
    production_companies,
    id
  } = movie;
  return Object.keys(movie).length === 0 ? (
    <div>Loading...</div>
  ) : (
    <div className="">
      <h1>
        {title} ({release_date.slice(0, 4)})
      </h1>
      {console.log(movie)}
      <img
        src={"https://image.tmdb.org/t/p/w500" + backdrop_path}
        className="card-img-top"
        alt="..."
      />
      <div>{overview}</div>

      <p>
        Rating: {vote_average} <br />
        Popularity: {popularity} <br />
        Language: {original_language} <br />
        Production companies:{" "}
        {production_companies.map(({ name }, i) =>
          i === production_companies.length - 1 ? name : name + ", "
        )}
      </p>
      <RatingComponent vote_average={vote_average} id={id}></RatingComponent>
    </div>
  );
}

export { MovieDetails };
