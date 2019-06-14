import React, { ReactNode } from "react";
import ReactGA from "react-ga";
import { createHistory, LocationProvider } from "@reach/router";
import UserDataProvider from "./UserDataProvider";

ReactGA.initialize("UA-52545728-1");

const history = createHistory(window);

history.listen(({ location }) => {
  ReactGA.pageview(location.pathname + location.search);
});

export default function Providers(props: ProvidersProps) {
  return (
    <LocationProvider history={history}>
      <UserDataProvider>{props.children}</UserDataProvider>
    </LocationProvider>
  );
}

type ProvidersProps = {
  children: ReactNode;
};
