import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import "bootstrap/dist/css/bootstrap.css";
import "./client/styles.scss";

import App from "./client/App";

ReactDOM.render(
  <Router>
    <App path="*" />
  </Router>,
  document.getElementById("root")
);
