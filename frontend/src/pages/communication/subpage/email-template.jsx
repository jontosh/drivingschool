import ColorsContext from "@/context/colors.jsx";
import ServiceStyle from "@/pages/managment/management.module.scss";
import { Table } from "antd";
import { Fragment, useContext } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const CheckPage = ({ page, resources }) => {
  const navigate = useNavigate();
  switch (page) {
    case "student-portal": {
      return (
        <Table
          columns={resources?.columns}
          dataSource={resources?.data}
          pagination={false}
        />
      );
    }
    case "staff-mobile": {
      return (
        <Table
          columns={resources?.columns}
          dataSource={resources?.data}
          pagination={false}
        />
      );
    }
    case "admin-portal": {
      return (
        <Table
          columns={resources?.columns}
          dataSource={resources?.data}
          pagination={false}
        />
      );
    }
    case "reminders": {
      return (
        <Table
          columns={resources?.columns}
          dataSource={resources?.data}
          pagination={false}
        />
      );
    }
    default: {
      navigate("/communication/email-templates/student-portal");
    }
  }
};

export const EmailTemplate = ({ header, resources }) => {
  const { colorsObject } = useContext(ColorsContext);
  const { subpage } = useParams();

  const setActiveNav = ({ isActive }) =>
    isActive
      ? `${ServiceStyle["Tab__link-active"]} text-lg py-5`
      : "hover:text-indigo-500 text-lg text-gray-700 py-5";

  return (
    <div className={"pb-5"}>
      <div className={"space-x-6 px-5 -mx-5 border-b border-b-gray-400"}>
        <NavLink
          to={"/communication/email-templates/student-portal"}
          className={setActiveNav}
        >
          Student portal
        </NavLink>

        <NavLink
          to={"/communication/email-templates/staff-mobile"}
          className={setActiveNav}
        >
          Staff mobile
        </NavLink>

        <NavLink
          to={"/communication/email-templates/admin-portal"}
          className={setActiveNav}
        >
          Admin portal
        </NavLink>

        <NavLink
          to={"/communication/email-templates/reminders"}
          className={setActiveNav}
        >
          Reminders
        </NavLink>
      </div>
      <div className="py-5">{header}</div>

      <div className={"rounded-2xl overflow-hidden border border-indigo-600"}>
        <CheckPage page={subpage} resources={resources} />
      </div>
    </div>
  );
};
