import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cookies from "js-cookie";
import { Router } from "@reach/router";
import Sidebar from "./Sidebar";
import Package from "./Package";
import Packages from "./Packages";
import Category from "./Category";
import Guide from "./Guide";
import { useGet } from "../helpers/useAxios";

const SearchIcon = styled.small.attrs({
  className: "fal fa-search position-absolute mr-2",
})`
  pointer-events: none;
  right: 0;
`;

const MainCard = props => (
  <div className="card border-left-0 rounded-0">
    <div className="card-body">{props.children}</div>
  </div>
);

const TopNav = props => {
  const [authWindow, setAuthWindow] = useState(null);
  const { refreshUser } = props;

  useEffect(() => {
    const handleMessage = e => {
      console.log("message", e.data);
      if (e.data === "github-login-success") {
        authWindow.close();
        setAuthWindow(null);
        refreshUser();
      }
    };

    console.log("effect");
    if (authWindow) {
      console.log("add");
      window.addEventListener("message", handleMessage);
      return () => {
        console.log("remove");
        window.removeEventListener("message", handleMessage);
      };
    }
  }, [authWindow, refreshUser]);

  return (
    <nav className="navbar navbar-light pr-0 mb-4">
      <ul className="ml-auto navbar-nav mr-3">
        <li className="nav-item">
          <small>
            {props.user.login ? (
              <>
                <span className="mr-2">Welcome, {props.user.login}</span>
                <a href="/logout" onClick={props.logout}>
                  Logout
                </a>
              </>
            ) : (
              <a
                href="/auth"
                onClick={e => {
                  e.preventDefault();

                  const auth = window.open(
                    "/auth",
                    "Login with Github",
                    "width=600,height=600"
                  );

                  setAuthWindow(auth);
                }}
              >
                Login With Github
              </a>
            )}
          </small>
        </li>
      </ul>
      <form className="form-inline my-lg-0">
        <div className="position-relative d-flex align-items-center">
          <input
            className="form-control form-control-sm pr-4 rounded-0"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <SearchIcon />
        </div>
      </form>
    </nav>
  );
};

export default function App() {
  const [user, loading, setUser, refreshData] = useGet("/api/v1/user");

  const logout = e => {
    e.preventDefault();
    cookies.remove("github-token");
    setUser({});
  };

  return (
    <div className="container min-vh-100 d-flex flex-column">
      <div className="row no-gutters w-100 flex-grow-1">
        <Sidebar />
        <div className="col-md-9">
          <TopNav
            user={user}
            logout={logout}
            refreshUser={refreshData}
            loading={loading}
          />
          <MainCard>
            <Router>
              <Packages default />
              <Package path="/packages/:package" />
              <Category path="/categories/:category" />
              <Guide path="/guide" />
            </Router>
          </MainCard>
        </div>
      </div>
      <div className="row no-gutters text-center d-block">footer</div>
    </div>
  );
}
