import React from "react";
import { MainCard } from "client/components/MainCard";
import { RouteComponentProps } from "@reach/router";
import useFetchData from "client/helpers/useFetchData";
import PackageList from "client/components/PackageList";
import { PackagesData } from "./Packages";
import { ServerResponse } from "client/types/Server";

// @TODO search name, description, readme, tags
export default function Search(props: Props) {
  const [data] = useFetchData(
    `/api/v1/search/${props.searchQuery}`,
    props.location.key
  ) as [ServerResponse<PackagesData>];

  const { packages = [] } = data;

  return (
    <MainCard header={`Search results for "${props.searchQuery}"`}>
      <PackageList packages={packages} page={1} />
    </MainCard>
  );
}

type Props = RouteComponentProps<{
  searchQuery: String;
}>;
