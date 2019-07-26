import React, { FC, ReactNode } from "react";
import ReactGA from "react-ga";
import { history } from "./Providers";
import { useCookies } from "react-cookie";

export const AnalyticsProvider: FC<Props> = props => {
  const [cookies] = useCookies();

  if (cookies.consent) {
    ReactGA.initialize("UA-52545728-1");
    history.listen(({ location }) => {
      ReactGA.pageview(location.pathname + location.search);
    });
  }

  console.log(cookies);
  return <>{props.children}</>;
};

type Props = {
  children: ReactNode;
};
