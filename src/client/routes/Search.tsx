import React from "react";
import MainCard from "client/components/MainCard";
import { RouteComponentProps } from "@reach/router";
import useFetchData from "client/helpers/useFetchData";

// @TODO search name, description, readme, tags
export default function Search(props: Props) {
  const packages = useFetchData(`/api/v1/search/${props.searchQuery}`);

  return (
    <MainCard header={`Search results for "${props.searchQuery}"`}>
      {JSON.stringify(packages)}
    </MainCard>
  );
}

type Props = RouteComponentProps<{
  searchQuery: String;
}>;
