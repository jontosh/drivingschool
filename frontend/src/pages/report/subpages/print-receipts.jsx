import ButtonComponent from "@/components/button/index.jsx";
import { CustomCheckBox, CustomInput } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { FormError } from "@/modules/errors.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import classNames from "classnames";
import { Formik } from "formik";
import { Fragment, useContext } from "react";

const PrintReceipts = ({ className, children, ...props }) => {
  const { colorsObject } = useContext(ColorsContext);

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleSubmit, handleChange, errors }) => {
        return (
          <Fragment>
            <form onSubmit={handleSubmit} className={"space-y-5"}>
              <div className="flex flex-col items-center gap-5">
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse items-center w-full h-[50px]"
                  }
                  className={classNames(
                    ManagementStyle["CheckModal__form-element__shadow"],
                    "w-full text-base",
                  )}
                  type={"text"}
                  spanText={"CR list"}
                  placeholder={"CR list"}
                  fontSize={"text-base"}
                  spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"date"}
                  onChange={handleChange}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse items-center w-full h-[50px]"
                  }
                  className={classNames(
                    ManagementStyle["CheckModal__form-element__shadow"],
                    "w-full text-base",
                  )}
                  type={"text"}
                  spanText={"(OR) Student last name"}
                  placeholder={"(OR) Student last name"}
                  fontSize={"text-base"}
                  spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"date"}
                  onChange={handleChange}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse items-center w-full h-[50px]"
                  }
                  className={classNames(
                    ManagementStyle["CheckModal__form-element__shadow"],
                    "w-full text-base",
                  )}
                  type={"text"}
                  spanText={"Student "}
                  placeholder={"Student"}
                  fontSize={"text-base"}
                  spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"date"}
                  onChange={handleChange}
                />
              </div>

              <div className="text-center">
                <ButtonComponent
                  defaultBg={colorsObject.success}
                  defaultHoverBg={colorsObject.successHover}
                  defaultColor={colorsObject.main}
                  defaultHoverColor={colorsObject.main}
                  controlHeight={40}
                  borderRadius={5}
                  paddingInline={43}
                >
                  Export to Excel
                </ButtonComponent>
              </div>
            </form>
          </Fragment>
        );
      }}
    </Formik>
  );
};

export default PrintReceipts;
