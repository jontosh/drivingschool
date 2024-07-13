import { useBaseURL } from "@/hooks/portal.jsx";
import { Navigate } from "react-router-dom";
import useSessionStorageState from "use-session-storage-state";

export const PrivateRoute = ({ children }) => {
  const [AuthUser, setAuthUser] = useSessionStorageState("auth-user", {
    defaultValue: null,
  });
  const { pathname } = useBaseURL();

  if (!AuthUser) {
    return (
      <Navigate to={"/" + pathname + "/register/sign-in"} replace={true} />
    );
  }

  return children;
};
