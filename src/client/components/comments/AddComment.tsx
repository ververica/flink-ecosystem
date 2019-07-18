import React, { useContext, FC } from "react";
import styled from "styled-components/macro";
import { UserData } from "client/components/UserDataProvider";
import axios from "axios";
import { CommentData } from "client/types/Package";
import { CommentForm } from "./CommentForm";

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

    const response = await axios.post<CommentData>("/api/v1/comments", data);
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
