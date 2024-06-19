import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Formik } from "formik";
import { Fragment, useContext, useState } from "react";

export const AttendanceSignatures = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [Session, setSession] = useState("");

  // func
  const handleSession = (value) => setSession(value);

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        Attendance Signatures/Scores
      </Paragraph>

      <Formik
        initialValues={{
          cr_list: "",
        }}
        onSubmit={(values) => {
          console.log({ ...values, session: Session });
        }}
      >
        {({ handleSubmit, handleReset, values, handleChange }) => (
          <form
            onSubmit={handleSubmit}
            className={"bg-white rounded-lg px-10 py-7 space-y-7"}
          >
            <div className="space-y-6 max-w-[490px] mx-auto">
              <CustomInput
                colorBorder={"#DEE2E6"}
                spanText={"CR LIST"}
                placeholder={"SELECT CLASS ROOM"}
                className={""}
                classNames={"inline-flex w-full flex-col-reverse gap-1.5 h-[76px]"}
                name="cr_list"
                value={values.cr_list}
                onChange={handleChange}
                spanClassName={"text-gray-500 font-normal"}
                fontSize="text-base"
              />

              <label className={"space-y-1.5 w-full"}>
                <span className={"text-gray-500 w-full text-base font-normal"}>Session#:</span>
                <CustomSelect
                  style={{ width: "100%" }}
                  placeholder={"SELECT SESSION #"}
                  className={"h-[50px]"}
                  colorBorder={"#DEE2E6"}
                  options={[
                    {
                      value: 1,
                      label: 1,
                    },
                    {
                      value: 2,
                      label: 2,
                    },
                  ]}
                  onChange={handleSession}
                  value={Session ? Session : undefined}
                />
              </label>
            </div>

            <div className="text-center space-x-5">
              <ButtonComponent
                paddingInline={43}
                controlHeight={40}
                borderRadius={5}
                defaultHoverBg={colorsObject.successHover}
                defaultBg={colorsObject.success}
                type={"submit"}
              >
                Attendance Signatures/Scores
              </ButtonComponent>
              <ButtonComponent
                paddingInline={43}
                controlHeight={40}
                borderRadius={5}
                defaultHoverBg={colorsObject.secondary}
                defaultBg={colorsObject.secondary}
                defaultColor={colorsObject.main}
                defaultHoverColor={colorsObject.main}
                onClick={() => {
                  handleReset();
                }}
              >
                CLEAR
              </ButtonComponent>
            </div>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};
