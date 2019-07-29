import React, { FC } from "react";
import { EditPackage, ViewPackage } from "client/components/packages";
import { ErrorComponent } from "client/components/ErrorComponent";
import { PackageResult } from "client/types/Package";
import { RouteComponentProps, Router } from "@reach/router";
import { ServerResponse } from "client/types/Server";
import { useFetchData } from "client/helpers";

export const Package: FC<Props> = props => {
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
};

type Props = RouteComponentProps<{
  packageSlug: string;
}>;
