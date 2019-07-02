import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components/macro";
import { format } from "date-fns";
import useScroll from "client/helpers/useScroll";
import Votes from "client/components/Votes";
import Icon from "./Icon";
import { PackageData } from "client/types/Package";
import Dotdotdot from "react-dotdotdot";

const Img = styled.img`
  object-fit: cover;
  max-height: 150px;
  width: 100%;
`;

export default function PackageList(props: Props) {
  useScroll(props.page);

  if (!props.packages.length) {
    return <h3>No packages found</h3>;
  }

  // Typescript can't return an array with out wrapping it in a fragment. :(
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356#issuecomment-336384210
  return (
    <>
      {props.packages.map(pkg => (
        <div className="row mb-3" key={pkg.slug}>
          <div className="col-4 overflow-hidden d-flex align-items-start justify-content-center">
            <Link to={`/packages/${pkg.slug}`}>
              <Img src="https://lorempixel.com/640/480/city/" alt="something" />
            </Link>
          </div>
          <div className="col-8">
            <h5 className="card-title">
              <Link to={`/packages/${pkg.slug}`}>{pkg.name}</Link>
            </h5>
            <Dotdotdot className="card-text" clamp={5}>
              {pkg.description}
            </Dotdotdot>
            <div className="card-text mt-2 d-flex justify-content-between">
              <span>
                <Votes
                  id={pkg.id}
                  vote={pkg.vote}
                  slug={pkg.slug}
                  upvotes={pkg.upvotes}
                  downvotes={pkg.downvotes}
                />
                <Link to={`/packages/${pkg.slug}`} className="ml-4">
                  <small className="text-muted">
                    <Icon name="comments" margin={1} title="Comments" />
                    {pkg.comments}
                  </small>
                </Link>
              </span>

              <small>Last Updated: {format(pkg.updated, "MM/DD/YYYY")}</small>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

type Props = {
  packages: Array<PackageData>;
  page: number;
};
