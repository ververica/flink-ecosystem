import React, { useState, useContext, SyntheticEvent } from "react";

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
import Axios from "axios";
import Modal from "./Modal";

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

  return (
    <MainCard
      header={pkg.name}
      options={
        user.id === pkg.user_id && (
          <PackageOptions slug={pkg.slug} name={pkg.name} />
        )
      }
    >
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

const PackageOptions = (props: PackageOptionsProps) => {
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const ref = useOutsideClick(() => {
    if (show) setShow(false);
  });

  const handleDelete = (slug: string) => async (e: SyntheticEvent) => {
    e.preventDefault();
    setShow(false);
    setConfirm(false);

    try {
      await Axios.delete(`/api/v1/packages/${slug}`);
    } catch (e) {
      console.log("it broke: ", e);
    }
  };

  return (
    <>
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
          <a
            href="#delete"
            className="dropdown-item"
            onClick={() => setConfirm(true)}
          >
            <Icon name="trash-alt" fw={false} /> Delete
          </a>
        </div>
      </div>
      <Modal
        open={confirm}
        title="Are you sure?"
        onModalHidden={() => setConfirm(false)}
        actions={
          <>
            <button
              className="btn btn-sm btn-default"
              onClick={() => setConfirm(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={handleDelete(props.slug)}
            >
              Delete
            </button>
          </>
        }
      >
        Are you sure you want to delete the package "<code>{props.name}</code>".
        You cannot undo this action, and the package id <kbd>{props.slug}</kbd>{" "}
        will remain unavailable.
      </Modal>
    </>
  );
};

ViewPackage.defaultProps = {
  package: {},
  comments: [],
};

type ViewPackageProps = {
  refreshPackageData: () => void;
} & RouteComponentProps &
  PackageResult;

type PackageOptionsProps = {
  slug: string;
  name: string;
};
