import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { ConfigProvider, DatePicker, Tabs } from "antd";
import { Fragment, useContext, useState } from "react";

export const ClassroomAbsences = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Start, setStart] = useState("");

  // func
  const handleStartDate = (day) => setStartDate(day["$d"]);
  const handleEndDate = (day) => setEndDate(day["$d"]);
  const handleStart = (value) => setStart(value);
  const handleExport = () => {
    console.log({ StartDate, EndDate });
  };
  const handleSave = () => {
    console.log({ StartDate });
  };

  const items = [
    {
      key: "1",
      label: "Classroom Absences".toLocaleUpperCase(),
      children: (
        <Fragment>
          <form className={"space-y-5"} onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-7">
              <label className={"space-y-1.5"}>
                <span className={"text-base font-normal w-full text-gray-500"}>
                  Start Date
                </span>
                <div className="flex items-center gap-3">
                  <DatePicker
                    className="w-full border border-[#DEE2E6] h-[50px]"
                    placeholder={"DD/MM/YYYY"}
                    onChange={handleStartDate}
                  />
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
                </div>
              </label>
            </div>

            <div className="space-x-5 text-center">
              <ButtonComponent
                defaultHoverBg={colorsObject.successHover}
                defaultBg={colorsObject.success}
                controlHeight={40}
                paddingInline={43}
                borderRadius={5}
                type={"submit"}
                onClick={handleExport}
              >
                FILTER STUDENT
              </ButtonComponent>

              <ButtonComponent
                defaultHoverBg={colorsObject.secondaryHover}
                defaultBg={colorsObject.secondary}
                controlHeight={40}
                paddingInline={43}
                borderRadius={5}
              >
                CLEAR
              </ButtonComponent>
            </div>
          </form>
        </Fragment>
      ),
    },
    {
      key: "2",
      label: "SETTINGS".toLocaleUpperCase(),
      children: (
        <Fragment>
          <form className={"space-y-5"} onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-7 items-center">
              <Paragraph className={"text-gray-500 text-base font-normal"}>Classroom Absences Report Columns:</Paragraph>
              <label className={"space-y-1.5 w-full"}>
                <span className={"text-gray-500 text-base font-normal w-full"}>Start Date</span>
                <CustomSelect
                  style={{ width: "100%" }}
                  placeholder={"SELECT CLASS ROOM"}
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
                  onChange={handleStart}
                  value={Start ? Start : undefined}
                />
              </label>
            </div>

            <div className="space-x-5 text-center">
              <ButtonComponent
                defaultHoverBg={colorsObject.successHover}
                defaultBg={colorsObject.success}
                controlHeight={40}
                paddingInline={43}
                borderRadius={5}
                type={"submit"}
                onClick={handleSave}
              >
                SAVE
              </ButtonComponent>
            </div>
          </form>
        </Fragment>
      ),
    },
  ];

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        The Classroom Absences Report searches based on CR Start Date. The
        report will be populated by all students who have missed at least one
        class session, for a class that started within the date range you
        select.
      </Paragraph>

      <div className="bg-white rounded-lg px-10 py-7 space-y-7">
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                itemColor: colorsObject.secondary,
                itemSelectedColor: colorsObject.primary,
                itemHoverColor: colorsObject.primary,
                titleFontSize: 16,
                inkBarColor: "transparent",
              },
            },
          }}
        >
          <Tabs defaultActiveKey="1" items={items} />
        </ConfigProvider>
      </div>
    </Fragment>
  );
};
