import ColorsContext from "@/context/colors.jsx";
import { ConfigProvider, Menu } from "antd";
import { Fragment, useContext, useState } from "react";
import {
  AiOutlineApartment,
  AiOutlineAppstore,
  AiOutlineDollar,
  AiOutlineMail,
  AiOutlineReconciliation,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineSolution,
  AiOutlineTeam,
  AiOutlineTool,
} from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import useSessionStorageState from "use-session-storage-state";

const { SubMenu } = Menu;

export const AdminMenu = ({ inlineCollapsed, style }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [openKeys, setOpenKeys] = useState([]);
  const { pathname: PATHNAME, reload } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([PATHNAME]);
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [AuthUser, setAuthUser] = useSessionStorageState("auth-user", {
    defaultValue: null,
  });
  const [LogTime, setLogTime] = useLocalStorage("log-time", null);

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
      `/admin/student/account`,
      `/admin/scheduling`,
      `/admin/communication`,
      `/admin/report/business`,
      `/admin/management`,
      `/admin/finance`,
      `/admin/configuration`,
      `/admin/support`,
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
          defaultSelectedKeys={["/admin/dashboard"]}
          inlineCollapsed={inlineCollapsed}
          style={{
            ...style,
            border: "none",
          }}
        >
          <Menu.Item
            key={"/admin/dashboard"}
            icon={
              <span className={"w-5"}>
                <AiOutlineAppstore />
              </span>
            }
          >
            <Link to={"/admin/dashboard"}>Home</Link>
          </Menu.Item>

          <Menu.Item
            key={"/admin/enrollment"}
            icon={
              <span className={"w-5"}>
                <MdOutlineShoppingCart />
              </span>
            }
          >
            <Link to={"/admin/enrollment"}>New student enrollment</Link>
          </Menu.Item>

          <Menu.Item
            key={"/admin/search/"}
            icon={
              <span className={"w-5"}>
                <AiOutlineSearch />
              </span>
            }
          >
            <Link to={"/admin/search/"}>Advanced search</Link>
          </Menu.Item>

          <SubMenu
            icon={
              <span className={"w-5"}>
                <AiOutlineTeam />
              </span>
            }
            key={"/admin/student/account"}
            title={"Student account"}
          >
            <Menu.Item key={"/admin/student/account/profile/"}>
              <Link to={"/admin/student/account/profile/" + (studentId ?? "")}>
                Profile
              </Link>
            </Menu.Item>

            <Menu.Item key={"/admin/student/account/billing/"}>
              <Link to={"/admin/student/account/billing/" + (studentId ?? "")}>
                Enrollment/Billing
              </Link>
            </Menu.Item>

            <Menu.Item key={"/admin/student/account/appointments/"}>
              <Link
                to={
                  "/admin/student/account/appointments/" +
                  (studentId ?? "") +
                  "/wheel"
                }
              >
                Appointments
              </Link>
            </Menu.Item>

            <Menu.Item key={"/admin/student/account/files/"}>
              <Link to={"/admin/student/account/files/" + (studentId ?? "")}>
                Files
              </Link>
            </Menu.Item>

            <Menu.Item key={"/admin/student/account/messages/"}>
              <Link to={"/admin/student/account/messages/" + (studentId ?? "")}>
                Messages
              </Link>
            </Menu.Item>

            <Menu.Item key={"/admin/student/account/tests/"}>
              <Link to={"/admin/student/account/tests/" + (studentId ?? "")}>
                Quiz/Tests
              </Link>
            </Menu.Item>

            <Menu.Item key={"/admin/student/account/log/"}>
              <Link to={"/admin/student/account/log/" + (studentId ?? "")}>
                Activity Log
              </Link>
            </Menu.Item>
          </SubMenu>

          {/* Scheduling */}
          <SubMenu
            icon={
              <span className={"w-5"}>
                <AiOutlineSolution />
              </span>
            }
            key={"/admin/scheduling"}
            title={"Scheduling"}
          >
            <Menu.Item key={"/admin/scheduling/student"}>
              <Link to={"/admin/scheduling/student"}>Schedule as Student</Link>
            </Menu.Item>

            <Menu.Item key={"/admin/scheduling/vehicle"}>
              <Link to={"/admin/scheduling/vehicle"}>Multi Vehicles</Link>
            </Menu.Item>

            <Menu.Item key={"/admin/scheduling/signle"}>
              <Link to={"/admin/scheduling/signle"}>Single Instructor</Link>
            </Menu.Item>

            <Menu.Item key={"/admin/scheduling/multi"}>
              <Link to={"/admin/scheduling/multi"}>Multi Instructor</Link>
            </Menu.Item>

            {/* Mange slot */}
            <SubMenu
              key={"/admin/scheduling/manage"}
              title={"Manage time slot"}
            >
              <Menu.Item key={"/admin/scheduling/manage/appointment"}>
                <Link to={"/admin/scheduling/manage/appointment"}>
                  Appointment
                </Link>
              </Menu.Item>
              <Menu.Item key={"/admin/scheduling/manage/open"}>
                <Link to={"/admin/scheduling/manage/open"}>Open time slot</Link>
              </Menu.Item>
              <Menu.Item key={"/admin/scheduling/manage/logs"}>
                <Link to={"/admin/scheduling/manage/logs"}>Activity logs</Link>
              </Menu.Item>
              <Menu.Item key={"/admin/scheduling/manage/process"}>
                <Link to={"/admin/scheduling/manage/process"}>
                  Bulk process
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key={"/admin/scheduling/corporate"}>
              <Link to={"/admin/scheduling/corporate"}>Corporate time off</Link>
            </Menu.Item>
            <Menu.Item key={"/admin/scheduling/appointments"}>
              <Link to={"/admin/scheduling/appointments"}>
                Staff Appointments List
              </Link>
            </Menu.Item>
          </SubMenu>
          {/*Communication*/}
          <SubMenu
            icon={
              <span className={"w-5"}>
                <AiOutlineMail />
              </span>
            }
            key={"/admin/communication"}
            title={"Communication"}
          >
            <Menu.Item
              key={"/admin/communication/email-templates/student-portal"}
            >
              <Link to={"/admin/communication/email-templates/student-portal"}>
                Email Templates
              </Link>
            </Menu.Item>

            <Menu.Item key={"/admin/communication/student-resources/class"}>
              <Link to={"/admin/communication/student-resources/class"}>
                Student Resources
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            icon={
              <span className={"w-5"}>
                <AiOutlineReconciliation />
              </span>
            }
            title={"Report center"}
            key={"/admin/report/business"}
          >
            <Menu.Item key={"/admin/report/business/student-event-log"}>
              <Link to={"/admin/report/business/student-event-log"}>
                Business Report
              </Link>
            </Menu.Item>
          </SubMenu>

          {/* Account Management */}

          <SubMenu
            icon={
              <span className={"w-5"}>
                <AiOutlineApartment />
              </span>
            }
            title={"Account Management"}
            key={"/admin/management"}
          >
            {/* Services */}
            <SubMenu title={"Services"} key={"/admin/management/service/"}>
              <Menu.Item key={"/admin/management/service/product"}>
                <Link to={"/admin/management/service/product"}>
                  Components (Products)
                </Link>
              </Menu.Item>

              <Menu.Item key={"/admin/management/service/fees"}>
                <Link to={"/admin/management/service/fees"}>Fees</Link>
              </Menu.Item>

              <Menu.Item key={"/admin/management/service/discounts"}>
                <Link to={"/admin/management/service/discounts"}>Discount</Link>
              </Menu.Item>

              <Menu.Item key={"/admin/management/service/miscellaneous"}>
                <Link to={"/admin/management/service/miscellaneous"}>
                  Miscellaneous
                </Link>
              </Menu.Item>

              <Menu.Item key={"/admin/management/service/quiz-exam"}>
                <Link to={"/admin/management/service/quiz-exam"}>
                  Quiz Exam
                </Link>
              </Menu.Item>

              <Menu.Item key={"/admin/management/service/quiz-report"}>
                <Link to={"/admin/management/service/quiz-report"}>
                  Quiz Report
                </Link>
              </Menu.Item>

              <Menu.Item key={"/admin/management/service/packages"}>
                <Link to={"/admin/management/service/packages"}>
                  Services (Packages)
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key={"/admin/management/file"}>
              <Link to={"/admin/management/file"}>File management</Link>
            </Menu.Item>

            <Menu.Item key={"/admin/management/staff"}>
              <Link to={"/admin/management/staff"}>Staff</Link>
            </Menu.Item>

            <Menu.Item key={"/admin/management/single-page/location"}>
              <Link to={"/admin/management/single-page/location"}>
                Location
              </Link>
            </Menu.Item>

            <Menu.Item key={"/admin/management/single-page/high school"}>
              <Link to={"/admin/management/single-page/high school"}>
                High School
              </Link>
            </Menu.Item>

            <Menu.Item
              key={"/admin/management/single-page/how%20did%20you%20hear"}
            >
              <Link to={"/admin/management/single-page/how%20did%20you%20hear"}>
                How did you hear
              </Link>
            </Menu.Item>

            <Menu.Item key={"/admin/management/single-page/vehicles"}>
              <Link to={"/admin/management/single-page/vehicles"}>
                Vehicles
              </Link>
            </Menu.Item>
          </SubMenu>

          {/* Finances */}
          <SubMenu
            title={"Finances"}
            icon={
              <span className={"w-5"}>
                <AiOutlineDollar />
              </span>
            }
            key={"/admin/finance"}
          >
            <Menu.Item key={"/admin/finance/finances"}>
              <Link to={"/admin/finance/finances"}>Finances</Link>
            </Menu.Item>
            <Menu.Item key={"/admin/finance/statistic"}>
              <Link to={"/admin/finance/statistic"}>Statistic</Link>
            </Menu.Item>
          </SubMenu>
          {/* Configuration */}
          <SubMenu
            key={"/admin/configuration"}
            title={"Configuration"}
            icon={
              <span className={"w-5"}>
                <AiOutlineSetting />
              </span>
            }
          >
            <Menu.Item key={"/admin/configuration/company/info"}>
              <Link to={"/admin/configuration/company/info"}>Company Info</Link>
            </Menu.Item>

            <Menu.Item key={"/admin/configuration/company/payment"}>
              <Link to={"/admin/configuration/company/payment"}>
                Integrate payment
              </Link>
            </Menu.Item>

            <Menu.Item key={"/admin/configuration/policies/staff-password"}>
              <Link to={"/admin/configuration/policies/staff-password"}>
                Staff password
              </Link>
            </Menu.Item>

            <Menu.Item key={"/admin/configuration/zip-code"}>
              <Link to={"/admin/configuration/zip-code"}>Zip Code</Link>
            </Menu.Item>
          </SubMenu>
          {/* Help */}
          <SubMenu
            icon={
              <span className={"w-5"}>
                <AiOutlineTool />
              </span>
            }
            key={"/admin/support"}
            title={"Support"}
          >
            <Menu.Item key={"/admin/support/help"}>
              <Link to={"/admin/support/help"}>Help</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item
            icon={
              <span className={"w-5"} onClick={handleLogOut}>
                <LuLogOut />
              </span>
            }
            key={"/admin/register/"}
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
