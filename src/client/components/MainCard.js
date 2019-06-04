import React from "react";
import styled from "styled-components/macro";

const Card = styled.div.attrs(props => ({
  className: `card rounded-0 ${props.className}`,
}))`
  @media screen and (min-width: 992px) {
    border-left: 0;
  }
`;

const MainCard = props => (
  <>
    <Card>
      <div className="card-body d-flex align-items-center">
        <h2 className="h5 mb-0">{props.header}</h2>
      </div>
    </Card>
    <Card className="border-top-0 flex-grow-1">
      <div className="card-body">{props.children}</div>
    </Card>
  </>
);

export default MainCard;
