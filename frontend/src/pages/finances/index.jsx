import Title from "@/components/title/index.jsx";
import { Finances } from "@/pages/finances/subpage/finances.jsx";
import { Statistic } from "@/pages/finances/subpage/statistic.jsx";
import ServiceStyle from "@/pages/managment/management.module.scss";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const CheckPage = ({ page }) => {
  const navigate = useNavigate();
  switch (page) {
    case "finances": {
      return <Finances />;
    }
    case "statistic": {
      return <Statistic />;
    }
    default: {
      navigate("/finance");
    }
  }
};

const setActiveNav = ({ isActive }) =>
  isActive
    ? `${ServiceStyle["Tab__link-active"]} text-lg`
    : "hover:text-indigo-500 text-lg text-gray-700";

const Finance = () => {
  const { title } = useParams();
  return (
    <Fragment>
      <Helmet>
        <title>Finances</title>
      </Helmet>

      <section className={`px-3 sm:px-11 space-y-5 max-w-full w-full`}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={20}
        >
          Finances
        </Title>

        <div className={"p-5 bg-white rounded-3xl space-x-6"}>
          <NavLink to={"/admin/finance/finances"} className={setActiveNav}>
            Finances
          </NavLink>

          <NavLink to={"/admin/finance/statistic"} className={setActiveNav}>
            Statistic
          </NavLink>
        </div>

        <CheckPage page={title} />
      </section>
    </Fragment>
  );
};

export default Finance;
