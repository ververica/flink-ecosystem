import React from "react";
import MainCard from "client/components/MainCard";
import PackageList from "client/components/PackageList";
import { RouteComponentProps } from "@reach/router";
import { PackagesData } from "./Packages";
import useFetchData, { RefreshData } from "client/helpers/useFetchData";
import { ServerResponse } from "client/types/Server";

export default function Category(props: Props) {
  const { key = 0 } = props.location || {};
  const [data] = useFetchData(
    `/api/v1/packages?category=${props.category}`,
    props.location.key
  ) as [ServerResponse<PackagesData>, RefreshData];

  const { packages = [], count = 0 } = data;

  return (
    <MainCard header={`Packages tagged with "${props.category}" (${count})`}>
      <PackageList packages={packages} page={1} />
    </MainCard>
  );
}

type Props = RouteComponentProps<{
  category: string;
}>;
