import IconComponent from "@/components/icons/index.jsx";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { AdminMenu } from "@/layout/items/admin-menu.jsx";
import { DropMenuItems } from "@/layout/items/drop-menu.jsx";
import { StudentMenu } from "@/layout/items/student-menu.jsx";
import LayoutStyle from "./layout.module.scss";
import Logo from "../assets/logo.jpeg";
import UserAvatar from "../assets/user/user-avatar.jpeg";
import Tenant from "../assets/user/tenant.jpeg";
import { BellFilled } from "@ant-design/icons";
import { useBaseURL, useReducer as PortalReducer } from "@/hooks/portal.jsx";
import { Badge, ConfigProvider, Dropdown, Segmented } from "antd";
import { Fragment, useContext, useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet";
import { BiMoon } from "react-icons/bi";
import { FaListUl } from "react-icons/fa6";
import { HiOutlineSun } from "react-icons/hi2";
import { PiCurrencyCircleDollar, PiNoteDuotone } from "react-icons/pi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Layout = () => {
  console.clear();
  const [IsActive, setIsActive] = useState(true);
  const [state, dispatch] = useReducer(PortalReducer, { portal: false });
  const [IsBurger, setIsBurger] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { colorsObject } = useContext(ColorsContext);
  const { pathname: toOrigin } = useBaseURL();

  useEffect(() => {
    dispatch({
      type: toOrigin,
      pathname,
      content: toOrigin === "admin" ? <AdminMenu /> : null,
    });
  }, []);

  useEffect(() => {
    if (
      pathname === "/" ||
      pathname === "/student" ||
      pathname === "/student/"
    ) {
      navigate("/student/register/sign-in", { replace: true });
    }

    if (pathname === "/instructor" || pathname === "/instructor/") {
      navigate("/instructor/register/sign-in", { replace: true });
    }

    if (pathname === "/admin" || pathname === "/admin/") {
      navigate("/admin/register/sign-in", { replace: true });
    }
  }, [pathname]);

  useEffect(() => {
    dispatch({ type: pathname.split("/")[1], pathname });
  }, []);

  useEffect(() => {
    const root = document.getElementById("root");
    root.style.overflow = IsBurger ? "hidden" : "visible";
    root.style.height = IsBurger ? "100vh" : "auto";
  }, [IsBurger]);

  window.addEventListener("resize", () => {
    const root = document.getElementById("root");
    root.style.overflow = "visible";
    root.style.height = "auto";
    setIsBurger(false);
  });

  const handleSideBar = () => setIsActive((prev) => !prev);
  const handleBurger = () => setIsBurger((prev) => !prev);

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
        className={`${LayoutStyle["Header"]} lg:static z-10 sticky top-0 left-0 right-0 px-5 py-4 bg-white flex gap-2.5 items-center justify-between`}
      >
        <Link
          to={"/" + toOrigin + "/dashboard/"}
          className={`${LayoutStyle["logo"]} inline-flex items-center gap-4`}
        >
          <div
            className={`${LayoutStyle["logo__imageholder"]} w-10 h-10 rounded-full overflow-hidden`}
          >
            <Image src={Logo} srcSet={Logo} type={"type/image"} />
          </div>
          <span className={`text-sm text-black hidden sm:inline-block`}>
            software.com
          </span>
        </Link>

        <div
          className={`${LayoutStyle["Header__right"]} flex justify-end gap-2.5 md:gap-5 items-center`}
        >
          {state?.portalText === "admin" && (
            <Badge count={2} className="mr-5 cursor-pointer">
              <BellFilled className="w-5 h-5" />
            </Badge>
          )}

          {state?.portalText === "instructor" && (
            <Fragment>
              <IconComponent icon={<PiNoteDuotone />} />
              <IconComponent icon={<PiCurrencyCircleDollar />} />
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
              className={"border border-indigo-600 flex-shrink-0"}
              size={"large"}
              options={[
                {
                  value: "Sun",
                  icon: <HiOutlineSun />,
                },
                {
                  value: "Moon",
                  icon: <BiMoon />,
                },
              ]}
            />
          </ConfigProvider>

          <button className={`size-6 lg:hidden`} onClick={handleBurger}>
            <FaListUl />
          </button>

          <div>
            <Dropdown
              menu={{
                items: DropMenuItems,
              }}
              placement="bottomRight"
              className={"cursor-pointer"}
            >
              <div
                className={`${LayoutStyle["user"]} inline-flex items-center gap-3`}
              >
                <Title
                  className={"hidden lg:block"}
                  level={5}
                  fontWeightStrong={400}
                  fontSize={"text-base"}
                >
                  Aminov Taminov
                </Title>

                <div
                  className={`w-10 h-10 rounded-full overflow-hidden ${LayoutStyle["user__avatar"]}`}
                >
                  <Image src={UserAvatar} srcSet={UserAvatar} alt={"Avatar"} />
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      </header>
      <main className={`relative py-5 px-4 flex gap-x-4 max-w-full`}>
        <aside className={"hidden lg:block"}>
          <div
            className={`${LayoutStyle["Tenant"]} flex gap-x-5 items-center mb-6`}
          >
            <div
              className={`${LayoutStyle["Tenant"]} w-10 h-10 overflow-hidden rounded-full  `}
            >
              <Image
                src={Tenant}
                srcSet={Tenant}
                alt={"Tenant: Driving sсhool"}
              />
            </div>
            {IsActive && (
              <Title fontWeightStrong={600} level={5} fontSize={"text-base"}>
                Driving school
              </Title>
            )}
          </div>

          <nav
            className={`${LayoutStyle["Menu"]} overflow-hidden ${!IsActive && `w-[50px] shadow-md Menu__icons`}`}
          >
            <div
              className={`${LayoutStyle["Menu__top"]} relative z-10 flex gap-x-2.5 p-2.5`}
              onClick={handleSideBar}
            >
              <button className={`size-6`}>
                <FaListUl />
              </button>

              {IsActive && (
                <Title fontWeightStrong={600} level={5} fontSize={"text-base"}>
                  Main menu
                </Title>
              )}
            </div>

            {toOrigin === "admin" ? (
              <AdminMenu inlineCollapsed={!IsActive} />
            ) : toOrigin === "student" ? (
              <StudentMenu inlineCollapsed={!IsActive} />
            ) : null}
          </nav>
        </aside>
        <article
          className={`relative bg-slate-100 rounded-lg py-5 max-w-full w-full`}
        >
          <Outlet />
          {IsBurger && (
            <div
              className={
                "fixed top-[79px] left-0 right-0 bottom-0 lg:hidden z-10"
              }
            >
              <div className="max-w-80 w-full ml-auto">
                {toOrigin === "admin" ? (
                  <AdminMenu
                    style={{
                      minHeight: "calc(100vh - 79px)",
                    }}
                    inlineCollapsed={false}
                  />
                ) : toOrigin === "student" ? (
                  <StudentMenu
                    style={{
                      minHeight: "calc(100vh - 79px)",
                    }}
                    inlineCollapsed={false}
                  />
                ) : null}
              </div>
            </div>
          )}
        </article>
      </main>
    </Fragment>
  );
};

export default Layout;
