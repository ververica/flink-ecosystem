import React, { useState, useContext } from "react";

import styled from "styled-components/macro";
import MainCard from "client/components/MainCard";
import { RouteComponentProps, Link } from "@reach/router";
import Comment from "client/components/Comment";
import ReactMarkdown from "react-markdown";
import Votes from "client/components/Votes";
import AddComment from "client/components/AddComment";
import cx from "classnames";

import Icon from "client/components/Icon";
import useOutsideClick from "client/helpers/useOutsideClick";
import { UserData } from "client/components/UserDataProvider";
import { PackageResult } from "client/types/Package";

const Img = styled.img`
  object-fit: cover;
  max-height: 150px;
`;

export default function ViewPackage(props: ViewPackageProps) {
  const [show, setShow] = useState(false);

  const ref = useOutsideClick(() => {
    if (show) setShow(false);
  });

  const { user } = useContext(UserData);
  const { package: pkg, comments } = props.data;

  const packageOptions = (
    <div className={cx("dropdown", { show })}>
      <button
        className="btn btn-light dropdown-toggle btn-sm"
        type="button"
        aria-haspopup="true"
        onClick={() => setShow(!show)}
      >
        <Icon name="ellipsis-v" margin={0} />
      </button>
      <div
        className={cx("dropdown-menu dropdown-menu-right", { show })}
        ref={ref}
      >
        <Link to="edit" className="dropdown-item">
          <Icon name="edit" fw={false} /> Edit
        </Link>
        <a href="#delete" className="dropdown-item">
          <Icon name="trash-alt" fw={false} /> Delete
        </a>
      </div>
    </div>
  );

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
      {user.id > 0 && (
        <AddComment
          slug={pkg.slug}
          id={pkg.id}
          refreshPackageData={props.refreshPackageData}
        />
      )}
      {comments.length ? (
        comments.map(comment => <Comment {...comment} key={comment.id} />)
      ) : (
        <h3>No comments</h3>
      )}
    </MainCard>
  );
}

type ViewPackageProps = {
  data: PackageResult;
  refreshPackageData: () => void;
} & RouteComponentProps;
