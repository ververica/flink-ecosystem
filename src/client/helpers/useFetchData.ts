import { useState, useContext, useEffect, useRef } from "react";
import useFetch from "fetch-suspense";
import { UserData } from "client/components/UserDataProvider";

export default function useFetchData(url: string) {
  const { user } = useContext(UserData);
  const joiner = url.includes("?") ? "&" : "?";
  const [time, setTime] = useState(0);

  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    setTime(Date.now());
  }, [user.login]);

  const data = useFetch(url + joiner + `time=${time}`);
  return data;
}
