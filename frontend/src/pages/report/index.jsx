import Title from "@/components/title/index.jsx";
import ServiceStyle from "@/pages/managment/management.module.scss";
import ReportForm from "@/pages/report/items/report-form.jsx";
import ReportSpa from "@/pages/report/report-spa.jsx";
import classNames from "classnames";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

const setActiveNav = ({ isActive }) =>
  isActive
    ? `text-indigo-600 text-base px-8 py-2.5`
    : "hover:text-indigo-600 text-base text-gray-700 px-8 py-2.5";

const Report = ({ className, ...props }) => {
  className = classNames(className, "px-11 space-y-5 max-w-full w-full");

  return (
    <Fragment>
      <Helmet>
        <title>Report center</title>
      </Helmet>
      <section className={className} {...props}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={20}
        >
          Reporting and Analysis
        </Title>

        <ReportForm />

        <div className="flex justify-between gap-5">
          <aside className="w-80 flex-shrink-0 border border-indigo-600 rounded-xl bg-white py-7 text-center shadow-xl">
            <Title level={4} titleMarginBottom={32} fontWeightStrong={400}>
              Select report:
            </Title>
            <NavLink
              to={"/report/business/student-event-log"}
              className={setActiveNav}
            >
              Student events log
            </NavLink>

            <NavLink
              to={"/report/business/student-date-export"}
              className={setActiveNav}
            >
              Student data export
            </NavLink>

            <NavLink
              to={"/report/business/student-updated-profile"}
              className={setActiveNav}
            >
              Student updated profile
            </NavLink>

            <NavLink to={"/report/business/completed"} className={setActiveNav}>
              All BTW Hours Completed
            </NavLink>

            <NavLink
              to={"/report/business/print-receipts"}
              className={setActiveNav}
            >
              Print receipts
            </NavLink>
          </aside>

          <div className="flex-grow bg-white p-5 rounded-xl shadow-xl">
            <ReportSpa />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Report;
