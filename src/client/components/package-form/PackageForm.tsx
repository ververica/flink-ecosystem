import Axios from "axios";
import React, { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import styled from "styled-components/macro";
import { Col, FormGroup, Row, UncontrolledTooltip } from "reactstrap";
import { ErrorComponent } from "../ErrorComponent";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../Icon";
import { ImageField } from "./ImageField";
import { InputField } from "./InputField";
import { InputLabel } from "./InputLabel";
import { isEmpty, pick } from "lodash/fp";
import { LicenseField } from "./LicenseField";
import { MarkdownEditor } from "../MarkdownEditor";
import { PackageData, PackageFormData } from "client/types/Package";
import { SelectField } from "./SelectField";
import { Tokenizer } from "./Tokenizer";
import {
  FormProviderProps,
  FormChangeEvent,
  FormError,
} from "client/types/FormProvider";
import {
  slugify,
  useLocation,
  mediaLarge,
  useScroll,
  categories,
  handlePostError,
} from "client/helpers";

const StyledIcon = styled(Icon).attrs({
  icon: faRedo,
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
  category: "",
  description: "",
  image_id: 0,
  license: "",
  name: "",
  readme: "",
  repository: "",
  slug: "",
  tags: "",
  website: "",
};

const pickFields = pick(Object.keys(initialValues));

export const FormProvider = React.createContext<FormProviderProps>({
  disabledFields: [],
  handleInputChange: () => {},
  inputs: initialValues,
  error: {},
  setInputs: () => {},
});

export const PackageForm: FC<Props> = props => {
  const [inputs, setInputs] = useState<PackageFormData>(props.initialValues);
  const [error, setError] = useState<FormError>({});
  const { navigate } = useLocation();
  useScroll(error);

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

    // @TODO temporary until the tokenizer is done
    // trim the white space around each tag
    data.tags = data.tags
      .split(",")
      .map(t => t.trim())
      .join(",");

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
      handlePostError(e, setError);
    }
  };

  const formPoviderValue = {
    disabledFields: props.disabledFields,
    handleInputChange,
    inputs,
    error,
    setInputs,
  };

  const redoIcon = slugIsCustom ? <RedoIcon onClick={handleRedoClick} /> : null;

  const categoryOptions = categories.map(cat => ({
    value: cat.value,
    name: cat.name,
  }));

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
            error={error}
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
              optional
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
              options={categoryOptions}
              placeholder="Select a Category"
            />
          </Col>
          <Col>
            <FormGroup>
              <InputLabel id="tags" optional label="Tags" />
              <Tokenizer name="tags" id="tags" placeholder="Tags" />
            </FormGroup>
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
};

const RedoIcon = (props: any) => {
  return (
    <>
      <StyledIcon onClick={props.onClick} id="RedoIcon" title="revert" />
      <UncontrolledTooltip target="RedoIcon" placement="top" offset="0, 5px">
        Revert "Package ID" to computed value.
      </UncontrolledTooltip>
    </>
  );
};

type Props = {
  disabledFields: FormProviderProps["disabledFields"];
  handleSubmit: (data: PackageFormData) => void;
  initialValues: PackageFormData;
  submitButton: React.ReactNode;
};
