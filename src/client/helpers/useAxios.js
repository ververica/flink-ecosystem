import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import cookies from "js-cookie";

const client = axios.create({
  headers: {
    Authorization: `token ${cookies.get("github-token")}`,
    Accept: "application/json",
  },
});

export const useGet = (url, options) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const getData = useCallback(async () => {
    try {
      const { data } = await client.get(url, options);
      setData(data);
    } catch (e) {}
    setLoading(false);
  }, [url, options]);

  useEffect(() => {
    getData();
  }, [getData]);

  return [data, loading, setData, getData];
};
