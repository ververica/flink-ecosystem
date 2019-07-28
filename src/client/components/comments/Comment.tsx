import React, { useState, SyntheticEvent } from "react";
import styled from "styled-components/macro";
import Axios from "axios";
import cx from "classnames";

import { CommentData } from "client/types/Package";
import { ConfirmModal } from "../ConfirmModal";
import { MarkdownViewer } from "../MarkdownViewer";
import { useLocation } from "client/helpers";
import { EditComment } from "./EditComment";
import { CommentHeader } from "./CommentHeader";
import { Col, Row } from "reactstrap";

const Avatar = styled.img.attrs({
  className: "mr-1 mt-1",
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
  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [text, setText] = useState(props.text);
  const { location } = useLocation();

  const handleEditClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setEditing(true);
  };

  const handleDeleteClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setConfirm(true);
  };

  const handleDelete = (id: CommentData["id"]) => async () => {
    try {
      await Axios.delete(`/api/v1/comments/${id}`);
      setDeleted(true);
    } catch (e) {}

    setConfirm(false);
  };

  // We mark a comment as deleted if the request was successful, then we
  // delete the comment after the modal animation finishes.
  const handleModalClosed = () => {
    setConfirm(false);
    if (deleted) {
      props.removeComment(props.id);
    }
  };

  const commentActive = location.hash === `#comment-${props.id}`;

  return (
    <Media className={cx({ active: commentActive })}>
      <Row noGutters className="mw-100 w-100 flex-nowrap">
        <Col sm="auto">
          <Avatar src={props.avatar_url} alt={props.login} />
        </Col>
        <Col className="overflow-hidden">
          <CommentHeader
            user_id={props.user_id}
            login={props.login}
            added={props.added}
            updated={props.updated}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
          />
          {editing ? (
            <EditComment
              id={props.id}
              initialValue={text}
              setText={setText}
              setEditing={setEditing}
              packageName={props.name}
              packageSlug={props.slug}
            />
          ) : (
            <MarkdownViewer source={text} />
          )}
        </Col>
      </Row>
      <ConfirmModal
        handleCancel={() => setConfirm(false)}
        handleConfirm={handleDelete(props.id)}
        header="Are you sure?"
        isOpen={confirm}
        message="Are you sure you want to delete your comment? You cannot undo this action."
        onClosed={handleModalClosed}
      />
    </Media>
  );
}

type CommentProps = CommentData & {
  removeComment: (id: CommentData["id"]) => void;
};
