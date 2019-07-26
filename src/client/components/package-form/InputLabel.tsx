import React, { FC } from "react";

export const InputLabel: FC<Props> = props => (
  <label htmlFor={props.id}>
    {props.label}
    {props.optional && (
      <small className="text-muted font-italic"> - Optional</small>
    )}
  </label>
);

type Props = {
  id: string;
  label: string;
  optional?: boolean;
};
