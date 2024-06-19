import ButtonComponent from "@/components/button/index.jsx";
import { CustomRadio, CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker } from "antd";
import { Fragment, useContext, useState } from "react";

export const StaffEventLogs = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [StaffStatus, setStaffStatus] = useState("");
  const [Staff, setStaff] = useState("");
  const [DateRange, setDateRange] = useState(null);
  const [StaffEventLog, setStaffEventLog] = useState("");
  const [DataField, setDataField] = useState("");

  // func
  const handleFilterStaff = () => {
    console.log({ StaffStatus });
  };
  const handleExportExcel = () => {
    console.log({ Staff, DateRange, StaffEventLog, DataField });
  };
  const handleStaffStatus = (value) => setStaffStatus(value);
  const handleStaff = (value) => setStaff(value);
  const handleDateRange = (day) => setDateRange(day["$d"]);
  const handleStaffEvent = (e) => setStaffEventLog(e.target.value);
  const handleDataField = (value) => setDataField(value);

  return (
    <Fragment>
      <div className={"bg-[#FFB82F80] space-y-5 rounded-lg py-8 px-4"}>
        <Paragraph fontSize={"text-base"}>
          Staff Event Log is a report designed to display data based on staff
          activity in the Admin Portal (New Admin pages only) and
          Instructor/Teacher Portal. For events within the "Old Admin" pages,
          please navigate to the old Reports page and use that version of the
          Staff Event Log.
        </Paragraph>
        <Paragraph fontSize={"text-base"}>
          Admin staff can search for activity data within a certain date range,
          or for all activity within a certain date range or a specific date.
          Information provided will include details about the date/time and type
          of activity, as well as the browser used and the users device IP
          information.
        </Paragraph>
      </div>

      <form
        className="bg-white rounded-lg px-10 py-7 space-y-7 gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-2 gap-x-20 gap-y-5">
          <label className="space-y-1.5">
            <span className={"text-base font-normal w-full text-gray-500"}>
              CR LIST
            </span>

            <CustomSelect
              onChange={handleStaffStatus}
              placeholder={"SELECT STAFF STATUS"}
              fontSize={14}
              options={[
                {
                  value: "Admin",
                  label: "Admin",
                },
                {
                  value: "Admin 2",
                  label: "Admin 2",
                },
              ]}
              className={`h-[50px] w-full rounded`}
              colorBorder={"#DEE2E6"}
              value={StaffStatus ? StaffStatus : undefined}
            />
          </label>
        </div>

        <ButtonComponent
          paddingInline={43}
          controlHeight={40}
          borderRadius={5}
          defaultHoverBg={colorsObject.successHover}
          defaultBg={colorsObject.success}
          type={"submit"}
          onClick={handleFilterStaff}
        >
          FILTER STAFF
        </ButtonComponent>

        <div className="grid grid-cols-2 gap-x-20 gap-y-5">
          <label className="space-y-1.5">
            <span className={"text-base font-normal w-full text-gray-500"}>SELECT STAFF</span>

            <CustomSelect
              onChange={handleStaff}
              placeholder={"SELECT"}
              fontSize={14}
              options={[
                {
                  value: "Admin",
                  label: "Admin",
                },
                {
                  value: "Admin 2",
                  label: "Admin 2",
                },
              ]}
              className={`h-[50px] w-full rounded`}
              colorBorder={"#DEE2E6"}
              value={Staff ? Staff : undefined}
            />
          </label>

          <label className={"space-y-1.5"}>
            <span className={"text-base font-normal w-full text-gray-500"}>
              Date Range (of event logs)
            </span>

            <DatePicker
              className="w-full border border-[#DEE2E6] h-[50px]"
              placeholder={"DD/MM/YYYY"}
              onChange={handleDateRange}
            />
          </label>

          <Paragraph fontSize={"text-xl font-semibold text-gray-500"}>
            Staff Event Logs
          </Paragraph>

          <div className="space-y-7">
            <CustomRadio
              value={"New Admin Events"}
              name={"staff_event_logs"}
              classNames={"w-full text-gray-500"}
              onChange={handleStaffEvent}
            >
              New Admin Events
            </CustomRadio>
            <CustomRadio
              value={"InsTractor/Teacher Portal Events"}
              name={"staff_event_logs"}
              classNames={"w-full text-gray-500"}
              onChange={handleStaffEvent}
            >
              InsTractor/Teacher Portal Events
            </CustomRadio>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <label className="space-y-1.5 w-full">
            <span className={"text-base font-normal w-full text-gray-500"}>Select Data Field</span>

            <CustomSelect
              onChange={handleDataField}
              placeholder={"SELECT DATA FIELD"}
              fontSize={14}
              options={[
                {
                  value: "Admin",
                  label: "Admin",
                },
                {
                  value: "Admin 2",
                  label: "Admin 2",
                },
              ]}
              className={`h-[50px] w-full rounded`}
              colorBorder={"#DEE2E6"}
              value={DataField ? DataField : undefined}
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
            onClick={handleExportExcel}
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
              setStaff("");
              setDataField("");
              setDateRange(null);
              setStaffEventLog("");
            }}
          >
            CLEAR
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};
