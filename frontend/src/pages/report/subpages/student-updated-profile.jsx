import ButtonComponent from "@/components/button/index.jsx";
import { CustomCheckBox, CustomInput } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { FormError } from "@/modules/errors.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import classNames from "classnames";
import { Formik } from "formik";
import { Fragment, useContext } from "react";

const StudentUpdatedProfile = ({ className, children, ...props }) => {
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
                    spanText={"Student name"}
                    placeholder={"Student name"}
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
                    spanText={"Start date "}
                    placeholder={"Start date "}
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
                    spanText={"End date"}
                    placeholder={"End date"}
                    fontSize={"text-base"}
                    spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                    name={"date"}
                    onChange={handleChange}
                  />

                  <label className="flex cursor-pointer items-center w-full h-[50px]">
                    <span className={`text-base flex-shrink-0 w-44`}>
                      Include updates to non-DL/Permit fields
                    </span>

                    <div className={"w-full"}>
                      <div>
                        <CustomCheckBox
                          classNames={"inline-flex gap-2.5 items-center"}
                          name={"type"}
                          onChange={handleChange}
                          value={"Adult"}
                          customWrapClassName={classNames(
                            ManagementStyle["CheckModal__form-element__shadow"],
                            "border border-indigo-600",
                          )}
                        >
                          <span className={`text-base`}>Adult</span>
                        </CustomCheckBox>
                      </div>
                      {errors.error && (
                        <FormError>Choose student type</FormError>
                      )}
                    </div>
                  </label>
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

export default StudentUpdatedProfile;
