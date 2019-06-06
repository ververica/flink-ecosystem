import React, { useEffect } from "react";
import { Link } from "@reach/router";
import styled from "styled-components/macro";
import { format } from "date-fns";
import useScroll from "client/helpers/useScroll";
import cx from "classnames";

type Package = {
  description: string;
  downvoted: number | null;
  downvotes: number;
  name: string;
  slug: string;
  updated: string;
  upvoted: number | null;
  upvotes: number;
};

type Props = {
  packages: Array<Package>;
  page: number;
};

const Img = styled.img`
  object-fit: cover;
  max-height: 150px;
  width: 100%;
`;

const votesClass = (voted: number | null) =>
  cx("mr-4", { "text-muted": !voted });

export default function PackageList(props: Props) {
  useScroll(props.page);

  return props.packages.map(pkg => (
    <div className="row mb-3" key={pkg.slug}>
      <div className="col-4 overflow-hidden d-flex align-items-center justify-content-center">
        <Img src="https://lorempixel.com/640/480/city/" alt="something" />
      </div>
      <div className="col-8">
        <h5 className="card-title">
          <Link to={`/packages/${pkg.slug}`}> {pkg.name}</Link>
        </h5>
        <div className="card-text">{pkg.description}</div>
        <div className="card-text mt-2 d-flex justify-content-between">
          <span>
            <small className={votesClass(pkg.upvoted)}>
              <i className="fal fa-thumbs-up mr-1" title="Upvotes" />
              {pkg.upvotes}
            </small>

            <small className={votesClass(pkg.downvoted)}>
              <i className="fal fa-thumbs-down mr-1" title="Downvotes" />
              {pkg.downvotes}
            </small>
            <small className="text-muted">
              <i className="fal fa-comments mr-1" title="Comments" />
              50
            </small>
          </span>

          <small>Last Updated: {format(pkg.updated, "MM/DD/YYYY")}</small>
        </div>
      </div>
    </div>
  ));
}
