import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components/macro";
import { format } from "date-fns";

const Avatar = styled.img.attrs({
  className: "mr-3",
})`
  max-width: 32px;
`;

const Media = styled.div.attrs({
  className: "media",
})`
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
`;

const Code = (props: any) => (
  <pre className="pre-scrollable">
    <code>{props.children}</code>
  </pre>
);

export default function Comment(props: AddCommentProps) {
  return (
    <Media>
      <Avatar src={props.avatar_url} alt={props.login} />
      <div className="media-body">
        <small className="text-muted">
          {format(props.added, "MM/DD/YYYY")} - {props.login}
        </small>
        <ReactMarkdown
          source={props.text}
          renderers={{
            code: code => <Code>{code.value}</Code>,
            table: table => (
              <table className="table table-bordered table-sm">
                {table.children}
              </table>
            ),
          }}
        />
      </div>
    </Media>
  );
}

type AddCommentProps = {
  avatar_url: string;
  login: string;
  text: string;
  added: string;
};
