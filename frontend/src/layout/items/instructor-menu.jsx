import { useBaseURL } from "@/hooks/portal.jsx";
import { AiOutlineAppstore, AiOutlineSolution } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { IoDiamondOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { PiUsers } from "react-icons/pi";
import { SlBasket } from "react-icons/sl";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useSessionStorageState from "use-session-storage-state";

export const InstructorMenu = (IsActive, getItem) => {
  const { studentId } = useParams();
  const [AuthUser, setAuthUser] = useSessionStorageState("auth-user", {
    defaultValue: null,
  });
  const navigate = useNavigate();
  const { pathname } = useBaseURL();

  const handleLogOut = () => {
    setAuthUser(null);
    navigate("/" + pathname + "/register/sign-in");
  };

  const items = [
    getItem(
      IsActive && <NavLink to={"/instructor/dashboard"} children={"Home"} />,
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
            to={"/instructor/schedule-lessons"}
            children={"SCHEDULE LESSONS"}
          />,
          "sub2-1",
        ),
        getItem("Process", "sub2-2"),
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
          <NavLink to={"/instructor/profile"} children={"Profile"} />,
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
      IsActive && [getItem("Process", "sub4-1")],
    ),
    getItem(
      IsActive && "Enroll",
      5,
      <span className={"w-5"}>
        <SlBasket />
      </span>,
    ),
    getItem(
      IsActive && "Contact",
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
