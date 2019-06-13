import React, { useState, SyntheticEvent } from "react";
import getFormData from "get-form-data";
import axios from "axios";
import { get, isEmpty } from "lodash/fp";
import cx from "classnames";

import MainCard from "client/components/MainCard";
import InputField from "client/components/InputField";
import slugify from "client/helpers/slugify";
import { RouteComponentProps } from "@reach/router";
import MarkdownEditor from "client/components/MarkdownEditor";
import PackageForm from "client/components/PackageForm";
import { Package } from "client/components/PackageList";

const categories = [
  "Connectors",
  "Metrics",
  "Tools",
  "Machine Learning",
  "Languages",
];

const licenses = [
  "MIT License",
  "GPLv3",
  "BSD License",
  "LGPL",
  "Apache 2.0",
  "Eclipse License",
];

// The error messagse from 'Joi' are not quite a joy to parse. :(
const parseError = (error: string) => {
  const firstBracket = error.indexOf("[");
  const lastBracket = error.lastIndexOf("]");
  const message = error.slice(firstBracket + 1, lastBracket) || "";
  const match = message.match(/"(.*?)"/) || [];
  const id = match[1];

  return { id, message };
};

const makeGeneralError: MakeGeneralError = message => ({ id: "", message });

const handleSubmit: HandleSubmit = setError => async data => {
  try {
    await axios.post("/api/v1/packages", data);
  } catch (e) {
    switch (get("response.status", e)) {
      case 403:
        return setError(makeGeneralError("You are not logged in!"));
      case 400:
        return setError(parseError(e.response.data.message));
      default:
        return setError(makeGeneralError("An unknown error has occurred"));
    }
  }
};

export default function NewPackage(props: NewPackageProps) {
  const [error, setError] = useState({}) as [Error, () => void];
  const onSubmit = handleSubmit(setError);

  return (
    <MainCard header="Add a new Package">
      {!isEmpty(error) && error.id === null && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}

      <PackageForm
        onSubmit={onSubmit}
        error={error}
        submitButton={
          <button className="btn btn-success" type="submit">
            <i className="fal fa-save mr-2" />
            Add Package
          </button>
        }
      />
    </MainCard>
  );
}

const SelectField = (props: SelectFieldProps) => {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <select
        name={props.name}
        id={props.id}
        className={cx("form-control", {
          "is-invalid": props.error.id === props.id,
        })}
        defaultValue={props.defaultValue || ""}
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
};

type Error = {
  id: string;
  message: string;
};

type SelectFieldProps = {
  id: string;
  label: string;
  error: Error;
  defaultValue?: string;
  name: string;
  placeholder: string;
  options: Array<string>;
};

type NewPackageProps = RouteComponentProps<{
  userLogin: string;
}>;

type HandleSubmit = (
  setError: (error: Error) => void
) => (data: Package) => void;

type MakeGeneralError = (message: string) => Error;

type NewPackageData = {
  tags: Array<string>;
  tagsString: string;
};
