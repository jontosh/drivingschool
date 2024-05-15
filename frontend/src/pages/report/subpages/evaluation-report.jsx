import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker } from "antd";
import { Fragment, useContext, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

export const EvaluationReport = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [StudentName, setStudentName] = useState("");
  const [Location, setLocation] = useState("");

  // func
  const handleStartDate = (day) => setStartDate(day["$d"]);
  const handleEndDate = (day) => setEndDate(day["$d"]);
  const handleStudentName = (e) => setStudentName(e.target.value);
  const handleLocation = (value) => setLocation(value);
  const handleSubmit = () => {
    console.log({ StartDate, EndDate, StudentName, Location });
  };

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        Evaluation Report Sorted with Date
      </Paragraph>

      <form
        onSubmit={(e) => e.preventDefault()}
        className={"bg-white rounded-lg px-10 py-7 space-y-7"}
      >
        <div className=" grid grid-cols-2 gap-x-7 gap-y-5">
          <label className={"space-y-1.5"}>
            <span className={"text-base font-normal w-full"}>Start Date</span>
            <div className="flex items-center gap-3">
              <DatePicker
                className="w-full border border-[#667085] h-[50px]"
                placeholder={"DD/MM/YYYY"}
                onChange={handleStartDate}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </label>

          <label className={"space-y-1.5"}>
            <span className={"text-base font-normal w-full"}>End Date</span>

            <div className="flex items-center gap-3">
              <DatePicker
                className="w-full border border-[#667085] h-[50px]"
                placeholder={"DD/MM/YYYY"}
                onChange={handleEndDate}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </label>

          <div className={"flex gap-3"}>
            <CustomInput
              colorBorder={"#667085"}
              spanText={"Student Name"}
              placeholder={"Enter at least two characters."}
              className={"h-[50px]"}
              classNames={
                "inline-flex w-full flex-col-reverse gap-1.5 h-[76px]"
              }
              name="class_number"
              value={StudentName}
              onChange={handleStudentName}
            />
            <span className={"pb-2 pt-[41px]"}>
              <FiHelpCircle
                className={"text-xl text-[#98A2B3] cursor-pointer"}
              />
            </span>
          </div>

          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full"}>Eval/Lesson #</span>
            <CustomSelect
              style={{ width: "100%" }}
              placeholder={"Select Lesson #"}
              className={"h-[50px]"}
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
              onChange={handleLocation}
              value={Location ? Location : undefined}
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
            onClick={handleSubmit}
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
              setEndDate("");
              setStartDate("");
              setLocation("");
              setStudentName("");
            }}
          >
            CLEAR
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};
