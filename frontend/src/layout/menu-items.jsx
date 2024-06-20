import { DollarOutlined } from "@ant-design/icons";
import {
  AiOutlineApartment,
  AiOutlineAppstore,
  AiOutlineMail,
  AiOutlineReconciliation,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineSolution,
  AiOutlineTeam,
  AiOutlineTool,
} from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, NavLink, useParams } from "react-router-dom";

export const MenuItems = (IsActive, getItem) => {
  const { studentId } = useParams();

  const items = [
    getItem(
      IsActive && <NavLink to={"/admin/dashboard/"} children={"Home"} />,
      1,
      <span className={"w-5"}>
        <AiOutlineAppstore />
      </span>,
    ),
    getItem(
      IsActive && (
        <NavLink to={"/admin/enrollment/"} children={"New student enrollment"} />
      ),
      2,
      <span className={"w-5"}>
        <MdOutlineShoppingCart />
      </span>,
    ),
    getItem(
      IsActive && <NavLink to={"/admin/search/"} children={"Advanced search"} />,
      3,
      <span className={"w-5"}>
        <AiOutlineSearch />
      </span>,
    ),
    getItem(
      IsActive && "Student account",
      4,
      <span className={"w-5"}>
        <AiOutlineTeam />
      </span>,
      IsActive && [
        getItem(
          <NavLink
            to={`/admin/student/account/profile/${studentId ?? ""}`}
            children={"Profile"}
          />,
          "sub4-1",
        ),
        getItem(
          <NavLink
            to={`/admin/student/account/billing/${studentId ?? ""}`}
            children={"Enrollment/Billing"}
          />,
          "sub4-2",
        ),
        getItem(
          <NavLink
            to={`/admin/student/account/appointments/${studentId ?? ""}`}
            children={"Appointments"}
          />,
          "sub4-3",
        ),
        getItem(
          <NavLink
            to={`/admin/student/account/files/${studentId ?? ""}`}
            children={"Files"}
          />,
          "sub4-4",
        ),
        getItem(
          <NavLink
            to={`/admin/student/account/messages/${studentId ?? ""}`}
            children={"Messages"}
          />,
          "sub4-5",
        ),
        getItem(
          <NavLink
            to={`/admin/student/account/tests/${studentId ?? ""}`}
            children={"Quiz/Tests"}
          />,
          "sub4-6",
        ),
        getItem(
          <NavLink
            to={`/admin/student/account/log/${studentId ?? ""}`}
            children={"Activity Log"}
          />,
          "sub4-7",
        ),
      ],
    ),
    getItem(
      IsActive && "Scheduling",
      5,
      <span className={"w-5"}>
        <AiOutlineSolution />
      </span>,
      IsActive && [
        getItem(
          <NavLink
            to={"/admin/scheduling/student"}
            children={"Schedule as Student"}
          />,
          "sub5-1",
        ),
        getItem(
          <NavLink to={"/admin/scheduling/vehicle"} children={"Multi Vehicles"} />,
          "sub5-2",
        ),
        getItem(
          <NavLink to={"/admin/scheduling/signle"} children={"Single Instructor"} />,
          "sub5-3",
        ),
        getItem(
          <Link to={"/admin/scheduling/multi"} children={"Multi Instructor"} />,
          "sub5-4",
        ),
        getItem(
          <Link to={"/admin/scheduling/vehicle"} children={"Manage time slot"} />,
          "sub5-5",
          null,
          IsActive && [
            getItem(
              <NavLink
                to={"/admin/scheduling/manage/appointment"}
                children={"Bulk Appointment"}
              />,
              "sub5-5-1",
            ),
            getItem(
              <NavLink
                to={"/admin/scheduling/manage/open"}
                children={"Open time slots"}
              />,
              "sub5-5-2",
            ),
            getItem(
              <NavLink
                to={"/admin/scheduling/manage/logs"}
                children={"Activity logs"}
              />,
              "sub5-5-3",
            ),
            getItem(
              <NavLink
                to={"/admin/scheduling/manage/process"}
                children={"Bulk process"}
              />,
              "sub5-5-4",
            ),
          ],
        ),
        getItem(
          <NavLink
            to={"/admin/scheduling/corporate"}
            children={"Corporate time off"}
          />,
          "sub5-6",
        ),
        getItem(
          <NavLink
            to={"/admin/scheduling/appointments"}
            children={"Staff Appointments List"}
          />,
          "sub5-7",
        ),
      ],
    ),
    getItem(
      IsActive && "Communication",
      6,
      <span className={"w-5"}>
        <AiOutlineMail />
      </span>,
      IsActive && [
        getItem(
          <NavLink
            to={"/admin/communication/email-templates/student-portal"}
            children={"Email Templates"}
          />,
          "sub6-1",
        ),
        getItem(
          <NavLink
            to={"/admin/communication/student-resources/class"}
            children={"Student Resources"}
          />,
          "sub6-2",
        ),
      ],
    ),
    getItem(
      IsActive && "Report center",
      7,
      <span className={"w-5"}>
        <AiOutlineReconciliation />
      </span>,
      IsActive && [
        getItem(
          <NavLink
            to={"/admin/report/business/student-event-log"}
            children={"Business Report"}
          />,
          "sub7-1",
        ),
      ],
    ),
    getItem(
      IsActive && "Account Management",
      8,
      <span className={"w-5"}>
        <AiOutlineApartment />
      </span>,
      IsActive && [
        getItem("Services", "sub8-1", null, [
          getItem(
            <NavLink
              to={"/admin/management/service/product"}
              children={"Components (Product)"}
            />,
            "sub8-1-1",
          ),
          getItem(
            <NavLink to={"/admin/management/service/fees"} children={"Fees"} />,
            "sub8-1-2",
          ),
          getItem(
            <NavLink
              to={"/admin/management/service/discounts"}
              children={"Discounts"}
            />,
            "sub8-1-3",
          ),
          getItem(
            <NavLink
              to={"/admin/management/service/miscellaneous"}
              children={"Miscellaneous"}
            />,
            "sub8-1-4",
          ),
          getItem(
            <NavLink
              to={"/admin/management/service/quiz-exam"}
              children={"Quiz Exam"}
            />,
            "sub8-1-5",
          ),
          getItem(
            <NavLink
              to={"/admin/management/service/quiz-report"}
              children={"Quiz Report"}
            />,
            "sub8-1-6",
          ),
          getItem(
            <NavLink
              to={"/admin/management/service/packages"}
              children={"Services (Packages)"}
            />,
            "sub8-1-7",
          ),
        ]),
        getItem(
          <NavLink to={"/admin/management/file"} children={"File management"} />,
          "sub8-2",
        ),
        getItem(
          <NavLink to={"/admin/management/staff"} children={"Staff"} />,
          "sub8-9",
        ),
        getItem(
          <NavLink
            to={"/admin/management/single-page/location"}
            children={"Location"}
          />,
          "sub8-3",
        ),
        getItem(
          <NavLink
            to={"/admin/management/single-page/high school"}
            children={"High school"}
          />,
          "sub8-4",
        ),
        getItem(
          <NavLink
            to={"/admin/management/single-page/how did you hear"}
            children={"How did you hear"}
          />,
          "sub8-5",
        ),
        getItem(
          <NavLink
            to={"/admin/management/single-page/vehicles"}
            children={"Vehicles"}
          />,
          "sub8-6",
        ),
      ],
    ),
    getItem(
      IsActive && "Finances",
      9,
      <span className="w-5">
        <DollarOutlined />
      </span>,
      IsActive && [
        getItem(
          <NavLink to={"/admin/finance/finances"} children={"Finances"} />,
          "sub9-1",
        ),
        getItem(
          <NavLink to={"/admin/finance/statistic"} children={"Statistic"} />,
          "sub9-2",
        ),
      ],
    ),
    getItem(
      IsActive && "Configuration",
      10,
      <span className="w-5">
        <AiOutlineSetting />
      </span>,
      IsActive && [
        getItem(
          <NavLink
            to={"/admin/configuration/company/info"}
            children={"Company Info"}
          />,
          "sub10-1",
        ),
        getItem(
          <NavLink
            to={"/configuration/company/payment"}
            children={"Integrate payment"}
          />,
          "sub10-2",
        ),
        getItem(
          <NavLink
            to={"/admin/configuration/policies/staff-password"}
            children={"Security Policies"}
          />,
          "sub10-3",
        ),
        getItem(
          <NavLink to={"/admin/configuration/zip-code"} children={"Zip Code"} />,
          "sub10-4",
        ),
      ],
    ),
    getItem(
      IsActive && <NavLink to={"/admin/support/help"} children={"Help"} />,
      11,
      <span className="w-5">
        <AiOutlineTool />
      </span>,
    ),
    getItem(
      IsActive && "Log out",
      12,
      <span className="w-5">
        <LuLogOut />
      </span>,
    ),
  ];
  return { items };
};
