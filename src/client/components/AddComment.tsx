import React, { useContext } from "react";
import styled from "styled-components/macro";
import { UserData } from "client/components/UserDataProvider";
import axios from "axios";
import { CommentData } from "client/types/Package";
import CommentForm from "./CommentForm";

const Avatar = styled.img.attrs({
  className: "mr-3 pt-1",
})`
  max-width: 32px;
`;

export default function AddComment(props: AddCommentProps) {
  const { user } = useContext(UserData);

  const handleSubmit = async (text: string) => {
    const data = { package_id: props.id, text };

    try {
      const response = await axios.post<CommentData>("/api/v1/comment", data);
      props.addComment({
        ...response.data,
        avatar_url: user.avatar_url,
        login: user.login,
      });
    } catch (e) {
      console.error("it borke", e);
    }
  };

  return (
    <div className="media">
      <Avatar src={user.avatar_url} alt={user.login} />
      <div className="media-body">
        <CommentForm handleSubmit={handleSubmit} buttonText="Add Comment" />
      </div>
    </div>
  );
}

type AddCommentProps = {
  id: number;
  slug: string;
  addComment: (c: CommentData) => void;
};
