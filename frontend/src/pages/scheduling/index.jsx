import Title from "@/components/title/index.jsx";
import { Subpages } from "@/modules/subpages.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const Scheduling = () => {
  const { title } = useParams();
  return (
    <Fragment>
      <Helmet>
        <title>Scheduling</title>
      </Helmet>
      <section className={`px-3 sm:px-11 space-y-5 max-w-full w-full`}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={20}
        >
          Scheduling
        </Title>

        <Subpages page={title} />
      </section>
    </Fragment>
  );
};

export default Scheduling;
