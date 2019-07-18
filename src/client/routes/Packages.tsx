import React from "react";
import qs from "querystring";

import { MainCard } from "client/components/MainCard";
import Pager from "client/components/Pager";
import PackageList from "client/components/PackageList";
import { RouteComponentProps } from "@reach/router";

import useFetchData, { RefreshData } from "client/helpers/useFetchData";
import { PackageData } from "client/types/Package";
import ErrorComponent from "client/components/ErrorComponent";
import { ServerResponse } from "client/types/Server";

export default function Packages(props: Props) {
  const { search = "" } = props.location;
  const searchQuery = qs.parse(search.slice(1));
  const page = Number(searchQuery.page || 1);

  const [data] = useFetchData(
    `/api/v1/packages?page=${page}`,
    props.location.key
  ) as [ServerResponse<PackagesData>, RefreshData];

  if (!data.packages) {
    return <ErrorComponent className="pr-0" />;
  }

  const { packages = [], count = 0 } = data;

  return (
    <>
      <MainCard>
        <h5>This page contains third-party projects around Apache Flink</h5>
        <p>
          Users can explore the Flink ecosystem of connectors, extensions, APIs,
          tool and integrations here. Developers in the ecosystem can submit
          what they have build as a new packages. Comments and votes allow users
          leave feedback, get help and assess the quality of a community
          package.
        </p>
        <p>
          <strong>Note:</strong> Packages listed here are user-submitted, they
          are not not endorsed by the Apache Flink project.
        </p>
      </MainCard>
      <MainCard header={`Most Recent Packages (${count})`}>
        <PackageList packages={packages} page={page} />
        <Pager page={page} total={data.totalPages} />
      </MainCard>
    </>
  );
}

type Props = RouteComponentProps;

export type PackagesData = {
  packages: PackageData[];
  count: number;
  totalPages: number;
};
