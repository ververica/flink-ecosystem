import React, { useState, SyntheticEvent } from "react";
import MarkdownEditor from "./MarkdownEditor";
import { FormChangeEvent } from "client/types/FormProvider";

export default function CommentForm(props: CommentFormProps) {
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
      <div className="d-flex mt-2">
        <button
          className="btn btn-primary btn-sm ml-auto"
          onClick={handleSubmit}
          type="button"
        >
          {props.buttonText}
        </button>
      </div>
    </>
  );
}

type CommentFormProps = {
  initialValue?: string;
  buttonText: string;
  handleSubmit: (content: string) => void;
};
