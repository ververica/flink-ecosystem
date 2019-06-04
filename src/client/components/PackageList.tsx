import React, { useEffect } from "react";
import { Link } from "@reach/router";
import styled from "styled-components/macro";
import { format } from "date-fns";
import useScroll from "client/helpers/useScroll";

type Package = {
  id: string;
  name: string;
  description: string;
  upvotes: number;
  downvotes: number;
  added: string;
};

type Props = {
  packages: Array<Package>;
  page: number;
};

const Img = styled.img`
  object-fit: cover;
  max-height: 200px;
`;

export default function PackageList(props: Props) {
  useScroll(props.page);

  return props.packages.map(pkg => (
    <div className="card mb-3 overflow-hidden" key={pkg.id}>
      <div className="row no-gutters">
        <div className="col-4 overflow-hidden d-flex align-items-center justify-content-center">
          <Img src="https://lorempixel.com/640/480/city/" alt="something" />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h5 className="card-title">
              <Link to={`/packages/${pkg.id}`}> {pkg.name}</Link>
            </h5>
            <div className="card-text">{pkg.description}</div>
            <div className="card-text mt-2 d-flex justify-content-between text-muted">
              <small>
                <i className="fal fa-thumbs-up mr-1" title="Upvotes" />
                {pkg.upvotes}
                <span className="mr-3" />
                <i className="fal fa-thumbs-down mr-1" title="Downvotes" />
                {pkg.downvotes}
                <span className="mr-3" />
                <i className="fal fa-comments mr-1" title="Comments" />
                (50)
              </small>

              <small>Last Updated: {format(pkg.added, "MM/DD/YYYY")}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
}
