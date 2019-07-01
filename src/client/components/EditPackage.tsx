import React, { useContext, useState } from "react";
import { UserData } from "./UserDataProvider";
import { Redirect, RouteComponentProps, Link } from "@reach/router";
import MainCard from "./MainCard";
import PackageForm from "./PackageForm";
import { PackageData } from "client/types/Package";
import Icon from "client/components/Icon";
import Axios from "axios";
import { pick } from "lodash/fp";
import { initialValues } from "client/components/PackageForm";

const pickFields = pick(Object.keys(initialValues));

const submitButton = (
  <button className="btn btn-success" type="submit">
    <Icon name="save" fw={false} />
    Save Package
  </button>
);

const handleSubmit: HandleSubmit = async data => {
  await Axios.post(`/api/v1/packages/${data.slug}`, pickFields(data));
};

export default function EditPackage(props: EditPackageProps) {
  const { user } = useContext(UserData);

  if (user.id === 0) {
    return (
      <Redirect to={props.location.pathname.replace("/edit", "")} noThrow />
    );
  }

  const header = (
    <>
      Edit Package:{" "}
      <Link to={`/packages/${props.package.slug}`}>{props.package.name}</Link>
    </>
  );

  return (
    <MainCard header={header}>
      <PackageForm
        disabledFields={["slug"]}
        initialValues={props.package}
        handleSubmit={handleSubmit}
        submitButton={submitButton}
      />
    </MainCard>
  );
}

EditPackage.defaultProps = {
  package: {},
};

type EditPackageProps = {
  package: PackageData;
} & RouteComponentProps;

type Error = {
  id: string;
  message: string;
};

type HandleSubmit = (data: PackageData) => void;
