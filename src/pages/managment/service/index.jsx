import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import Modal from "@/components/modal/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import ModalStyle from "@/components/modal/modal.module.scss";
import {
  DiscountModalContent,
  FeesModalContent,
  MiscellaneousModalContent,
  ProductModalContent,
} from "@/pages/managment/service/modal.jsx";
import { Pagination } from "antd";
import { Fragment, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink, Outlet, useParams } from "react-router-dom";
import ServiceStyle from "../management.module.scss";

export const StatusSelect = [
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
  const { title } = useParams();
  const [CurrentPagination, setCurrentPagination] = useState(1);
  const [IsOpen, setIsOpen] = useState(false);

  // functions
  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };

  const handleCloseModal = () => setIsOpen(false);

  const handleAdd = () => setIsOpen(true);

  const CheckPageForModal = (page = "") => {
    switch (page.toLowerCase()) {
      case "product":
        return <ProductModalContent />;
      case "fees":
        return <FeesModalContent />;
      case "discounts":
        return <DiscountModalContent />;
      case "miscellaneous":
        return <MiscellaneousModalContent />;
      default:
        console.log(`not found content for ${title} page`);
    }
  };

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
                    className={`w-96 pl-12 pr-4 text-sm ${title === "quiz-report" && `inline-flex flex-row-reverse`} `}
                  />

                  <span
                    className={
                      "absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "
                    }
                  >
                    <AiOutlineSearch />
                  </span>
                </label>
                {title !== "quiz-report" && (
                  <Fragment>
                    <ButtonComponent
                      defaultBg={"#24C18F"}
                      defaultHoverBg={"#24C18F"}
                      paddingInline={26}
                      controlHeight={40}
                      onClick={handleAdd}
                    >
                      Add new
                    </ButtonComponent>

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
                  </Fragment>
                )}
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
          <div
            className={`${ModalStyle["Modal__content"]} py-5 bg-white rounded-3xl`}
          >
            {CheckPageForModal(title)}

            <div className={`text-center space-x-4 `}>
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
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default Service;
