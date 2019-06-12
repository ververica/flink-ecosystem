import React, { ReactNode } from "react";
import styled from "styled-components/macro";

const Card = styled.div.attrs({
  className: `card rounded-0`,
})`
  @media screen and (min-width: 992px) {
    border-left: 0;
  }

  & + & {
    border-top: 0;
    flex-grow: 1;
  }
`;

export default function MainCard(props: Props) {
  return (
    <>
      <Card>
        <div className="card-body d-flex align-items-center">
          <h2 className="h5 mb-0">{props.header}</h2>
        </div>
      </Card>
      <Card>
        <div className="card-body">{props.children}</div>
      </Card>
    </>
  );
}

type Props = {
  header: ReactNode;
  children: ReactNode;
};
