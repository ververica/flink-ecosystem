import { useCallback, useEffect, useState } from "react";
import axios from "axios";
// import cookies from "js-cookie";

// export const client = axios.create({
//   headers: {
//     Accept: "application/json",
//   },
// });

export const useGet = (url, initialValue = {}, options) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(initialValue);

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get(url, options);
      setData(data);
    } catch (e) {}
    setLoading(false);
  }, [url, options]);

  useEffect(() => {
    getData();
  }, [getData]);

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
