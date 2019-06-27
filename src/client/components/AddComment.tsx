import React, { useState, useContext, SyntheticEvent } from "react";
import styled from "styled-components/macro";
import { UserData } from "client/components/UserDataProvider";
import axios from "axios";
import MarkdownEditor from "./MarkdownEditor";
import { FormChangeEvent } from "client/types/FormProvider";
import { CommentData } from "client/types/Package";

const Avatar = styled.img.attrs({
  className: "mr-3 pt-1",
})`
  max-width: 32px;
`;

export default function AddComment(props: AddCommentProps) {
  const { user } = useContext(UserData);
  const [content, setContent] = useState("");

  const handleChange = (e: FormChangeEvent) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = { package_id: props.id, text: content.trim() };

    try {
      const response = await axios.post<CommentData>("/api/v1/comment", data);
      props.addComment({
        ...response.data,
        avatar_url: user.avatar_url,
        login: user.login,
      });
      setContent("");
    } catch (e) {
      console.error("it borke", e);
    }
  };

  return (
    <div className="media">
      <Avatar src={user.avatar_url} alt={user.login} />
      <div className="media-body">
        <MarkdownEditor
          id="comment"
          name="comment"
          label="Add Comment"
          onChange={handleChange}
          placeholder="Add a new comment."
          value={content}
        />
        <div className="d-flex mt-2">
          <button
            className="btn btn-primary btn-sm ml-auto"
            onClick={handleSubmit}
            type="button"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
}

type AddCommentProps = {
  id: number;
  slug: string;
  addComment: (c: CommentData) => void;
};
