import ServiceStyle from "@/pages/managment/management.module.scss";
import { Fragment } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const StudentSpa = () => {
  const setActiveNav = ({ isActive }) =>
    isActive
      ? `${ServiceStyle["Tab__link-active"]} py-5 text-lg`
      : "text-gray-600 hover:text-indigo-600 py-5";
  return (
    <Fragment>
      <div className="bg-white rounded-xl px-5 pb-5 shadow-2xl">
        <div className="-mx-5 px-5 border-b-2 border-b-gray-400 space-x-12">
          <NavLink
            className={setActiveNav}
            to={`/student/account/profile/${1}`}
          >
            Profile
          </NavLink>
          <Link
            className={"text-gray-600 hover:text-indigo-600 py-5"}
            to={`/student/account/enrollment/${1}`}
          >
            Enrollment/Billing
          </Link>
          <Link
            className={"text-gray-600 hover:text-indigo-600 py-5"}
            to={`/student/account/appointments/${1}`}
          >
            Appointments
          </Link>
          <Link
            className={"text-gray-600 hover:text-indigo-600 py-5"}
            to={`/student/account/files/${1}`}
          >
            Files
          </Link>
          <Link
            className={"text-gray-600 hover:text-indigo-600 py-5"}
            to={`/student/account/messages/${1}`}
          >
            Messages
          </Link>
          <Link
            className={"text-gray-600 hover:text-indigo-600 py-5"}
            to={`/student/account/tests/${1}`}
          >
            Quiz/Tests
          </Link>
          <Link
            className={"text-gray-600 hover:text-indigo-600 py-5"}
            to={`/student/account/log/${1}`}
          >
            Activity Log
          </Link>
        </div>

        <div className="pt-6">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default StudentSpa;
