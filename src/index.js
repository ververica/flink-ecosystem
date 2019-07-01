// ***THESE MUST GO FIRST***
// If not, styled-components will render it's style tag *above* the bootstrap
// tag and nothing will work.
import "bootstrap/dist/css/bootstrap.css";
import "client/assets/markdown.scss";

import React from "react";
import ReactDOM from "react-dom";
import App from "./client/components/App";

ReactDOM.render(<App />, document.getElementById("root"));

// @TODO fix GFM link
// @TODO package data not refreshing (sometimes)
// @TODO hyperlinks for readme and homepage (and validation on form)
// @TODO fix redirect to new package on success
// @TODO add spacer and divider above apache link
// @TODO show tags, link to search
// @TODO change edit button

// @TODO upload images
// @TODO allow free-form license entry
// @TODO error handling (for mysql errors)
// @TODO truncate descriptions

// @TODO search

// @TODO share with team

// @TODO admins (v2)
// (list of github usernames that can always delete)
