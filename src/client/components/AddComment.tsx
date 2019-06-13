import React, { useState, useContext, SyntheticEvent } from "react";
import styled from "styled-components/macro";
import { UserData } from "client/components/UserDataProvider";
import axios from "axios";
import MarkdownEditor from "./MarkdownEditor";

const Avatar = styled.img.attrs({
  className: "mr-3",
})`
  max-width: 32px;
`;

export default function AddComment(props: AddCommentProps) {
  const { user } = useContext(UserData);
  const [content, setContent] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = { package_id: props.id, text: content };

    try {
      await axios.post("/api/v1/comment", data);
      setContent("");
      props.refreshPackageData();
    } catch (e) {
      console.error("it borke", e);
    }
  };

  return (
    <>
      <div className="media">
        <Avatar src={user.avatar_url} alt={user.login} />
        <div className="media-body">
          <div className="card">
            <div className="card-body">
              <MarkdownEditor
                content={content}
                placeholder="Add a new comment."
                onChange={setContent}
              />
              <div className="d-flex mt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary btn-sm ml-auto"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

type AddCommentProps = {
  id: number;
  slug: string;
  refreshPackageData: () => void;
};
