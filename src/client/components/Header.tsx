import React, { useState, useEffect, SyntheticEvent } from "react";
import styled from "styled-components";
import useLocation from "client/helpers/useLocation";

const SearchIcon = styled.small.attrs({
  className: "fal fa-search mr-2",
})`
  position: absolute;
  pointer-events: none;
  right: 0;
`;

const SearchInput = styled.input.attrs({
  className: "form-control form-control-sm pr-4",
  name: "searchQuery",
  placeholder: "Search",
  "aria-label": "Search",
})``;

const WelcomeUser = (props: WelcomeUserProps) => (
  <>
    <span className="mr-2">Welcome, {props.userLogin}</span>
    <a href="/logout" onClick={props.logout}>
      Logout
    </a>
  </>
);

export default function Header(props: HeaderProps) {
  const [authWindow, setAuthWindow] = useState<Window | null>(null);
  const { refreshUser } = props;
  const { location } = useLocation();
  const searchQuery = (location.pathname.match(/^\/search\/(.*)/) || [])[1];

  useEffect(() => {
    const verifyLogin = (e: MessageEvent) => {
      if (e.origin === location.origin && e.data === "github-login-success") {
        authWindow && authWindow.close();
        setAuthWindow(null);
        refreshUser();
      }
    };

    if (authWindow) {
      window.addEventListener("message", verifyLogin);
      return () => {
        window.removeEventListener("message", verifyLogin);
      };
    }
  }, [authWindow, refreshUser, location]);

  const openGithubLogin = (e: SyntheticEvent) => {
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
          <small hidden={props.loading}>
            {props.userLogin ? (
              <WelcomeUser userLogin={props.userLogin} logout={props.logout} />
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
          <SearchInput defaultValue={searchQuery} />
          <SearchIcon />
        </div>
      </form>
    </nav>
  );
}

type HeaderProps = {
  loading: boolean;
  logout: (e: SyntheticEvent) => void;
  onSubmit: (e: SyntheticEvent) => void;
  refreshUser: () => void;
  userLogin: string;
};

type WelcomeUserProps = {
  logout: (e: SyntheticEvent) => void;
  userLogin: string;
};
