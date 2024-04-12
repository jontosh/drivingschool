import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import ServiceStyle from "@/pages/managment/management.module.scss";
import { StatusSelect } from "@/pages/managment/service/index.jsx";
import { Pagination } from "antd";
import classNames from "classnames";
import { Fragment, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import {
  AiOutlineInfoCircle,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoCarOutline } from "react-icons/io5";
import { PiBookBookmarkFill, PiMoney } from "react-icons/pi";
import { NavLink, Outlet, useParams } from "react-router-dom";
import StudentAccountStyle from "./student-account.module.scss";

const StudentAccount = ({}) => {
  const { colorsObject } = useContext(ColorsContext);
  const { title } = useParams();
  const setActiveNav = ({ isActive }) =>
    isActive
      ? `${ServiceStyle["Tab__link-active"]} text-lg`
      : "hover:text-indigo-500 text-lg text-gray-700";

  return (
    <Fragment>
      <Helmet>
        <title>Student Account</title>
      </Helmet>
      <section className={classNames(StudentAccountStyle["Student"], "px-11")}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={20}
        >
          Student Account
        </Title>

        {!title && (
          <Title
            level={3}
            fontSize={"text-indigo-600 text-2xl"}
            fontWeightStrong={500}
            titleMarginBottom={20}
          >
            Quick search
          </Title>
        )}

        <div className="mb-5  flex gap-5 items-center flex-wrap">
          <form>
            <label className={"relative shadow-xl"}>
              <CustomInput
                colorBorder={colorsObject.primary}
                placeholder={"Find student"}
                className={`w-96 pl-12 pr-4 py-2.5 text-sm inline-flex flex-row-reverse`}
              />
              <span
                className={"absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "}
              >
                <AiOutlineSearch />
              </span>
            </label>
          </form>

          <div className={" gap-x-5 flex items-center"}>
            <div className={`${StudentAccountStyle["Student__info"]}`}>
              <Title
                level={4}
                fontWeightStrong={600}
                fontSize={"text-xl text-indigo-600"}
                titleMarginBottom={7}
              >
                Aminov Taminov
              </Title>
              <Paragraph fontSize={"text-xl text-black"} fontWeightStrong={400}>
                Balance <span className={"text-green-500"}>$699</span>
              </Paragraph>
            </div>
            <IconComponent
              icon={<AiOutlineInfoCircle />}
              className={"text-3xl text-indigo-600"}
            />
            <IconComponent
              icon={<AiOutlineShoppingCart />}
              className={"text-3xl text-indigo-600"}
            />
            <IconComponent
              icon={<PiMoney />}
              className={"text-3xl text-indigo-600"}
            />

            <IconComponent
              icon={<PiBookBookmarkFill />}
              className={"text-3xl text-indigo-600"}
            />
            <IconComponent
              icon={<IoCarOutline />}
              className={"text-3xl text-indigo-600"}
            />
            <CustomSelect
              placeholder={"Select"}
              options={[{ value: 1, label: 1 }]}
              colorBorder={colorsObject.primary}
              style={{ width: 120, height: 40 }}
            />
            <CustomSelect
              placeholder={"Apply Payment"}
              options={[{ value: "Payme", label: "Payme" }]}
              colorBorder={colorsObject.primary}
              style={{ width: 145, height: 40 }}
            />
          </div>
        </div>

        <div className={"p-5 bg-white rounded-3xl"}>
          <div
            className={"space-x-6 px-5 -mx-5 pb-5 border-b border-b-gray-400"}
          >
            <NavLink to={"/student/account/profile/"} className={setActiveNav}>
              Profile
            </NavLink>

            <NavLink to={"/student/account/billing"} className={setActiveNav}>
              Enrollment/Billing
            </NavLink>

            <NavLink
              to={"/student/account/appointments"}
              className={setActiveNav}
            >
              Appointments
            </NavLink>

            <NavLink to={"/student/account/files"} className={setActiveNav}>
              Files
            </NavLink>

            <NavLink to={"/student/account/messages"} className={setActiveNav}>
              Messages
            </NavLink>

            <NavLink to={"/student/account/tests"} className={setActiveNav}>
              Quiz/Tests
            </NavLink>

            <NavLink to={"/student/account/log"} className={setActiveNav}>
              Activity Log
            </NavLink>
          </div>

          <div className="pt-6">
            <Outlet />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default StudentAccount;
