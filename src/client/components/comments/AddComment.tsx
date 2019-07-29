import Axios from "axios";
import React, { FC, useContext } from "react";
import styled from "styled-components/macro";
import { CommentData } from "client/types/Package";
import { CommentForm } from "./CommentForm";
import { UserData } from "client/components/UserDataProvider";

const Avatar = styled.img.attrs({
  className: "mr-3 pt-1",
})`
  max-width: 32px;
`;

export const AddComment: FC<Props> = props => {
  const { user } = useContext(UserData);

  // any errors thrown here are caught inside CommentForm
  const handleSubmit = async (text: string) => {
    const data = {
      packageId: props.id,
      packageName: props.packageName,
      packageSlug: props.packageSlug,
      text,
      userName: user.login,
    };

    const response = await Axios.post<CommentData>("/api/v1/comments", data);
    props.addComment({
      ...response.data,
      avatar_url: user.avatar_url,
      login: user.login,
    });
  };

  return (
    <div className="media">
      <Avatar src={user.avatar_url} alt={user.login} />
      <div className="media-body">
        <CommentForm handleSubmit={handleSubmit} buttonText="Add Comment" />
      </div>
    </div>
  );
};

type Props = {
  addComment: (c: CommentData) => void;
  id: number;
  packageName: string;
  packageSlug: string;
};
