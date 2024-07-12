import { setActiveNav } from "@/modules/active-nav.jsx";
import { Subpages } from "@/modules/subpages.jsx";
import { Fragment } from "react";
import { NavLink, useParams } from "react-router-dom";

export const ManageSpa = () => {
  const { title } = useParams();

  return (
    <Fragment>
      <div>
        <div className="space-x-5 bg-white px-5 rounded-tl-2xl rounded-tr-2xl border-b border-b-gray-400">
          <NavLink
            to={"/admin/scheduling/manage/appointment"}
            className={setActiveNav}
          >
            Appointment bulk edit
          </NavLink>
          <NavLink
            to={"/admin/scheduling/manage/open"}
            className={setActiveNav}
          >
            Open time slots
          </NavLink>
          <NavLink
            to={"/admin/scheduling/manage/logs"}
            className={setActiveNav}
          >
            Activity logs
          </NavLink>
          <NavLink
            to={"/admin/scheduling/manage/process"}
            className={setActiveNav}
          >
            Bulk process
          </NavLink>
        </div>

        <Subpages page={title} />
      </div>
    </Fragment>
  );
};
