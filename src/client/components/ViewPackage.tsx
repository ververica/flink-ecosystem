import React, { useContext } from "react";

import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Icon } from "client/components/Icon";

import styled from "styled-components/macro";
import MainCard from "client/components/MainCard";
import { RouteComponentProps } from "@reach/router";
import Votes from "client/components/Votes";
import { UserData } from "client/components/UserDataProvider";
import { PackageResult } from "client/types/Package";
import PackageOptions from "./PackageOptions";
import Comments from "./Comments";
import Tags from "./Tags";
import MarkdownViewer from "./MarkdownViewer";

const Img = styled.img`
  object-fit: contain;
  max-height: 100%;
  width: 100%;
`;

export default function ViewPackage(props: ViewPackageProps) {
  const { user } = useContext(UserData);
  const { package: pkg, comments } = props;

  if (!pkg) {
    return null;
  }

  const packageOptions =
    user.id === pkg.user_id ? (
      <PackageOptions slug={pkg.slug} name={pkg.name} />
    ) : null;

  const packageImage = pkg.image_id ? (
    <div className="col-md-3">
      <div className="overflow-hidden d-flex justify-content-center float-left">
        <Img src={`/api/v1/images/${pkg.slug}`} alt={pkg.name} />
      </div>
    </div>
  ) : null;

  return (
    <MainCard header={pkg.name} options={packageOptions}>
      <div className="row">
        <div className="col">
          <div className="row text-muted">
            <div className="col">{pkg.description}</div>
            {packageImage}
          </div>
          <hr />
          <MarkdownViewer source={pkg.readme} />
        </div>
      </div>
      <div className="row mt-3 justify-content-between">
        <div className="col-auto">
          <Icon icon={faHome} title="home" />
          <a href={pkg.website} target="_blank" rel="noopener noreferrer">
            {pkg.website}
          </a>
          <br />
          <Icon icon={faGithub} title="github" />
          <a href={pkg.repository} target="_blank" rel="noopener noreferrer">
            {pkg.repository}
          </a>
          <br />
          <Icon icon={faUser} title="User" />
          <a
            href={`https://github.com/${pkg.owner}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {pkg.owner}
          </a>
        </div>

        <div className="col-auto">License: {pkg.license}</div>
        <big className="col-auto">
          <Votes
            id={pkg.id}
            slug={pkg.slug}
            upvotes={pkg.upvotes}
            downvotes={pkg.downvotes}
            vote={pkg.vote}
          />
        </big>
      </div>
      <Tags tags={pkg.tags} category={pkg.category} />
      <hr />
      <Comments pkg={pkg} comments={comments} />
    </MainCard>
  );
}

ViewPackage.defaultProps = {
  package: {},
  comments: [],
};

type ViewPackageProps = RouteComponentProps & PackageResult;
