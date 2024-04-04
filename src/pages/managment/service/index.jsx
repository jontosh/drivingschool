import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import { NavLink, Outlet } from "react-router-dom";
import ServiceStyle from "../management.module.scss";

const Service = () => {
  const { colorsObject } = useContext(ColorsContext);
  const setActiveNav = ({ isActive }) =>
    isActive
      ? `${ServiceStyle["Tab__link-active"]} text-lg`
      : "hover:text-indigo-500 text-lg text-gray-700";
  return (
    <Fragment>
      <Helmet>
        <title>Service management</title>
      </Helmet>
      <Fragment>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={20}
        >
          Service management
        </Title>

        <Title
          level={3}
          fontSize={"text-black text-3xl"}
          fontWeightStrong={600}
          titleMarginBottom={10}
        >
          Service
        </Title>

        <div className={"p-5 bg-white rounded-3xl"}>
          <div className={"space-x-6 pb-5"}>
            <NavLink
              to={"/management/service/product"}
              className={setActiveNav}
            >
              Components (Product)
            </NavLink>

            <NavLink to={"/management/service/fees"} className={setActiveNav}>
              Fees
            </NavLink>

            <NavLink
              to={"/management/service/discounts"}
              className={setActiveNav}
            >
              Discounts
            </NavLink>

            <NavLink
              to={"/management/service/miscellaneous"}
              className={setActiveNav}
            >
              Miscellaneous
            </NavLink>

            <NavLink
              to={"/management/service/quiz-exam"}
              className={setActiveNav}
            >
              Quiz Exam
            </NavLink>

            <NavLink
              to={"/management/service/quiz-report"}
              className={setActiveNav}
            >
              Quiz Report
            </NavLink>

            <NavLink
              to={"/management/service/packages"}
              className={setActiveNav}
            >
              Services (Packages)
            </NavLink>
          </div>
          <div className={"pt-4 pb-7"}>
            <Outlet />
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
};

export default Service;
