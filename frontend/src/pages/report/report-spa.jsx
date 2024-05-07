import Title from "@/components/title/index.jsx";
import ClassroomInfoDetails from "@/pages/report/subpages/classroom-info-details.jsx";
import Completed from "@/pages/report/subpages/completed.jsx";
import PaymentLogReport from "@/pages/report/subpages/payment-log-report.jsx";
import PrintReceipts from "@/pages/report/subpages/print-receipts.jsx";
import StudentDataExport from "@/pages/report/subpages/student-data-export.jsx";
import StudentEventLog from "@/pages/report/subpages/student-event-log.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import AttendanceSheetReport from "./subpages/attendance-sheet-report";
import UpcomingTaskReport from "./subpages/upcoming-task-report";
import AttendanceSignature from "./subpages/attendance-signature";
import OnlineCourseCodesUploadAndStatus from "./subpages/online-course-codes-upload-and-status";
import StudentEventTracking from "./subpages/student-event-tracking";
import StudentAdwordTracking from "./subpages/student-adword-tracking";
import StudentFileReport from "./subpages/student-file-report";

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
    case "payment-log-report": {
      return (
        <Fragment>
          <Helmet>
            <title>Report center - Payment log report</title>
          </Helmet>
          <Title
            level={2}
            fontSize={"text-indigo-600 text-2xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Payment log report
          </Title>
          <PaymentLogReport />
        </Fragment>
      );
    }
    case "classroom-info-details": {
      return (
        <Fragment>
          <Helmet>
            <title>Report center - Classroom information details</title>
          </Helmet>
          <Title
            level={2}
            fontSize={"text-indigo-600 text-2xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Classroom information details
          </Title>
          <ClassroomInfoDetails />
        </Fragment>
      );
    }
    case "attendance-sheet-report": {
      return (
        <Fragment>
          <Helmet>
            <title>Report center - Attendance sheet report</title>
          </Helmet>
          <Title
            level={2}
            fontSize={"text-indigo-600 text-2xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Attendance sheet report
          </Title>
          <AttendanceSheetReport />
        </Fragment>
      );
    }
    case "signed-documents": {
      return (
        <Fragment>
          <Helmet>
            <title>Report center - Signed documents</title>
          </Helmet>
          <Title
            level={2}
            fontSize={"text-indigo-600 text-2xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Signed documents
          </Title>
          @todo
        </Fragment>
      );
    }
    case "upcoming-task-report": {
      return (
        <Fragment>
          <Helmet>
            <title>Report center - Upcoming task report</title>
          </Helmet>
          <Title
            level={2}
            fontSize={"text-indigo-600 text-2xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Upcoming task report
          </Title>
          <UpcomingTaskReport />
        </Fragment>
      );
    }
    case "attendance-signature": {
      return (
        <Fragment>
          <Helmet>
            <title>Report center - Attendance signature/scores</title>
          </Helmet>
          <Title
            level={2}
            fontSize={"text-indigo-600 text-2xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Attendance signature/scores
          </Title>
          <AttendanceSignature />
        </Fragment>
      );
    }
    case "online-course-codes-upload-and-status": {
      return (
        <Fragment>
          <Helmet>
            <title>Report center - Online course codes upload and status</title>
          </Helmet>
          <Title
            level={2}
            fontSize={"text-indigo-600 text-2xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Online course codes upload and status
          </Title>
          <OnlineCourseCodesUploadAndStatus />
        </Fragment>
      );
    }
    case "student-event-tracking": {
      return (
        <Fragment>
          <Helmet>
            <title>Report center - Student event tracking</title>
          </Helmet>
          <Title
            level={2}
            fontSize={"text-indigo-600 text-2xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Student event tracking
          </Title>
          <StudentEventTracking />
        </Fragment>
      );
    }
    case "student-adword-report": {
      return (
        <Fragment>
          <Helmet>
            <title>Report center - Student adword report</title>
          </Helmet>
          <Title
            level={2}
            fontSize={"text-indigo-600 text-2xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Student adword report
          </Title>
          <StudentAdwordTracking />
        </Fragment>
      );
    }
    case "student-file-report": {
      return (
        <Fragment>
          <Helmet>
            <title>Report center - Student file report</title>
          </Helmet>
          <Title
            level={2}
            fontSize={"text-indigo-600 text-2xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Student file report
          </Title>
          <StudentFileReport />
        </Fragment>
      );
    }
  }
};

export default ReportSpa;
