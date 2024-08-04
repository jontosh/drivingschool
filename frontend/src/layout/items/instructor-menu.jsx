import ColorsContext from "@/context/colors.jsx";
import { ConfigProvider, Menu } from "antd";
import { Fragment, useContext, useState } from "react";
import { AiOutlineAppstore, AiOutlineSolution } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { PiUsers } from "react-icons/pi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import useSessionStorageState from "use-session-storage-state";

export const InstructorMenu = ({ inlineCollapsed, style }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [openKeys, setOpenKeys] = useState([]);
  const { pathname: PATHNAME, reload } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([PATHNAME]);
  const { instructorId } = useParams();
  const [AuthUser, setAuthUser] = useSessionStorageState("auth-user", {
    defaultValue: null,
  });
  const [LogTime, setLogTime] = useLocalStorage("log-time", null);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setLogTime(null);
    setAuthUser(null);
    navigate("/instructor/register/sign-in", { replace: true });
    reload();
  };
  const handleMenuClick = (e) => {
    setSelectedKeys([e.key]);
  };

  const handleSubMenuOpenChange = (keys) => {
    const rootSubmenuKeys = [
      `/student/schedule-lessons/${instructorId ?? 0}`,
      `/student/profile/${instructorId ?? 0}`,
      `/student/resource/${instructorId ?? 0}`,
    ];

    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Fragment>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemSelectedBg: "transparent",
              itemHoverBg: "transparent",
              subMenuItemBg: "transparent",
              itemPaddingInline: 0,
              padding: 0,
              itemSelectedColor: colorsObject?.primary,
            },
          },
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={handleSubMenuOpenChange}
          onClick={handleMenuClick}
          defaultSelectedKeys={["/instructor/dashboard/" + (instructorId ?? 0)]}
          inlineCollapsed={inlineCollapsed}
          style={{
            ...style,
            border: "none",
          }}
        >
          <Menu.Item
            key={"/instructor/dashboard/" + (instructorId ?? 0)}
            icon={
              <span className={"w-5"}>
                <AiOutlineAppstore />
              </span>
            }
          >
            <Link to={"/instructor/dashboard/" + (instructorId ?? 0)}>
              Home
            </Link>
          </Menu.Item>
          {/* schedule */}
          <Menu.Item
            icon={
              <span className={"w-5"}>
                <AiOutlineSolution />
              </span>
            }
            key={"/instructor/schedule-lessons/" + (instructorId ?? 0)}
          >
            <Link to={"/instructor/schedule-lessons/" + (instructorId ?? 0)}>
              Scheduling
            </Link>
          </Menu.Item>
          {/* My Account */}
          <Menu.Item
            icon={
              <span className={"w-5"}>
                <PiUsers />
              </span>
            }
            key={"/instructor/profile/" + (instructorId ?? 0)}
          >
            <Link to={"/instructor/profile/" + (instructorId ?? 0)}>
              Profile
            </Link>
          </Menu.Item>
          <Menu.Item
            icon={
              <span className={"w-5"} onClick={handleLogOut}>
                <LuLogOut />
              </span>
            }
            key={"/instructor/register/sign-in"}
          >
            <Link onClick={handleLogOut} to={"/instructor/register/sign-in"}>
              Log out
            </Link>
          </Menu.Item>
        </Menu>
      </ConfigProvider>
    </Fragment>
  );
};
