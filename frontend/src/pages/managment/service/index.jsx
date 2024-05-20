import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import Modal from "@/components/modal/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import ModalStyle from "@/components/modal/modal.module.scss";
import { Subpages } from "@/modules/subpages.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import {
  DiscountModalContent,
  FeesModalContent,
  MiscellaneousModalContent,
  ProductModalContent,
} from "@/pages/managment/service/modal.jsx";
import { setActiveNav } from "@/modules/active-nav.jsx";
import { Pagination } from "antd";
import { Fragment, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink, useParams } from "react-router-dom";
import ServiceStyle from "../management.module.scss";

export const StatusSelect = [
  {
    id: 1,
    label: "ACTIVE",
    value: "ACTIVE",
  },
  {
    id: 2,
    label: "DELETED",
    value: "DELETED",
  },
  {
    id: 3,
    label: "INACTIVE",
    value: "INACTIVE",
  },
  {
    id: 4,
    label: "PENDING",
    value: "PENDING",
  },
];

const Service = ({ subpage }) => {
  const { colorsObject } = useContext(ColorsContext);

  const [CurrentPagination, setCurrentPagination] = useState(1);

  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };

  return (
    <Fragment>
      <Helmet>
        <title>Service management</title>
      </Helmet>
      <section>
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

        <div className={"px-5 bg-white rounded-3xl"}>
          <div className={"space-x-6 px-5 -mx-5  border-b border-b-gray-400"}>
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
          <div className={"pt-4 pb-7"} hidden={!subpage}>
            <div className={"flex justify-between"}>
              <form className={"flex gap-x-5 items-center"}>
                <label
                  className={`relative h-[50px] rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                >
                  <CustomInput
                    colorBorder={colorsObject.primary}
                    placeholder={"Search"}
                    classNames={"h-[50px]"}
                    className={`w-96 pl-12 pr-4 text-sm ${subpage === "quiz-report" && `inline-flex flex-row-reverse`} `}
                  />

                  <span
                    className={
                      "absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "
                    }
                  >
                    <AiOutlineSearch />
                  </span>
                </label>
                {subpage !== "quiz-report" && (
                  <Fragment>
                    <ButtonComponent
                      defaultBg={colorsObject.success}
                      defaultHoverBg={colorsObject.successHover}
                      defaultBorderColor={colorsObject.success}
                      defaultHoverBorderColor={colorsObject.successHover}
                      paddingInline={26}
                      borderRadius={5}
                      className={"inline-flex items-center"}
                      href={`/modals/management-service/${subpage}`}
                    >
                      Add new
                    </ButtonComponent>

                    <CustomSelect
                      value={"Status"}
                      options={StatusSelect}
                      className={`w-[122px] h-[40px] ${ServiceStyle["Service__select"]}`}
                      colorBorder={"#1890FF"}
                      selectorBg={"#1890FF"}
                    />
                  </Fragment>
                )}
              </form>

              <div>
                {subpage !== "quiz-report" && (
                  <Pagination
                    total={10}
                    pageSize={1}
                    current={CurrentPagination}
                    onChange={handleChangePagination}
                  />
                )}
              </div>
            </div>
            <div className={"pt-5 -mx-5"}>
              <Subpages page={subpage} />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Service;
