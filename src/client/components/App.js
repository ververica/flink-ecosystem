import React, { useState } from "react";
import cookies from "js-cookie";
import { Router, navigate } from "@reach/router";
import getFormData from "get-form-data";

import Sidebar from "./Sidebar";
import Package from "./Package";
import Packages from "./Packages";
import Category from "./Category";
import Guide from "./Guide";
import { useGet } from "../helpers/useAxios";
import Header from "./Header";
import Search from "./Search";

const MainCard = props => (
  <div className="card border-left-0 rounded-0">
    <div className="card-body">{props.children}</div>
  </div>
);

export default function App() {
  const [user, loading, setUser, refreshData] = useGet("/api/v1/user");

  const logout = e => {
    e.preventDefault();
    cookies.remove("github-token");
    setUser({});
  };

  const onSubmit = e => {
    e.preventDefault();
    const { searchQuery } = getFormData(e.target);
    navigate(searchQuery ? `/search/${searchQuery}` : "/");
  };

  return (
    <div className="container min-vh-100 d-flex flex-column">
      <div className="row no-gutters w-100 flex-grow-1">
        <Sidebar />
        <div className="col-md-9">
          <Header
            onSubmit={onSubmit}
            userLogin={user.login}
            logout={logout}
            refreshUser={refreshData}
            loading={loading}
          />
          <MainCard>
            <Router>
              <Packages default />
              <Package path="/packages/:package" />
              <Category path="/categories/:category" />
              <Search path="/search/:searchQuery" />
              <Guide path="/guide" />
            </Router>
          </MainCard>
        </div>
      </div>
      <div className="row no-gutters text-center d-block">footer</div>
    </div>
  );
}
