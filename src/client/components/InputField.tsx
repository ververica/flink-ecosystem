import React, {
  useContext,
  MutableRefObject,
  ChangeEvent,
  ReactElement,
} from "react";
import cx from "classnames";
import { FormProvider } from "./PackageForm";
import styled from "styled-components/macro";

const InputWrapper = styled.div`
  position: relative;
`;

export default function InputField(props: Props) {
  const { disabledFields, handleInputChange, inputs, error } = useContext(
    FormProvider
  );

  // If there is a custom handleChange event passed into the element, use that
  // instead of the default one from the form provider.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.handleChange) {
      props.handleChange(e);
    } else {
      handleInputChange(e);
    }
  };

  const inputHasError = error.id === props.id;

  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <InputWrapper>
        <input
          ref={props.inputRef}
          aria-describedby={`${props.id}-help`}
          className={cx("form-control", props.className, {
            "is-invalid": inputHasError,
          })}
          disabled={disabledFields.includes(props.name)}
          id={props.id}
          name={props.name}
          onChange={handleChange}
          pattern={props.pattern}
          placeholder={props.placeholder}
          type={props.type}
          value={inputs[props.name] || ""}
        />
        {props.icon}
      </InputWrapper>
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
  type: "text",
};

type Props = {
  className?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  help?: string;
  icon?: ReactElement | null;
  id: string;
  inputRef?: MutableRefObject<HTMLInputElement>;
  label: string;
  name: string;
  pattern?: string;
  placeholder?: string;
  type?: string;
};
