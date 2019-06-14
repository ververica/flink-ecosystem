import React from "react";
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
      className={cx(name, margin, type, {
        "fa-fw": props.fw,
      })}
      title={props.title}
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
  fw?: boolean;
  margin?: number;
  name: string;
  type?: string;
  title?: string;
} & Readonly<typeof Icon.defaultProps>;
