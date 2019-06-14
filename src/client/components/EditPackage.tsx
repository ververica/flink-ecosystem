import React, { useContext, useState } from "react";
import { UserData } from "./UserDataProvider";
import { Redirect } from "@reach/router";
import MainCard from "./MainCard";
import PackageForm from "./PackageForm";

export default function EditPackage(props: any) {
  const { user } = useContext(UserData);
  const [error, setError] = useState({}) as [Error, () => void];

  if (user.id === 0) {
    return <Redirect to={props.location.pathname.replace("/edit", "")} />;
  }

  return (
    <MainCard header={`Edit Package: ${props.data.package.name}`}>
      <PackageForm
        error={error}
        initialValues={props.data.package}
        onSubmit={() => {}}
        submitButton={null}
      />
    </MainCard>
  );
}

type Error = {
  id: string;
  message: string;
};
