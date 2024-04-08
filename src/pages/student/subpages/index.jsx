import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const StudentSpa = () => {
  return (
    <Fragment>
      <div className="bg-white rounded-xl px-5 pb-5 shadow-2xl">
        <div className="-mx-5 px-5 border-b-2 border-b-gray-400 space-x-12">
          <Link
            className={"text-gray-600 hover:text-indigo-600 py-5"}
            to={`/student/account/profile/${1}`}
          >
            Profile
          </Link>
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
