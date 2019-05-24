import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useLocation from "../helpers/useLocation";

const SearchIcon = styled.small.attrs(props => {
  return {
    className: "fal fa-search position-absolute mr-2",
  };
})`
  pointer-events: none;
  right: 0;
`;

export default function Header(props) {
  const [authWindow, setAuthWindow] = useState(null);
  const { refreshUser } = props;
  const { location } = useLocation();
  const searchQuery = (location.pathname.match(/^\/search\/(.*)/) || [])[1];

  useEffect(() => {
    const handleMessage = e => {
      if (e.origin === location.origin && e.data === "github-login-success") {
        authWindow.close();
        setAuthWindow(null);
        refreshUser();
      }
    };

    if (authWindow) {
      window.addEventListener("message", handleMessage);
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }
  }, [authWindow, refreshUser]);

  const openGithubLogin = e => {
    e.preventDefault();

    const auth = window.open(
      "/auth",
      "Login with Github",
      "width=600,height=600"
    );

    setAuthWindow(auth);
  };

  return (
    <nav className="navbar navbar-light pr-0 mb-4">
      <ul className="ml-auto navbar-nav mr-3">
        <li className="nav-item">
          <small>
            {props.userLogin ? (
              <>
                <span className="mr-2">Welcome, {props.userLogin}</span>
                <a href="/logout" onClick={props.logout}>
                  Logout
                </a>
              </>
            ) : (
              <a href="/auth" onClick={openGithubLogin}>
                Login With Github
              </a>
            )}
          </small>
        </li>
      </ul>
      <form className="form-inline my-lg-0" onSubmit={props.onSubmit}>
        <div className="position-relative d-flex align-items-center">
          <input
            defaultValue={searchQuery}
            className="form-control form-control-sm pr-4 rounded-0"
            name="searchQuery"
            placeholder="Search"
            aria-label="Search"
          />
          <SearchIcon />
        </div>
      </form>
    </nav>
  );
}
