import { useRequestPostMutation } from "@/redux/query/index.jsx";
import { createContext, useCallback, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import useSessionStorageState from "use-session-storage-state";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [AuthUser, setAuthUser] = useSessionStorageState("auth-user", {
    defaultValue: null,
  });
  const [AuthRefresh, setAuthRefresh] = useSessionStorageState("auth-upgrade", {
    defaultValue: null,
  });
  const [RememberMe, setRememberMe] = useLocalStorage("register", null);
  const [LogTime, setLogTime] = useLocalStorage("log-time", null);
  const [UserRegister, setUserRegister] = useSessionStorageState("register", {
    defaultValue: null,
  });
  const [requestPost] = useRequestPostMutation();

  const Auth = useCallback(async () => {
    if (AuthRefresh) {
      try {
        const response = await requestPost({
          path: "/authentication/token_refresh",
          data: AuthRefresh,
        }).unwrap();

        if (response?.access) {
          setAuthUser(response?.access);
          setUserRegister(response?.access);
          setAuthRefresh(response?.refresh);
          setLogTime(new Date());
        }
      } catch (error) {
        console.error(error);
        if (error?.status >= 400) {
          setAuthUser(null);
          setLogTime(null);
          setUserRegister(null);
          setRememberMe(null);
        }
      }
    }
  }, [
    AuthRefresh,
    requestPost,
    setAuthUser,
    setAuthRefresh,
    setLogTime,
    setRememberMe,
    setUserRegister,
  ]);

  useEffect(() => {
    if (AuthUser === null) {
      setLogTime(null);
    }

    const intervalId = setInterval(Auth, 1000 * 60 * 60 * 3);

    return () => clearInterval(intervalId);
  }, [Auth, AuthUser]);

  return (
    <AuthContext.Provider
      value={{ AuthUser, AuthRefresh, RememberMe, LogTime, UserRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};
