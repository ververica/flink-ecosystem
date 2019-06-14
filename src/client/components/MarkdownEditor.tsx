import React, { useState, SyntheticEvent, useRef, ChangeEvent } from "react";
import cx from "classnames";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";

export default function MarkdownEditor(props: MarkdownEditorProps) {
  const [tab, setTab] = useState("write");
  // const [minHeight, setMinHeight] = useState(0);
  const ref = useRef() as any;

  const changeTab = (newTab: string) => (e: SyntheticEvent) => {
    e.preventDefault();
    setTab(newTab);
    if (newTab === "write") {
      const { scrollX, scrollY } = window;
      setTimeout(() => {
        ref.current.focus();
        window.scrollTo(scrollX, scrollY);
      });
    }
  };

  return (
    <>
      <ul className="nav nav-tabs">
        <li>
          <label className="p-2 mb-0 mr-2" htmlFor={props.id}>
            {props.label}
          </label>
        </li>
        <li className="nav-item" onClick={changeTab("write")}>
          <span className={cx("nav-link", { active: tab === "write" })}>
            Write
          </span>
        </li>
        <li className="nav-item" onClick={changeTab("preview")}>
          <span className={cx("nav-link", { active: tab === "preview" })}>
            Preview
          </span>
        </li>
      </ul>
      <div className="pt-2">
        <div hidden={tab === "preview"}>
          <TextareaAutosize
            id={props.id}
            inputRef={ref}
            className="form-control"
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            minRows={4}
            maxRows={30}
            name={props.name}
            // onHeightChange={(height: number) => setMinHeight(height)}
          />
        </div>
        <div
          hidden={tab === "write"}
          style={{ minHeight: 110, padding: "0.375rem 0.75rem" }}
          className="card"
        >
          <ReactMarkdown source={props.value} />
        </div>
      </div>
    </>
  );
}

type MarkdownEditorProps = {
  id: string;
  name: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  value: string;
};
