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
import { Link, NavLink } from "react-router-dom";

export const MenuItems = (IsActive, getItem) => {
  const items = [
    getItem(
      IsActive && <Link to={"/dashboard/"} children={"Home"} />,
      1,
      <span className={"w-5"}>
        <AiOutlineAppstore />
      </span>,
    ),
    getItem(
      IsActive && (
        <Link to={"/enrollment/"} children={"New student enrollment"} />
      ),
      2,
      <span className={"w-5"}>
        <MdOutlineShoppingCart />
      </span>,
    ),
    getItem(
      IsActive && <Link to={"/search/"} children={"Advanced search"} />,
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
          <Link to={"/student/account/profile/"} children={"Profile"} />,
          "41",
        ),
        getItem(
          <Link
            to={"/student/account/billing"}
            children={"Enrollment/Billing"}
          />,
          "42",
        ),
        getItem(
          <Link
            to={"/student/account/appointments"}
            children={"Appointments"}
          />,
          "43",
        ),
        getItem(
          <Link to={"/student/account/files"} children={"Files"} />,
          "44",
        ),
        getItem(
          <Link to={"/student/account/messages"} children={"Messages"} />,
          "45",
        ),
        getItem(
          <Link to={"/student/account/tests"} children={"Quiz/Tests"} />,
          "46",
        ),
        getItem(
          <Link to={"/student/account/log"} children={"Activity Log"} />,
          "47",
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
          <Link to={"/scheduling/student"} children={"Schedule as Student"} />,
          "sub5-1",
        ),
        getItem(
          <Link to={"/scheduling/vehicle"} children={"Multi Instructor"} />,
          "sub5-2",
        ),
        getItem(
          <Link to={"/scheduling/signle"} children={"Single Instructor"} />,
          "sub5-3",
        ),
        getItem(
          <Link to={"/scheduling/multi"} children={"Multi Vehicles"} />,
          "sub5-4",
        ),
        getItem(
          <Link to={"/scheduling/vehicle"} children={"Manage time slot"} />,
          "sub5-5",
          null,
          IsActive && [
            getItem(
              <Link
                to={"/scheduling/manage/appointment"}
                children={"Bulk Appointment"}
              />,
              "sub5-5-1",
            ),
            getItem(
              <Link
                to={"/scheduling/manage/open"}
                children={"Open time slots"}
              />,
              "sub5-5-2",
            ),
            getItem(
              <Link
                to={"/scheduling/manage/logs"}
                children={"Activity logs"}
              />,
              "sub5-5-3",
            ),
            getItem(
              <Link
                to={"/scheduling/manage/process"}
                children={"Bulk process"}
              />,
              "sub5-5-4",
            ),
          ],
        ),
        getItem(
          <Link to={"/scheduling/corporate"} children={"Corporate time off"} />,
          "sub5-6",
        ),
        getItem(
          <Link
            to={"/scheduling/appointments"}
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
          <Link
            to={"/communication/email-templates/student-portal"}
            children={"Email Templates"}
          />,
          "sub6-1",
        ),
        getItem(
          <Link
            to={"/communication/student-resources/class"}
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
            to={"/report/business/student-event-log"}
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
            <Link
              to={"/management/service/product"}
              children={"Components (Product)"}
            />,
            "sub8-1-1",
          ),
          getItem(
            <Link to={"/management/service/fees"} children={"Fees"} />,
            "sub8-1-2",
          ),
          getItem(
            <Link
              to={"/management/service/discounts"}
              children={"Discounts"}
            />,
            "sub8-1-3",
          ),
          getItem(
            <Link
              to={"/management/service/miscellaneous"}
              children={"Miscellaneous"}
            />,
            "sub8-1-4",
          ),
          getItem(
            <Link
              to={"/management/service/quiz-exam"}
              children={"Quiz Exam"}
            />,
            "sub8-1-5",
          ),
          getItem(
            <Link
              to={"/management/service/quiz-report"}
              children={"Quiz Report"}
            />,
            "sub8-1-6",
          ),
          getItem(
            <Link
              to={"/management/service/packages"}
              children={"Services (Packages)"}
            />,
            "sub8-1-7",
          ),
        ]),
        getItem(
          <Link to={"/management/file"} children={"File management"} />,
          "sub8-2",
        ),
        getItem(<Link to={"/management/staff"} children={"Staff"} />, "sub8-9"),
        getItem(
          <Link
            to={"/management/single-page/location"}
            children={"Location"}
          />,
          "sub8-3",
        ),
        getItem(
          <Link
            to={"/management/single-page/high school"}
            children={"High school"}
          />,
          "sub8-4",
        ),
        getItem(
          <Link
            to={"/management/single-page/how did you hear"}
            children={"How did you hear"}
          />,
          "sub8-5",
        ),
        getItem(
          <Link
            to={"/management/single-page/vehicles"}
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
          <Link to={"/finance/finances"} children={"Finances"} />,
          "sub9-1",
        ),
        getItem(
          <Link to={"/finance/statistic"} children={"Statistic"} />,
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
          <Link to={"/configuration/company/info"} children={"Company Info"} />,
          "sub10-1",
        ),
        getItem(
          <Link
            to={"/configuration/company/payment"}
            children={"Integrate payment"}
          />,
          "sub10-2",
        ),
        getItem(
          <Link
            to={"/configuration/policies/staff-password"}
            children={"Security Policies"}
          />,
          "sub10-3",
        ),
        getItem(
          <Link to={"/configuration/zip-code"} children={"Zip Code"} />,
          "sub10-4",
        ),
      ],
    ),
    getItem(
      IsActive && <Link to={"/support/help"} children={"Help"} />,
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
