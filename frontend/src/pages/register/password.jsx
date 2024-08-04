import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const Password = () => {
  const { id } = useParams();

  return (
    <Fragment>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <section className={"px-3 sm:px-5 md:px-11 space-y-5 max-w-full w-full"}>
        ok
      </section>
    </Fragment>
  );
};

export default Password;
