import { useState, useEffect } from "react";
import { navigate, history } from "client/components/Providers";

export default function useLocation() {
  const initialState = {
    location: history.location,
    navigate,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const removeListener = history.listen(params => {
      const { location } = params;
      const newState = Object.assign({}, initialState, { location });
      setState(newState);
    });

    return removeListener;
  }, [initialState]);

  return state;
}
