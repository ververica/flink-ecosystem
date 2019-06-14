import { useState, useContext, useEffect, useRef } from "react";
import useFetch from "fetch-suspense";
import { UserData } from "client/components/UserDataProvider";

export default function useFetchData(url: string) {
  const { user } = useContext(UserData);
  const [time, setTime] = useState(0);

  const refreshData = () => {
    setTime(Date.now());
  };

  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    refreshData();
  }, [user.login]);

  // This header is just so we can update a timestamp and refresh the request
  const headers = { "X-Request-Time": `${time}` };

  const data = useFetch(url, { headers });
  return [data, refreshData];
}
