import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MovieDetails, MainScreen } from "./components";
function App() {
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
