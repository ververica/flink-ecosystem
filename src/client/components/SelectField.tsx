import React, { useContext } from "react";
import cx from "classnames";
import { FormProvider } from "./PackageForm";

export default function SelectField(props: SelectFieldProps) {
  const { handleInputChange, inputs, error } = useContext(FormProvider);
  const inputHasError = error.id === props.id;

  // If there is a custom handleChange event passed into the element, use that
  // instead of the default one from the form provider.
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (props.handleChange) {
      props.handleChange(e);
    } else {
      handleInputChange(e);
    }
  };

  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <select
        name={props.name}
        id={props.id}
        className={cx("custom-select", {
          "is-invalid": inputHasError,
        })}
        onChange={handleSelectChange}
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
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
} & DefaultProps;

type DefaultProps = Readonly<typeof SelectField.defaultProps>;
