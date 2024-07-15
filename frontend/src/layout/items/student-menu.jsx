import { useBaseURL } from "@/hooks/portal.jsx";
import { AiOutlineAppstore, AiOutlineSolution } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { IoDiamondOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { PiUsers } from "react-icons/pi";
import { SlBasket } from "react-icons/sl";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import useSessionStorageState from "use-session-storage-state";

export const StudentMenu = (IsActive, getItem) => {
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
  };

  const items = [
    getItem(
      IsActive && <NavLink to={"/student/dashboard"} children={"Home"} />,
      1,
      <span className={"w-5"}>
        <AiOutlineAppstore />
      </span>,
    ),
    getItem(
      IsActive && "Scheduling",
      2,
      <span className={"w-5"}>
        <AiOutlineSolution />
      </span>,
      IsActive && [
        getItem(
          <NavLink
            to={"/student/schedule/my-schedule"}
            children={"My Schedule"}
          />,
          "sub2-1",
        ),

        getItem(
          <NavLink
            to={"/student/schedule/book-lessons"}
            children={"Book my lessons"}
          />,
          "sub2-2",
        ),
      ],
    ),
    getItem(
      IsActive && "My account",
      3,
      <span className={"w-5"}>
        <PiUsers />
      </span>,
      IsActive && [
        getItem(
          <NavLink to={"/student/account"} children={"Profile"} />,
          "sub3-1",
        ),
        getItem("Process", "sub3-2"),
      ],
    ),

    getItem(
      IsActive && "Resources",
      4,
      <span className={"w-5"}>
        <IoDiamondOutline />
      </span>,
      IsActive && [
        getItem(
          IsActive && (
            <NavLink to={"/student/resource/in-car"} children={"In-car"} />
          ),
          "sub4-1",
        ),
        getItem(
          IsActive && (
            <NavLink
              to={"/student/resource/road-test"}
              children={"Road test"}
            />
          ),
          "sub4-2",
        ),
        getItem(
          IsActive && (
            <NavLink to={"/student/resource/parents"} children={"Parents"} />
          ),
          "sub4-3",
        ),
      ],
    ),
    getItem(
      IsActive && <NavLink to={"/student/enroll"} children={"Enroll"} />,
      5,
      <span className={"w-5"}>
        <SlBasket />
      </span>,
    ),
    getItem(
      IsActive && <NavLink to={"/student/contact"} children={"Contact"} />,
      6,
      <span className={"w-5"}>
        <FiPhone />
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
