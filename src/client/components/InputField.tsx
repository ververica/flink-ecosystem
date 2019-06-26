import React, { SyntheticEvent, useContext } from "react";
import cx from "classnames";
import { FormProvider } from "./PackageForm";

export default function InputField(props: Props) {
  const { disabledFields, handleInputChange, inputs } = useContext(
    FormProvider
  );

  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        aria-describedby={`${props.id}-help`}
        className={cx("form-control", {
          "is-invalid": props.error.id === props.id,
        })}
        disabled={disabledFields.includes(props.name)}
        id={props.id}
        name={props.name}
        onBlur={props.onBlur}
        onChange={handleInputChange}
        placeholder={props.placeholder}
        type="text"
        value={inputs[props.name]}
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
  placeholder: string;
} & Readonly<typeof InputField.defaultProps>;
