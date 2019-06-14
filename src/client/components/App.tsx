import React, { Suspense, SyntheticEvent } from "react";
import { Router, navigate } from "@reach/router";
import getFormData from "get-form-data";
import styled from "styled-components/macro";

import {
  Package,
  Packages,
  Category,
  Guide,
  Search,
  NewPackage,
} from "client/routes";
import Sidebar from "client/components/Sidebar";
import Header from "client/components/Header";
import Providers from "client/components/Providers";

const Container = styled.div.attrs({
  className: "container min-vh-100 d-flex flex-column",
})`
  .nav a {
    color: #333;

    &:hover {
      color: #333;
      background: #e7e7e7;
    }

    &.active {
      font-weight: bold;
    }
  }
`;

export default function App() {
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const { searchQuery } = getFormData(e.target);
    navigate(searchQuery ? `/search/${searchQuery}` : "/");
  };

  return (
    <Providers>
      <Container>
        <div className="row no-gutters w-100 flex-grow-1">
          <div className="col-lg-9 d-flex flex-column">
            <Header onSubmit={onSubmit} />
            <Suspense fallback="Loading... ">
              <Router
                primary={false}
                className="flex-grow-1 d-flex flex-column"
              >
                <Packages default />
                <NewPackage path="/new-package" />
                <Package path="/packages/:package" />
                <Category path="/categories/:category" />
                <Search path="/search/:searchQuery" />
                <Guide path="/guide" />
              </Router>
            </Suspense>
          </div>
          <Sidebar />
        </div>
        {/* @TODO add "contact us" */}
        <div className="row no-gutters text-center d-block py-4">
          <p>
            Copyright © 2014-2019{" "}
            <a href="https://apache.org/">The Apache Software Foundation</a>.
            All Rights Reserved.
          </p>
          <p>
            Apache Flink, Flink®, Apache®, and the squirrel logo are either
            registered trademarks or trademarks of The Apache Software
            Foundation.
          </p>
          <p>
            <a href="https://flink.apache.org/privacy-policy.html">
              Privacy Policy
            </a>
          </p>
        </div>
      </Container>
    </Providers>
  );
}
