import React, { useContext, useState } from "react";
import { UserData } from "./UserDataProvider";
import { Redirect, RouteComponentProps, Link } from "@reach/router";
import MainCard from "./MainCard";
import PackageForm from "./PackageForm";
import { PackageData } from "client/types/Package";
import Icon from "client/components/Icon";
import Axios from "axios";
import ErrorComponent from "./ErrorComponent";
import { isEmpty, pick } from "lodash/fp";
import useScroll from "client/helpers/useScroll";
import { initialValues } from "client/components/PackageForm";

const pickFields = pick(Object.keys(initialValues));

const submitButton = (
  <button className="btn btn-success" type="submit">
    <Icon name="save" fw={false} />
    Save Package
  </button>
);

const handleSubmit: HandleSubmit = setError => async data => {
  try {
    await Axios.post(`/api/v1/packages/${data.slug}`, pickFields(data));
  } catch (e) {
    setError(e);
  }
};

export default function EditPackage(props: EditPackageProps) {
  const { user } = useContext(UserData);
  const [error, setError] = useState({}) as [Error, () => void];
  useScroll(error);

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
      {!isEmpty(error) && (
        <ErrorComponent message={error.toString()} className="p-0" />
      )}

      <PackageForm
        disabledFields={["slug"]}
        error={error}
        initialValues={props.package}
        onSubmit={handleSubmit(setError)}
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

type HandleSubmit = (
  setError: (error: Error) => void
) => (data: PackageData) => void;
