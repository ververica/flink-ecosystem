import React from "react";

import { RouteComponentProps, Router } from "@reach/router";
import ViewPackage from "client/components/ViewPackage";
import EditPackage from "client/components/EditPackage";

import ErrorComponent from "client/components/ErrorComponent";
import useAsyncData from "client/helpers/useAsyncData";

export default function Package(props: PackageProps) {
  const { data, loading, error, refreshData } = useAsyncData(
    `/api/v1/packages/${props.packageSlug}`,
    { package: null, comments: [] }
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <ErrorComponent message="An error occured loading the package data." />
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
