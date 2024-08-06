import IconComponent from "@/components/icons/index.jsx";
import { useBaseURL } from "@/hooks/portal.jsx";
import { AiOutlineUser } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { TbPassword } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

const DropMenuItems = (id) => {
  const { pathname: basePath } = useBaseURL();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.sessionStorage.setItem("auth-user", null);
    window.sessionStorage.setItem("auth-upgrade", null);
    window.localStorage.setItem("log-time", null);
    navigate(`/${basePath}/register/sign-in`, { replace: true });
    window.location.reload();
  };

  return [
    {
      key: "1",
      label: (
        <Link
          to={
            basePath === "admin"
              ? "/admin/profile/" + id
              : basePath === "student"
                ? "/student/account/profile/" + id
                : "/instructor/profile/" + id
          }
          className="flex px-4"
        >
          <IconComponent
            classNames="items-center text-sm text-gray-600"
            spaceIconX={2.5}
            iconWidth="w-5"
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
          to={
            basePath === "admin"
              ? `/admin/password/` + id
              : basePath === "instructor"
                ? `/instructor/profile/` + id
                : "/student/account/profile/" + id
          }
          className="flex px-4"
        >
          <IconComponent
            classNames="items-center text-sm text-gray-600"
            spaceIconX={2.5}
            iconWidth="w-5"
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
        <div onClick={handleLogout} className="flex px-4">
          <IconComponent
            classNames="items-center text-sm text-gray-600"
            spaceIconX={2.5}
            iconWidth="w-5"
            icon={<LuLogOut />}
          >
            Log out
          </IconComponent>
        </div>
      ),
    },
  ];
};

export default DropMenuItems;
