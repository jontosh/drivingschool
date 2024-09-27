import { Crypto } from "@/auth/crypto.jsx";
import ColorsContext from "@/context/colors.jsx";
import { ConfigProvider, Menu } from "antd";
import { Fragment, useContext, useEffect, useState } from "react";
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
  const [User, setUser] = useSessionStorageState("user", {
    defaultValue: null,
  });
  const [UserData, setUserData] = useState(undefined);

  useEffect(() => {
    const { decrypted } = Crypto(User, import.meta.env.VITE_SECRET_KEY);
    setUserData(decrypted);
  }, [User]);

  const handleLogOut = () => {
    setLogTime(null);
    setAuthUser(null);
    navigate("/register/sign-in", { replace: true });
    reload();
  };
  const handleMenuClick = (e) => {
    setSelectedKeys([e.key]);
  };

  const handleSubMenuOpenChange = (keys) => {
    const rootSubmenuKeys = [
      `/student/schedule-lessons/${UserData?.id ?? instructorId}`,
      `/student/profile/${UserData?.id ?? instructorId}`,
      `/student/resource/${UserData?.id ?? instructorId}`,
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
          defaultSelectedKeys={[
            "/instructor/dashboard/" + (UserData?.id ?? instructorId),
          ]}
          inlineCollapsed={inlineCollapsed}
          style={{
            ...style,
            border: "none",
          }}
        >
          <Menu.Item
            key={"/instructor/dashboard/" + (UserData?.id ?? instructorId)}
            icon={
              <span className={"w-5"}>
                <AiOutlineAppstore />
              </span>
            }
          >
            <Link
              to={"/instructor/dashboard/" + (UserData?.id ?? instructorId)}
            >
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
            key={
              "/instructor/schedule-lessons/" + (UserData?.id ?? instructorId)
            }
          >
            <Link
              to={
                "/instructor/schedule-lessons/" + (UserData?.id ?? instructorId)
              }
            >
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
            key={"/instructor/profile/" + (UserData?.id ?? instructorId)}
          >
            <Link to={"/instructor/profile/" + (UserData?.id ?? instructorId)}>
              Profile
            </Link>
          </Menu.Item>
          <Menu.Item
            icon={
              <span className={"w-5"} onClick={handleLogOut}>
                <LuLogOut />
              </span>
            }
            key={"/register/sign-in"}
          >
            <Link onClick={handleLogOut} to={"/register/sign-in"}>
              Log out
            </Link>
          </Menu.Item>
        </Menu>
      </ConfigProvider>
    </Fragment>
  );
};
