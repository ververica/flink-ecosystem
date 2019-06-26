import React, {
  useEffect,
  useState,
  useCallback,
  SyntheticEvent,
  ReactNode,
} from "react";
import axios from "axios";
import cookies from "js-cookie";
import useLocation from "client/helpers/useLocation";

const defaultState = {
  user: {
    id: 0,
    login: "",
    avatar_url: "",
  },
  refreshData: () => {},
  logout: (e: SyntheticEvent) => {},
  openGithubLogin: (e: SyntheticEvent) => {},
};

export const UserData = React.createContext(defaultState);

export default function UserDataProvider(props: UserDataProviderProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(defaultState.user);
  const [authWindow, setAuthWindow] = useState<Window | null>(null);
  const { location } = useLocation();

  const refreshData = useCallback(async () => {
    try {
      const response = await axios.get("/api/v1/user");
      setUser(response.data);
    } catch (e) {}

    setLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const logout = (e: SyntheticEvent) => {
    e.preventDefault();
    cookies.remove("github-token");
    setUser(defaultState.user);
  };

  useEffect(() => {
    const verifyLogin = (e: MessageEvent) => {
      if (e.origin === location.origin && e.data === "github-login-success") {
        authWindow && authWindow.close();
        setAuthWindow(null);
        refreshData();
      }
    };

    if (authWindow) {
      window.addEventListener("message", verifyLogin);
      return () => {
        window.removeEventListener("message", verifyLogin);
      };
    }
  }, [authWindow, refreshData, location]);

  const openGithubLogin = (e: SyntheticEvent) => {
    e.preventDefault();

    const auth = window.open(
      "/auth",
      "Login with Github",
      "width=600,height=600"
    );

    setAuthWindow(auth);
  };

  const value = {
    user,
    refreshData,
    logout,
    openGithubLogin,
  };

  if (loading) {
    return null;
  }

  return <UserData.Provider value={value}>{props.children}</UserData.Provider>;
}

type UserDataProviderProps = {
  children: ReactNode;
};
