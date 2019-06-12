import React, { useState, SyntheticEvent } from "react";
import getFormData from "get-form-data";
import axios from "axios";
import { get, isEmpty } from "lodash/fp";
import cx from "classnames";

import MainCard from "client/components/MainCard";
import InputField from "client/components/InputField";
import slugify from "client/helpers/slugify";
import { RouteComponentProps } from "@reach/router";

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

const parseError = (error: string) => {
  const firstBracket = error.indexOf("[");
  const lastBracket = error.lastIndexOf("]");
  const message = error.slice(firstBracket + 1, lastBracket) || "";
  const match = message.match(/"(.*?)"/) || [];
  const id = match[1];

  return { id, message };
};

const makeGeneralError: MakeGeneralError = message => ({ id: "", message });

const handleSubmit: HandleSubmit = setError => async e => {
  e.preventDefault();
  const data = getFormData(e.target);

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
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const onSubmit = handleSubmit(setError);

  const handleNameChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    setName(target.value);
  };

  const handleIdChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    setId(target.value);
  };

  const handleBlur = () => {
    if (!id) setId(slugify(name));
  };

  return (
    <MainCard header="Add a new Package">
      {!isEmpty(error) && error.id === null && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <InputField
          value={name}
          error={error}
          id="name"
          label="Package Name"
          name="name"
          placeholder="Package Name"
          onChange={handleNameChange}
          onBlur={handleBlur}
        />

        <InputField
          value={id}
          error={error}
          help="A unique URL Friendly name for your package. [a-z0-9-_]{2,}"
          id="id"
          label="Package ID"
          name="id"
          placeholder="Package ID"
          onChange={handleIdChange}
        />

        <InputField
          error={error}
          id="description"
          label="Description"
          name="description"
          placeholder="Description"
        />

        <div className="form-group">
          <label htmlFor="readme">Readme</label>
          <textarea
            className={cx("form-control", {
              "is-invalid": error.id === "readme",
            })}
            id="readme"
            rows={6}
            placeholder="Readme"
          />
        </div>

        <div className="row">
          <div className="col-md-4">
            <InputField
              error={error}
              id="website"
              label="Website"
              name="website"
              placeholder="Website"
            />
          </div>
          <div className="col-md-4">
            <InputField
              error={error}
              id="repository"
              label="Repository"
              name="repository"
              placeholder="Repository"
            />
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <SelectField
                name="license"
                id="license"
                label="License"
                error={error}
                placeholder="Select a License"
                options={licenses}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-auto">
            <div className="form-group">
              <SelectField
                name="category"
                id="category"
                label="Category"
                error={error}
                options={categories}
                placeholder="Select a Category"
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <InputField
                error={error}
                id="tags"
                label="Tags"
                name="tags"
                placeholder="Tags"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-auto ml-auto">
            <button className="btn btn-success" type="submit">
              <i className="fal fa-save mr-2" />
              Add Package
            </button>
          </div>
        </div>
      </form>
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
) => (e: SyntheticEvent) => void;

type MakeGeneralError = (message: string) => Error;
