import React from "react";

import { RouteComponentProps, Router } from "@reach/router";
import { ViewPackage, EditPackage } from "client/components/packages";
import { ErrorComponent } from "client/components/ErrorComponent";
import { useFetchData } from "client/helpers";
import { PackageResult } from "client/types/Package";
import { ServerResponse } from "client/types/Server";

export default function Package(props: PackageProps) {
  const [data] = useFetchData(
    `/api/v1/packages/${props.packageSlug}`,
    props.location.key
  ) as [ServerResponse<PackageResult>];

  if (data.status === "error") {
    return <ErrorComponent className="pr-0" message={data.message} />;
  }

  return (
    <Router primary={false}>
      <ViewPackage default package={data.package} comments={data.comments} />
      <EditPackage path="edit" package={data.package} />
    </Router>
  );
}

type PackageProps = RouteComponentProps<{
  packageSlug: string;
}>;
