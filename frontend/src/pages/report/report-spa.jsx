import StudentEventLog from "@/pages/report/subpages/student-event-log.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const ReportSpa = ({ className, children, ...props }) => {
  const { subpage } = useParams();

  switch (subpage) {
    case "student-event-log": {
      return (
        <Fragment>
          <Helmet>
            <title>Report center - Student event-log</title>
          </Helmet>

          <StudentEventLog />
        </Fragment>
      );
    }
  }
};

export default ReportSpa;
