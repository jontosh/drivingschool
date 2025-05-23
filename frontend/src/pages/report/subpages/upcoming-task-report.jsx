import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker } from "antd";
import { Fragment, useContext, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

export const UpcomingTaskReport = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [StartDate, setStartDate] = useState(null);
  const [EndDate, setEndDate] = useState(null);
  const [StaffName, setStaffName] = useState("");

  // func
  const handleStartDate = (day) => setStartDate(day["$d"]);
  const handleEndDate = (day) => setEndDate(day["$d"]);
  const handleStaffName = (value) => setStaffName(value);
  const handleSubmit = () => {
    console.log({ StartDate, EndDate, StaffName });
  };

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        Upcoming Task Report
      </Paragraph>

      <form
        className={"bg-white rounded-lg px-10 py-7 space-y-7"}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-2 gap-20">
          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>
              Staff Name
            </span>
            <div className="flex items-center gap-3">
              <CustomSelect
                style={{ width: "100%" }}
                placeholder={"Select Staff Name"}
                className={"h-[50px]"}
                colorBorder="#DEE2E6"
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
                onChange={handleStaffName}
                value={StaffName ? StaffName : undefined}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </label>
        </div>

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
            EXPORT INTO EXCEL
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
              setStaffName("");
              setStartDate(null);
              setEndDate(null);
            }}
          >
            CLEAR
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};
