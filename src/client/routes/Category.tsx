import React, { FC } from "react";
import { MainCard } from "client/components/MainCard";
import { PackageList } from "client/components/packages";
import { RouteComponentProps } from "@reach/router";
import { PackagesData } from "./Packages";
import { useFetchData } from "client/helpers";
import { ServerResponse } from "client/types/Server";

export const Category: FC<Props> = props => {
  const [data] = useFetchData(
    `/api/v1/packages?category=${props.category}`,
    props.location.key
  ) as [ServerResponse<PackagesData>, () => void];

  const { packages = [], count = 0 } = data;

  return (
    <MainCard header={`Packages tagged with "${props.category}" (${count})`}>
      <PackageList packages={packages} page={1} />
    </MainCard>
  );
};

type Props = RouteComponentProps<{
  category: string;
}>;
