import React, { SyntheticEvent, useContext } from "react";
import styled from "styled-components/macro";
import useLocation from "client/helpers/useLocation";
import { UserData } from "./UserDataProvider";

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

const WelcomeUser = () => {
  const { user, logout } = useContext(UserData);
  return (
    <>
      <span className="mr-2">Welcome, {user.login}</span>
      <a href="/logout" onClick={logout}>
        Logout
      </a>
    </>
  );
};

export default function Header(props: HeaderProps) {
  const { location } = useLocation();
  const searchQuery = (location.pathname.match(/^\/search\/(.*)/) || [])[1];

  const { user, openGithubLogin } = useContext(UserData);

  return (
    <nav className="navbar navbar-light pr-0 mb-4">
      <ul className="ml-auto navbar-nav mr-3">
        <li className="nav-item">
          <small>
            {user.login ? (
              <WelcomeUser />
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
  onSubmit: (e: SyntheticEvent) => void;
};
