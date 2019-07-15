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

  &.is-invalid {
    & ~ .invalid-feedback {
      display: block;
    }

    & i {
      margin-right: 2rem !important;
    }
  }
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

  // @TODO - HACK
  // The server sends back 'slug' for this field (becasue thats what it's called)
  // and we need to keep it like that to idenfity it, so this is a quick hack
  // so we don't display the word 'slug' to the user.  Yes, this will try and
  // run all error messages through here, but nothing else has the word slug, so
  // it works for now.
  const getErrorMessage =
    error.message && error.message.replace("slug", "package id");

  const inputHasError = error.id === props.id;

  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <InputWrapper className={cx({ "is-invalid": inputHasError })}>
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
      {inputHasError && (
        <div className="invalid-feedback">{getErrorMessage}</div>
      )}
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
