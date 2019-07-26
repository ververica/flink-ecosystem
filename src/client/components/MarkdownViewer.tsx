import React, { FC } from "react";
import ReactMarkdown from "react-markdown";

export const MarkdownViewer: FC<Props> = props => {
  return (
    <ReactMarkdown
      source={props.source}
      className="markdown"
      renderers={{ code, table, link }}
    />
  );
};

const code = (props: any) => (
  <pre className="pre-scrollable p-2 bg-light">
    <code>{props.value}</code>
  </pre>
);

const table = (table: any) => (
  <table className="table table-bordered table-sm">{table.children}</table>
);

const link = (props: any) => {
  return (
    <a rel="noreferrer noopener nofollow" href={props.href}>
      {props.children}
    </a>
  );
};

type Props = {
  source: string;
};
