import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import Modal from "@/components/modal/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import ModalStyle from "@/components/modal/modal.module.scss";
import { Pagination } from "antd";
import classNames from "classnames";
import { Fragment, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink, Outlet } from "react-router-dom";
import ServiceStyle from "../management.module.scss";
import EnrollmentStyle from "@/pages/enrollment/enrollment.module.scss";

const StatusSelect = [
  {
    id: 1,
    label: "Active",
    value: "Active",
  },
  {
    id: 2,
    label: "Close",
    value: "Close",
  },
  {
    id: 3,
    label: "Process",
    value: "Process",
  },
];

const Service = () => {
  // use
  const { colorsObject } = useContext(ColorsContext);
  const [CurrentPagination, setCurrentPagination] = useState(1);
  const [IsOpen, setIsOpen] = useState(false);

  // functions
  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };

  const handleCloseModal = () => setIsOpen(false);

  const handleAdd = () => setIsOpen(true);

  // Custom
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
          <div
            className={"space-x-6 px-5 -mx-5 pb-5 border-b-2 border-b-gray-400"}
          >
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
            <div className={"flex justify-between"}>
              <form className={"flex gap-x-5 items-center"}>
                <label className={"relative"}>
                  <CustomInput
                    colorBorder={colorsObject.primary}
                    placeholder={"Search"}
                    className={"w-96 pl-12 pr-4 text-sm"}
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
                  defaultBg={"#24C18F"}
                  defaultHoverBg={"#24C18F"}
                  paddingInline={26}
                  controlHeight={40}
                  onClick={handleAdd}
                >
                  Add new
                </ButtonComponent>

                {/*<ButtonComponent*/}
                {/*  defaultBg={colorsObject.primary}*/}
                {/*  defaultHoverBg={colorsObject.primary}*/}
                {/*  paddingInline={26}*/}
                {/*  controlHeight={40}*/}
                {/*  className={"inline-flex items-center"}*/}
                {/*>*/}
                {/*  <span>Status</span>*/}
                {/*  <IoIosArrowDown />*/}
                {/*</ButtonComponent>*/}

                <CustomSelect
                  value={"Status"}
                  options={StatusSelect}
                  style={{
                    width: 122,
                    height: 40,
                  }}
                  colorBorder={colorsObject.primary}
                  selectorBg={colorsObject.primary}
                  colorText={colorsObject.main}
                />
              </form>

              <div>
                <Pagination
                  total={10}
                  pageSize={1}
                  current={CurrentPagination}
                  onChange={handleChangePagination}
                />
              </div>
            </div>
            <div className={"pt-5"}>
              <div className={"-mx-5"}>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </Fragment>

      {IsOpen && (
        <Modal setIsOpen={setIsOpen}>
          <form
            className={classNames(
              ModalStyle["Modal__content"],
              "p-5 bg-white rounded-3xl grid gap-y-5 justify-center",
            )}
          >
            <CustomInput
              classNames={
                "inline-flex gap-x-3.5 items-center flex-row-reverse gap-5"
              }
              spanText={"Component name"}
              className={"w-60"}
              spanClassName={`max-w-46`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex gap-x-9 items-center flex-row-reverse gap-5"
              }
              spanText={"Item#/Code:"}
              className={"w-60"}
              spanClassName={`max-w-46 relative ${EnrollmentStyle["Enrollment__heavy"]}`}
              colorBorder={colorsObject.primary}
            />

            <label className={`inline-flex gap-x-9 items-center`}>
              <span
                className={`w-40 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Status:
              </span>

              <CustomSelect
                value={"Select status"}
                style={{ maxWidth: 240, width: "100%" }}
                options={StatusSelect}
                colorBorder={colorsObject.primary}
              />
            </label>

            <CustomInput
              classNames={
                "inline-flex gap-x-3.5 items-center flex-row-reverse gap-5"
              }
              spanText={"Public Name:"}
              className={"w-60"}
              spanClassName={`max-w-46 `}
              colorBorder={colorsObject.primary}
            />

            <label className={`inline-flex gap-x-9 items-center gap-5`}>
              <span
                className={`w-full max-w-28 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Type:
              </span>

              <CustomSelect
                value={"Select status"}
                style={{ maxWidth: 240, width: "100%" }}
                options={StatusSelect}
                colorBorder={colorsObject.primary}
              />
            </label>

            <label className={`inline-flex gap-x-9 items-center gap-5`}>
              <span
                className={`w-full max-w-28 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Sub Type:
              </span>

              <CustomSelect
                value={"Select status"}
                style={{ maxWidth: 240, width: "100%" }}
                options={StatusSelect}
                colorBorder={colorsObject.primary}
              />
            </label>

            <div className={`text-center space-x-4`}>
              <ButtonComponent
                defaultBg={"#24C18F"}
                defaultHoverBg={"#24C18F"}
                paddingInline={64}
                controlHeight={40}
                onClick={handleCloseModal}
              >
                Save
              </ButtonComponent>
              <ButtonComponent
                controlHeight={39}
                defaultBg={"#00000040"}
                defaultHoverBg={"#00000040"}
                paddingInline={60}
                onClick={handleCloseModal}
              >
                Close
              </ButtonComponent>
            </div>
          </form>
        </Modal>
      )}
    </Fragment>
  );
};

export default Service;
