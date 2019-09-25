import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MovieDetails, MainScreen } from "./components";

function App() {
  let fetchGuestToken = () => {
    fetch(
      "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=f57efe1486f26a1000ecc7f73ebf0005"
    )
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log("New guest token fetched")
        sessionStorage.setItem("guestToken", JSON.stringify(data));
      });
  };

  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("guestToken"));
    if (token) {
      let dateString = token.expires_at;
      let expireDate = new Date(dateString);
      let currDate = new Date();

      if (expireDate < currDate) {
        fetchGuestToken();
      }
    } else {
      fetchGuestToken();
    }
  });
  return (
    <BrowserRouter>
      <main className="container">
        <Switch>
          <Route exact path="/" component={MainScreen} />
          <Route exact path="/movie/:id" component={MovieDetails} />
          <Route path="/*" component={MainScreen} />
        </Switch>
      </main>

      <footer> This is a Cobe app</footer>
    </BrowserRouter>
  );
}

export default App;
