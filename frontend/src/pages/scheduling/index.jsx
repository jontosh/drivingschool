import Title from "@/components/title/index.jsx";
import { SchedulingSpa } from "@/pages/scheduling/scheduling-spa.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const Scheduling = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Scheduling</title>
      </Helmet>
      <section className={`px-11 space-y-5 max-w-full w-full`}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={20}
        >
          Scheduling
        </Title>
        <div>
          <SchedulingSpa />
        </div>
      </section>
    </Fragment>
  );
};

export default Scheduling;
