import React, { Suspense, FC } from "react";
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
import { Header } from "client/components/Header";
import { Providers } from "client/components/Providers";
import Loader from "./Loader";
import { mediaLarge } from "client/helpers/styles";
import { Footer } from "./Footer";

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

export const App: FC = () => {
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
        <Footer />
      </Container>
    </Providers>
  );
};
