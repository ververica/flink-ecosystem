import React from "react";
import qs from "querystring";

import { MainCard } from "client/components/MainCard";
import Pager from "client/components/Pager";
import { PackageList } from "client/components/packages";
import { RouteComponentProps } from "@reach/router";

import { useFetchData } from "client/helpers";
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
  ) as [ServerResponse<PackagesData>, () => void];

  if (!data.packages) {
    return <ErrorComponent className="pr-0" />;
  }

  const { packages = [], count = 0 } = data;

  return (
    <>
      <MainCard>
        <h5>This page contains third-party projects around <a href="https://flink.apache.org/">Apache Flink</a></h5>
        <p>
          Users can explore the Flink ecosystem of connectors, extensions, APIs,
          tool and integrations here. Developers in the ecosystem can submit
          what they have build as a new packages. Comments and votes allow users
          leave feedback, get help and assess the quality of a community
          package.
        </p>
        <p>
          <strong>Note:</strong> Packages listed here are user-submitted, they
          are not not endorsed by the Apache Flink project. <br /><br />

          Unlike Apache Flink, the packages here are potentially covered by the licenses LGPL and GPL.<br /><br />

          Note that this site is not affiliated with or released by Apache Flink, 
          although you may recognize many of the same committers.
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
