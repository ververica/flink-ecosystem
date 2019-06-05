import React from "react";
import useFetch from "fetch-suspense";
import MainCard from "client/components/MainCard";
import PackageList from "client/components/PackageList";

export default function Category(props) {
  const data = useFetch(
    `/api/v1/packages?category=${props.category}&key=${props.location.key}`
  );
  const packages = data.packages || [];

  return (
    <MainCard
      header={`Packages tagged with "${props.category}" (${data.count || 0})`}
    >
      <PackageList packages={packages} />
    </MainCard>
  );
}
