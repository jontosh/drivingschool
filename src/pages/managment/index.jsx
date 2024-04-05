import { Fragment, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Management = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/management/service/");
  }, []);

  return (
    <Fragment>
      <section className={"px-11"}>
        <Outlet />
      </section>
    </Fragment>
  );
};

export default Management;
