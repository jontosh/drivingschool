import ButtonComponent from "@/components/button/index.jsx";
import { CustomCheckBox, CustomInput } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker } from "antd";
import { Formik } from "formik";
import { Fragment, useContext, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

export const AttendanceSheetReport = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        CR Attendance Sheet Report
      </Paragraph>

      <Formik
        initialValues={{
          class_number: "",
          score: false,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit, handleChange, handleReset, values }) => (
          <form
            onSubmit={handleSubmit}
            className={"bg-white rounded-lg px-10 py-7 space-y-7"}
          >
            <div className={"grid grid-cols-2 gap-20 items-center"}>
              <div className={"flex gap-3"}>
                <CustomInput
                  colorBorder={"#667085"}
                  spanText={"Class Number Search"}
                  spanClassName={"text-gray-800 font-normal"}
                  fontSize="text-base"
                  placeholder={"Class Number Search"}
                  className={"h-[50px]"}
                  classNames={"inline-flex w-full flex-col-reverse gap-1.5 h-[76px]"}
                  name="class_number"
                  value={values.class_number}
                  onChange={handleChange}
                />
                <span className={"pb-2 pt-[41px]"}>
                  <FiHelpCircle
                    className={"text-xl text-[#98A2B3] cursor-pointer"}
                  />
                </span>
              </div>

              <CustomCheckBox
                className={"justify-end text-black text-opacity-45 text-base font-normal"}
                name={"score"}
                onChange={handleChange}
              >
                Show Score
              </CustomCheckBox>
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
                Download
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
