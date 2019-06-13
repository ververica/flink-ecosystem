import React, { SyntheticEvent } from "react";
import cx from "classnames";

export default function InputField(props: Props) {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        aria-describedby={`${props.id}-help`}
        className={cx("form-control", {
          "is-invalid": props.error.id === props.id,
        })}
        id={props.id}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        placeholder={props.placeholder}
        type="text"
        value={props.value}
      />
      {props.help && (
        <small id={`${props.id}-help`} className="form-text text-muted">
          {props.help}
        </small>
      )}
    </div>
  );
}

InputField.defaultProps = {
  error: {},
};

type Props = {
  error?: { id: string };
  help?: string;
  id: string;
  label: string;
  name: string;
  onBlur?: (e: SyntheticEvent) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string | number;
} & DefaultProps;

type DefaultProps = Readonly<typeof InputField.defaultProps>;
