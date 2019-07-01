import React, { useState, SyntheticEvent } from "react";
import InputField from "./InputField";
import slugify from "client/helpers/slugify";
import MarkdownEditor from "./MarkdownEditor";
import SelectField from "./SelectField";
import { PackageData } from "client/types/Package";
import { FormProviderProps, FormChangeEvent } from "client/types/FormProvider";

export const initialValues = {
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

export const FormProvider = React.createContext<FormProviderProps>({
  disabledFields: [],
  handleInputChange: () => {},
  inputs: initialValues,
});

export default function PackageForm(props: PackageFormProps) {
  const [inputs, setInputs] = useState(props.initialValues);

  const handleInputChange = (e: FormChangeEvent) => {
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
    props.handleSubmit(data);
  };

  const formPoviderValue = {
    disabledFields: props.disabledFields,
    handleInputChange,
    inputs,
  };

  return (
    <FormProvider.Provider value={formPoviderValue}>
      <form onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col-md-8">
            <InputField
              id="name"
              label="Package Name"
              name="name"
              onBlur={handleNameBlur}
              placeholder="Package Name"
            />
            <InputField
              help="A unique URL Friendly name for your package. [a-z0-9-_]{2,}"
              id="slug"
              label="Package ID"
              name="slug"
              placeholder="Package ID"
            />
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="image">Image</label>
            </div>
          </div>
        </div>
        <InputField
          id="description"
          label="Description"
          name="description"
          placeholder="Description"
        />
        <div className="form-group">
          <MarkdownEditor
            id="readme"
            name="readme"
            label="Readme"
            onChange={handleInputChange}
            placeholder="Readme"
            value={inputs.readme}
          />
          <small id="markdown-help" className="form-text text-muted">
            Supports{" "}
            <a href="https://github.github.com/gfm/">
              Github Flavored Markdown
            </a>
            .
          </small>
        </div>

        <div className="row">
          <div className="col-md-4">
            <InputField
              // error={error}
              id="website"
              label="Website"
              name="website"
              placeholder="Website"
            />
          </div>
          <div className="col-md-4">
            <InputField
              // error={error}
              id="repository"
              label="Repository"
              name="repository"
              placeholder="Repository"
            />
          </div>
          {/* @TODO make "other" field for license */}
          <div className="col-md-4">
            <div className="form-group">
              <SelectField
                name="license"
                id="license"
                label="License"
                // error={error}
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
                // error={error}
                id="category"
                label="Category"
                name="category"
                options={categories}
                placeholder="Select a Category"
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <InputField
                // error={error}
                help="Comma separated list (for now)"
                id="tags"
                label="Tags"
                name="tags"
                placeholder="Tags"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-auto ml-auto">{props.submitButton}</div>
        </div>
      </form>
    </FormProvider.Provider>
  );
}

PackageForm.defaultProps = {
  initialValues,
  disabledFields: [],
};

type FormError = {
  id: string;
  message: string;
};

type PackageFormProps = {
  error: FormError;
  handleSubmit: (data: PackageData) => void;
  initialValues: PackageData;
  submitButton: React.ReactNode;
  disabledFields: FormProviderProps["disabledFields"];
};
