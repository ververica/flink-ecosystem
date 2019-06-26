import React from "react";

import { RouteComponentProps, Router } from "@reach/router";
import ViewPackage from "client/components/ViewPackage";
import EditPackage from "client/components/EditPackage";

import ErrorComponent from "client/components/ErrorComponent";
import useFetchData from "client/helpers/useFetchData";
import { PackageResult } from "client/types/Package";

export default function Package(props: PackageProps) {
  const [data, refreshData] = useFetchData(
    `/api/v1/packages/${props.packageSlug}`
  ) as [PackageResult, () => void];

  if (!data.package) {
    return (
      <div className="container pr-0">
        <ErrorComponent message="An error occured loading the package data." />
      </div>
    );
  }

  return (
    <Router primary={false}>
      <ViewPackage
        default
        package={data.package}
        comments={data.comments}
        refreshPackageData={refreshData}
      />
      <EditPackage path="edit" package={data.package} />
    </Router>
  );
}

type PackageProps = RouteComponentProps<{
  packageSlug: string;
}> &
  RouteComponentProps;
