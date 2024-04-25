import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomInput,
  CustomSelect,
  CustomTransfer,
} from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import ProfileStyle from "@/pages/student/student-account.module.scss";
import { Switch } from "antd";
import { Formik } from "formik";
import { Fragment, useContext } from "react";

const ZipCodeFormik = () => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <Formik
      initialValues={{ account: "", status: "", email: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.account) {
          errors.account = "Required";
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = "Invalid email address";
        }

        return errors;
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl">
          <div className={"space-y-5"}>
            <div className={"relative"}>
              <CustomInput
                placeholder={"Add new zip code"}
                className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                spanText={"Add new zip code"}
                colorBorder={colorsObject.primary}
                spanClassName={"w-40 flex-shrink-0"}
                fontSize={"text-base"}
                classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse relative`}
              >
                <ButtonComponent
                  defaultBg={"#24C18F"}
                  defaultHoverBg={"#24C18F"}
                  defaultColor={colorsObject.main}
                  defaultHoverColor={colorsObject.main}
                  borderRadius={5}
                  paddingInline={18}
                  controlHeight={"auto"}
                  className={"font-medium absolute top-0 right-0 bottom-0"}
                  type={"submit"}
                >
                  ADD
                </ButtonComponent>
              </CustomInput>
            </div>

            <div className="flex items-center gap-5">
              <span className={"w-40 text-base flex-shrink-0"}>
                Associated staff
              </span>
              <div className="grid flex-grow grid-cols-2 items-center gap-5">
                <CustomInput
                  placeholder={"Zip code"}
                  className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                  colorBorder={colorsObject.primary}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
                />

                <CustomInput
                  placeholder={"Company Zip Code"}
                  className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                  colorBorder={colorsObject.primary}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
                />
              </div>
            </div>

            <div className={"flex justify-center"}>
              <CustomTransfer colorBorder={colorsObject.primary} />
            </div>
          </div>

          <div className="text-center pt-5">
            <ButtonComponent
              defaultBg={"#24C18F"}
              defaultHoverBg={"#24C18F"}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              borderRadius={5}
              paddingInline={62}
              controlHeight={40}
              fontSize={16}
              className={"font-medium"}
              type={"submit"}
            >
              Save
            </ButtonComponent>
          </div>
        </form>
      )}
    </Formik>
  );
};

export const ZipCode = () => {
  return (
    <Fragment>
      <title>Configuration - ZIP CODE</title>
      <div className={`bg-white rounded-2xl p-5`}>
        <ZipCodeFormik />
      </div>
    </Fragment>
  );
};
