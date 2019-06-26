import React from "react";
import cx from "classnames";

export default function ErrorComponent(props: ErrorComponentProps) {
  return (
    <div className={cx("container", props.className)}>
      <div className="alert alert-danger" role="alert" hidden={props.hidden}>
        {props.message}
      </div>
    </div>
  );
}

ErrorComponent.defaultProps = {
  message: "An unknown error occured.",
};

type ErrorComponentProps = {
  className?: string;
  message: string;
  hidden?: boolean;
};
