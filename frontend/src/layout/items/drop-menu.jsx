import IconComponent, { Icons } from "@/components/icons/index.jsx";
import { AiOutlineUser } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";

export const DropMenuItems = [
  {
    key: "1",
    label: (
      <Link to={"/profile/"} className={"flex px-4"}>
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
      <Link to={"/password/"} className={"flex px-4"}>
        <IconComponent
          classNames={"items-center"}
          className={"text-sm text-gray-600"}
          spaceIconX={2.5}
          iconWidth={"w-5"}
          icon={<Icons type={"password_broken"} />}
        >
          Change password
        </IconComponent>
      </Link>
    ),
  },
  {
    key: "3",
    label: (
      <Link to={"/log-out/"} className={"flex px-4"}>
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
