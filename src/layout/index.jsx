import ButtonComponent, { IconComponent } from "@/components/button/index.jsx";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Fragment, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import {
  AiOutlineApartment,
  AiOutlineAppstore,
  AiOutlineEye,
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
import { Link, Outlet } from "react-router-dom";
import LayoutStyle from "./layout.module.scss";
import Logo from "../assets/logo.jpeg";
import UserAvatar from "../assets/user/user-avatar.jpeg";
import Tenant from "../assets/user/tenant.jpeg";

const Layout = ({}) => {
  const { colorsObject } = useContext(ColorsContext);
  const [IsActive, setIsActive] = useState(true);
  const handleSideBar = () => setIsActive((prev) => !prev);
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
      <main className={`py-5 px-4 flex gap-x-4`}>
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
              className={`${LayoutStyle["Menu__top"]} flex gap-x-2.5 p-2.5`}
              onClick={handleSideBar}
            >
              <button className={`size-6`}>
                <FaListUl />
              </button>
              <Title fontWeightStrong={600} level={5} fontSize={"text-base"}>
                {IsActive && "Main menu"}
              </Title>
            </div>

            <div
              className={`py-5 px-4 space-y-5 ${LayoutStyle["Menu__links"]}`}
            >
              <IconComponent
                defaultHoverColor={colorsObject.primary}
                className={`space-x-4 text-gray-500`}
                defaultBorderColor={"transparent"}
                defaultBg={"transparent"}
                icon={<AiOutlineAppstore />}
                href={"/dashboard"}
                defaultHoverBg={"transparent"}
              >
                {IsActive && "Home"}
              </IconComponent>

              <IconComponent
                defaultHoverColor={colorsObject.primary}
                className={`space-x-4 text-gray-500`}
                defaultBorderColor={"transparent"}
                defaultBg={"transparent"}
                icon={<AiOutlineUserAdd />}
                href={"/NotFound"}
                defaultHoverBg={"transparent"}
              >
                {IsActive && "New student"}
              </IconComponent>

              <IconComponent
                defaultHoverColor={colorsObject.primary}
                className={`space-x-4 text-gray-500`}
                defaultBorderColor={"transparent"}
                defaultBg={"transparent"}
                icon={<AiOutlineSearch />}
                href={"/NotFound"}
                defaultHoverBg={"transparent"}
              >
                {IsActive && "Advanced search"}
              </IconComponent>

              <IconComponent
                defaultHoverColor={colorsObject.primary}
                className={`space-x-4 text-gray-500`}
                defaultBorderColor={"transparent"}
                defaultBg={"transparent"}
                icon={<AiOutlineTeam />}
                href={"/"}
                defaultHoverBg={"transparent"}
              >
                {IsActive && "Student account"}
              </IconComponent>

              <IconComponent
                defaultHoverColor={colorsObject.primary}
                className={`space-x-4 text-gray-500`}
                defaultBorderColor={"transparent"}
                defaultBg={"transparent"}
                icon={<AiOutlineSolution />}
                href={"/NotFound"}
                defaultHoverBg={"transparent"}
              >
                {IsActive && "Scheduling"}
              </IconComponent>

              <IconComponent
                defaultHoverColor={colorsObject.primary}
                className={`space-x-4 text-gray-500`}
                defaultBorderColor={"transparent"}
                defaultBg={"transparent"}
                icon={<AiOutlineMail />}
                href={"/NotFound"}
                defaultHoverBg={"transparent"}
              >
                {IsActive && "Communication"}
              </IconComponent>

              <IconComponent
                defaultHoverColor={colorsObject.primary}
                className={`space-x-4 text-gray-500`}
                defaultBorderColor={"transparent"}
                defaultBg={"transparent"}
                icon={<AiOutlineReconciliation />}
                href={"/NotFound"}
                defaultHoverBg={"transparent"}
              >
                {IsActive && "Report center"}
              </IconComponent>

              <IconComponent
                defaultHoverColor={colorsObject.primary}
                className={`space-x-4 text-gray-500`}
                defaultBorderColor={"transparent"}
                defaultBg={"transparent"}
                icon={<AiOutlineApartment />}
                href={"/NotFound"}
                defaultHoverBg={"transparent"}
              >
                {IsActive && "Account Managment"}
              </IconComponent>

              <IconComponent
                defaultHoverColor={colorsObject.primary}
                className={`space-x-4 text-gray-500`}
                defaultBorderColor={"transparent"}
                defaultBg={"transparent"}
                icon={<AiOutlineSetting />}
                href={"/NotFound"}
                defaultHoverBg={"transparent"}
              >
                {IsActive && "Configuration"}
              </IconComponent>

              <IconComponent
                defaultHoverColor={colorsObject.primary}
                className={`space-x-4 text-gray-500`}
                defaultBorderColor={"transparent"}
                defaultBg={"transparent"}
                icon={<AiOutlineTool />}
                href={"/NotFound"}
                defaultHoverBg={"transparent"}
              >
                {IsActive && "Help"}
              </IconComponent>

              <IconComponent
                defaultHoverColor={colorsObject.primary}
                className={`space-x-4 text-gray-500`}
                defaultBorderColor={"transparent"}
                defaultBg={"transparent"}
                icon={<AiOutlineEye />}
                href={"/NotFound"}
                defaultHoverBg={"transparent"}
              >
                {IsActive && " Log out"}
              </IconComponent>
            </div>
          </nav>
        </aside>
        <article className={`bg-slate-100 rounded-lg flex-1 py-5`}>
          <Outlet />
        </article>
      </main>
      <footer>Footer</footer>
    </Fragment>
  );
};

export default Layout;
