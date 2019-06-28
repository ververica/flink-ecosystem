import { useState, useContext, useEffect, useRef } from "react";
import useFetch from "fetch-suspense";
import { UserData } from "client/components/UserDataProvider";
import { ServerResponse } from "client/types/Server";

export default function useFetchData(url: string, key: string = "") {
  const { user } = useContext(UserData);
  const [time, setTime] = useState(0);

  const refreshData: RefreshData = () => {
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

export type RefreshData = () => void;
