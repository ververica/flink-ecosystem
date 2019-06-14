import React from "react";
import qs from "querystring";

import MainCard from "client/components/MainCard";
import Pager from "client/components/Pager";
import PackageList, { Package } from "client/components/PackageList";
import { RouteComponentProps } from "@reach/router";

import useFetchData from "client/helpers/useFetchData";

export default function Packages(props: Props) {
  const { search = "", key = 0 } = props.location || {};
  const searchQuery = qs.parse(search.slice(1));
  const page = Number(searchQuery.page || 1);

  const [data] = useFetchData(`/api/v1/packages?page=${page}&key=${key}`) as [
    PackagesData
  ];
  const { packages = [], count = 0 } = data;

  return (
    <>
      <MainCard header={`Most Popular Packages (${count})`}>
        <PackageList packages={packages} page={page} />
        <Pager page={page} total={data.totalPages} />
      </MainCard>
    </>
  );
}

type Props = RouteComponentProps;

export type PackagesData = {
  packages: Array<Package>;
  count: number;
  totalPages: number;
};
