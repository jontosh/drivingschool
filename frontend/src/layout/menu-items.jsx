import { useBaseURL } from "@/hooks/portal.jsx";
import { setActiveMenu } from "@/modules/active-nav.jsx";
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
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import useSessionStorageState from "use-session-storage-state";

export const MenuItems = (IsActive, getItem, setIsBurger) => {
  const { studentId } = useParams();
  const [AuthUser, setAuthUser] = useSessionStorageState("auth-user", {
    defaultValue: null,
  });
  const [LogTime, setLogTime] = useLocalStorage("log-time", null);
  const navigate = useNavigate();
  const { pathname } = useBaseURL();

  const handleLogOut = () => {
    setAuthUser(null);
    setLogTime(null);
    navigate("/" + pathname + "/register/sign-in");
    handleMenuItem();
  };

  const handleMenuItem = () => setIsBurger(false);

  const items = [
    getItem(
      IsActive && (
        <NavLink
          to={"/admin/dashboard"}
          className={setActiveMenu}
          children={"Home"}
          onClick={handleMenuItem}
        />
      ),
      1,
      <span className={"w-5"}>
        <AiOutlineAppstore />
      </span>,
    ),
    getItem(
      IsActive && (
        <NavLink
          to={"/admin/enrollment/"}
          className={setActiveMenu}
          children={"New student enrollment"}
          onClick={handleMenuItem}
        />
      ),
      2,
      <span className={"w-5"}>
        <MdOutlineShoppingCart />
      </span>,
    ),
    getItem(
      IsActive && (
        <NavLink
          to={"/admin/search/"}
          children={"Advanced search"}
          className={setActiveMenu}
          onClick={handleMenuItem}
        />
      ),
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
            className={setActiveMenu}
            to={`/admin/student/account/profile/${studentId ?? ""}`}
            children={"Profile"}
            onClick={handleMenuItem}
          />,
          "sub4-1",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={`/admin/student/account/billing/${studentId ?? ""}`}
            children={"Enrollment/Billing"}
            onClick={handleMenuItem}
          />,
          "sub4-2",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={`/admin/student/account/appointments/${studentId ?? ""}`}
            children={"Appointments"}
            onClick={handleMenuItem}
          />,
          "sub4-3",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={`/admin/student/account/files/${studentId ?? ""}`}
            children={"Files"}
            onClick={handleMenuItem}
          />,
          "sub4-4",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={`/admin/student/account/messages/${studentId ?? ""}`}
            children={"Messages"}
            onClick={handleMenuItem}
          />,
          "sub4-5",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={`/admin/student/account/tests/${studentId ?? ""}`}
            children={"Quiz/Tests"}
            onClick={handleMenuItem}
          />,
          "sub4-6",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={`/admin/student/account/log/${studentId ?? ""}`}
            children={"Activity Log"}
            onClick={handleMenuItem}
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
            className={setActiveMenu}
            to={"/admin/scheduling/student"}
            children={"Schedule as Student"}
            onClick={handleMenuItem}
          />,
          "sub5-1",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/admin/scheduling/vehicle"}
            children={"Multi Vehicles"}
            onClick={handleMenuItem}
          />,
          "sub5-2",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/admin/scheduling/signle"}
            children={"Single Instructor"}
            onClick={handleMenuItem}
          />,
          "sub5-3",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/admin/scheduling/multi"}
            children={"Multi Instructor"}
            onClick={handleMenuItem}
          />,
          "sub5-4",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/admin/scheduling/vehicle"}
            children={"Manage time slot"}
            onClick={handleMenuItem}
          />,
          "sub5-5",
          null,
          IsActive && [
            getItem(
              <NavLink
                className={setActiveMenu}
                to={"/admin/scheduling/manage/appointment"}
                children={"Bulk Appointment"}
                onClick={handleMenuItem}
              />,
              "sub5-5-1",
            ),
            getItem(
              <NavLink
                className={setActiveMenu}
                to={"/admin/scheduling/manage/open"}
                children={"Open time slots"}
                onClick={handleMenuItem}
              />,
              "sub5-5-2",
            ),
            getItem(
              <NavLink
                className={setActiveMenu}
                to={"/admin/scheduling/manage/logs"}
                children={"Activity logs"}
                onClick={handleMenuItem}
              />,
              "sub5-5-3",
            ),
            getItem(
              <NavLink
                className={setActiveMenu}
                to={"/admin/scheduling/manage/process"}
                children={"Bulk process"}
                onClick={handleMenuItem}
              />,
              "sub5-5-4",
            ),
          ],
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/admin/scheduling/corporate"}
            children={"Corporate time off"}
            onClick={handleMenuItem}
          />,
          "sub5-6",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/admin/scheduling/appointments"}
            children={"Staff Appointments List"}
            onClick={handleMenuItem}
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
            className={setActiveMenu}
            to={"/admin/communication/email-templates/student-portal"}
            children={"Email Templates"}
            onClick={handleMenuItem}
          />,
          "sub6-1",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/admin/communication/student-resources/class"}
            children={"Student Resources"}
            onClick={handleMenuItem}
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
            className={setActiveMenu}
            to={"/admin/report/business/student-event-log"}
            children={"Business Report"}
            onClick={handleMenuItem}
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
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/admin/management/service/"}
            children={"Services"}
            onClick={handleMenuItem}
          />,
          "sub8-1",
          null,
          [
            getItem(
              <NavLink
                className={setActiveMenu}
                to={"/admin/management/service/product"}
                children={"Components (Product)"}
                onClick={handleMenuItem}
              />,
              "sub8-1-1",
            ),
            getItem(
              <NavLink
                className={setActiveMenu}
                to={"/admin/management/service/fees"}
                children={"Fees"}
                onClick={handleMenuItem}
              />,
              "sub8-1-2",
            ),
            getItem(
              <NavLink
                className={setActiveMenu}
                to={"/admin/management/service/discounts"}
                children={"Discounts"}
                onClick={handleMenuItem}
              />,
              "sub8-1-3",
            ),
            getItem(
              <NavLink
                className={setActiveMenu}
                to={"/admin/management/service/miscellaneous"}
                children={"Miscellaneous"}
                onClick={handleMenuItem}
              />,
              "sub8-1-4",
            ),
            getItem(
              <NavLink
                className={setActiveMenu}
                to={"/admin/management/service/quiz-exam"}
                children={"Quiz Exam"}
                onClick={handleMenuItem}
              />,
              "sub8-1-5",
            ),
            getItem(
              <NavLink
                className={setActiveMenu}
                to={"/admin/management/service/quiz-report"}
                children={"Quiz Report"}
                onClick={handleMenuItem}
              />,
              "sub8-1-6",
            ),
            getItem(
              <NavLink
                className={setActiveMenu}
                to={"/admin/management/service/packages"}
                children={"Services (Packages)"}
                onClick={handleMenuItem}
              />,
              "sub8-1-7",
            ),
          ],
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/admin/management/file"}
            children={"File management"}
            onClick={handleMenuItem}
          />,
          "sub8-2",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/admin/management/staff"}
            children={"Staff"}
            onClick={handleMenuItem}
          />,
          "sub8-9",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/admin/management/single-page/location"}
            children={"Location"}
            onClick={handleMenuItem}
          />,
          "sub8-3",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/admin/management/single-page/high school"}
            children={"High school"}
            onClick={handleMenuItem}
          />,
          "sub8-4",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/admin/management/single-page/how did you hear"}
            children={"How did you hear"}
            onClick={handleMenuItem}
          />,
          "sub8-5",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/admin/management/single-page/vehicles"}
            children={"Vehicles"}
            onClick={handleMenuItem}
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
          <NavLink
            className={setActiveMenu}
            to={"/admin/finance/finances"}
            children={"Finances"}
            onClick={handleMenuItem}
          />,
          "sub9-1",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/admin/finance/statistic"}
            children={"Statistic"}
            onClick={handleMenuItem}
          />,
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
            className={setActiveMenu}
            to={"/admin/configuration/company/info"}
            children={"Company Info"}
            onClick={handleMenuItem}
          />,
          "sub10-1",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/configuration/company/payment"}
            children={"Integrate payment"}
            onClick={handleMenuItem}
          />,
          "sub10-2",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/admin/configuration/policies/staff-password"}
            children={"Security Policies"}
            onClick={handleMenuItem}
          />,
          "sub10-3",
        ),
        getItem(
          <NavLink
            className={setActiveMenu}
            to={"/admin/configuration/zip-code"}
            children={"Zip Code"}
            onClick={handleMenuItem}
          />,
          "sub10-4",
        ),
      ],
    ),
    getItem(
      IsActive && (
        <NavLink
          className={setActiveMenu}
          to={"/admin/support/help"}
          children={"Help"}
          onClick={handleMenuItem}
        />
      ),
      11,
      <span className="w-5">
        <AiOutlineTool />
      </span>,
    ),
    getItem(
      IsActive && <div onClick={handleLogOut}>Log out</div>,
      12,
      <span className="w-5" onClick={handleLogOut}>
        <LuLogOut />
      </span>,
    ),
  ];
  return { items };
};
