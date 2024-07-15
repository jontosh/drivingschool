import IconComponent from "@/components/icons/index.jsx";
import { AiOutlineUser } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { TbPassword } from "react-icons/tb";
import { Link } from "react-router-dom";

export const DropMenuItems = [
  {
    key: "1",
    label: (
      <Link
        to={"/" + window.location.pathname.split("/")[1] + "/profile"}
        className={"flex px-4"}
      >
        <IconComponent
          classNames={"items-center"}
          className={"text-sm text-gray-600"}
          spaceIconX={2.5}
          iconWidth={"w-5"}
          icon={<AiOutlineUser />}
        >
          View Profile
        </IconComponent>
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link
        to={"/" + window.location.pathname.split("/")[1] + "/password"}
        className={"flex px-4"}
      >
        <IconComponent
          classNames={"items-center"}
          className={"text-sm text-gray-600"}
          spaceIconX={2.5}
          iconWidth={"w-5"}
          icon={<TbPassword />}
        >
          Change password
        </IconComponent>
      </Link>
    ),
  },
  {
    key: "3",
    label: (
      <Link
        onClick={() => {
          window.sessionStorage.setItem("auth-user", null);
          window.localStorage.setItem("log-time", null);
        }}
        to={"/" + window.location.pathname.split("/")[1] + "/register/sign-in"}
        className={"flex px-4"}
      >
        <IconComponent
          classNames={"items-center"}
          className={"text-sm text-gray-600"}
          spaceIconX={2.5}
          iconWidth={"w-5"}
          icon={<LuLogOut />}
        >
          Log out
        </IconComponent>
      </Link>
    ),
  },
];
