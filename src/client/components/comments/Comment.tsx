import React, { useContext, useState, SyntheticEvent } from "react";
import styled from "styled-components/macro";
import { format } from "date-fns";
import Axios from "axios";
import cx from "classnames";

import { CommentData } from "client/types/Package";
import { UserData } from "../UserDataProvider";
import CommentForm from "./CommentForm";
import Modal from "../Modal";
import MarkdownViewer from "../MarkdownViewer";
import useLocation from "client/helpers/useLocation";

const Avatar = styled.img.attrs({
  className: "mr-2 mt-1",
})`
  max-width: 32px;
  max-height: 32px;
  overflow: hidden;
`;

const Media = styled.li.attrs(props => ({
  className: `${props.className} media border`,
}))`
  padding: 0.25rem;
  margin-bottom: 0.5rem;

  &.active {
    border-style: dashed !important;
    border-color: #d55c71 !important;
  }
`;

export default function Comment(props: CommentProps) {
  const { user } = useContext(UserData);
  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [text, setText] = useState(props.text);
  const { location } = useLocation();

  const handleEditClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setEditing(true);
  };

  // any errors thrown here are caught inside CommentForm
  const handleEdit = (id: CommentData["id"]) => async (text: string) => {
    await Axios.post(`/api/v1/comments/${id}`, {
      text,
      packageName: props.name,
      packageSlug: props.slug,
    });
    setText(text);

    // setTimeout so this happens *after* then `handleSubmit` function inside
    // CommentForm finishes.
    setTimeout(() => setEditing(false));
  };

  const handleDeleteClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setConfirm(true);
  };

  const handleDelete = (id: CommentData["id"]) => async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await Axios.delete(`/api/v1/comments/${id}`);
      setDeleted(true);
    } catch (e) {}

    setConfirm(false);
  };

  // We mark a comment as deleted if the request was successful, then we
  // delete the comment after the modal animation finishes.
  const handleModalHidden = () => {
    setConfirm(false);
    if (deleted) {
      props.removeComment(props.id);
    }
  };

  const commentActions = (
    <small>
      [
      <a href="#delete" onClick={handleDeleteClick}>
        delete
      </a>
      ] [
      <a href="#edit" onClick={handleEditClick}>
        edit
      </a>
      ]
    </small>
  );

  const modalActions = (
    <>
      <button
        className="btn btn-sm btn-default"
        onClick={() => setConfirm(false)}
      >
        Cancel
      </button>
      <button
        className="btn btn-sm btn-danger"
        onClick={handleDelete(props.id)}
      >
        Delete
      </button>
    </>
  );

  const cancelButton = (
    <button className="btn btn-sm ml-auto" onClick={() => setEditing(false)}>
      cancel
    </button>
  );

  return (
    <>
      <Media
        className={cx({ active: location.hash === `#comment-${props.id}` })}
      >
        <div className="row no-gutters mw-100 w-100 flex-nowrap">
          <div className="col-auto">
            <Avatar src={props.avatar_url} alt={props.login} />
          </div>
          <div className="col overflow-hidden">
            <small className="d-flex justify-content-between text-muted">
              <span>
                <strong>{props.login}</strong>{" "}
                {format(props.added, "MM-DD-YYYY HH:mma")}{" "}
                {props.added !== props.updated && <small>(edited)</small>}
              </span>
              {props.user_id === user.id && commentActions}
            </small>
            {editing ? (
              <CommentForm
                handleSubmit={handleEdit(props.id)}
                buttonText="Save Changes"
                initialValue={text}
                cancelButton={cancelButton}
              />
            ) : (
              <MarkdownViewer source={text} />
            )}
          </div>
        </div>
      </Media>
      <Modal
        open={confirm}
        title="Are you sure?"
        onModalHidden={handleModalHidden}
        actions={modalActions}
      >
        Are you sure you want to delete your comment? You cannot undo this
        action.
      </Modal>
    </>
  );
}

type CommentProps = CommentData & {
  removeComment: (id: CommentData["id"]) => void;
};
