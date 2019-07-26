import React, { FC, useContext, SyntheticEvent } from "react";
import {
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  Button,
} from "reactstrap";
import { UserData } from "./UserDataProvider";
import { useCookies } from "react-cookie";

const WelcomeUser: FC = () => {
  const { user, logout } = useContext(UserData);
  const handleLogoutClick = (e: SyntheticEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <span className="mr-2">Welcome, {user.login}</span>
      <a href="/logout" onClick={handleLogoutClick}>
        Logout
      </a>
    </>
  );
};

export const UserLogin: FC = () => {
  const { user, openGithubLogin } = useContext(UserData);
  const [cookies, setCookie] = useCookies();

  const handleLoginClick = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!cookies.consent) {
      return;
    }

    openGithubLogin(e);
  };

  const handleConsentClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setCookie("consent", true, {
      maxAge: 60 * 60 * 24 * 365,
    });
    openGithubLogin(e);
  };

  return (
    <small>
      {user.login ? (
        <WelcomeUser />
      ) : (
        <>
          <a href="/auth" onClick={handleLoginClick} id="login">
            Login With Github
          </a>
          {!cookies.consent && (
            <UncontrolledPopover target="login" placement="bottom">
              <PopoverHeader>Login Disable</PopoverHeader>
              <PopoverBody>
                Login is disabled because you have not allowed us to set
                cookies.
                <Button
                  size="sm"
                  className="mt-2"
                  color="success"
                  onClick={handleConsentClick}
                >
                  Allow Cookies
                </Button>
              </PopoverBody>
            </UncontrolledPopover>
          )}
        </>
      )}
    </small>
  );
};
