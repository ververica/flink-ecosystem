import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components/macro";

const MarkdownDiv = styled(ReactMarkdown)`
  h1 {
    font-size: 1.5rem;
  }
  h2 {
    font-size: 1.4rem;
  }
  h3 {
    font-size: 1.3rem;
  }
  h4 {
    font-size: 1.2rem;
  }
  h5 {
    font-size: 1.1rem;
  }
  h6 {
    font-size: 1rem;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const code: FC<{ value: string }> = props => (
  <pre className="pre-scrollable p-2 bg-light">
    <code>{props.value}</code>
  </pre>
);

const table: FC = table => (
  <table className="table table-bordered table-sm">{table.children}</table>
);

const link: FC<{ href: string }> = props => {
  return (
    <a rel="noreferrer noopener nofollow" href={props.href}>
      {props.children}
    </a>
  );
};

export const MarkdownViewer: FC<Props> = props => {
  return (
    <MarkdownDiv
      source={props.source}
      className="markdown"
      renderers={{ code, table, link }}
    />
  );
};

type Props = {
  source: string;
};
