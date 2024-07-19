import { useBaseURL } from "@/hooks/portal.jsx";
import { useMemo } from "react";
import { Navigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import useSessionStorageState from "use-session-storage-state";

export const PrivateRoute = ({ children }) => {
  const [AuthUser] = useSessionStorageState("auth-user", {
    defaultValue: null,
  });
  const [LogTime] = useLocalStorage("log-time", null);

  const { pathname } = useBaseURL();

  const redirectToSignIn = useMemo(
    () => !AuthUser && !LogTime,
    [AuthUser, LogTime],
  );

  if (redirectToSignIn) {
    return <Navigate to={`/${pathname}/register/sign-in`} replace={true} />;
  }

  return children;
};
