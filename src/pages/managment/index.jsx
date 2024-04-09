import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const Management = () => {
  return (
    <Fragment>
      <section className={"px-11"}>
        <Outlet />
      </section>
    </Fragment>
  );
};

export default Management;
