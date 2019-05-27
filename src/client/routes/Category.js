import React from "react";
import MainCard from "client/components/MainCard";
import { useGet } from "client/helpers/useAxios";
import { Link } from "@reach/router";

export default function Category(props) {
  const [data] = useGet(`/api/v1/packages?category=${props.category}`);
  const packages = data.packages || [];

  return (
    <MainCard
      header={`Packages tagged with "${props.category}" (${data.count || 0})`}
    >
      <ul>
        {packages.map(pkg => (
          <li key={pkg._id}>
            <Link to={`/packages/${pkg.id}`}>{pkg.name}</Link>
          </li>
        ))}
      </ul>
    </MainCard>
  );
}
