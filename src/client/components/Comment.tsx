import React from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components/macro";

const Avatar = styled.img.attrs({
  className: "mr-3",
})`
  max-width: 48px;
`;

const Media = styled.div.attrs({
  className: "media",
})``;

export default function Comment(props: AddCommentProps) {
  return (
    <Media>
      <Avatar src={props.avatar_url} alt={props.login} className="mr-3" />
      <div className="media-body">
        <ReactMarkdown
          source={props.text}
          // disallowedTypes={["heading"]}
          // unwrapDisallowed
        />
      </div>
    </Media>
  );
}

type AddCommentProps = {
  avatar_url: string;
  login: string;
  text: string;
};
