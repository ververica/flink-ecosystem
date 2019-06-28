import React, { useContext } from "react";

import styled from "styled-components/macro";
import MainCard from "client/components/MainCard";
import { RouteComponentProps } from "@reach/router";
import ReactMarkdown from "react-markdown";
import Votes from "client/components/Votes";
import Icon from "client/components/Icon";
import { UserData } from "client/components/UserDataProvider";
import { PackageResult } from "client/types/Package";
import PackageOptions from "./PackageOptions";
import Comments from "./Comments";

const Img = styled.img`
  object-fit: cover;
  max-height: 150px;
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

  return (
    <MainCard header={pkg.name} options={packageOptions}>
      <div className="row">
        <div className="col-sm-3 order-last ">
          <div className="overflow-hidden d-flex justify-content-center">
            <Img src="https://lorempixel.com/640/480/city/" alt="something" />
          </div>
        </div>
        <div className="col-sm-9">
          <ReactMarkdown source={pkg.readme} />
        </div>
      </div>
      <div className="row mt-3 justify-content-between">
        <div className="col-auto">
          <Icon name="home" />
          {pkg.website}
          <br />
          <Icon name="github" type="brand" />
          {pkg.repository}
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
