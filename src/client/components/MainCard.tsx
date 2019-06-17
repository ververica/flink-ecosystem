import React, { ReactNode } from "react";
import styled from "styled-components/macro";
import { mediaLarge } from "client/helpers/styles";

const Card = styled.div.attrs({
  className: `card rounded-0`,
})`
  @media ${mediaLarge} {
    border-left: 0;
  }

  & + & {
    border-top: 0;
    flex-grow: 1;
  }
`;

export default function MainCard(props: MainCardProps) {
  return (
    <>
      <Card>
        <div className="card-body d-flex align-items-center justify-content-between">
          <h2 className="h5 mb-0">{props.header}</h2>
          {props.options}
        </div>
      </Card>
      <Card>
        <div className="card-body markdown">{props.children}</div>
      </Card>
    </>
  );
}

type MainCardProps = {
  header: ReactNode;
  children: ReactNode;
  options?: ReactNode;
};