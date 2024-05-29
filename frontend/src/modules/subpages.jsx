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
import { ActivityLogs } from "@/pages/scheduling/subpages/activity-logs.jsx";
import { AppointmentEdit } from "@/pages/scheduling/subpages/appointment-edit.jsx";
import { Appointments } from "@/pages/scheduling/subpages/appointments.jsx";
import { Corporate } from "@/pages/scheduling/subpages/corporate.jsx";
import { Multi } from "@/pages/scheduling/subpages/multi.jsx";
import { OpenTimeSlots } from "@/pages/scheduling/subpages/open-time-slots.jsx";
import { Process } from "@/pages/scheduling/subpages/process.jsx";
import { SchedulingStudent } from "@/pages/scheduling/subpages/scheduling-student.jsx";
import { Single } from "@/pages/scheduling/subpages/single.jsx";
import { Vehicle } from "@/pages/scheduling/subpages/vehicle.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useFilterStatus } from "@/hooks/filter.jsx";

export const Subpages = ({ page, status, search }) => {
  switch (page) {
    case "product": {
      const { columns, data } = ProductModule();
      const { Data } = useFilterStatus({ data, status, search });

      return (
        <Fragment>
          <Helmet>
            <title>Service - Product</title>
          </Helmet>
          <Product data={Data} columns={columns} />
        </Fragment>
      );
    }
    case "fees": {
      const { columns, data } = FeesModule();
      const { Data } = useFilterStatus({ data, status, search });

      return (
        <Fragment>
          <Helmet>
            <title>Service - Frees</title>
          </Helmet>
          <Fees data={Data} columns={columns} />
        </Fragment>
      );
    }
    case "discounts": {
      const { columns, data } = DiscountsModule();
      const { Data } = useFilterStatus({ data, status, search });

      return (
        <Fragment>
          <Helmet>
            <title>Service - Discounts</title>
          </Helmet>
          <Fees data={Data} columns={columns} />
        </Fragment>
      );
    }
    case "miscellaneous": {
      const { columns, data } = FeesModule();
      const { Data } = useFilterStatus({ data, status, search });

      return (
        <Fragment>
          <Helmet>
            <title>Service - Miscellaneous</title>
          </Helmet>
          <Miscellaneous data={Data} columns={columns} />
        </Fragment>
      );
    }
    case "quiz-exam": {
      const { columns, data } = ExamModule();
      const { Data } = useFilterStatus({ data, status, search });

      return (
        <Fragment>
          <Helmet>
            <title>Service - Quiz Exam</title>
          </Helmet>
          <Exam columns={columns} data={Data} />
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
      const { Data } = useFilterStatus({ data, status, search });

      return (
        <Fragment>
          <Helmet>
            <title>Service - Quiz Exam</title>
          </Helmet>
          <Packages columns={columns} data={Data} />
        </Fragment>
      );
    }
    case "location": {
      const { columns, data } = LocationModule();
      const { Data } = useFilterStatus({ data, status, search });

      return (
        <Fragment>
          <Helmet>
            <title>Account management - Location</title>
          </Helmet>
          <Location columns={columns} data={Data} />
        </Fragment>
      );
    }
    case "high school": {
      const { columns, data } = HighSchoolModule();
      const { Data } = useFilterStatus({ data, status, search });

      return (
        <Fragment>
          <Helmet>
            <title>Account management - High School</title>
          </Helmet>
          <HighSchool columns={columns} data={Data} />
        </Fragment>
      );
    }
    case "how did you hear": {
      const { columns, data } = HearModule();
      const { Data } = useFilterStatus({ data, status, search });
      return (
        <Fragment>
          <Helmet>
            <title>Account management - How did you hear</title>
          </Helmet>
          <Hear columns={columns} data={Data} />
        </Fragment>
      );
    }
    case "vehicles": {
      const { columns, data } = VehiclesModule();
      const { Data } = useFilterStatus({ data, status, search });

      return (
        <Fragment>
          <Helmet>
            <title>Account management - Vehicles</title>
          </Helmet>
          <Vehicles columns={columns} data={Data} />
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
    case "appointment":
      return (
        <Fragment>
          <Helmet>
            <title>Manage time slot - Appointment bulk edit</title>
          </Helmet>
          <AppointmentEdit />
        </Fragment>
      );
    case "open": {
      return (
        <Fragment>
          <Helmet>
            <title>Manage time slot - Open time slots</title>
          </Helmet>
          <OpenTimeSlots />
        </Fragment>
      );
    }
    case "process": {
      return (
        <Fragment>
          <Helmet>
            <title>Manage time slot - Bulk process</title>
          </Helmet>
          <Process />
        </Fragment>
      );
    }
    case "logs": {
      return (
        <Fragment>
          <Helmet>
            <title>Manage time slot - Activity logs</title>
          </Helmet>
          <ActivityLogs />
        </Fragment>
      );
    }
    case "corporate": {
      return (
        <Fragment>
          <Helmet>
            <title>Scheduling - Corporate time off</title>
          </Helmet>
          <Corporate />
        </Fragment>
      );
    }
    case "appointments": {
      return (
        <Fragment>
          <Helmet>
            <title>Scheduling - Staff appointment list</title>
          </Helmet>
          <Appointments />
        </Fragment>
      );
    }
    case "student": {
      return (
        <Fragment>
          <Helmet>
            <title>Scheduling - Student</title>
          </Helmet>
          <SchedulingStudent />
        </Fragment>
      );
    }
    case "vehicle": {
      return (
        <Fragment>
          <Helmet>
            <title>Scheduling - Vehicle</title>
          </Helmet>
          <Vehicle />
        </Fragment>
      );
    }
    case "multi": {
      return (
        <Fragment>
          <Helmet>
            <title>Scheduling - Multi instructor</title>
          </Helmet>
          <Multi />
        </Fragment>
      );
    }
    case "signle": {
      return (
        <Fragment>
          <Helmet>
            <title>Scheduling - Single instructor</title>
          </Helmet>
          <Single />
        </Fragment>
      );
    }
    default:
      throw new Error(`Unknown type ${page}`);
  }
};
