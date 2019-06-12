import React from "react";
import styled from "styled-components/macro";

const Avatar = styled.img.attrs({
  className: "mr-3",
})`
  max-width: 32px;
`;

export default function AddComment() {
  return (
    <div className="media">
      <Avatar src={""} alt={""} />
      <div className="media-body">sorahn</div>
    </div>
  );
}
