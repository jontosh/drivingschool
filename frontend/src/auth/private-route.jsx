import { useBaseURL } from "@/hooks/portal.jsx";
import { Navigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import useSessionStorageState from "use-session-storage-state";

export const PrivateRoute = ({ children }) => {
  const [AuthUser, setAuthUser] = useSessionStorageState("auth-user", {
    defaultValue: null,
  });
  const [LogTime, setLogTime] = useLocalStorage("log-time", null);

  const { pathname } = useBaseURL();

  if (!AuthUser && !LogTime) {
    return (
      <Navigate to={"/" + pathname + "/register/sign-in"} replace={true} />
    );
  }
  return children;
};