import React from "react";
import qs from "querystring";
import useFetch from "fetch-suspense";

import MainCard from "client/components/MainCard";
import Pager from "client/components/Pager";
import PackageList from "client/components/PackageList";

export default function Packages(props) {
  const { page = 1 } = qs.parse(props.location.search.slice(1));

  const data = useFetch(
    `/api/v1/packages?page=${page}&key=${props.location.key}`
  );
  const packages = data.packages || [];

  return (
    <>
      <MainCard header={`Most Popular Packages (${data.count || 0})`}>
        <PackageList packages={packages} page={page} />
        <Pager page={page} total={data.totalPages} />
      </MainCard>
    </>
  );
}
