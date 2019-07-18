import React, { ReactNode, FC } from "react";
import styled from "styled-components/macro";
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

  p:last-child {
    margin-bottom: 0;
  }
`;

export const MainCard: FC<Props> = props => {
  return (
    <>
      {props.header && (
        <Card>
          <div className="card-body d-flex align-items-center justify-content-between">
            <h2 className="h5 mb-0">{props.header}</h2>
            {props.options}
          </div>
        </Card>
      )}
      <Card>
        <div className={cx("card-body", props.bodyClass)}>{props.children}</div>
      </Card>
    </>
  );
};

type Props = {
  header?: ReactNode;
  options?: ReactNode;
  bodyClass?: string;
};
