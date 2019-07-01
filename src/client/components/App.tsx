import React, { Suspense } from "react";
import { Router } from "@reach/router";
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
import Loader from "./Loader";
import { mediaLarge } from "client/helpers/styles";

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

const LayoutWrapper = styled.div.attrs({
  className: "row no-gutters w-100 flex-grow-1",
})`
  flex-direction: column;

  @media ${mediaLarge} {
    flex-direction: row;
  }
`;

const RouterWrapper = styled(Router)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

export default function App() {
  return (
    <Providers>
      <Container>
        <LayoutWrapper>
          <div className="col-lg-9 d-flex flex-column">
            <Header />
            <Suspense fallback={<Loader />}>
              <RouterWrapper primary={false}>
                <Packages default />
                <NewPackage path="/new-package" />
                <Package path="/packages/:packageSlug/*" />
                <Category path="/categories/:category" />
                <Search path="/search/:searchQuery" />
                <Guide path="/guide" />
              </RouterWrapper>
            </Suspense>
          </div>
          <Sidebar />
        </LayoutWrapper>
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
