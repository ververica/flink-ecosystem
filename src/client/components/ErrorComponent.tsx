import cx from "classnames";
import React, { FC } from "react";

export const ErrorComponent: FC<Props> = props => {
  return (
    <div className={cx("container", props.className)}>
      <div className="alert alert-danger" role="alert">
        Error: {props.message}
      </div>
    </div>
  );
};

ErrorComponent.defaultProps = {
  message: "An unknown error occured.",
};

type Props = {
  className?: string;
  message?: string;
};
