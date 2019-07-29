import Axios from "axios";
import React, { FC, useContext } from "react";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "client/components/Icon";
import { initialValues } from "client/components/package-form/PackageForm";
import { MainCard } from "client/components/MainCard";
import { PackageForm } from "client/components/package-form";
import { PackageFormData } from "client/types/Package";
import { RouteComponentProps } from "@reach/router";
import { UserData } from "client/components/UserDataProvider";

export const NewPackage: FC<Props> = () => {
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
      <PackageForm
        handleSubmit={handleSubmit}
        submitButton={submitButton}
        initialValues={initialValues}
        disabledFields={[]}
      />
    </MainCard>
  );
};

type Props = RouteComponentProps;
type HandleSubmit = (data: PackageFormData) => void;
