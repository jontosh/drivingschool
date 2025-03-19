import { Crypto } from "@/auth/crypto.jsx";
import ColorsContext from "@/context/colors.jsx";
import { ConfigProvider, Menu } from "antd";
import { Fragment, useContext, useEffect, useState } from "react";
import { AiOutlineAppstore, AiOutlineSolution } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
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
    navigate("/student/register/sign-in", { replace: true });
    reload();
  };
  const handleMenuClick = (e) => {
    setSelectedKeys([e.key]);
  };

  const handleSubMenuOpenChange = (keys) => {
    const rootSubmenuKeys = [
      `/student/schedule/${UserData?.id ?? studentId}`,
      `/student/account/${UserData?.id ?? studentId}`,
      `/student/resource/${UserData?.id ?? studentId}`,
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
            "/student/dashboard/" + (UserData?.id ?? studentId),
          ]}
          inlineCollapsed={inlineCollapsed}
          style={{
            ...style,
            border: "none",
          }}
        >
          <Menu.Item
            key={"/student/dashboard/" + (UserData?.id ?? studentId)}
            icon={
              <span className={"w-5"}>
                <AiOutlineAppstore />
              </span>
            }
          >
            <Link to={"/student/dashboard/" + (UserData?.id ?? studentId)}>
              Home
            </Link>
          </Menu.Item>
          {/* schedule */}
          <SubMenu
            key={"/student/schedule/" + (UserData?.id ?? studentId)}
            title={"Scheduling"}
            icon={
              <span className={"w-5"}>
                <AiOutlineSolution />
              </span>
            }
          >
            <Menu.Item
              key={
                "/student/schedule/my-schedule/" + (UserData?.id ?? studentId)
              }
            >
              <Link
                to={
                  "/student/schedule/my-schedule/" + (UserData?.id ?? studentId)
                }
              >
                My schedule
              </Link>
            </Menu.Item>

            <Menu.Item
              key={
                "/student/schedule/book-lessons/" + (UserData?.id ?? studentId)
              }
            >
              <Link
                to={
                  "/student/schedule/book-lessons/" +
                  (UserData?.id ?? studentId)
                }
              >
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
            key={"/student/account/" + (UserData?.id ?? studentId)}
          >
            <Menu.Item
              key={"/student/account/profile/" + (UserData?.id ?? studentId)}
            >
              <Link
                to={"/student/account/profile/" + (UserData?.id ?? studentId)}
              >
                Profile
              </Link>
            </Menu.Item>

            <Menu.Item
              key={"/student/account/billing/" + (UserData?.id ?? studentId)}
            >
              <Link
                to={"/student/account/billing/" + (UserData?.id ?? studentId)}
              >
                Enrollment and Billing
              </Link>
            </Menu.Item>

            <Menu.Item
              key={
                "/student/account/appointments/" + (UserData?.id ?? studentId)
              }
            >
              <Link
                to={
                  "/student/account/appointments/" + (UserData?.id ?? studentId)
                }
              >
                Appointments
              </Link>
            </Menu.Item>

            <Menu.Item
              key={"/student/account/files/" + (UserData?.id ?? studentId)}
            >
              <Link
                to={"/student/account/files/" + (UserData?.id ?? studentId)}
              >
                Files
              </Link>
            </Menu.Item>
          </SubMenu>
          {/* Resources */}
          <SubMenu
            key={"/student/resource/" + (UserData?.id ?? studentId)}
            title={"Resources"}
            icon={
              <span className={"w-5"}>
                <IoDiamondOutline />
              </span>
            }
          >
            <Menu.Item
              key={"/student/resource/in-car/" + (UserData?.id ?? studentId)}
            >
              <Link
                to={"/student/resource/in-car/" + (UserData?.id ?? studentId)}
              >
                In-car
              </Link>
            </Menu.Item>

            <Menu.Item
              key={"/student/resource/road-test/" + (UserData?.id ?? studentId)}
            >
              <Link to={"/student/resource/road-test/" + (studentId ?? 0)}>
                Road test
              </Link>
            </Menu.Item>

            <Menu.Item key={"/student/resource/parents/" + (studentId ?? 0)}>
              <Link
                to={"/student/resource/parents/" + (UserData?.id ?? studentId)}
              >
                Parents
              </Link>
            </Menu.Item>

            <Menu.Item
              key={
                "/student/resource/quiz/" +
                (UserData?.id ?? studentId) +
                "/view/exams"
              }
            >
              <Link
                to={
                  "/student/resource/quiz/" +
                  (UserData?.id ?? studentId) +
                  "/view/exams"
                }
              >
                Quiz
              </Link>
            </Menu.Item>
          </SubMenu>

          {/* Video Courses */}
          <Menu.Item
            icon={
              <span className={"w-5"}>
                <BsCameraVideo />
              </span>
            }
            key={"/student/video-courses/" + (UserData?.id ?? studentId)}
          >
            <Link to={"/student/video-courses/" + (UserData?.id ?? studentId)}>
              Video Courses
            </Link>
          </Menu.Item>

          {/* Enroll */}
          <Menu.Item
            icon={
              <span className={"w-5"}>
                <SlBasket />
              </span>
            }
            key={"/student/enroll/" + (UserData?.id ?? studentId)}
          >
            <Link to={"/student/enroll/" + (UserData?.id ?? studentId)}>
              Enroll
            </Link>
          </Menu.Item>
          <Menu.Item
            icon={
              <span className={"w-5"}>
                <FiPhone />
              </span>
            }
            key={"/student/contact/" + (UserData?.id ?? studentId)}
          >
            <Link to={"/student/contact/" + (UserData?.id ?? studentId)}>
              Contact
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
