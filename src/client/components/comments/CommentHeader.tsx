import React, { FC, SyntheticEvent, useContext } from "react";
import { format } from "date-fns";
import { UserData } from "../UserDataProvider";

export const CommentHeader: FC<Props> = props => {
  const { user } = useContext(UserData);

  const commentActions = (
    <small>
      [
      <a href="#delete" onClick={props.handleDeleteClick}>
        delete
      </a>
      ] [
      <a href="#edit" onClick={props.handleEditClick}>
        edit
      </a>
      ]
    </small>
  );

  return (
    <small className="d-flex justify-content-between text-muted">
      <span>
        <strong>{props.login}</strong>{" "}
        {format(props.added, "MM-DD-YYYY hh:mma")}{" "}
        {props.added !== props.updated && <small>(edited)</small>}
      </span>
      {props.user_id === user.id && commentActions}
    </small>
  );
};

type Props = {
  login: string;
  added: string;
  user_id: number;
  updated: string;
  handleDeleteClick: (e: SyntheticEvent) => void;
  handleEditClick: (e: SyntheticEvent) => void;
};
