// ***THESE MUST GO FIRST***
// If not, styled-components will render it's style tag *above* the bootstrap
// tag and nothing will work.
import "bootstrap/dist/css/bootstrap.css";
import "client/assets/markdown.scss";

import React from "react";
import ReactDOM from "react-dom";
import App from "./client/components/App";

ReactDOM.render(<App />, document.getElementById("root"));

// @TODO delete packages

// @TODO edit comments
// @TODO delete comments
// @TODO allow free-form license entry

// @TODO upload images

// @TODO share with team
// @TODO search

// @TODO admins (v2)
// (list of github usernames that can always delete)
