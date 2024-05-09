import { Company } from "@/pages/configuration/subpages/company.jsx";
import { Payment } from "@/pages/configuration/subpages/payment.jsx";
import { StaffPassword } from "@/pages/configuration/subpages/staff-password.jsx";
import { StudentPassword } from "@/pages/configuration/subpages/student-password.jsx";
import ServiceStyle from "@/pages/managment/management.module.scss";
import { Fragment } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const setActiveNav = ({ isActive }) =>
  isActive
    ? `${ServiceStyle["Tab__link-active"]} text-lg py-5`
    : "hover:text-indigo-500 text-lg text-gray-700 py-5";

const CheckPage = ({ page }) => {
  const navigation = useNavigate();
  switch (page) {
    case "staff-password": {
      return <StaffPassword />;
    }
    case "student-password": {
      return <StudentPassword />;
    }
    default: {
      navigation("/configuration/");
    }
  }
};

export const PolicySpa = () => {
  const { subpage } = useParams();
  return (
    <Fragment>
      <div className="bg-white rounded-2xl px-5">
        <div className={"space-x-6 px-5 -mx-5 border-b border-b-gray-400"}>
          <NavLink
            to={"/configuration/policies/staff-password"}
            className={setActiveNav}
          >
            Staff Password Policies
          </NavLink>

          <NavLink
            to={"/configuration/policies/student-password"}
            className={setActiveNav}
          >
            Student Password Policies
          </NavLink>
        </div>
        <div className="py-5">
          <CheckPage page={subpage} />
        </div>
      </div>
    </Fragment>
  );
};
