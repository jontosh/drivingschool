import { AiOutlineAppstore, AiOutlineSolution } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { IoDiamondOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { PiUsers } from "react-icons/pi";
import { SlBasket } from "react-icons/sl";
import { NavLink } from "react-router-dom";

export const StudentMenu = (IsActive, getItem) => {
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
            to={"/student/schedule-lessons"}
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
      IsActive && [getItem("Process", "sub4-1")],
    ),
    getItem(
      IsActive && <NavLink to={"/student/enroll"} children={"Enroll"} />,
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
      IsActive && "Log out",
      12,
      <span className="w-5">
        <LuLogOut />
      </span>,
    ),
  ];
  return { items };
};
