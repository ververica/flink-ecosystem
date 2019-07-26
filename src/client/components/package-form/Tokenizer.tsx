import React, { FC, useContext, useEffect } from "react";
import { FormProvider } from "./PackageForm";
import { Badge, Card } from "reactstrap";
import { FormProviderProps } from "client/types/FormProvider";
import { useTokenizer } from "client/helpers/useTokenizer";
import { Icon } from "../Icon";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Input = styled.input.attrs({
  className: "mx-1 border-0",
})`
  flex: 1 1 auto;
  min-width: 50px;

  &:focus {
    outline: 0;
  }
`;

const TokenizerWrapper = styled(Card).attrs({
  className: "form-control align-items-center flex-wrap flex-row p-1",
})`
  height: auto;
  min-height: calc(1.5em + 0.75rem + 2px);

  &:focus-within {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

export const Tokenizer: FC<Props> = props => {
  const { inputs, setInputs } = useContext(FormProvider);
  const tags = inputs.tags
    .split(/,/)
    .filter((tag: string) => !!tag)
    .map((tag: string) => tag.trim());

  const { tokens, error, deleteToken, inputProps } = useTokenizer(tags);

  useEffect(() => {
    const tags = tokens.join(",");
    setInputs((inputs: FormProviderProps["inputs"]) => ({ ...inputs, tags }));
  }, [tokens, setInputs]);

  return (
    <>
      <TokenizerWrapper id={props.id}>
        {tokens.map((token: string) => {
          return (
            <Badge
              key={token}
              color="secondary"
              className="m-1 d-flex align-items-center"
            >
              {token}
              <a
                href="#delete"
                onClick={deleteToken(token)}
                style={{ color: "inherit" }}
              >
                <Icon
                  icon={faTimes}
                  title="times"
                  className="ml-1"
                  marginRight={0}
                />
              </a>
            </Badge>
          );
        })}
        <Input
          type="text"
          size={10}
          {...inputProps}
          placeholder={props.placeholder}
        />
      </TokenizerWrapper>
      {error && (
        <div className="invalid-feedback d-block">
          You cannot have the same tag more than once.
        </div>
      )}
      <small id={`${props.id}-help`} className="form-text text-muted">
        Press <kbd>,</kbd> or <kbd>return</kbd> to separate tags.
      </small>
    </>
  );
};

type Props = {
  id: string;
  name: string;
  placeholder: string;
};
