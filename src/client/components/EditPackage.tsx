import React, { useContext } from "react";
import { UserData } from "./UserDataProvider";
import { Redirect } from "@reach/router";
import MainCard from "./MainCard";

export default function EditPackage(props: any) {
  const { user } = useContext(UserData);
  if (user.id === 0) {
    return <Redirect to={props.location.pathname.replace("/edit", "")} />;
  }

  return <MainCard header="test">some content</MainCard>;
}
