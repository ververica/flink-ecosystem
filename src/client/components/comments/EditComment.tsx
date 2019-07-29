import Axios from "axios";
import React, { FC, useContext } from "react";
import { CommentData } from "client/types/Package";
import { CommentForm } from "client/components/comments/CommentForm";
import { UserData } from "client/components/UserDataProvider";

export const EditComment: FC<Props> = props => {
  const { user } = useContext(UserData);

  // any errors thrown here are caught inside CommentForm
  const handleEdit = (id: CommentData["id"]) => async (text: string) => {
    await Axios.post(`/api/v1/comments/${id}`, {
      text,
      packageName: props.packageName,
      packageSlug: props.packageSlug,
      userName: user.login,
    });

    props.setText(text);

    // setTimeout so this happens *after* then `handleSubmit` function inside
    // CommentForm finishes.
    setTimeout(() => props.setEditing(false));
  };

  const cancelButton = (
    <button
      className="btn btn-sm ml-auto"
      onClick={() => props.setEditing(false)}
    >
      cancel
    </button>
  );

  return (
    <CommentForm
      handleSubmit={handleEdit(props.id)}
      buttonText="Save Changes"
      initialValue={props.initialValue}
      cancelButton={cancelButton}
    />
  );
};

type Props = {
  packageName: string;
  packageSlug: string;
  initialValue: string;
  id: number;
  setText: (text: string) => void;
  setEditing: (editing: boolean) => void;
};
