import React, { Suspense, SyntheticEvent } from "react";
import cookies from "js-cookie";
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
import { useGet } from "client/helpers/useAxios";

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
  const [user, loading, setUser, refreshData] = useGet(
    "/api/v1/user"
  ) as GetUserData;

  const logout = (e: SyntheticEvent) => {
    e.preventDefault();
    cookies.remove("github-token");
    setUser({});
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const { searchQuery } = getFormData(e.target);
    navigate(searchQuery ? `/search/${searchQuery}` : "/");
  };

  return (
    <Container>
      <div className="row no-gutters w-100 flex-grow-1">
        <div className="col-lg-9 d-flex flex-column">
          <Header
            onSubmit={onSubmit}
            userLogin={user.login}
            logout={logout}
            refreshUser={refreshData}
            loading={loading}
          />
          <Suspense fallback="Loading... ">
            <Router primary={false} className="flex-grow-1 d-flex flex-column">
              <Packages default />
              <NewPackage path="/new-package" userLogin={user.login} />
              <Package path="/packages/:package" />
              <Category path="/categories/:category" />
              <Search path="/search/:searchQuery" />
              <Guide path="/guide" />
            </Router>
          </Suspense>
        </div>
        <Sidebar userLogin={user.login} />
      </div>
      <div className="row no-gutters text-center d-block">footer</div>
    </Container>
  );
}

type User = {
  login: string;
};

type GetUserData = [User, boolean, (user: User | {}) => void, () => void];
