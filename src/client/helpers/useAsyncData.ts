import { useState, useEffect, useContext, useCallback } from "react";
import { UserData } from "client/components/UserDataProvider";
import useTimeout from "@rooks/use-timeout";
import Axios from "axios";

const useAsyncData: UseAsyncData = (url, initialData) => {
  const { user } = useContext(UserData);
  const [{ data, loading, error }, setState] = useState({
    data: initialData,
    loading: false,
    error: null,
  });

  const { start: startTimeout, clear: clearTimeout } = useTimeout(() => {
    setState(s => ({ ...s, loading: true }));
  }, 300);

  const getData = useCallback(async () => {
    startTimeout();
    try {
      const response = await Axios.get(url);
      setState({ data: response.data, loading: false, error: null });
    } catch (e) {
      setState({ data: initialData, loading: false, error: e });
    }
    clearTimeout();
  }, [url]);

  useEffect(() => {
    getData();
  }, [user.login, getData]);

  return { data, loading, error, refreshData: getData };
};

export default useAsyncData;

type UseAsyncData = (
  url: string,
  initialData: any
) => {
  data: any;
  loading: boolean;
  error: Error | null;
  refreshData: () => void;
};
