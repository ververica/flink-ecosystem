import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import { UncontrolledTooltip, Row, Col, FormGroup } from "reactstrap";
import InputField from "./InputField";
import slugify from "client/helpers/slugify";
import MarkdownEditor from "./MarkdownEditor";
import SelectField from "./SelectField";
import { PackageData } from "client/types/Package";
import {
  FormProviderProps,
  FormChangeEvent,
  FormError,
} from "client/types/FormProvider";
import { get, isEmpty, pick } from "lodash/fp";
import ErrorComponent from "./ErrorComponent";
import useLocation from "client/helpers/useLocation";
import ImageField from "./ImageField";
import { mediaLarge } from "client/helpers/styles";
import styled from "styled-components";
import Axios from "axios";
import LicenseField from "./LicenseField";
import Icon from "./Icon";

const StyledIcon = styled(Icon).attrs({
  name: "redo",
})`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
`;

const ImageColumn = styled.div.attrs({
  className: "col-md-4",
})`
  @media ${mediaLarge} {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
  }
`;

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
  image_id: 0,
};

const categories = [
  "connectors",
  "metrics",
  "tools",
  "machine-learning",
  "languages",
];

const pickFields = pick(Object.keys(initialValues));

export const FormProvider = React.createContext<FormProviderProps>({
  disabledFields: [],
  handleInputChange: () => {},
  inputs: initialValues,
  error: {},
});

const makeGeneralError: MakeGeneralError = message => ({ id: "", message });

export default function PackageForm(props: PackageFormProps) {
  const [inputs, setInputs] = useState(props.initialValues);
  const [error, setError] = useState<FormError>({});
  const { navigate } = useLocation();

  const isGenericError = !isEmpty(error) && !error.id;
  const slugDisabled = props.disabledFields.includes("slug");
  const slugIsCustom = slugify(inputs.name) !== inputs.slug;

  const handleInputChange = (e: FormChangeEvent) => {
    e.persist();
    setInputs(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    if (!slugDisabled && !slugIsCustom) {
      setInputs(inputs => ({ ...inputs, slug: slugify(e.target.value) }));
    }
  };

  const handleRedoClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setInputs(inputs => ({ ...inputs, slug: slugify(inputs.name) }));
  };

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = pickFields(inputs) as PackageData;

    try {
      if (inputs.image) {
        const result = await Axios.post("/api/v1/upload-image", inputs.image, {
          headers: { "X-Previous-Image": data.image_id },
        });

        data.image_id = result.data.image_id;
      }

      await props.handleSubmit(data);
      navigate(`/packages/${data.slug}`);
    } catch (e) {
      console.log("error");
      switch (get("response.status", e)) {
        case 403:
          return setError(makeGeneralError("You are not logged in!"));
        case 400:
          return setError(e.response.data);
        default:
          return setError(makeGeneralError("An unknown error has occurred"));
      }
    }
  };

  const formPoviderValue = {
    disabledFields: props.disabledFields,
    handleInputChange,
    inputs,
    error,
  };

  const redoIcon = slugIsCustom ? <RedoIcon onClick={handleRedoClick} /> : null;

  return (
    <FormProvider.Provider value={formPoviderValue}>
      <form onSubmit={handleFormSubmit}>
        {isGenericError && (
          <ErrorComponent message={error.message} className="p-0" />
        )}

        <Row>
          <Col md="8">
            <InputField
              id="name"
              label="Package Name"
              name="name"
              handleChange={handleNameChange}
              placeholder="Package Name"
            />
            <InputField
              help="A unique URL Friendly name for your package. [a-z0-9-_]{2,}"
              id="slug"
              label="Package ID"
              name="slug"
              placeholder="Package ID"
              pattern="^[a-z0-9-_]{2,}$"
              icon={redoIcon}
              className="pr-5"
            />
          </Col>
          <ImageColumn>
            <ImageField />
          </ImageColumn>
        </Row>
        <InputField
          id="description"
          label="Description"
          name="description"
          placeholder="Description"
        />
        <FormGroup>
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
            <a
              href="https://github.github.com/gfm/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github Flavored Markdown
            </a>
            .
          </small>
        </FormGroup>

        <Row>
          <Col md="4">
            <InputField
              id="website"
              label="Website"
              name="website"
              placeholder="Website"
              type="url"
            />
          </Col>
          <Col md="4">
            <InputField
              id="repository"
              label="Repository"
              name="repository"
              placeholder="Repository"
              type="url"
            />
          </Col>
          <Col md="4">
            <LicenseField />
          </Col>
        </Row>

        <Row>
          <Col xs="auto">
            <SelectField
              id="category"
              label="Category"
              name="category"
              options={categories}
              placeholder="Select a Category"
            />
          </Col>
          <Col>
            <InputField
              help="Comma separated list (for now)"
              id="tags"
              label="Tags"
              name="tags"
              placeholder="Tags"
            />
          </Col>
        </Row>

        <Row>
          <Col md="auto" className="ml-auto">
            {props.submitButton}
          </Col>
        </Row>
      </form>
    </FormProvider.Provider>
  );
}

PackageForm.defaultProps = {
  initialValues,
  disabledFields: [],
};

type PackageFormProps = {
  handleSubmit: (data: PackageData) => void;
  initialValues: PackageData;
  submitButton: React.ReactNode;
  disabledFields: FormProviderProps["disabledFields"];
};

type MakeGeneralError = (message: string) => FormError;

const RedoIcon = (props: any) => {
  return (
    <>
      <StyledIcon onClick={props.onClick} id="RedoIcon" />
      <UncontrolledTooltip target="RedoIcon" offset="10px 10px">
        Revert "Package ID" to computed value.
      </UncontrolledTooltip>
    </>
  );
};
