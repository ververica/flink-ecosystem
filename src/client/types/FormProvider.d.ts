export type FormProviderProps = {
  disabledFields: string[];
  handleInputChange: (e: FormChangeEvent) => void;
  inputs: any;
  error: FormError;
  setInputs: (inputs: FormProviderProps["inputs"]) => void;
};

export type FormChangeEvent = React.ChangeEvent<
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement
  | HTMLTextAreaElement
>;

export type FormError = {
  id?: string;
  message?: string;
};
