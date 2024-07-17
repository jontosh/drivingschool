import { useRequestPostMutation } from "@/redux/query/index.jsx";
import { createContext, useEffect, useMemo } from "react";
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

  const Auth = useMemo(() => {
    return async () => {
      if (AuthRefresh) {
        try {
          await requestPost({
            path: "/authentication/token_refresh",
            data: AuthRefresh,
          })
            .unwrap()
            .then((response) => {
              if (response?.access) {
                setAuthUser(response?.access);
                setUserRegister(response?.access);
                setAuthRefresh(response?.refresh);
                setLogTime(() => new Date());
              }
            });
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
    };
  });

  useEffect(() => {
    if (AuthUser === null) {
      setLogTime(null);
    }
    const t = setInterval(
      () => {
        // console.log("fuck");
        Auth();
      },
      1000 * 60 * 1000,
    );

    return () => clearInterval(t);
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
