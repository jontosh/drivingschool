import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const Design = () => {
  return (
    <Fragment>
      <section className="Design">
        <div className="container px-4 mx-auto">
          <Outlet />
        </div>
      </section>
    </Fragment>
  );
};

export default Design;
