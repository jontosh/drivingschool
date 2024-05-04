import Title from "@/components/title/index.jsx";
import Completed from "@/pages/report/subpages/completed.jsx";
import PrintReceipts from "@/pages/report/subpages/print-receipts.jsx";
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

    case "student-updated-profile": {
      return (
        <Fragment>
          <Helmet>
            <title>Report center - Student updated profile</title>
          </Helmet>
          <Title
            level={2}
            fontSize={"text-indigo-600 text-2xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Student updated profile
          </Title>
          <StudentEventLog />
        </Fragment>
      );
    }

    case "completed": {
      return (
        <Fragment>
          <Helmet>
            <title>Report center - All BTW Hours Completed</title>
          </Helmet>
          <Title
            level={2}
            fontSize={"text-indigo-600 text-2xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            All BTW Hours Completed
          </Title>
          <Completed />
        </Fragment>
      );
    }

    case "print-receipts": {
      return (
        <Fragment>
          <Helmet>
            <title>Report center - Print receipts</title>
          </Helmet>
          <Title
            level={2}
            fontSize={"text-indigo-600 text-2xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Print receipts
          </Title>
          <PrintReceipts />
        </Fragment>
      );
    }
  }
};

export default ReportSpa;
