import {
  useState,
  KeyboardEvent,
  ChangeEvent,
  SyntheticEvent,
  ClipboardEvent,
} from "react";
export const useTokenizer = (initialTokens: string[]) => {
  const [tokens, setTokens] = useState(initialTokens);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const addToken = () => {
    if (value) {
      if (tokens.includes(value)) {
        setError(true);
        return;
      }
      setTokens([...tokens, value]);
      setValue("");
    }
  };

  const updateTokens = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 8: // backspace
        if (!value) {
          e.preventDefault();
          // get the last token, and set it as the value of the input and set
          // the other tokens to not include the one being edited.
          // Array.pop() mutates the array, so we need to make a shallow clone first
          const currentTokens = [...initialTokens];
          const newValue = currentTokens.pop();
          setValue(newValue || "");
          setTokens(currentTokens);
        }
        break;
      case 32: //space
        if (value === "") {
          e.preventDefault();
        }
        break;
      case 13: // enter
      case 188: // comma
        e.preventDefault();
        addToken();
        break;
      default:
        return;
    }
  };
  const onBlur = () => {
    addToken();
  };
  const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setValue(e.target.value.toLowerCase());
  };
  const deleteToken = (token: string) => (e: SyntheticEvent) => {
    e.preventDefault();
    setTokens([...tokens.filter((t: string) => t !== token)]);
  };
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    // Get pasted data via clipboard API
    const clipboardData = e.clipboardData;
    const pastedData = clipboardData.getData("Text");

    const newTokens = pastedData.split(",").map(t => t.trim().toLowerCase());
    setTokens([...tokens, ...newTokens]);
  };
  const inputProps = {
    value,
    onChange: updateValue,
    onKeyDown: updateTokens,
    onPaste: handlePaste,
    onBlur,
  };
  return { tokens, error, inputProps, deleteToken };
};
