import { AuthContext } from "@/context/auth.jsx";
import { useBaseURL } from "@/hooks/portal.jsx";
import { useContext, useMemo } from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { AuthUser, LogTime } = useContext(AuthContext);
  const { pathname } = useBaseURL();
  const redirectToSignIn = useMemo(
    () => !AuthUser && !LogTime,
    [AuthUser, LogTime],
  );

  if (redirectToSignIn) {
    return (
      <Navigate to={"/" + pathname + "/register/sign-in"} replace={true} />
    );
  }

  return children;
};
