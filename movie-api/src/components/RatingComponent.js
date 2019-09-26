import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";

function RatingComponent({ vote_average, id }) {
  const [rating, setRating] = useState(0);
  let token = JSON.parse(localStorage.getItem("guestToken"));
  console.log("TOKEN: ", token);

  function deleteRating() {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "/rating?api_key=f57efe1486f26a1000ecc7f73ebf0005&guest_session_id=" +
        token.guest_session_id,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(res => res.text())
      .then(res => {
        console.log(res);
        setRating(() => 0);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleChange(newRating) {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "/rating?api_key=f57efe1486f26a1000ecc7f73ebf0005&guest_session_id=" +
        token.guest_session_id,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-store", // *default, no-cache, reload, force-cache, only-if-cached
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
    fetch(
      "https://api.themoviedb.org/3/guest_session/" +
        token.guest_session_id +
        "/rated/movies?api_key=f57efe1486f26a1000ecc7f73ebf0005",
      { cache: "no-store" }
    )
      .then(resp => resp.json())
      .then(data => {
        let movieList = [...data.results.filter(movie => movie.id === id)];
        if (movieList.length) setRating(movieList[0].rating);
      })
      .catch(err => console.log(err));
  }
  useEffect(() => {
    if (rating === 0) {
      loadInitial();
    }
  });
  return (
    <div className="py-5">
      <StarRatings
        rating={rating}
        starRatedColor="red"
        changeRating={handleChange}
        numberOfStars={10}
        name="rating"
        starDimension="30px"
        starSpacing="5px"
      ></StarRatings>
      <bR></bR>
      <button className="btn btn-danger my-5" onClick={deleteRating}>
        Delete rating
      </button>
    </div>
  );
}
export { RatingComponent };
