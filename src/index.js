// ***THESE MUST GO FIRST***
// If not, styled-components will render it's style tag *above* the bootstrap
// tag and nothing will work.
import "bootstrap/dist/css/bootstrap.css";
import "client/assets/markdown.scss";

import React from "react";
import ReactDOM from "react-dom";
import { App } from "./client/components/App";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :target {
    border: 1px solid darkgray;
    background-color: red;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root")
);

// @TODO upload images
// @TODO allow free-form license entry
// @TODO error handling (for mysql errors)

// @TODO share with team
// @TODO fix travis build

// @TODO admins (v2)
// (list of github usernames that can always delete)
