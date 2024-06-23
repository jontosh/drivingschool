import { AiOutlineAppstore, AiOutlineSolution } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { NavLink } from "react-router-dom";

export const InstructorMenu = (IsActive, getItem) => {
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
        <AiOutlineSolution />
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
        <AiOutlineSolution />
      </span>,
      IsActive && [getItem("Process", "sub4-1")],
    ),
    getItem(IsActive && "Enroll", 5, null),
    getItem(IsActive && "Contact", 6, null),
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
