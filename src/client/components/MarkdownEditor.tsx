import React, { useState, SyntheticEvent, useRef, useEffect } from "react";
import cx from "classnames";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";

export default function MarkdownEditor(props: any) {
  const [tab, setTab] = useState("write");
  const [minHeight, setMinHeight] = useState(0);
  const ref = useRef() as any;

  // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   e.preventDefault();
  //   props.onChange(e.target.value);
  // };

  const changeTab = (newTab: string) => (e: SyntheticEvent) => {
    e.preventDefault();
    setTab(newTab);
    if (newTab === "write") {
      setTimeout(() => ref.current.focus());
    }
  };

  return (
    <>
      <ul className="nav nav-tabs">
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
            inputRef={ref}
            className="form-control"
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            minRows={4}
            name={props.name}
            onHeightChange={(height: number) => setMinHeight(height)}
          />
        </div>
        <div hidden={tab === "write"} style={{ minHeight }}>
          <ReactMarkdown source={props.value} />
        </div>
      </div>
    </>
  );
}
