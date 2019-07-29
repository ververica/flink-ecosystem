import React, { FC } from "react";
import ReactGA from "react-ga";
import { history } from "./Providers";
import { useCookies } from "react-cookie";

export const AnalyticsProvider: FC = props => {
  const [cookies] = useCookies();

  if (cookies.consent) {
    ReactGA.initialize("UA-52545728-1");
    history.listen(({ location }) => {
      ReactGA.pageview(location.pathname + location.search);
    });
  }

  return <>{props.children}</>;
};
