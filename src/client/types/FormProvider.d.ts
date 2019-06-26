export type FormProviderProps = {
  disabledFields: string[];
  handleInputChange: (e: FormChangeEvent) => void;
  inputs: any;
};

export type FormChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
