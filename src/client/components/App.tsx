import React, { FC, Suspense } from "react";
import styled from "styled-components/macro";
import { Col, Container } from "reactstrap";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Loader } from "./Loader";
import { mediaLarge } from "client/helpers/styles";
import { Providers } from "./Providers";
import { Router } from "@reach/router";
import { Sidebar } from "./Sidebar";
import {
  Package,
  Packages,
  Category,
  Guide,
  Search,
  NewPackage,
} from "client/routes";

const AppContainer = styled(Container).attrs({
  className: "min-vh-100 d-flex flex-column",
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
      <AppContainer>
        <LayoutWrapper>
          <Col lg="9" className="d-flex flex-column">
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
          </Col>
          <Sidebar />
        </LayoutWrapper>
        <Footer />
      </AppContainer>
    </Providers>
  );
};
