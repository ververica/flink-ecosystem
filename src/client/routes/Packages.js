import React from "react";
import MainCard from "client/components/MainCard";
import { useGet } from "client/helpers/useAxios";

export default function Packages(props) {
  const [packages] = useGet("/api/v1/packages");

  return (
    <>
      <MainCard
        header={<h2 className="h5 mb-0">Most Popular Packages (15)</h2>}
      >
        <pre>{JSON.stringify(packages, null, 2)}</pre>
        <div className="row">
          <div className="col-auto ml-auto" />
        </div>
      </MainCard>
    </>
  );
}
