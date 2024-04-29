import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import { DropMenuItems } from "@/layout/items/drop-menu.jsx";
import { MenuItems } from "@/layout/menu-items.jsx";
import { Button, ConfigProvider, Dropdown, Menu } from "antd";
import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BiMoon } from "react-icons/bi";
import { FaListUl } from "react-icons/fa6";
import { HiOutlineSun } from "react-icons/hi2";
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

const Layout = () => {
  const [IsActive, setIsActive] = useState(true);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === "/") {
      navigate("/dashboard/");
    }
  }, []);

  const handleSideBar = () => setIsActive((prev) => !prev);

  const { items } = MenuItems(IsActive, getItem);

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
                <Title level={5} fontWeightStrong={400} fontSize={"text-base"}>
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
            className={`${LayoutStyle["Menu"]} overflow-hidden ${!IsActive && "w-14 shadow-md"}`}
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
