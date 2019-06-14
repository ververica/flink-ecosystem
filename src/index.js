import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import { createHistory, LocationProvider } from "@reach/router";
import App from "./client/components/App";
import "bootstrap/dist/css/bootstrap.css";
import "client/assets/markdown.scss";

ReactGA.initialize("UA-52545728-1");

const history = createHistory(window);
history.listen(({ location }) => {
  console.log("location: ", location);
  ReactGA.pageview(location.href + location.search);
});

ReactDOM.render(
  <LocationProvider history={history}>
    <App />
  </LocationProvider>,
  document.getElementById("root")
);

// @TODO edit packages
// @TODO delete packages
// @TODO edit comments
// @TODO delete comments

// @TODO upload images

// @TODO share with team

// @TODO admins (v2)
// (list of github usernames that can always delete)
