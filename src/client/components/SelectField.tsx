import React, { useContext } from "react";
import cx from "classnames";
import { FormProvider } from "./PackageForm";

export default function SelectField(props: SelectFieldProps) {
  const { handleInputChange, inputs, error } = useContext(FormProvider);
  const inputHasError = error.id === props.id;

  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <select
        name={props.name}
        id={props.id}
        className={cx("custom-select", {
          "is-invalid": inputHasError,
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
      {props.help && (
        <small id={`${props.id}-help`} className="form-text text-muted">
          {props.help}
        </small>
      )}
      {inputHasError && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
}

SelectField.defaultProps = {
  error: {},
};

type SelectFieldProps = {
  error?: { id: string };
  help?: string;
  id: string;
  label: string;
  name: string;
  options: string[];
  placeholder: string;
} & DefaultProps;

type DefaultProps = Readonly<typeof SelectField.defaultProps>;
