import React, { useContext } from "react";
import Axios from "axios";

import { MainCard } from "client/components/MainCard";
import { RouteComponentProps } from "@reach/router";
import PackageForm from "client/components/PackageForm";
import { Icon } from "client/components/Icon";
import { PackageData } from "client/types/Package";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { UserData } from "client/components/UserDataProvider";

export default function NewPackage(props: NewPackageProps) {
  const { logout } = useContext(UserData);
  const handleSubmit: HandleSubmit = async data => {
    await Axios.post("/api/v1/packages", data).catch(e => {
      if (e.response.status === 403) {
        logout();
      }

      throw e;
    });
  };

  const submitButton = (
    <button className="btn btn-success" type="submit">
      <Icon icon={faSave} fw={false} title="save" />
      Add Package
    </button>
  );

  return (
    <MainCard header="Add a new Package">
      <PackageForm handleSubmit={handleSubmit} submitButton={submitButton} />
    </MainCard>
  );
}

type NewPackageProps = RouteComponentProps;

type HandleSubmit = (data: PackageData) => void;
