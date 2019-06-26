import React from "react";

export default function ErrorComponent(props: ErrorComponentProps) {
  return (
    <div className="container pr-0">
      <div className="alert alert-danger" role="alert">
        {props.message}
      </div>
    </div>
  );
}

ErrorComponent.defaultProps = {
  message: "An unknown error occured.",
};

type ErrorComponentProps = {
  message: string;
};
