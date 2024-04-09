// import { IconComponent } from "@/components/button/index.jsx";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
// import ColorsContext from "@/context/colors.jsx";
import ServiceStyle from "@/pages/managment/management.module.scss";
import { ConfigProvider, Menu } from "antd";
import { Fragment, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  // AiOutlineApartment,
  AiOutlineAppstore,
  // AiOutlineEye,
  AiOutlineMail,
  AiOutlineReconciliation,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineSolution,
  AiOutlineTeam,
  AiOutlineTool,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BiMoon } from "react-icons/bi";
import { FaListUl } from "react-icons/fa6";
import { HiOutlineSun } from "react-icons/hi2";
import { LuLogOut } from "react-icons/lu";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import LayoutStyle from "./layout.module.scss";
import Logo from "../assets/logo.jpeg";
import UserAvatar from "../assets/user/user-avatar.jpeg";
import Tenant from "../assets/user/tenant.jpeg";

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const Layout = ({}) => {
  // const { colorsObject } = useContext(ColorsContext);
  const [IsActive, setIsActive] = useState(true);
  // const [IsDropActive, setIsDropActive] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === "/") {
      navigate("/dashboard/");
    }
  }, []);

  const handleSideBar = () => setIsActive((prev) => !prev);
  const setActiveNav = ({ isActive }) =>
    isActive
      ? `${ServiceStyle["Tab__link-active"]} text-lg`
      : "hover:text-indigo-500 text-lg text-gray-700";
  // const handleDropActive = () => setIsDropActive((prev) => !prev);
  const items = [
    getItem(
      IsActive && <Link to={"/dashboard/"} children={"Home"} />,
      "sub1",
      <span className={"w-5"}>
        <AiOutlineAppstore />
      </span>,
    ),
    getItem(
      IsActive && (
        <Link to={"/enrollment/"} children={"New student enrollment"} />
      ),
      "sub2",
      <span className={"w-5"}>
        <AiOutlineUserAdd />
      </span>,
    ),
    getItem(
      IsActive && <Link to={"/notfound/"} children={"Advanced search"} />,
      "sub3",
      <span className={"w-5"}>
        <AiOutlineSearch />
      </span>,
    ),
    getItem(
      IsActive && "Student account",
      "sub4",
      <span className={"w-5"}>
        <AiOutlineTeam />
      </span>,
      IsActive && [
        getItem(<Link to={"/student/account/profile"} children={"Profile"} />),
        getItem(
          <Link
            to={"/student/account/enrollment"}
            children={"Enrollment/Billing"}
          />,
        ),
        getItem(
          <Link
            to={"/student/account/appointments"}
            children={"Appointments"}
          />,
        ),
        getItem(<Link to={"/student/account/files"} children={"Files"} />),
        getItem(
          <Link to={"/student/account/messages"} children={"Messages"} />,
        ),
        getItem(<Link to={"/student/account/tests"} children={"Quiz/Tests"} />),
        getItem(<Link to={"/student/account/log"} children={"Activity Log"} />),
      ],
    ),
    getItem(
      IsActive && "Scheduling",
      "sub5",
      <span className={"w-5"}>
        <AiOutlineSolution />
      </span>,
      IsActive && [getItem("Process")],
    ),
    getItem(
      IsActive && "Communication",
      "sub6",
      <span className={"w-5"}>
        <AiOutlineMail />
      </span>,
      IsActive && [getItem("Process")],
    ),
    getItem(
      IsActive && "Report center",
      "sub7",
      <span className={"w-5"}>
        <AiOutlineReconciliation />
      </span>,
      IsActive && [getItem("Process")],
    ),
    getItem(
      IsActive && "Account Management",
      "sub8",
      <span className={"w-5"}>
        <AiOutlineReconciliation />
      </span>,
      IsActive && [
        getItem("Services", 1, null, [
          getItem(
            <Link
              to={"/management/service/product"}
              children={"Components (Product)"}
            />,
            "sub8-1",
          ),
          getItem(
            <Link to={"/management/service/fees"} children={"Fees"} />,
            "sub8-2",
          ),
          getItem(
            <Link
              to={"/management/service/discounts"}
              children={"Discounts"}
            />,
            "sub8-3",
          ),
          getItem(
            <Link
              to={"/management/service/miscellaneous"}
              children={"Miscellaneous"}
            />,
            "sub8-4",
          ),
          getItem(
            <Link
              to={"/management/service/quiz-exam"}
              children={"Quiz Exam"}
            />,
            "sub8-5",
          ),
          getItem(
            <Link
              to={"/management/service/quiz-report"}
              children={"Quiz Report"}
            />,
            "sub8-6",
          ),
          getItem(
            <Link
              to={"/management/service/packages"}
              children={"Services (Packages)"}
            />,
            "sub8-7",
          ),
        ]),
      ],
    ),
    getItem(
      IsActive && "Configuration",
      "sub9",
      <span className="w-5">
        <AiOutlineSetting />
      </span>,
      IsActive && [getItem("Process")],
    ),
    getItem(
      IsActive && "Help",
      "sub10",
      <span className="w-5">
        <AiOutlineTool />
      </span>,
    ),
    getItem(
      IsActive && "Log out",
      "sub11",
      <span className="w-5">
        <LuLogOut />
      </span>,
    ),
  ];

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
        className={`${LayoutStyle["Header"]} px-5 py-4 bg-white flex items-center justify-between`}
      >
        <Link
          to={"/dashboard"}
          className={`${LayoutStyle["logo"]} inline-flex items-center gap-4`}
        >
          <div
            className={`${LayoutStyle["logo__imageholder"]} w-10 h-10 rounded-full overflow-hidden`}
          >
            <Image src={Logo} srcSet={Logo} type={"type/image"} />
          </div>
          <span className={`text-sm text-black`}>software.com</span>
        </Link>

        <div
          className={`${LayoutStyle["Header__right"]} flex justify-end gap-2.5`}
        >
          <div
            className={`${LayoutStyle["Header__mode"]} inline-flex items-center gap-2.5 border-2 border-solid border-indigo-700 rounded-lg py-1 px-2.5`}
          >
            <button
              type={"button"}
              className={`text-xl p-1 rounded-lg ${LayoutStyle["Header__mode-active"]}`}
            >
              <HiOutlineSun />
            </button>

            <button type={"button"} className={`text-xl p-1 rounded-lg`}>
              <BiMoon />
            </button>
          </div>

          <div
            className={`${LayoutStyle["user"]} inline-flex items-center gap-3`}
          >
            <Title level={5} fontWeightStrong={400} fontSize={"text-base"}>
              Aminov Taminov
            </Title>

            <div
              className={`w-10 h-10 rounded-full overflow-hidden ${LayoutStyle["user__avatar"]}`}
            >
              <Image src={UserAvatar} srcSet={UserAvatar} alt={"Avatar"} />
            </div>
          </div>
        </div>
      </header>
      <main className={`py-5 px-4 flex gap-x-4 max-w-full`}>
        <aside>
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
            className={`${LayoutStyle["Menu"]} overflow-hidden ${!IsActive && "w-14"}`}
          >
            <div
              className={`${LayoutStyle["Menu__top"]} relative z-10 flex gap-x-2.5 p-2.5`}
              onClick={handleSideBar}
            >
              <button className={`size-6`}>
                <FaListUl />
              </button>
              <Title fontWeightStrong={600} level={5} fontSize={"text-base"}>
                {IsActive && "Main menu"}
              </Title>
            </div>

            <ConfigProvider
              theme={{
                components: {
                  Menu: {
                    itemSelectedBg: "transparent",
                    itemHoverBg: "transparent",
                    subMenuItemBg: "transparent",
                    itemPaddingInline: 0,
                    padding: 0,
                  },
                },
              }}
            >
              <Menu
                style={{
                  width: "100%",
                  background: "#FBFBFBs",
                  padding: 0,
                  border: "none",
                }}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                items={items}
              />
            </ConfigProvider>
          </nav>
        </aside>
        <article className={`bg-slate-100 rounded-lg py-5 max-w-full w-full`}>
          <Outlet />
        </article>
      </main>
      <footer>Footer</footer>
    </Fragment>
  );
};

export default Layout;
