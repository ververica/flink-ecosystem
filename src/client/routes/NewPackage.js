import React from "react";
import MainCard from "client/components/MainCard";
import getFormData from "get-form-data";
import axios from "axios";

const InputField = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        name={props.name}
        type="text"
        className="form-control"
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
};

export default function NewPackage() {
  const handleSubmit = async e => {
    e.preventDefault();
    const data = getFormData(e.target);
    debugger;
    try {
      // await axios.post("/api/v1/packages", data);
    } catch (e) {
      if (e.response.status && e.response.status === 403) {
        // require Auth!
        debugger;
      }
    }
  };

  return (
    <MainCard
      className="p-3"
      header={<h2 className="h5 mb-0">Add a new Package</h2>}
    >
      <form onSubmit={handleSubmit}>
        <InputField
          id="package-name"
          label="Package Name"
          name="name"
          placeholder="Package Name"
        />

        <InputField
          help="A unique URL Friendly name for your package. [a-z-_]{2,}"
          id="package-id"
          label="Package ID"
          name="id"
          placeholder="Package ID"
        />

        <InputField
          id="description"
          label="Description"
          name="description"
          placeholder="Description"
        />

        <div className="form-group">
          <label htmlFor="readme">Readme</label>
          <textarea className="form-control" id="readme" />
        </div>

        <InputField
          id="website"
          label="Website"
          name="website"
          placeholder="Website"
        />

        <InputField
          id="repository"
          label="Repository"
          name="repository"
          placeholder="Repository"
        />

        <InputField
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
