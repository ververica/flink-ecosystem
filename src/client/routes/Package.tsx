import React from "react";

import { RouteComponentProps, Router } from "@reach/router";
import ViewPackage from "client/components/ViewPackage";
import EditPackage from "client/components/EditPackage";
import useFetchData from "client/helpers/useFetchData";
import { PackageResult } from "client/types/Package";

export default function Package(props: PackageProps) {
  const [data, refreshPackageData] = useFetchData(
    `/api/v1/packages/${props.package}`
  ) as [PackageResult, () => void];

  return (
    <Router primary={false}>
      <ViewPackage
        default
        data={data}
        refreshPackageData={refreshPackageData}
      />
      <EditPackage path="edit" data={data} />
    </Router>
  );
}

type PackageProps = RouteComponentProps<{
  package: string;
}> &
  RouteComponentProps;
