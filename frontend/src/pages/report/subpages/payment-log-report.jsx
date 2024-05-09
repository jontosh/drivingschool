import ButtonComponent from "@/components/button/index.jsx";
import { CustomCheckBox, CustomInput } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import classNames from "classnames";
import { Formik } from "formik";
import { Fragment, useContext } from "react";

const PaymentLogReport = ({ className, children, ...props }) => {
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

                  <CustomCheckBox
                    className={"gap-x-2.5 flex-row-reverse"}
                    customWrapClassName={`border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  >
                    <span>Successful payment only</span>
                  </CustomCheckBox>
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

                  <CustomCheckBox
                    className={"gap-x-2.5 flex-row-reverse"}
                    customWrapClassName={`border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  >
                    <span>Failed Payments only</span>
                  </CustomCheckBox>
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

export default PaymentLogReport;
