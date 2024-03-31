import ButtonComponent from "@/components/button/index.jsx";
import { CustomCheckBox, CustomInput } from "@/components/form/index.jsx";
import Image from "@/components/image/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Formik } from "formik";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import RegisterStyle from "./register.module.scss";
import LoginImage from "../../assets/others/login-bg.jpeg";

const SignInForm = () => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <Fragment>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Login is empty";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          } else if (
            !values.password ||
            values.password === "" ||
            values.password.length < 8
          ) {
            errors.password = "Invalid password";
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
          handleSubmit,
          handleBlur,
          handleChange,
        }) => {
          return (
            <form onSubmit={handleSubmit} className={"space-y-2.5"}>
              <div>
                <CustomInput
                  spanText={`Login `}
                  onChange={handleChange}
                  value={values.email}
                  name={"email"}
                  type={"email"}
                  className={`${RegisterStyle["Sign__input"]} text-black border-indigo-700`}
                  classNames={" inline-flex flex-col-reverse"}
                  status={errors.email || touched.email ? "error" : ""}
                  spanClassName={` mb-2.5 ${errors.email || touched.email ? "text-red-600" : "text-black"}`}
                />
              </div>

              <div className={"flex gap-x-2.5 items-end"}>
                <CustomInput
                  spanText={`Password `}
                  onChange={handleChange}
                  value={values.password}
                  name={"password"}
                  type={"password"}
                  className={`${RegisterStyle["Sign__input"]} border-indigo-700`}
                  classNames={" inline-flex flex-col-reverse"}
                  status={errors.password || touched.password ? "error" : ""}
                  spanClassName={` mb-2.5 ${errors.password || touched.password ? "text-red-600" : "text-black"}`}
                >
                  {errors.password && (
                    <span className={"text-red-600"}>{errors.password}</span>
                  )}
                </CustomInput>
              </div>

              <CustomCheckBox checked={true}>
                <span className={"text-base"}>Remember me</span>
              </CustomCheckBox>

              <div>
                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.info}
                  paddingInline={157}
                  controlHeight={37}
                >
                  Log in
                </ButtonComponent>
              </div>

              <Paragraph fontSize={"text-xs text-gray-500"}>
                Forgot your password ?
              </Paragraph>
            </form>
          );
        }}
      </Formik>
    </Fragment>
  );
};
const SignIn = () => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <Fragment>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <section className={`${RegisterStyle["Sign"]} min-h-screen flex`}>
        <div
          className={`${RegisterStyle["Sign__imageholder"]} overflow-hidden min-h-screen relative`}
        >
          <Image src={LoginImage} srcSet={LoginImage} alt={"Login image"} />
        </div>

        <div
          className={`${RegisterStyle["Sign__content"]} overflow-hidden flex flex-col justify-center px-16 flex-grow relative`}
        >
          <div>
            <Title
              fontWeightStrong={600}
              level={1}
              fontSize={`text-5xl text-indigo-600`}
            >
              Welcome to driving school
            </Title>
            <Title
              titleMarginBottom={26}
              level={2}
              fontWeightStrong={500}
              fontSize={"text-4xl"}
            >
              Software.com
            </Title>

            <SignInForm />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default SignIn;
