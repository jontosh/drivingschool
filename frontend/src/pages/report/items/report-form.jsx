import { CustomInput } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { FormError } from "@/modules/errors.jsx";
import classNames from "classnames";
import { Formik } from "formik";
import { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ReportFormStyle from "./../report.module.scss";

const ReportForm = ({ className, children, ...props }) => {
  const { colorsObject } = useContext(ColorsContext);

  return (
    <Formik
      initialValues={{ search: "" }}
      validate={(values) => {
        let errors = {};
        if (!values.search) {
          errors.search = "Input is empty";
        }

        return errors;
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleChange, values, handleSubmit, errors }) => (
        <form
          className={classNames(className, "relative mb-5 w-80")}
          {...props}
          onSubmit={handleSubmit}
        >
          <label className={"relative w-full shadow-xl"}>
            <CustomInput
              colorBorder={colorsObject.primary}
              placeholder={"Find student"}
              className={`w-full pl-12 pr-4 py-2.5 text-sm `}
              classNames={"w-full"}
              name={"search"}
              value={values.search}
              onChange={handleChange}
            />
            <span
              className={"absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "}
            >
              <AiOutlineSearch />
            </span>
          </label>

          {errors.search && (
            <FormError
              className={`w-full py-2.5 px-1 relative ${ReportFormStyle["Form__error"]}`}
            >
              {errors.search}
            </FormError>
          )}
        </form>
      )}
    </Formik>
  );
};

export default ReportForm;
