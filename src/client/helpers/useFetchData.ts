import useFetch from "fetch-suspense";
import { useContext, useEffect, useRef, useState } from "react";
import { UserData } from "client/components/UserDataProvider";

export default function useFetchData(url: string, key: string = "") {
  const { user } = useContext(UserData);
  const [time, setTime] = useState(0);

  const refreshData = (): void => {
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
  const headers = {
    "X-Request-Time": time.toString(),
    "X-Location-Key": key,
  };

  const result = useFetch(url, { headers });

  if (typeof result === "string") {
    const error = {
      status: "error",
      message: result,
    };

    return [error, refreshData];
  }

  return [result, refreshData];
}
