import React, { SyntheticEvent, useContext } from "react";
import cx from "classnames";
import { FormProvider } from "./PackageForm";

export default function InputField(props: Props) {
  const { disabledFields, handleInputChange, inputs, error } = useContext(
    FormProvider
  );

  const inputHasError = error.id === props.id;

  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        aria-describedby={`${props.id}-help`}
        className={cx("form-control", {
          "is-invalid": inputHasError,
        })}
        disabled={disabledFields.includes(props.name)}
        id={props.id}
        name={props.name}
        onBlur={props.onBlur}
        onChange={handleInputChange}
        pattern={props.pattern}
        placeholder={props.placeholder}
        type={props.type}
        value={inputs[props.name] || ""}
      />
      {props.help && (
        <small id={`${props.id}-help`} className="form-text text-muted">
          {props.help}
        </small>
      )}
      {inputHasError && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
}

InputField.defaultProps = {
  error: {},
  type: "text",
};

type Props = {
  help?: string;
  id: string;
  label: string;
  name: string;
  onBlur?: (e: SyntheticEvent) => void;
  pattern?: string;
  placeholder: string;
  type: string;
} & Readonly<typeof InputField.defaultProps>;
