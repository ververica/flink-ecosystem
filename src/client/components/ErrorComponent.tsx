import React from "react";

export default function ErrorComponent(props: ErrorComponentProps) {
  return (
    <div className="alert alert-danger" role="alert" hidden={props.hidden}>
      {props.message}
    </div>
  );
}

ErrorComponent.defaultProps = {
  message: "An unknown error occured.",
};

type ErrorComponentProps = {
  message: string;
  hidden?: boolean;
};
