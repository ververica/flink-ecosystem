import PackageOptions from "client/components/packages/PackageOptions";
import React, { FC, useContext } from "react";
import styled from "styled-components/macro";
import Tags from "client/components/packages/Tags";
import { Comments } from "client/components/comments";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "client/components/Icon";
import { MainCard } from "client/components/MainCard";
import { MarkdownViewer } from "client/components/MarkdownViewer";
import { PackageResult } from "client/types/Package";
import { RouteComponentProps } from "@reach/router";
import { UserData } from "client/components/UserDataProvider";
import { Votes } from "./Votes";

const Img = styled.img`
  object-fit: contain;
  max-height: 100%;
  width: 100%;
`;

const defaultProps = {
  package: {
    category: "",
    description: "",
    comments: 0,
    downvotes: 0,
    id: 0,
    image_id: 0,
    license: "",
    name: "",
    owner: "",
    readme: "",
    repository: "",
    slug: "",
    tags: "",
    updated: "",
    upvotes: 0,
    user_id: 0,
    vote: 0,
    website: "",
  },
  comments: [],
};

export const ViewPackage: FC<Props> = (props = defaultProps) => {
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
};

type Props = RouteComponentProps<{}> & PackageResult;
