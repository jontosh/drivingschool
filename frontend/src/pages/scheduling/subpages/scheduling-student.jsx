import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Formik } from "formik";
import { Fragment, useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const FormSearch = () => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <Fragment>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validate={(values) => {
          const errors = {};
          if (!values.search) {
            errors.search = "Input is empty";
          }

          return errors;
        }}
      >
        {({
          values,
          touched,
          errors,
          handleSubmit,
          handleBlur,
          handleChange,
        }) => {
          return (
            <Fragment>
              <form onSubmit={handleSubmit}>
                <label className={"relative w-full shadow-xl"}>
                  <CustomInput
                    colorBorder={colorsObject.primary}
                    placeholder={"Find student"}
                    className={`w-full pl-12 pr-4 py-2.5 text-sm `}
                    classNames={"w-full"}
                    name={"search"}
                    value={values.search}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span
                    className={
                      "absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "
                    }
                  >
                    <AiOutlineSearch />
                  </span>
                </label>

                {!errors.search && (
                  <div className={`p-5 bg-white `}>
                    <ButtonComponent
                      defaultHoverBg={"transparent"}
                      defaultBg={colorsObject.main}
                      defaultColor={colorsObject.black}
                      defaultHoverColor={colorsObject.black}
                      paddingInline={24}
                      className={"w-full text-start"}
                    >
                      Aminov Makhsud, 2004, BMR RX6 Teacher, Adult
                    </ButtonComponent>
                  </div>
                )}
              </form>

              {(errors.search || touched.search) && (
                <div className={`text-red-600 p-5 bg-white relative z-10 `}>
                  {errors.search}
                </div>
              )}
            </Fragment>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export const SchedulingStudent = () => {
  const { colorsObject } = useContext(ColorsContext);

  return (
    <Fragment>
      <FormSearch />
    </Fragment>
  );
};
