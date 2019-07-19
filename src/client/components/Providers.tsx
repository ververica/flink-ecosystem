import React, { ReactNode } from "react";
import ReactGA from "react-ga";
import UserDataProvider from "./UserDataProvider";
import { createHistory, LocationProvider } from "@reach/router";

ReactGA.initialize("UA-52545728-1");

export const history = createHistory(window);

// Cannot use the default navigate function from @reach/router when you have
// a custom history.  You need to use the one from the result of createHistory
export const { navigate } = history;

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
