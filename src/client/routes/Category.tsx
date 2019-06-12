import React from "react";
import useFetch from "fetch-suspense";
import MainCard from "client/components/MainCard";
import PackageList from "client/components/PackageList";
import { RouteComponentProps } from "@reach/router";
import { Data } from "./Packages";

export default function Category(props: Props) {
  const { key = 0 } = props.location || {};
  const data = useFetch(
    `/api/v1/packages?category=${props.category}&key=${key}`
  ) as Data;
  const packages = data.packages || [];

  return (
    <MainCard
      header={`Packages tagged with "${props.category}" (${data.count || 0})`}
    >
      <PackageList packages={packages} page={1} />
    </MainCard>
  );
}

type Props = RouteComponentProps<{
  category: string;
}>;
