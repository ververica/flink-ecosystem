import React from "react";
import cookies from "js-cookie";
import { Router, navigate } from "@reach/router";
import getFormData from "get-form-data";

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
        <Sidebar userLogin={user.login} />
        <div className="col-md-9 d-flex flex-column">
          <Header
            onSubmit={onSubmit}
            userLogin={user.login}
            logout={logout}
            refreshUser={refreshData}
            loading={loading}
          />
          <Router className="flex-grow-1 d-flex flex-column">
            <Packages default />
            <NewPackage path="/new-package" userLogin={user.login} />
            <Package path="/packages/:package" />
            <Category path="/categories/:category" />
            <Search path="/search/:searchQuery" />
            <Guide path="/guide" />
          </Router>
        </div>
      </div>
      <div className="row no-gutters text-center d-block">footer</div>
    </div>
  );
}
