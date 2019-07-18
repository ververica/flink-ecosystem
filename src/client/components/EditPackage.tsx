import React, { useContext } from "react";
import { UserData } from "./UserDataProvider";
import { Redirect, RouteComponentProps, Link } from "@reach/router";
import { MainCard } from "./MainCard";
import { PackageForm } from "./PackageForm";
import { PackageData, PackageFormData } from "client/types/Package";
import Axios from "axios";
import { Icon } from "./Icon";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const submitButton = (
  <button className="btn btn-success" type="submit">
    <Icon icon={faSave} fw={false} title="save" />
    Save Package
  </button>
);

export default function EditPackage(props: EditPackageProps) {
  const { user } = useContext(UserData);

  if (user.id === 0) {
    return (
      <Redirect to={props.location.pathname.replace("/edit", "")} noThrow />
    );
  }

  const handleSubmit: HandleSubmit = async data => {
    await Axios.post(`/api/v1/packages/${data.slug}`, data);
  };

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

type HandleSubmit = (data: PackageFormData) => void;
