import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
const axios = require("axios");
function RatingComponent({ vote_average, id }) {
  const [rating, setRating] = useState(0);
  let token = JSON.parse(localStorage.getItem("guestToken"));
  console.log("TOKEN: ", token);

  function handleChange(newRating) {
    console.log("TREBALO BI BITI: ", newRating);
    //OVO RADI
    // axios
    //   .post(
    //     "https://api.themoviedb.org/3/movie/" +
    //       id +
    //       "/rating?api_key=f57efe1486f26a1000ecc7f73ebf0005&guest_session_id=" +
    //       token.guest_session_id,
    //     {
    //       value: newRating
    //     },
    //     { cache: "no-store" }
    //   )
    //   .then(function(response) {
    //     console.log(response);
    //     setRating(() => newRating);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });

    fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "/rating?api_key=f57efe1486f26a1000ecc7f73ebf0005&guest_session_id=" +
        token.guest_session_id,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify({
          value: newRating
        }) // body data type must match "Content-Type" header
      }
    )
      .then(function(response) {
        console.log(response);
        setRating(() => newRating);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function loadInitial() {
    // OVO RADII SIGURNO
    fetch(
      "https://api.themoviedb.org/3/guest_session/" +
        token.guest_session_id +
        "/rated/movies?api_key=f57efe1486f26a1000ecc7f73ebf0005",
      { cache: "no-store" }
    )
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        let movieList = [...data.results.filter(movie => movie.id === id)];
        if (movieList.length) setRating(movieList[0].rating);
      })
      .catch(err => console.log(err));
  }
  useEffect(() => {
    if (rating === 0) {
      console.log("UCITAVAM...");
      loadInitial();
    }
  });
  return (
    <div>
      This is a rating comp.{rating}
      <StarRatings
        rating={rating}
        starRatedColor="yellow"
        changeRating={handleChange}
        numberOfStars={10}
        name="rating"
      ></StarRatings>
    </div>
  );
}
export { RatingComponent };