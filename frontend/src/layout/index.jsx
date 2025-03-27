import IconComponent from "@/components/icons/index.jsx";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import ThemeContext from "@/context/theme.jsx";
import { Crypto } from "@/auth/crypto.jsx";
import { AdminMenu } from "@/layout/items/admin-menu.jsx";
import { InstructorMenu } from "@/layout/items/instructor-menu.jsx";
import { StudentMenu } from "@/layout/items/student-menu.jsx";
import classNames from "classnames";
import useSessionStorageState from "use-session-storage-state";
import LayoutStyle from "./layout.module.scss";
import Logo from "../assets/logo.jpeg";
import UserAvatar from "../assets/user/user-avatar.jpeg";
import Tenant from "../assets/user/tenant.jpeg";
import { BellFilled } from "@ant-design/icons";
import { useBaseURL } from "@/hooks/portal.jsx";
import { default as DropMenu } from "./items/drop-menu.jsx";
import { Badge, ConfigProvider, Dropdown, Layout as AntLayout, Popover, Segmented } from "antd";
import { Fragment, useContext, useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { BiMoon } from "react-icons/bi";
import { FaListUl } from "react-icons/fa6";
import { HiOutlineSun } from "react-icons/hi2";
import { PiCurrencyCircleDollar, PiNoteDuotone } from "react-icons/pi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Layout = () => {
  console.clear();
  const [IsActive, setIsActive] = useState(true);
  const [IsBurger, setIsBurger] = useState(false);
  const [User, setUser] = useSessionStorageState("user", {
    defaultValue: null,
  });
  const [UserData, setUserData] = useState(undefined);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { colorsObject } = useContext(ColorsContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { pathname: toOrigin } = useBaseURL();
  const DropMenuItems = DropMenu(UserData?.id);

  useEffect(() => {
    const path = ["/", "/student/", "/instructor/", "/admin/"].reduce(
      (_, item) => item.includes(pathname),
    );

    if (path) {
      navigate("/register/sign-in", { replace: true });
    }
  }, [pathname, navigate]);

  useEffect(() => {
    const root = document.getElementById("root");
    if (IsBurger) {
      root.style.overflow = "hidden";
      root.style.height = "100vh";
    } else {
      root.style.overflow = "visible";
      root.style.height = "auto";
    }

    const handleResize = () => {
      root.style.overflow = "visible";
      root.style.height = "auto";
      setIsBurger(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [IsBurger]);

  useEffect(() => {
    const { decrypted } = Crypto(User, import.meta.env.VITE_SECRET_KEY);
    setUserData(decrypted);
  }, [User]);

  const handleSideBar = useCallback(() => setIsActive((prev) => !prev), []);
  const handleBurger = useCallback(() => setIsBurger((prev) => !prev), []);

  return (
    <Fragment>
      <Helmet>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <header
        className={`${LayoutStyle.Header} lg:static z-10 sticky top-0 left-0 right-0 px-5 py-4 bg-white flex gap-2.5 items-center justify-between`}
      >
        <Link
          to={`/${toOrigin}/dashboard/`}
          className={classNames(
            "inline-flex items-center gap-4",
            LayoutStyle.logo,
          )}
        >
          <div
            className={`${LayoutStyle.logo__imageholder} w-10 h-10 rounded-full overflow-hidden`}
          >
            <Image src={Logo} srcSet={Logo} alt="Logo" />
          </div>
          <span className="text-sm text-black hidden sm:inline-block">
            software.com
          </span>
        </Link>
        <div
          className={classNames(
            "flex justify-end gap-2.5 md:gap-5 items-center",
            LayoutStyle.Header__right,
          )}
        >
          {toOrigin === "admin" && (
            <Badge count={2} className="mr-5 cursor-pointer">
              <BellFilled className="w-5 h-5" />
            </Badge>
          )}
          {(toOrigin === "instructor" || toOrigin === "student") && (
            <Fragment>
              <Popover 
                content={
                  <div className="p-4">
                    <h4 className="font-medium mb-2">Billing History</h4>
                    <p>No billing information available yet</p>
                  </div>
                }
                title="Payment History"
                trigger="click"
              >
                <IconComponent className="text-3xl cursor-pointer" icon={<PiNoteDuotone />} />
              </Popover>
              <Popover
                content={
                  <div className="p-4">
                    <h4 className="font-medium mb-2">Your Account</h4>
                    <p>Current Balance: $0</p>
                  </div>
                }
                title="Financial Information"
                trigger="click"
              >
                <IconComponent
                  className="text-3xl cursor-pointer"
                  icon={<PiCurrencyCircleDollar />}
                />
              </Popover>
            </Fragment>
          )}
          <ConfigProvider
            theme={{
              components: {
                Segmented: {
                  itemSelectedBg: colorsObject.info,
                  itemHoverBg: colorsObject.main,
                  itemActiveBg: colorsObject.main,
                  itemSelectedColor: colorsObject.main,
                  itemHoverColor: colorsObject.info,
                  trackBg: colorsObject.main,
                  trackPadding: 5,
                },
              },
            }}
          >
            <Segmented
              className="border border-indigo-600 flex-shrink-0"
              size="large"
              value={theme === "dark" ? "Moon" : "Sun"}
              onChange={(value) => setTheme(value === "Moon" ? "dark" : "light")}
              options={[
                { value: "Sun", icon: <HiOutlineSun /> },
                { value: "Moon", icon: <BiMoon /> },
              ]}
            />
          </ConfigProvider>
          <button className="size-6 lg:hidden" onClick={handleBurger}>
            <FaListUl />
          </button>
          <Dropdown
            menu={{ items: DropMenuItems }}
            placement="bottomRight"
            className="cursor-pointer"
          >
            <div
              className={`${LayoutStyle.user} inline-flex items-center gap-3`}
            >
              <Title
                className="hidden lg:block"
                level={5}
                fontWeightStrong={400}
                fontSize="text-base"
              >
                {UserData?.username}
              </Title>
              <div
                className={`w-10 h-10 rounded-full overflow-hidden ${LayoutStyle.user__avatar}`}
              >
                <Image src={UserAvatar} srcSet={UserAvatar} alt="Avatar" />
              </div>
            </div>
          </Dropdown>
        </div>
      </header>
      <main className="relative py-5 px-4 flex gap-x-4 max-w-full">
        <aside className="hidden lg:block">
          <div
            className={`${LayoutStyle.Tenant} flex gap-x-5 items-center mb-6`}
          >
            <div
              className={`${LayoutStyle.Tenant} w-10 h-10 overflow-hidden rounded-full`}
            >
              <Image
                src={Tenant}
                srcSet={Tenant}
                alt="Tenant: Driving school"
              />
            </div>
            {IsActive && (
              <Title fontWeightStrong={600} level={5} fontSize="text-base">
                Driving school
              </Title>
            )}
          </div>
          <nav
            className={classNames(LayoutStyle.Menu, "overflow-hidden", {
              "w-[50px] shadow-md Menu__icons": !IsActive,
            })}
          >
            <div
              className={`${LayoutStyle.Menu__top} relative z-10 flex gap-x-2.5 p-2.5`}
              onClick={handleSideBar}
            >
              <button className="size-6">
                <FaListUl />
              </button>
              {IsActive && (
                <Title fontWeightStrong={600} level={5} fontSize="text-base">
                  Main menu
                </Title>
              )}
            </div>
            {toOrigin === "admin" && <AdminMenu inlineCollapsed={!IsActive} />}
            {toOrigin === "student" && (
              <StudentMenu inlineCollapsed={!IsActive} />
            )}
            {toOrigin === "instructor" && (
              <InstructorMenu inlineCollapsed={!IsActive} />
            )}
          </nav>
        </aside>
        <article className="relative bg-slate-100 rounded-lg py-5 max-w-full w-full">
          <Outlet />
          {IsBurger && (
            <div className="fixed top-[79px] left-0 right-0 bottom-0 lg:hidden z-10">
              <div className="max-w-80 w-full ml-auto">
                {toOrigin === "admin" && (
                  <AdminMenu
                    style={{ minHeight: "calc(100vh - 79px)" }}
                    inlineCollapsed={false}
                  />
                )}
                {toOrigin === "student" && (
                  <StudentMenu
                    style={{ minHeight: "calc(100vh - 79px)" }}
                    inlineCollapsed={false}
                  />
                )}
                {toOrigin === "instructor" && (
                  <InstructorMenu
                    style={{ minHeight: "calc(100vh - 79px)" }}
                    inlineCollapsed={false}
                  />
                )}
              </div>
            </div>
          )}
        </article>
      </main>
    </Fragment>
  );
};

export default Layout;
