import ColorsContext from "@/context/colors.jsx";
import { ConfigProvider, Menu } from "antd";
import { Fragment, useContext, useState } from "react";
import { AiOutlineAppstore, AiOutlineSolution } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { IoDiamondOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { PiUsers } from "react-icons/pi";
import { SlBasket } from "react-icons/sl";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import useSessionStorageState from "use-session-storage-state";

const { SubMenu } = Menu;

export const StudentMenu = ({ inlineCollapsed, style }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [openKeys, setOpenKeys] = useState([]);
  const { pathname: PATHNAME, reload } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([PATHNAME]);
  const { studentId } = useParams();
  const [AuthUser, setAuthUser] = useSessionStorageState("auth-user", {
    defaultValue: null,
  });
  const [LogTime, setLogTime] = useLocalStorage("log-time", null);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setLogTime(null);
    setAuthUser(null);
    navigate("/student/register/sign-in", { replace: true });
    reload();
  };
  const handleMenuClick = (e) => {
    setSelectedKeys([e.key]);
  };

  const handleSubMenuOpenChange = (keys) => {
    const rootSubmenuKeys = [
      `/student/schedule/${studentId ?? 0}`,
      `/student/account/${studentId ?? 0}`,
      `/student/resource/${studentId ?? 0}`,
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
          defaultSelectedKeys={["/student/dashboard/" + (studentId ?? 0)]}
          inlineCollapsed={inlineCollapsed}
          style={{
            ...style,
            border: "none",
          }}
        >
          <Menu.Item
            key={"/student/dashboard/" + (studentId ?? 0)}
            icon={
              <span className={"w-5"}>
                <AiOutlineAppstore />
              </span>
            }
          >
            <Link to={"/student/dashboard/" + (studentId ?? 0)}>Home</Link>
          </Menu.Item>
          {/* schedule */}
          <SubMenu
            key={"/student/schedule/" + (studentId ?? 0)}
            title={"Scheduling"}
            icon={
              <span className={"w-5"}>
                <AiOutlineSolution />
              </span>
            }
          >
            <Menu.Item
              key={"/student/schedule/my-schedule/" + (studentId ?? 0)}
            >
              <Link to={"/student/schedule/my-schedule/" + (studentId ?? 0)}>
                My schedule
              </Link>
            </Menu.Item>

            <Menu.Item
              key={"/student/schedule/book-lessons/" + (studentId ?? 0)}
            >
              <Link to={"/student/schedule/book-lessons/" + (studentId ?? 0)}>
                Book my lessons
              </Link>
            </Menu.Item>
          </SubMenu>
          {/* My Account */}
          <SubMenu
            icon={
              <span className={"w-5"}>
                <PiUsers />
              </span>
            }
            title={"My account"}
            key={"/student/account/" + (studentId ?? 0)}
          >
            <Menu.Item key={"/student/account/profile/" + (studentId ?? 0)}>
              <Link to={"/student/account/profile/" + (studentId ?? 0)}>
                Profile
              </Link>
            </Menu.Item>

            <Menu.Item key={"/student/account/billing/" + (studentId ?? 0)}>
              <Link to={"/student/account/billing/" + (studentId ?? 0)}>
                Enrollment and Billing
              </Link>
            </Menu.Item>

            <Menu.Item
              key={"/student/account/appointments/" + (studentId ?? 0)}
            >
              <Link to={"/student/account/appointments/" + (studentId ?? 0)}>
                Appointments
              </Link>
            </Menu.Item>

            <Menu.Item key={"/student/account/files/" + (studentId ?? 0)}>
              <Link to={"/student/account/files/" + (studentId ?? 0)}>
                Files
              </Link>
            </Menu.Item>
          </SubMenu>
          {/* Resources */}
          <SubMenu
            key={"/student/resource/" + (studentId ?? 0)}
            title={"Resources"}
            icon={
              <span className={"w-5"}>
                <IoDiamondOutline />
              </span>
            }
          >
            <Menu.Item key={"/student/resource/in-car/" + (studentId ?? 0)}>
              <Link to={"/student/resource/in-car/" + (studentId ?? 0)}>
                In-car
              </Link>
            </Menu.Item>

            <Menu.Item key={"/student/resource/road-test/" + (studentId ?? 0)}>
              <Link to={"/student/resource/road-test/" + (studentId ?? 0)}>
                Road test
              </Link>
            </Menu.Item>

            <Menu.Item key={"/student/resource/parents/" + (studentId ?? 0)}>
              <Link to={"/student/resource/parents/" + (studentId ?? 0)}>
                Parents
              </Link>
            </Menu.Item>

            <Menu.Item
              key={"/student/resource/quiz/" + (studentId ?? 0) + "/view/exams"}
            >
              <Link
                to={
                  "/student/resource/quiz/" + (studentId ?? 0) + "/view/exams"
                }
              >
                Quiz
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            icon={
              <span className={"w-5"}>
                <SlBasket />
              </span>
            }
            key={"/student/enroll/" + (studentId ?? 0)}
          >
            <Link to={"/student/enroll/" + (studentId ?? 0)}>Enroll</Link>
          </Menu.Item>
          <Menu.Item
            icon={
              <span className={"w-5"}>
                <FiPhone />
              </span>
            }
            key={"/student/contact/" + (studentId ?? 0)}
          >
            <Link to={"/student/contact/" + (studentId ?? 0)}>Contact</Link>
          </Menu.Item>
          <Menu.Item
            icon={
              <span className={"w-5"} onClick={handleLogOut}>
                <LuLogOut />
              </span>
            }
            key={"/student/register/sign-in"}
          >
            <Link onClick={handleLogOut} to={"/student/register/sign-in"}>
              Log out
            </Link>
          </Menu.Item>
        </Menu>
      </ConfigProvider>
    </Fragment>
  );
};
