import Title from "@/components/title/index.jsx";
import { NavSubpage } from "@/pages/report/items/nav-subpage.jsx";
import ReportForm from "@/pages/report/items/report-form.jsx";
import classNames from "classnames";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const Report = ({ className, ...props }) => {
  return (
    <Fragment>
      <Helmet>
        <title>Report center</title>
      </Helmet>
      <section
        className={classNames(className, "px-11 space-y-5 max-w-full w-full")}
        {...props}
      >
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={20}
        >
          Reporting and Analysis
        </Title>

        <ReportForm />

        <Title level={4} fontSize={"text-lg"} fontWeightStrong={400}>
          Select report:
        </Title>

        <NavSubpage />
      </section>
    </Fragment>
  );
};

export default Report;
