import qs from "querystring";
import React, { FC } from "react";
import { ErrorComponent } from "client/components/ErrorComponent";
import { MainCard } from "client/components/MainCard";
import { PackageList } from "client/components/packages";
import { PackagesResult } from "client/types/Package";
import { Pager } from "client/components/Pager";
import { RouteComponentProps } from "@reach/router";
import { ServerResponse } from "client/types/Server";
import { useFetchData } from "client/helpers";

export const Packages: FC<Props> = props => {
  const { search = "" } = props.location;
  const searchQuery = qs.parse(search.slice(1));
  const page = Number(searchQuery.page || 1);

  const [data] = useFetchData(
    `/api/v1/packages?page=${page}`,
    props.location.key
  ) as [ServerResponse<PackagesResult>, () => void];

  if (!data.packages) {
    return <ErrorComponent className="pr-0" />;
  }

  const { packages = [], count = 0 } = data;

  return (
    <>
      <MainCard>
        <h5>
          This page contains third-party projects for{" "}
          <a href="https://flink.apache.org/">Apache Flink</a>
        </h5>
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
        <p>
          Unlike Apache Flink, the packages here are potentially covered by the
          licenses LGPL and GPL.
        </p>
        <p>
          Note that this site is not affiliated with or released by Apache
          Flink, although you may recognize many of the same committers.
        </p>
      </MainCard>
      <MainCard header={`Most Recent Packages (${count})`}>
        <PackageList packages={packages} page={page} />
        <Pager page={page} total={data.totalPages} />
      </MainCard>
    </>
  );
};

type Props = RouteComponentProps;
