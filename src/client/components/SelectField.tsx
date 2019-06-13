import React from "react";
import cx from "classnames";

export default function SelectField(props: SelectFieldProps) {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <select
        name={props.name}
        id={props.id}
        className={cx("form-control", {
          "is-invalid": props.error.id === props.id,
        })}
        onChange={props.onChange}
        value={props.value}
      >
        <option value="" disabled hidden>
          {props.placeholder}
        </option>
        {props.options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

SelectField.defaultProps = {
  error: {},
};

type SelectFieldProps = {
  error?: { id: string };
  id: string;
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<string>;
  placeholder: string;
  value: string;
} & DefaultProps;

type DefaultProps = Readonly<typeof SelectField.defaultProps>;
