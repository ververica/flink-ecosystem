import React from "react";
import { Link } from "@reach/router";
import qs from "querystring";

import MainCard from "client/components/MainCard";
import { useGet } from "client/helpers/useAxios";
import Pager from "client/components/Pager";

export default function Packages(props) {
  const { page = 1 } = qs.parse(props.location.search.slice(1));

  const [data] = useGet(`/api/v1/packages?page=${page}`, props.location.key);
  const packages = data.packages || [];

  // @TODO total packages ()
  return (
    <>
      <MainCard header={`Most Popular Packages (${data.count || 0})`}>
        <ul>
          {packages.map(pkg => (
            <li key={pkg._id}>
              <Link to={`/packages/${pkg.id}`}>{pkg.name}</Link>
            </li>
          ))}
        </ul>
        <Pager page={page} total={data.totalPages} />
        <div className="row">
          <div className="col-auto ml-auto" />
        </div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </MainCard>
    </>
  );
}
