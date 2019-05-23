import { useEffect, useState } from "react";
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

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await client.get(url, options);
        setData(data);
      } catch (e) {}
      setLoading(false);
    };

    getData();
  }, [url, options]);

  return [data, loading, setData];
};
