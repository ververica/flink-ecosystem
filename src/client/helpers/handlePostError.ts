import { FormError } from "client/types/FormProvider";
import { get } from "lodash/fp";

const makeGeneralError: MakeGeneralError = message => ({ id: "", message });

export const handlePostError: HandlePostError = (e, setError) => {
  switch (get("response.status", e)) {
    case 403:
      return setError(makeGeneralError("You are not logged in!"));
    case 400:
      return setError(e.response.data);
    default:
      return setError(makeGeneralError("An unknown error has occurred"));
  }
};

type MakeGeneralError = (message: string) => FormError;
type HandlePostError = (e: any, setError: any) => void;
