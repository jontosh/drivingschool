import ButtonComponent from "@/components/button/index.jsx";
import { CustomRadio } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker } from "antd";
import { Formik } from "formik";
import { Fragment, useContext, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

export const PaymentLogReport = ({ ...props }) => {
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
        This report allows you to export all Payment Details.
      </Paragraph>
      <Formik
        initialValues={{
          payment: "",
        }}
        onSubmit={(values) => {
          console.log({ ...values, StartDate, EndDate });
        }}
      >
        {({ handleSubmit, handleChange, handleReset }) => (
          <form
            onSubmit={handleSubmit}
            className={"bg-white rounded-lg px-10 py-7 space-y-7"}
          >
            <div className={"grid grid-cols-2 gap-20"}>
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

            <CustomRadio
              classNames={"text-gray-500 w-full text-base font-normal"}
              name={"payment"}
              onChange={handleChange}
              value={"Successful Payments Only"}
            >
              Successful Payments Only
            </CustomRadio>

            <CustomRadio
              classNames={"text-gray-500 w-full text-base font-normal"}
              name={"payment"}
              onChange={handleChange}
              value={"Failed Payments Only"}
            >
              Failed Payments Only
            </CustomRadio>

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
                  setStartDate(null);
                  setEndDate(null);
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
