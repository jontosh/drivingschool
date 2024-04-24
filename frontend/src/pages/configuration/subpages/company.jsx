import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomInput,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import ServiceStyle from "@/pages/managment/management.module.scss";
import ProfileStyle from "@/pages/student/student-account.module.scss";
import { Formik } from "formik";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

const setActiveNav = ({ isActive }) =>
  isActive
    ? `${ServiceStyle["Tab__link-active"]} text-lg py-5`
    : "hover:text-indigo-500 text-lg text-gray-700 py-5";

export const CompanyFormik = () => {
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
          <div className="grid grid-cols-2 gap-5 mb-7">
            <div className={"space-y-5"}>
              <CustomInput
                placeholder={"Company name"}
                className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                spanText={"Company name"}
                name={"account"}
                value={values.account}
                onChange={handleChange}
                colorBorder={colorsObject.primary}
                spanClassName={"w-40 flex-shrink-0"}
                fontSize={"text-base"}
                classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
              />

              <CustomInput
                placeholder={"License Number"}
                className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                spanText={"License Number"}
                colorBorder={colorsObject.primary}
                spanClassName={"w-40 flex-shrink-0"}
                fontSize={"text-base"}
                classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
              />

              <CustomInput
                placeholder={"Owner Name"}
                className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                spanText={"Owner Name"}
                colorBorder={colorsObject.primary}
                spanClassName={"w-40 flex-shrink-0"}
                fontSize={"text-base"}
                classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
              />

              <CustomInput
                placeholder={"Address"}
                className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                spanText={"Address"}
                colorBorder={colorsObject.primary}
                spanClassName={"w-40 flex-shrink-0"}
                fontSize={"text-base"}
                classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
              />

              <CustomInput
                placeholder={"Mason"}
                className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                spanText={"Mason"}
                colorBorder={colorsObject.primary}
                spanClassName={"w-40 flex-shrink-0"}
                fontSize={"text-base"}
                classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
              />

              <div className="flex items-center gap-5">
                <span className={"w-40 text-base flex-shrink-0"}>
                  Associated staff
                </span>
                <div className="grid flex-grow grid-cols-2 items-center gap-5">
                  <CustomSelect
                    style={{ width: "100%", height: 40 }}
                    placeholder={"Select"}
                    colorBorder={colorsObject.primary}
                    className={`shadow-lg ${ProfileStyle["Student-profile__div"]}`}
                    options={[
                      {
                        value: "OH",
                        label: "OH",
                      },
                    ]}
                  />

                  <CustomInput
                    placeholder={"Zip Number"}
                    className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                    colorBorder={colorsObject.primary}
                    classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
                  />
                </div>
              </div>
            </div>
            <div className={"space-y-5"}>
              <CustomInput
                type={"email"}
                placeholder={"Email"}
                className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                spanText={"Email"}
                colorBorder={colorsObject.primary}
                spanClassName={"w-40 flex-shrink-0"}
                fontSize={"text-base"}
                classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
              />

              <CustomInput
                placeholder={"Phone"}
                className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                spanText={"Phone"}
                colorBorder={colorsObject.primary}
                spanClassName={"w-40 flex-shrink-0"}
                fontSize={"text-base"}
                classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
              />

              <CustomInput
                placeholder={"Fax"}
                className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                spanText={"Fax"}
                colorBorder={colorsObject.primary}
                spanClassName={"w-40 flex-shrink-0"}
                fontSize={"text-base"}
                classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
              />

              <CustomInput
                placeholder={"Other"}
                className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                spanText={"Other"}
                colorBorder={colorsObject.primary}
                spanClassName={"w-40 flex-shrink-0"}
                fontSize={"text-base"}
                classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
              />

              <CustomInput
                placeholder={"Web Site"}
                className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                spanText={"Web Site"}
                colorBorder={colorsObject.primary}
                spanClassName={"w-40 flex-shrink-0"}
                fontSize={"text-base"}
                classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
              />

              <CustomInput
                placeholder={"Notes"}
                className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                spanText={"Notes"}
                colorBorder={colorsObject.primary}
                spanClassName={"w-40 flex-shrink-0"}
                fontSize={"text-base"}
                classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse`}
              />
            </div>
          </div>

          <div className="text-center">
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

export const Company = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Configuration - Company info</title>
      </Helmet>
      <CompanyFormik />
    </Fragment>
  );
};
