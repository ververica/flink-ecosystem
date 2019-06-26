import React, { useContext, useState } from "react";
import { UserData } from "./UserDataProvider";
import { Redirect, RouteComponentProps } from "@reach/router";
import MainCard from "./MainCard";
import PackageForm from "./PackageForm";
import { PackageData } from "client/types/Package";

export default function EditPackage(props: EditPackageProps) {
  const { user } = useContext(UserData);
  const [error, setError] = useState({}) as [Error, () => void];

  if (user.id === 0) {
    return <Redirect to={props.location.pathname.replace("/edit", "")} />;
  }

  return (
    <MainCard header={`Edit Package: ${props.package.name}`}>
      <PackageForm
        error={error}
        initialValues={props.package}
        onSubmit={() => {}}
        submitButton={null}
      />
    </MainCard>
  );
}

EditPackage.defaultProps = {
  package: {},
};

type EditPackageProps = {
  package: PackageData;
} & RouteComponentProps &
  Readonly<typeof EditPackage.defaultProps>;

type Error = {
  id: string;
  message: string;
};
