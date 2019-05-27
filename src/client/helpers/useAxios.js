import { useCallback, useEffect, useState } from "react";
import axios from "axios";
// import cookies from "js-cookie";

// export const client = axios.create({
//   headers: {
//     Accept: "application/json",
//   },
// });

export const useGet = (url, key) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get(url);
      setData(data);
    } catch (e) {}
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData, key]);

  return [data, loading, setData, getData];
};

// export const usePost = (url, body, initialValue, options) => {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState(initialValue);

//   const getPost = useCallback(async () => {
//     try {
//     } catch (e) {}
//   }, [url, body, options]);
// };
