import Title from "@/components/title/index.jsx";
import { Subpages } from "@/modules/subpages.jsx";
import { NavSubpage } from "@/pages/report/items/nav-subpage.jsx";
import ReportForm from "@/pages/report/items/report-form.jsx";
import classNames from "classnames";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const Report = ({ className, ...props }) => {
  const { subpage } = useParams();
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

        <div className="text-center pt-11">
          <Title
            level={3}
            fontSize={"text-3xl capitalize"}
            titleMarginBottom={30}
          >
            {subpage?.split("-")?.join(" ")}
          </Title>
          <div className={`w-[972px] mx-auto text-center pb-8`}>
            <Subpages page={subpage} />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Report;
