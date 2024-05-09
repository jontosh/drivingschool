import ButtonComponent from "@/components/button/index.jsx";
import { CustomCheckBox, CustomInput } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import classNames from "classnames";
import { Formik } from "formik";
import { Fragment, useContext } from "react";

const ClassroomInfoDetails = ({ className, children, ...props }) => {
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
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-5">
                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse items-center w-full h-[50px]"
                    }
                    className={classNames(
                      ManagementStyle["CheckModal__form-element__shadow"],
                      "w-full text-base",
                    )}
                    type={"text"}
                    spanText={"CR date start "}
                    placeholder={"CR date start "}
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
                    spanText={"Type"}
                    placeholder={"Type"}
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
                    spanText={"Status"}
                    placeholder={"Status"}
                    fontSize={"text-base"}
                    spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                    name={"date"}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-5">
                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse items-center w-full h-[50px]"
                    }
                    className={classNames(
                      ManagementStyle["CheckModal__form-element__shadow"],
                      "w-full text-base",
                    )}
                    type={"text"}
                    spanText={"CR date END"}
                    placeholder={"CR date END"}
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
                    spanText={"Instructor"}
                    placeholder={"Instructor"}
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
                    spanText={"Location"}
                    placeholder={"Location"}
                    fontSize={"text-base"}
                    spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                    name={"date"}
                    onChange={handleChange}
                  />
                </div>
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

export default ClassroomInfoDetails;
