import React, { useState } from "react";
import MainCard from "client/components/MainCard";
import getFormData from "get-form-data";
import axios from "axios";
import { get, isEmpty } from "lodash/fp";
import InputField from "client/components/InputField";
import cx from "classnames";

const categories = [
  "Connectors",
  "Metrics",
  "Tools",
  "Machine Learning",
  "Languages",
];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

const parseError = error => {
  const firstBracket = error.indexOf("[");
  const lastBracket = error.lastIndexOf("]");
  const message = error.slice(firstBracket + 1, lastBracket);
  const id = message.match(/"(.*?)"/)[1];

  return { id, message };
};

const makeGeneralError = message => ({ id: null, message });

const handleSubmit = setError => async e => {
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

export default function NewPackage() {
  const [error, setError] = useState({});
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const onSubmit = handleSubmit(setError);

  return (
    <MainCard className="p-3" header="Add a new Package">
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
          onChange={e => setName(e.target.value)}
          onBlur={() => {
            if (!id) setId(slugify(name));
          }}
        />

        <InputField
          value={id}
          error={error}
          help="A unique URL Friendly name for your package. [a-z-_]{2,}"
          id="id"
          label="Package ID"
          name="id"
          placeholder="Package ID"
          onChange={e => setId(e.target.value)}
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
            rows="5"
            placeholder="Readme"
          />
        </div>

        <InputField
          error={error}
          id="website"
          label="Website"
          name="website"
          placeholder="Website"
        />

        <InputField
          error={error}
          id="repository"
          label="Repository"
          name="repository"
          placeholder="Repository"
        />

        <div className="row">
          <div className="col-auto">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                className="form-control"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select a Category
                </option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
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

        <InputField
          error={error}
          id="license"
          label="License"
          name="license"
          placeholder="License"
        />

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
  // return <div></div>;
}
