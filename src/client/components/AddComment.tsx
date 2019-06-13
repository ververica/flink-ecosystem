import React, { useState, useContext, SyntheticEvent } from "react";
import styled from "styled-components/macro";
import Editor from "draft-js-plugins-editor";
import { EditorState } from "draft-js";
import { stateToMarkdown } from "draft-js-export-markdown";
import createMarkdownPlugin from "draft-js-markdown-plugin";
import { UserData } from "client/components/UserDataProvider";
import axios from "axios";

const Avatar = styled.img.attrs({
  className: "mr-3",
})`
  max-width: 32px;
`;

const plugins = [createMarkdownPlugin({})];

export default function AddComment(props: AddCommentProps) {
  const { user } = useContext(UserData);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const text = stateToMarkdown(editorState.getCurrentContent());
    const data = { package_id: props.id, text };

    try {
      await axios.post("/api/v1/comment", data);
      setEditorState(EditorState.createEmpty());
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
          <div className="card p-2">
            <Editor
              editorState={editorState}
              onChange={(editorState: any) => setEditorState(editorState)}
              placeholder="Add a newcomment"
              plugins={plugins}
            />
          </div>
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
      <hr />
    </>
  );
}

type AddCommentProps = {
  id: number;
  slug: string;
  refreshPackageData: () => void;
};
