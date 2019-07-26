import React, { SyntheticEvent, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const Icon: FC<Props> = props => {
  const marginRight = `mr-${props.marginRight}`;

  return (
    <FontAwesomeIcon
      id={props.id}
      icon={props.icon}
      className={cx(marginRight, props.className)}
      fixedWidth={props.fw}
      onClick={props.onClick}
      title={props.title}
    />
  );
};

Icon.defaultProps = {
  fw: true,
  marginRight: 2,
};

type Props = {
  id?: string;
  className?: string;
  fw?: boolean;
  marginRight?: number;
  icon: IconDefinition;
  onClick?: (e: SyntheticEvent) => void;
  title: string;
};
