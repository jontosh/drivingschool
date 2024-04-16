import ServiceStyle from "@/pages/managment/management.module.scss";
import { AppointmentEdit } from "@/pages/scheduling/subpages/appointment-edit.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useParams } from "react-router-dom";
const setActiveNav = ({ isActive }) =>
  isActive
    ? `${ServiceStyle["Tab__link-active"]} py-5 text-lg`
    : "hover:text-indigo-500 text-lg text-gray-500 py-5";

const CheckPages = ({ page }) => {
  switch (page?.toLowerCase()) {
    case "appointment":
      return (
        <Fragment>
          <Helmet>
            <title>Manage time slot - Appointment bulk edit</title>
          </Helmet>
          <AppointmentEdit />
        </Fragment>
      );
    default:
      console.log(page);
  }
};
export const ManageSpa = () => {
  const { title } = useParams();

  return (
    <Fragment>
      <div>
        <div className="space-x-5 bg-white px-5 rounded-tl-2xl rounded-tr-2xl border-b border-b-gray-400">
          <NavLink
            to={"/scheduling/manage/appointment"}
            className={setActiveNav}
          >
            Appointment bulk edit
          </NavLink>
          <NavLink to={"/scheduling/manage/open"} className={setActiveNav}>
            Open time slots
          </NavLink>
          <NavLink to={"/scheduling/manage/logs"} className={setActiveNav}>
            Activity logs
          </NavLink>
          <NavLink to={"/scheduling/manage/process"} className={setActiveNav}>
            Bulk process
          </NavLink>
        </div>

        <CheckPages page={title} />
      </div>
    </Fragment>
  );
};
