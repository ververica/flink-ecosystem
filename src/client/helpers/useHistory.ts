import { history } from "client/components/Providers";
import { useEffect, useState } from "react";

export const useHistory = () => {
  const [state, setState] = useState(history);

  useEffect(() => {
    return history.listen(({ location }) => {
      setState({ ...history, location });
    });
  }, []);

  return state;
};
