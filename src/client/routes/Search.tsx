import React, { FC } from "react";
import { MainCard } from "client/components/MainCard";
import { RouteComponentProps } from "@reach/router";
import { useFetchData } from "client/helpers";
import { PackageList } from "client/components/packages";
import { ServerResponse } from "client/types/Server";
import { PackagesResult } from "client/types/Package";

// @TODO search name, description, readme, tags
export const Search: FC<Props> = props => {
  const [{ packages = [] }] = useFetchData(
    `/api/v1/search/${props.searchQuery}`,
    props.location.key
  ) as [ServerResponse<PackagesResult>];

  return (
    <MainCard header={`Search results for "${props.searchQuery}"`}>
      <PackageList packages={packages} page={1} />
    </MainCard>
  );
};

type Props = RouteComponentProps<{
  searchQuery: String;
}>;
