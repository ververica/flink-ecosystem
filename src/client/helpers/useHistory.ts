import { useState, useEffect } from "react";
import { history } from "client/components/Providers";

export const useHistory = () => {
  const [state, setState] = useState(history);

  useEffect(() => {
    return history.listen(({ location }) => {
      setState({ ...history, location });
    });
  }, []);

  return state;
};
