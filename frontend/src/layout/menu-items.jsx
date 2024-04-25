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
  AiOutlineUserAdd,
} from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";

export const MenuItems = (IsActive, getItem) => {
  const items = [
    getItem(
      IsActive && <Link to={"/dashboard/"} children={"Home"} />,
      "sub1",
      <span className={"w-5"}>
        <AiOutlineAppstore />
      </span>,
    ),
    getItem(
      IsActive && (
        <Link to={"/enrollment/"} children={"New student enrollment"} />
      ),
      "sub2",
      <span className={"w-5"}>
        <AiOutlineUserAdd />
      </span>,
    ),
    getItem(
      IsActive && <Link to={"/search/"} children={"Advanced search"} />,
      "sub3",
      <span className={"w-5"}>
        <AiOutlineSearch />
      </span>,
    ),
    getItem(
      IsActive && "Student account",
      "sub4",
      <span className={"w-5"}>
        <AiOutlineTeam />
      </span>,
      IsActive && [
        getItem(<Link to={"/student/account/profile/"} children={"Profile"} />),
        getItem(
          <Link
            to={"/student/account/billing"}
            children={"Enrollment/Billing"}
          />,
        ),
        getItem(
          <Link
            to={"/student/account/appointments"}
            children={"Appointments"}
          />,
        ),
        getItem(<Link to={"/student/account/files"} children={"Files"} />),
        getItem(
          <Link to={"/student/account/messages"} children={"Messages"} />,
        ),
        getItem(<Link to={"/student/account/tests"} children={"Quiz/Tests"} />),
        getItem(<Link to={"/student/account/log"} children={"Activity Log"} />),
      ],
    ),
    getItem(
      IsActive && "Scheduling",
      "sub5",
      <span className={"w-5"}>
        <AiOutlineSolution />
      </span>,
      IsActive && [
        getItem(
          <Link to={"/scheduling/student"} children={"Schedule as Student"} />,
          "sub5-1",
          null,
        ),
        getItem(
          <Link to={"/scheduling/vehicle"} children={"Multi Vehicle"} />,
          "sub5-2",
          null,
        ),
        getItem(
          <Link to={"/scheduling/signle"} children={"Single Instructor"} />,
          "sub5-9",
          null,
        ),
        getItem(
          <Link to={"/scheduling/multi"} children={"Multi Instructor"} />,
          "sub5-3",
          null,
        ),
        getItem(
          <Link to={"/scheduling/vehicle"} children={"Manage time slot"} />,
          "sub5-4",
          null,
          IsActive && [
            getItem(
              <Link
                to={"/scheduling/manage/appointment"}
                children={"Bulk Appointment"}
              />,
              "sub5-4-1",
              null,
            ),
            getItem(
              <Link
                to={"/scheduling/manage/open"}
                children={"Open time slots"}
              />,
              "sub5-4-2",
              null,
            ),
            getItem(
              <Link
                to={"/scheduling/manage/logs"}
                children={"Activity logs"}
              />,
              "sub5-4-3",
              null,
            ),
            getItem(
              <Link
                to={"/scheduling/manage/process"}
                children={"Bulk process"}
              />,
              "sub5-4-4",
              null,
            ),
          ],
        ),
        getItem(
          <Link to={"/scheduling/corporate"} children={"Corporate time off"} />,
          "sub5-5",
          null,
        ),
        getItem(
          <Link
            to={"/scheduling/appointments"}
            children={"Staff Appointments List"}
          />,
          "sub5-6",
          null,
        ),
      ],
    ),
    getItem(
      IsActive && "Communication",
      "sub6",
      <span className={"w-5"}>
        <AiOutlineMail />
      </span>,
      IsActive && [
        getItem(
          <Link
            to={"/communication/email-templates"}
            children={"Email Templates"}
          />,
        ),
      ],
    ),
    getItem(
      IsActive && "Report center",
      "sub7",
      <span className={"w-5"}>
        <AiOutlineReconciliation />
      </span>,
      IsActive && [getItem("Process")],
    ),
    getItem(
      IsActive && "Account Management",
      "sub8",
      <span className={"w-5"}>
        <AiOutlineApartment />
      </span>,
      IsActive && [
        getItem("Services", 1, null, [
          getItem(
            <Link
              to={"/management/service/product"}
              children={"Components (Product)"}
            />,
            "sub8-1",
          ),
          getItem(
            <Link to={"/management/service/fees"} children={"Fees"} />,
            "sub8-2",
          ),
          getItem(
            <Link
              to={"/management/service/discounts"}
              children={"Discounts"}
            />,
            "sub8-3",
          ),
          getItem(
            <Link
              to={"/management/service/miscellaneous"}
              children={"Miscellaneous"}
            />,
            "sub8-4",
          ),
          getItem(
            <Link
              to={"/management/service/quiz-exam"}
              children={"Quiz Exam"}
            />,
            "sub8-5",
          ),
          getItem(
            <Link
              to={"/management/service/quiz-report"}
              children={"Quiz Report"}
            />,
            "sub8-6",
          ),
          getItem(
            <Link
              to={"/management/service/packages"}
              children={"Services (Packages)"}
            />,
            "sub8-7",
          ),
        ]),
        getItem(
          <Link to={"/management/file"} children={"File management"} />,
          "sub8-8",
        ),
        getItem(<Link to={"/management/staff"} children={"Staff"} />, "sub8-9"),
        getItem(
          <Link
            to={"/management/single-page/location"}
            children={"Location"}
          />,
          "sub8-10",
        ),
        getItem(
          <Link
            to={"/management/single-page/high school"}
            children={"High school"}
          />,
          "sub8-11",
        ),
        getItem(
          <Link
            to={"/management/single-page/how did you hear"}
            children={"How did you hear"}
          />,
          "sub8-12",
        ),
        getItem(
          <Link
            to={"/management/single-page/vehicles"}
            children={"Vehicles"}
          />,
          "sub8-13",
        ),
      ],
    ),
    getItem(
      IsActive && "Finances",
      "sub9",
      <span className="w-5">
        <DollarOutlined />
      </span>,
    ),
    getItem(
      IsActive && "Configuration",
      "sub10",
      <span className="w-5">
        <AiOutlineSetting />
      </span>,
      IsActive && [
        getItem(
          <Link to={"/configuration/company/info"} children={"Company Info"} />,
          "sub10-1",
          null,
        ),
        getItem(
          <Link
            to={"/configuration/company/payment"}
            children={"Integrate payment"}
          />,
          "sub10-2",
          null,
        ),
        getItem(
          <Link
            to={"/configuration/policies/staff-password"}
            children={"Security Policies"}
          />,
          "sub10-3",
          null,
        ),
        getItem(
          <Link to={"/configuration/zip-code"} children={"Zip Code"} />,
          "sub10-4",
          null,
        ),
      ],
    ),
    getItem(
      IsActive && <Link to={"/help"} children={"Help"} />,
      "sub11",
      <span className="w-5">
        <AiOutlineTool />
      </span>,
    ),
    getItem(
      IsActive && "Log out",
      "sub12",
      <span className="w-5">
        <LuLogOut />
      </span>,
    ),
  ];
  return { items };
};
