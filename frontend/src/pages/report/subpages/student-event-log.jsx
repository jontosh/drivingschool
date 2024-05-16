import ButtonComponent from "@/components/button/index.jsx";
import { CustomCheckBox, CustomInput } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker } from "antd";
import { Formik } from "formik";
import { Fragment, useContext, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

export const StudentEventLog = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");

  // func
  const handleStartDate = (day) => setStartDate(day["$d"]);
  const handleEndDate = (day) => setEndDate(day["$d"]);

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        Student Event Log is a report designed to display data based on the
        students or parents activity inside the student center. Admin staff can
        search for activity data for a specific student account within a certain
        date range, or for all activity within a certain date range or a
        specific date. Information provided will include details about the
        date/time and type of activity, as well as the browser used and the
        users device IP information.
      </Paragraph>

      <Formik
        initialValues={{
          student_name: "",
          show_cancellation: false,
        }}
        onSubmit={(values) => {
          console.log({ ...values, StartDate, EndDate });
        }}
      >
        {({ handleSubmit, handleChange, handleReset, values }) => (
          <form
            onSubmit={handleSubmit}
            className={"bg-white rounded-lg px-10 py-7 space-y-7"}
          >
            <div className="grid grid-cols-2 gap-x-20 gap-y-5">
              <div className={"flex gap-3"}>
                <CustomInput
                  colorBorder={"#DEE2E6"}
                  spanText={"Class Number Search"}
                  spanClassName={"font-normal text-gray-500"}
                  fontSize="text-base"
                  placeholder={"Class Number Search"}
                  className={"h-[50px]"}
                  classNames={
                    "inline-flex w-full flex-col-reverse gap-1.5 h-[76px]"
                  }
                  name="student_name"
                  value={values.student_name}
                  onChange={handleChange}
                />
                <span className={"pb-2 pt-[41px]"}>
                  <FiHelpCircle
                    className={"text-xl text-[#98A2B3] cursor-pointer"}
                  />
                </span>
              </div>

              <CustomCheckBox
                className={"justify-end text-gray-500 text-base font-normal"}
                name={"show_cancellation"}
                onChange={handleChange}
              >
                Show late cancellation only
              </CustomCheckBox>

              <label className={"space-y-1.5"}>
                <span className={"text-base font-normal text-gray-500 w-full"}>
                  Start Date
                </span>

                <div className="flex items-center gap-3">
                  <DatePicker
                    className="w-full border border-[#DEE2E6] h-[50px]"
                    placeholder={"DD/MM/YYYY"}
                    onChange={handleStartDate}
                  />

                  <span>
                    <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                  </span>
                </div>
              </label>

              <label className={"space-y-1.5"}>
                <span className={"text-base font-normal text-gray-500 w-full"}>
                  End Date
                </span>

                <div className="flex items-center gap-3">
                  <DatePicker
                    className="w-full border border-[#DEE2E6] h-[50px]"
                    placeholder={"DD/MM/YYYY"}
                    onChange={handleEndDate}
                  />

                  <span>
                    <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                  </span>
                </div>
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
                EXPORT INTO EXCEL
              </ButtonComponent>
              <ButtonComponent
                type={"reset"}
                paddingInline={43}
                controlHeight={40}
                borderRadius={5}
                defaultHoverBg={colorsObject.secondary}
                defaultBg={colorsObject.secondary}
                defaultColor={colorsObject.main}
                defaultHoverColor={colorsObject.main}
                onClick={() => {
                  handleReset();
                  setStartDate("");
                  setEndDate("");
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
