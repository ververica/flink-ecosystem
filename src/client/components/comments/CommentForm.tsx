import React, { useState, SyntheticEvent, ReactNode, FC } from "react";
import MarkdownEditor from "../MarkdownEditor";
import { FormChangeEvent } from "client/types/FormProvider";

export const CommentForm: FC<Props> = props => {
  const [content, setContent] = useState(props.initialValue || "");

  const handleChange = (e: FormChangeEvent) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await props.handleSubmit(content.trim());
      setContent("");
    } catch (e) {}
  };

  return (
    <>
      <MarkdownEditor
        id="comment"
        name="comment"
        label="Add Comment"
        onChange={handleChange}
        placeholder="Add a new comment."
        value={content}
      />
      <div className="d-flex mt-2 justify-content-end">
        {props.cancelButton}
        <button
          className="btn btn-primary btn-sm ml-2"
          onClick={handleSubmit}
          type="submit"
        >
          {props.buttonText}
        </button>
      </div>
    </>
  );
};

type Props = {
  initialValue?: string;
  buttonText: string;
  handleSubmit: (content: string) => void;
  cancelButton?: ReactNode;
};
