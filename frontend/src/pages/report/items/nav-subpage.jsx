import { NavLink } from "react-router-dom";

const NavSubpages = [
  {
    to: "student-event-log",
    text: "Student events log",
  },
  {
    to: "student-data-export",
    text: "Student data export",
  },
  {
    to: "student-updated-profile",
    text: "Student updated profile",
  },
  {
    to: "all-btw-hours-completed",
    text: "All BTW Hours Completed",
  },
  {
    to: "print-receipts",
    text: "Print receipts",
  },
  {
    to: "payment-log-report",
    text: "Payment log report",
  },
  {
    to: "classroom-information-details",
    text: "Classroom information details",
  },
  {
    to: "signed-documents",
    text: "Signed documents",
  },
  {
    to: "attendance-signatures",
    text: "Attendance Signatures",
  },
  {
    to: "online-course-codes",
    text: "Online Course Codes",
  },
  {
    to: "student-event-tracking",
    text: "Student Event Tracking",
  },
  {
    to: "student-ad-word-report",
    text: "Student Ad-word Report",
  },
  {
    to: "student-file-report",
    text: "Student File Report",
  },
  {
    to: "btw-openings-and-schedule-report",
    text: "BTW Openings and Schedule Report",
  },
  {
    to: "outstanding-hours-report",
    text: "Outstanding Hours Report",
  },
  {
    to: "transaction-summary-report",
    text: "Transaction Summary Report",
  },
  {
    to: "staff-event-logs",
    text: "Staff Event Logs",
  },
  {
    to: "staff-last-login-report",
    text: "Staff Last Login Report",
  },
  {
    to: "payroll-report",
    text: "Payroll Report",
  },
  {
    to: "instructor-hours-report",
    text: "Instructor Hours Report",
  },
  {
    to: "classroom-absences",
    text: "Classroom Absences",
  },
  {
    to: "open-balance-report",
    text: "Open Balance Report",
  },
  {
    to: "sales-detail-report",
    text: "Sales Detail Report",
  },
  {
    to: "evaluation-report",
    text: "Evaluation Report",
  },
  {
    to: "classroom-session-details",
    text: "Classroom Session Details",
  },
  {
    to: "in-car-evaluation-report",
    text: "In Car-Evaluation Report",
  },
  {
    to: "upcoming-task-report",
    text: "Upcoming Task Report",
  },
  {
    to: "attendance-sheet-report",
    text: "Attendance Sheet Report",
  },
];
export const NavSubpage = ({ ...props }) => {
  const setActiveNav = ({ isActive }) =>
    isActive
      ? "bg-indigo-700 text-white p-2.5 rounded-lg hover:bg-indigo-400 hover:text-white transition ease-in-out"
      : "bg-white text-gray-500 p-2.5 rounded-lg hover:bg-indigo-400 hover:text-white transition ease-in-out";

  const navSubpageItem = NavSubpages.map(({ to, text }, index) => (
    <NavLink to={`/report/business/${to}`} className={setActiveNav} key={index}>
      {text}
    </NavLink>
  ));

  return (
    <nav className={"grid grid-cols-4 gap-4"} {...props}>
      {navSubpageItem}
    </nav>
  );
};
