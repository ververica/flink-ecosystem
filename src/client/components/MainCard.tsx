import React, { ReactNode, FC } from "react";
import styled from "styled-components/macro";
import { mediaLarge } from "client/helpers/styles";
import { CardBody } from "reactstrap";

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

  p:last-child {
    margin-bottom: 0;
  }
`;

export const MainCard: FC<Props> = props => {
  return (
    <>
      {props.header && (
        <Card>
          <CardBody className="d-flex align-items-center justify-content-between">
            <h2 className="h5 mb-0">{props.header}</h2>
            {props.options}
          </CardBody>
        </Card>
      )}
      <Card>
        <CardBody className={props.bodyClass}>{props.children}</CardBody>
      </Card>
    </>
  );
};

type Props = {
  header?: ReactNode;
  options?: ReactNode;
  bodyClass?: string;
};
