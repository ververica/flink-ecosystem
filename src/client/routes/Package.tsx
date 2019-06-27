import React from "react";

import { RouteComponentProps, Router } from "@reach/router";
import ViewPackage from "client/components/ViewPackage";
import EditPackage from "client/components/EditPackage";

import ErrorComponent from "client/components/ErrorComponent";
import useFetchData, { RefreshData } from "client/helpers/useFetchData";
import { PackageResult } from "client/types/Package";
import { ServerResponse } from "client/types/Server";

export default function Package(props: PackageProps) {
  const [data, refreshData] = useFetchData(
    `/api/v1/packages/${props.packageSlug}`
  ) as [ServerResponse<PackageResult>, RefreshData];

  if (data.status === "error") {
    return <ErrorComponent className="pr-0" message={data.message} />;
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
}>;
