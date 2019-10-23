import React, { FC, ReactNode } from "react";
import styled from "styled-components/macro";
import { CardBody } from "reactstrap";
import { mediaLarge } from "client/helpers/styles";
import cx from "classnames";

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
        <CardBody className={cx(props.bodyClass, props.className)}>
          {props.children}
        </CardBody>
      </Card>
    </>
  );
};

type Props = {
  header?: ReactNode;
  options?: ReactNode;
  bodyClass?: string;
  className?: string;
};
