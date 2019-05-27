import React from "react";
import { Link } from "@reach/router";
import qs from "querystring";
import cx from "classnames";
import MainCard from "client/components/MainCard";
import { useGet } from "client/helpers/useAxios";

export default function Packages(props) {
  const [data] = useGet("/api/v1/packages", props.location.key);
  const packages = data.packages || [];

  const { page } = qs.parse(props.location.search.slice(1));

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
        <Pager page={page} />
        <div className="row">
          <div className="col-auto ml-auto" />
        </div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </MainCard>
    </>
  );
}

function range(start, end) {
  if (start === end) return [start];
  return [start, ...range(start + 1, end)];
}

const Pager = props => {
  const page = Number(props.page);
  const total = 30;

  const start = Math.max(1, page - 2);
  const end = Math.min(total, Number(page) + 2);

  // @TODO always show 5 pages...

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li
          className={cx("page-item", {
            disabled: page === 1,
          })}
        >
          <Link className="page-link" to={`?page=${page - 1}`}>
            Previous
          </Link>
        </li>

        {range(start, end).map(current => (
          <li
            className={cx("page-item", {
              active: current === page,
            })}
          >
            <Link className="page-link" to={`?page=${current}`} key={current}>
              {current}
            </Link>
          </li>
        ))}

        <li
          className={cx("page-item", {
            disabled: page === total,
          })}
        >
          <Link className="page-link" to={`?page=${page + 1}`}>
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};
