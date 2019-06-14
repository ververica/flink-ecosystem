import React from "react";
import MainCard from "client/components/MainCard";
import { RouteComponentProps } from "@reach/router";

// @TODO search name, description, readme, tags
export default function Search(props: Props) {
  return (
    <MainCard header={`Search results for "${props.searchQuery}"`}>
      {null}
    </MainCard>
  );
}

type Props = RouteComponentProps<{
  searchQuery: String;
}>;
