import React, { FC } from "react";
import { AnalyticsProvider } from "./AnalyticsProvider";
import { CookiesProvider } from "react-cookie";
import { createHistory, LocationProvider } from "@reach/router";
import { UserDataProvider } from "./UserDataProvider";

export const history = createHistory(window);

export const Providers: FC = props => {
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
