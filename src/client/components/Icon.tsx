import React, { SyntheticEvent } from "react";
import cx from "classnames";

const iconTypes: IconTypes = {
  light: "fal",
  brand: "fab",
};

export default function Icon(props: IconProps) {
  const name = `fa-${props.name}`;
  const margin = `mr-${props.margin}`;
  const type = iconTypes[props.type];

  return (
    <i
      className={cx(name, margin, type, props.className, {
        "fa-fw": props.fw,
      })}
      title={props.title}
      onClick={props.onClick}
    />
  );
}

Icon.defaultProps = {
  margin: 2,
  fw: true,
  type: "light",
};

type IconTypes = {
  [key: string]: string;
};

type IconProps = {
  className?: string;
  fw?: boolean;
  margin?: number;
  name: string;
  onClick?: (e: SyntheticEvent) => void;
  title?: string;
  type?: string;
} & Readonly<typeof Icon.defaultProps>;
