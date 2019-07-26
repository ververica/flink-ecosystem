import React, { FC, ReactNode } from "react";
import UserDataProvider from "./UserDataProvider";
import { AnalyticsProvider } from "./AnalyticsProvider";
import { CookiesProvider } from "react-cookie";
import { createHistory, LocationProvider } from "@reach/router";

export const history = createHistory(window);

// Cannot use the default navigate function from @reach/router when you have
// a custom history.  You need to use the one from the result of createHistory
export const { navigate } = history;

export const Providers: FC<Props> = props => {
  return (
    <LocationProvider history={history}>
      <CookiesProvider>
        <AnalyticsProvider>
          <UserDataProvider>{props.children}</UserDataProvider>
        </AnalyticsProvider>
      </CookiesProvider>
    </LocationProvider>
  );
};

type Props = {
  children: ReactNode;
};
