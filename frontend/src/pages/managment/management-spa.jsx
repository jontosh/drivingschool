import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import Modal from "@/components/modal/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import ModalStyle from "@/components/modal/modal.module.scss";
import ManagementSpaIndex from "@/pages/managment/management-spa/index.jsx";
import { ModalContent } from "@/pages/managment/management-spa/modal/index.jsx";
import ServiceStyle from "@/pages/managment/management.module.scss";
import { StatusSelect } from "@/pages/managment/service/index.jsx";
import { setActiveNav } from "@/modules/active-nav.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import { Pagination } from "antd";
import { Fragment, useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink, Outlet, useParams } from "react-router-dom";

const ManagementSpa = ({ page }) => {
  const { subpage } = page;
  const { colorsObject } = useContext(ColorsContext);
  const [CurrentPagination, setCurrentPagination] = useState(1);
  const [IsOpen, setIsOpen] = useState(false);

  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };

  const handleModal = () => setIsOpen((prev) => !prev);

  return (
    <Fragment>
      <section>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={20}
        >
          Account management
        </Title>

        <Title
          level={3}
          fontSize={"text-black text-3xl"}
          fontWeightStrong={600}
          titleMarginBottom={20}
          className={"capitalize"}
        >
          {subpage}
        </Title>

        <div className="bg-white px-5 rounded-2xl">
          <div className="-mx-5">
            <div className="space-x-7 px-5 border-b border-b-gray-400">
              <NavLink
                to={"/management/single-page/location"}
                className={setActiveNav}
              >
                Location
              </NavLink>
              <NavLink
                to={"/management/single-page/high school"}
                className={setActiveNav}
              >
                High school
              </NavLink>
              <NavLink
                to={"/management/single-page/how did you hear"}
                className={setActiveNav}
              >
                How did you hear
              </NavLink>
              <NavLink
                to={"/management/single-page/vehicles"}
                className={setActiveNav}
              >
                Vehicles
              </NavLink>
            </div>
          </div>

          <div className={"pt-5 pb-7"}>
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
                <ButtonComponent
                  defaultBg={colorsObject.success}
                  defaultHoverBg={colorsObject.successHover}
                  paddingInline={26}
                  controlHeight={50}
                  borderRadius={5}
                  className={"inline-flex items-center"}
                  href={`/modals/management/${subpage}`}
                >
                  Add new
                </ButtonComponent>

                <CustomSelect
                  value={"Status"}
                  options={StatusSelect}
                  style={{
                    width: 122,
                  }}
                  className={`h-[50px] ${ServiceStyle["Service__select"]}`}
                  colorBorder={colorsObject.info}
                  selectorBg={colorsObject.info}
                />
              </form>

              <Pagination
                total={10}
                pageSize={1}
                current={CurrentPagination}
                onChange={handleChangePagination}
              />
            </div>

            <div className="pt-5 -mx-5">
              <ManagementSpaIndex />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default ManagementSpa;
