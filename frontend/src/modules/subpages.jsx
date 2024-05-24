import Title from "@/components/title/index.jsx";
import { DiscountsModule } from "@/modules/discount.jsx";
import { FeesModule } from "@/modules/fees.jsx";
import {
  HearModule,
  HighSchoolModule,
  LocationModule,
  VehiclesModule,
} from "@/modules/management.jsx";
import { PackagesModule } from "@/modules/packages.jsx";
import { ProductModule } from "@/modules/product.jsx";
import { ExamModule } from "@/modules/quiz-exam.jsx";
import { Hear } from "@/pages/managment/management-spa/hear.jsx";
import { HighSchool } from "@/pages/managment/management-spa/high-school.jsx";
import { Location } from "@/pages/managment/management-spa/location.jsx";
import { Vehicles } from "@/pages/managment/management-spa/vehicles.jsx";
import { Exam } from "@/pages/managment/service/exam.jsx";
import { Fees } from "@/pages/managment/service/fees.jsx";
import { Miscellaneous } from "@/pages/managment/service/miscellaneous.jsx";
import { Packages } from "@/pages/managment/service/packages.jsx";
import { Product } from "@/pages/managment/service/product.jsx";
import { AllBtwHoursCompleted } from "@/pages/report/subpages/all-btw-hours-completed.jsx";
import { AttendanceSheetReport } from "@/pages/report/subpages/attendance-sheet-report.jsx";
import { AttendanceSignatures } from "@/pages/report/subpages/attendance-signatures.jsx";
import { BtwOpeningsAndScheduleReport } from "@/pages/report/subpages/btw-openings-and-schedule-report.jsx";
import { ClassroomAbsences } from "@/pages/report/subpages/classroom-absences.jsx";
import { ClassroomInformationDetails } from "@/pages/report/subpages/classroom-information-details.jsx";
import { ClassroomSessionDetails } from "@/pages/report/subpages/classroom-session-details.jsx";
import { EvaluationReport } from "@/pages/report/subpages/evaluation-report.jsx";
import { InCarEvaluationReport } from "@/pages/report/subpages/in-car-evaluation-report.jsx";
import { InstructorHoursReport } from "@/pages/report/subpages/instructor-hours-report.jsx";
import { OnlineCourseCodes } from "@/pages/report/subpages/online-course-codes.jsx";
import { OpenBalanceReport } from "@/pages/report/subpages/open-balance-report.jsx";
import { OutstandingHoursReport } from "@/pages/report/subpages/outstanding-hours-report.jsx";
import { PaymentLogReport } from "@/pages/report/subpages/payment-log-report.jsx";
import { PayrollReport } from "@/pages/report/subpages/payroll-report.jsx";
import { PrintReceipts } from "@/pages/report/subpages/print-receipts.jsx";
import { SalesDetailReport } from "@/pages/report/subpages/sales-detail-report.jsx";
import { SignedDocuments } from "@/pages/report/subpages/signed-documents.jsx";
import { StaffEventLogs } from "@/pages/report/subpages/staff-event-logs.jsx";
import { StaffLastLoginReport } from "@/pages/report/subpages/staff-last-login-report.jsx";
import { StudentAdWordReport } from "@/pages/report/subpages/student-ad-word-report.jsx";
import { StudentDataExport } from "@/pages/report/subpages/student-data-export.jsx";
import { StudentEventLog } from "@/pages/report/subpages/student-event-log.jsx";
import { StudentEventTracking } from "@/pages/report/subpages/student-event-tracking.jsx";
import { StudentFileReport } from "@/pages/report/subpages/student-file-report.jsx";
import { StudentUpdatedProfile } from "@/pages/report/subpages/student-updated-profile.jsx";
import { TransactionSummaryReport } from "@/pages/report/subpages/transaction-summary-report.jsx";
import { UpcomingTaskReport } from "@/pages/report/subpages/upcoming-task-report.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

export const Subpages = ({ page }) => {
  switch (page) {
    case "product": {
      const { columns, data } = ProductModule();
      return (
        <Fragment>
          <Helmet>
            <title>Service - Product</title>
          </Helmet>
          <Product data={data} columns={columns} />
        </Fragment>
      );
    }
    case "fees": {
      const { columns, data } = FeesModule();
      return (
        <Fragment>
          <Helmet>
            <title>Service - Frees</title>
          </Helmet>
          <Fees data={data} columns={columns} />
        </Fragment>
      );
    }
    case "discounts": {
      const { columns, data } = DiscountsModule();
      return (
        <Fragment>
          <Helmet>
            <title>Service - Discounts</title>
          </Helmet>
          <Fees data={data} columns={columns} />
        </Fragment>
      );
    }
    case "miscellaneous": {
      const { columns, data } = FeesModule();
      return (
        <Fragment>
          <Helmet>
            <title>Service - Miscellaneous</title>
          </Helmet>
          <Miscellaneous data={data} columns={columns} />
        </Fragment>
      );
    }
    case "quiz-exam": {
      const { columns } = ExamModule();
      return (
        <Fragment>
          <Helmet>
            <title>Service - Quiz Exam</title>
          </Helmet>
          <Exam columns={columns} />
        </Fragment>
      );
    }
    case "quiz-report": {
      return (
        <Fragment>
          <Helmet>
            <title>Service - Quiz Exam</title>
          </Helmet>
          <div className={"px-5"}>content</div>
        </Fragment>
      );
    }
    case "packages": {
      const { columns, data } = PackagesModule();
      return (
        <Fragment>
          <Helmet>
            <title>Service - Quiz Exam</title>
          </Helmet>
          <Packages columns={columns} data={data} />
        </Fragment>
      );
    }
    case "location": {
      const { columns, data, AlertDeleteComponent } = LocationModule();
      return (
        <Fragment>
          <Helmet>
            <title>Account management - Location</title>
          </Helmet>
          <Location columns={columns} data={data} />

          <AlertDeleteComponent />
        </Fragment>
      );
    }
    case "high school": {
      const { columns, data, AlertDeleteComponent } = HighSchoolModule();
      return (
        <Fragment>
          <Helmet>
            <title>Account management - High School</title>
          </Helmet>
          <HighSchool columns={columns} data={data} />
          <AlertDeleteComponent />
        </Fragment>
      );
    }
    case "how did you hear": {
      const { columns, data, AlertDeleteComponent } = HearModule();
      return (
        <Fragment>
          <Helmet>
            <title>Account management - How did you hear</title>
          </Helmet>
          <Hear columns={columns} data={data} />
          <AlertDeleteComponent />
        </Fragment>
      );
    }
    case "vehicles": {
      const { columns, data, AlertDeleteComponent } = VehiclesModule();
      return (
        <Fragment>
          <Helmet>
            <title>Account management - Vehicles</title>
          </Helmet>
          <Vehicles columns={columns} data={data} />
          <AlertDeleteComponent />
        </Fragment>
      );
    }
    case "student-event-log": {
      return <StudentEventLog />;
    }
    case "student-data-export": {
      return <StudentDataExport />;
    }
    case "student-updated-profile": {
      return <StudentUpdatedProfile />;
    }
    case "all-btw-hours-completed": {
      return <AllBtwHoursCompleted />;
    }
    case "print-receipts": {
      return <PrintReceipts />;
    }
    case "payment-log-report": {
      return <PaymentLogReport />;
    }
    case "classroom-information-details": {
      return <ClassroomInformationDetails />;
    }
    case "signed-documents": {
      return <SignedDocuments />;
    }
    case "attendance-signatures": {
      return <AttendanceSignatures />;
    }
    case "online-course-codes": {
      return <OnlineCourseCodes />;
    }
    case "student-event-tracking": {
      return <StudentEventTracking />;
    }
    case "student-ad-word-report": {
      return <StudentAdWordReport />;
    }
    case "student-file-report": {
      return <StudentFileReport />;
    }
    case "btw-openings-and-schedule-report": {
      return <BtwOpeningsAndScheduleReport />;
    }
    case "outstanding-hours-report": {
      return <OutstandingHoursReport />;
    }
    case "transaction-summary-report": {
      return <TransactionSummaryReport />;
    }
    case "staff-event-logs": {
      return <StaffEventLogs />;
    }
    case "staff-last-login-report": {
      return <StaffLastLoginReport />;
    }
    case "payroll-report": {
      return <PayrollReport />;
    }
    case "instructor-hours-report": {
      return <InstructorHoursReport />;
    }
    case "classroom-absences": {
      return <ClassroomAbsences />;
    }
    case "open-balance-report": {
      return <OpenBalanceReport />;
    }
    case "sales-detail-report": {
      return <SalesDetailReport />;
    }
    case "evaluation-report": {
      return <EvaluationReport />;
    }
    case "classroom-session-details": {
      return <ClassroomSessionDetails />;
    }
    case "in-car-evaluation-report": {
      return <InCarEvaluationReport />;
    }
    case "upcoming-task-report": {
      return <UpcomingTaskReport />;
    }
    case "attendance-sheet-report": {
      return <AttendanceSheetReport />;
    }
    default:
      throw new Error(`Unknown type ${page}`);
  }
};
