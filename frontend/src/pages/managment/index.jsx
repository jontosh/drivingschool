import { Fragment } from "react";
import ManagmentSpa from "@/pages/managment/subpages/index.jsx";
import { useParams } from "react-router-dom";

const Management = () => {
  const { title, subpage } = useParams();

  return (
    <Fragment>
      <section className={"px-11 space-y-5 max-w-full w-full"}>
        <ManagmentSpa page={{ title, subpage }} />
      </section>
    </Fragment>
  );
};

export default Management;
