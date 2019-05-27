import React from "react";
import MainCard from "client/components/MainCard";
import { useGet } from "client/helpers/useAxios";
import { Link } from "@reach/router";

export default function Packages(props) {
  const [data] = useGet("/api/v1/packages");

  const packages = data.packages || [];

  // @TODO total packages ()
  return (
    <>
      <MainCard header={`Most Popular Packages (${data.count})`}>
        <ul>
          {packages.map(pkg => (
            <li key={pkg._id}>
              <Link to={`/packages/${pkg.id}`}>{pkg.name}</Link>
            </li>
          ))}
        </ul>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <div className="row">
          <div className="col-auto ml-auto" />
        </div>
      </MainCard>
    </>
  );
}
