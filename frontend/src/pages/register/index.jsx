import SignIn from "@/pages/register/sign-in.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const Register = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Sign in - Register page</title>
      </Helmet>

      <main className={"bg-white p-5"}>
        <SignIn />
      </main>
    </Fragment>
  );
};

export default Register;
