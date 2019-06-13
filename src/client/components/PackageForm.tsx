import React, { useState, SyntheticEvent, useEffect } from "react";
import { Package } from "./PackageList";
import InputField from "./InputField";
import slugify from "client/helpers/slugify";
import MarkdownEditor from "./MarkdownEditor";
import SelectField from "./SelectField";

const initialValues = {
  name: "",
  slug: "",
  description: "",
  readme: "",
  website: "",
  repository: "",
  license: "",
  category: "",
  tags: "",
};

const licenses = [
  "MIT License",
  "GPLv3",
  "BSD License",
  "LGPL",
  "Apache 2.0",
  "Eclipse License",
];

const categories = [
  "Connectors",
  "Metrics",
  "Tools",
  "Machine Learning",
  "Languages",
];

export default function PackageForm(props: PackageFormProps) {
  const [inputs, setInputs] = useState(props.initialValues);

  const handleInputChange = (e: ChangeEvent) => {
    e.persist();
    setInputs(inputs => {
      return { ...inputs, [e.target.name]: e.target.value };
    });
  };

  const handleNameBlur = (e: SyntheticEvent) => {
    if (inputs.name && !inputs.slug) {
      setInputs(inputs => ({ ...inputs, slug: slugify(inputs.name) }));
    }
  };

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data = { ...inputs };
    props.onSubmit(data);
  };

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  return (
    <form onSubmit={handleFormSubmit}>
      <InputField
        id="name"
        label="Package Name"
        name="name"
        onBlur={handleNameBlur}
        onChange={handleInputChange}
        placeholder="Package Name"
        value={inputs.name}
      />
      <InputField
        help="A unique URL Friendly name for your package. [a-z0-9-_]{2,}"
        id="slug"
        label="Package ID"
        name="slug"
        onChange={handleInputChange}
        placeholder="Package ID"
        value={inputs.slug}
      />
      <InputField
        id="description"
        label="Description"
        name="description"
        onChange={handleInputChange}
        placeholder="Description"
        value={inputs.description}
      />
      <div className="form-group">
        <label htmlFor="readme">Readme</label>
        <MarkdownEditor
          id="readme"
          name="readme"
          onChange={handleInputChange}
          placeholder="Readme"
          value={inputs.readme}
        />
      </div>

      <div className="row">
        <div className="col-md-4">
          <InputField
            // error={error}
            id="website"
            label="Website"
            name="website"
            onChange={handleInputChange}
            placeholder="Website"
            value={inputs.website}
          />
        </div>
        <div className="col-md-4">
          <InputField
            // error={error}
            id="repository"
            label="Repository"
            name="repository"
            onChange={handleInputChange}
            placeholder="Repository"
            value={inputs.repository}
          />
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <SelectField
              name="license"
              id="license"
              label="License"
              // error={error}
              placeholder="Select a License"
              onChange={handleInputChange}
              options={licenses}
              value={inputs.license}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-auto">
          <div className="form-group">
            <SelectField
              // error={error}
              id="category"
              label="Category"
              name="category"
              onChange={handleInputChange}
              options={categories}
              placeholder="Select a Category"
              value={inputs.category}
            />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <InputField
              // error={error}
              id="tags"
              label="Tags"
              name="tags"
              onChange={handleInputChange}
              placeholder="Tags"
              value={inputs.tags}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-auto ml-auto">{props.submitButton}</div>
      </div>
    </form>
  );
}

PackageForm.defaultProps = {
  initialValues,
};

type FormError = {
  id: string;
  message: string;
};

type PackageFormProps = {
  error: FormError;
  onSubmit: (data: Package) => void;
  initialValues: Package;
  submitButton: React.ReactNode;
};

type ChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
