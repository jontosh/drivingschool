import Title from "@/components/title/index.jsx";
import StudentDataExport from "@/pages/report/subpages/student-data-export.jsx";
import StudentEventLog from "@/pages/report/subpages/student-event-log.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const ReportSpa = ({ className, children, ...props }) => {
  const { subpage } = useParams();

  switch (subpage) {
    case "student-date-export": {
      return (
        <Fragment>
          <Helmet>
            <title>Report center - Student data export</title>
          </Helmet>

          <Title
            level={2}
            fontSize={"text-indigo-600 text-2xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Student data export
          </Title>

          <StudentDataExport />
        </Fragment>
      );
    }

    case "student-event-log": {
      return (
        <Fragment>
          <Helmet>
            <title>Report center - Student events log</title>
          </Helmet>
          <Title
            level={2}
            fontSize={"text-indigo-600 text-2xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Student events log
          </Title>
          <StudentEventLog />
        </Fragment>
      );
    }
  }
};

export default ReportSpa;
