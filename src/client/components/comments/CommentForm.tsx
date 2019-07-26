import React, { useState, SyntheticEvent, ReactNode, FC } from "react";
import { MarkdownEditor } from "../MarkdownEditor";
import { FormChangeEvent, FormError } from "client/types/FormProvider";
import { handlePostError } from "client/helpers/handlePostError";

export const CommentForm: FC<Props> = props => {
  const [content, setContent] = useState(props.initialValue || "");
  const [error, setError] = useState<FormError>({});

  console.log(error);

  const handleChange = (e: FormChangeEvent) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await props.handleSubmit(content.trim());
      setContent("");
    } catch (e) {
      handlePostError(e, setError);
    }
  };

  return (
    <>
      <MarkdownEditor
        id="comment"
        name="text"
        label="Add Comment"
        onChange={handleChange}
        placeholder="Add a new comment."
        value={content}
        error={error}
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
