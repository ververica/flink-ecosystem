import React from "react";
import cx from "classnames";

export default function InputField(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        name={props.name}
        type="text"
        className={cx("form-control", {
          "is-invalid": props.error.id === props.id,
        })}
        id={props.id}
        placeholder={props.placeholder}
        aria-describedby={`${props.id}-help`}
      />
      {props.help && (
        <small id={`${props.id}-help`} className="form-text text-muted">
          {props.help}
        </small>
      )}
    </div>
  );
}
