import ButtonComponent from "@/components/button/index.jsx";
import { CustomCheckBox, CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker } from "antd";
import { Fragment, useContext, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

export const InstructorHoursReport = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [BTWStatus, setBTWStatus] = useState("");
  const [Instructor, setInstructor] = useState("");
  const [ObservationHours, setObservationHours] = useState(false);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");

  // func
  const handleStartDate = (day) => setStartDate(day["$d"]);
  const handleEndDate = (day) => setEndDate(day["$d"]);
  const handleInstructor = (value) => setInstructor(value);
  const handleBTWStatus = (value) => setBTWStatus(value);
  const handleObservationHours = (e) => setObservationHours(e.target.checked);

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        Instructor Hours Report
      </Paragraph>

      <form
        className="bg-white rounded-lg px-10 py-7 space-y-7 gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-2 gap-x-7 gap-y-5">
          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>BTW Status</span>
            <CustomSelect
              style={{ width: "100%" }}
              placeholder={"SELECT BTW STATUS"}
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
              onChange={handleBTWStatus}
              value={BTWStatus ? BTWStatus : undefined}
            />
          </label>

          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>Instructor</span>
            <CustomSelect
              style={{ width: "100%" }}
              placeholder={"SELECT INSTRUCTOR"}
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
              onChange={handleInstructor}
              value={Instructor ? Instructor : undefined}
            />
          </label>
        </div>

        <CustomCheckBox
          className={"justify-end text-lg text-gray-500"}
          onChange={handleObservationHours}
        >
          Include Observation Hours
        </CustomCheckBox>

        <div className={"grid grid-cols-2 gap-x-7 gap-y-5"}>
          <label className={"space-y-1.5"}>
            <span className={"text-base font-normal w-full text-gray-500"}>Start Date</span>
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
            <span className={"text-base font-normal w-full text-gray-500"}>End Date</span>

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
            onClick={() => {
              console.log(
                BTWStatus,
                Instructor,
                ObservationHours,
                StartDate,
                EndDate,
              );
            }}
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
              setStartDate("");
              setEndDate("");
              setBTWStatus("");
              setInstructor("");
              setObservationHours(false);
            }}
          >
            CLEAR
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};
