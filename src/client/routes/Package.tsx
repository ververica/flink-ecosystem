import React from "react";
import useFetch from "fetch-suspense";
import styled from "styled-components/macro";
import MainCard from "client/components/MainCard";
import { RouteComponentProps } from "@reach/router";
import { Package as TPackage } from "client/components/PackageList";
import Comment from "client/components/Comment";
import ReactMarkdown from "react-markdown";
import Votes from "client/components/Votes";
import AddComment from "client/components/AddComment";

const Img = styled.img`
  object-fit: cover;
  max-height: 150px;
`;

export default function Package(props: Props) {
  const data = useFetch(`/api/v1/packages/${props.package}`) as PackageData;
  const { package: pkg, comments } = data;

  if (!pkg) return null;

  return (
    <MainCard header={`Package: ${pkg.name} `}>
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
          <i className="fal fa-home mr-2 fa-fw" />
          {pkg.website}
          <br />
          <i className="fab fa-github mr-2 fa-fw" />
          {pkg.repository}
        </div>

        <div className="col-auto">License: {pkg.license}</div>
        <big className="col-auto">
          <Votes
            slug={pkg.slug}
            upvotes={pkg.upvotes}
            downvotes={pkg.downvotes}
            vote={pkg.vote}
          />
        </big>
      </div>
      <hr />
      {data.comments.length ? (
        data.comments.map(comment => <Comment {...comment} key={comment.id} />)
      ) : (
        <AddComment />
      )}
    </MainCard>
  );
}

type Props = RouteComponentProps<{
  package: string;
}>;

type PackageData = {
  package: TPackage;
  comments: Array<{
    added: string;
    avatar_url: string;
    login: string;
    id: number;
    text: string;
    user_id: number;
  }>;
};
