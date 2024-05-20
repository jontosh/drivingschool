import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import ProfileStyle from "@/pages/student/student-account.module.scss";
import { Switch } from "antd";
import { Formik } from "formik";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";

const StudentPasswordFormik = () => {
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
          <div className="grid grid-cols-3 gap-5 mb-7">
            <div className={"space-y-5"}>
              <CustomInput
                type={"number"}
                placeholder={"Password History Policy"}
                className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                spanText={"StudentPassword History Policy"}
                name={"maxPassword"}
                colorBorder={colorsObject.primary}
                spanClassName={"w-40 flex-shrink-0"}
                fontSize={"text-base"}
                classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse h-[50px]`}
              />

              <label className="inline-flex items-center w-full gap-5">
                <span className={"w-40 text-base flex-shrink-0"}>
                  Max Password Age Policy
                </span>
                <CustomSelect
                  placeholder={"Select"}
                  colorBorder={colorsObject.primary}
                  className={`w-full h-[50px] shadow-lg ${ProfileStyle["Student-profile__div"]}`}
                  options={[
                    {
                      value: "Action",
                      label: "Action",
                    },
                  ]}
                />
              </label>

              <CustomInput
                type={"number"}
                placeholder={"Min Password Length Policy"}
                className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                spanText={"Min Password Length Policy"}
                name={"minPassword"}
                colorBorder={colorsObject.primary}
                spanClassName={"w-40 flex-shrink-0"}
                fontSize={"text-base"}
                classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse h-[50px]`}
              />

              <CustomInput
                type={"number"}
                placeholder={"Reset Password Link Age (Hours) Policy"}
                className={`shadow-lg w-full px-4 p-2.5 ${ProfileStyle["Student-profile__div"]}`}
                spanText={"Min Password Length Policy"}
                name={"resetPassword"}
                colorBorder={colorsObject.primary}
                spanClassName={"w-40 flex-shrink-0"}
                fontSize={"text-base"}
                classNames={`inline-flex flex-shrink-0 justify-end items-center w-full gap-5 flex-row-reverse h-[50px]`}
              />
            </div>

            <div className={"space-y-5"}>
              <label className="inline-flex items-center w-full gap-5">
                <span className={"w-40 text-base flex-shrink-0"}>
                  Uppercase Letters
                </span>
                <Switch defaultChecked />
              </label>
              <label className="inline-flex items-center w-full gap-5">
                <span className={"w-40 text-base flex-shrink-0"}>Numbers</span>
                <Switch />
              </label>
              <label className="inline-flex items-center w-full gap-5">
                <span className={"w-40 text-base flex-shrink-0"}>Symbols</span>
                <Switch />
              </label>
              <label className="inline-flex items-center w-full gap-5">
                <span className={"w-40 text-base flex-shrink-0"}>
                  Enable reCaptcha
                </span>
                <Switch />
              </label>
            </div>

            <div className={"space-y-5"}>
              <label className="inline-flex items-center w-full gap-5">
                <span className={"w-40 text-base flex-shrink-0"}>
                  Lowercase Letters
                </span>
                <Switch defaultChecked />
              </label>
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
              Update
            </ButtonComponent>
          </div>
        </form>
      )}
    </Formik>
  );
};

export const StudentPassword = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Configuration - Student Password</title>
      </Helmet>

      <StudentPasswordFormik />
    </Fragment>
  );
};
