import React, { useContext } from "react";
import cx from "classnames";
import { FormProvider } from "./PackageForm";

export default function SelectField(props: SelectFieldProps) {
  const { handleInputChange, inputs } = useContext(FormProvider);

  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <select
        name={props.name}
        id={props.id}
        className={cx("form-control", {
          "is-invalid": props.error.id === props.id,
        })}
        onChange={handleInputChange}
        value={inputs[props.name]}
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
  options: Array<string>;
  placeholder: string;
} & DefaultProps;

type DefaultProps = Readonly<typeof SelectField.defaultProps>;
