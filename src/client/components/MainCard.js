import React from "react";

const MainCard = props => (
  <>
    <div className="card border-left-0 rounded-0">
      <div className="card-body d-flex align-items-center">
        <h2 className="h5 mb-0">{props.header}</h2>
      </div>
    </div>
    <div
      className={`card border-left-0 rounded-0 border-top-0 flex-grow-1 ${
        props.className
      }`}
    >
      <div className="card-body">{props.children}</div>
    </div>
  </>
);

export default MainCard;
