import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker } from "antd";
import { Fragment, useContext, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

export const PayrollReport = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [StaffStatus, setStaffStatus] = useState("");
  const [Staff, setStaff] = useState("");
  const [PayrollReport, setPayrollReport] = useState("");
  const [CancelledAppts, setCancelledAppts] = useState(true);
  const [AppointmentDate, setAppointmentDate] = useState(null);

  // func
  const handleFilterStaff = () => {
    console.log({ StaffStatus, Staff });
  };
  const handleStaffStatus = (value) => setStaffStatus(value);
  const handleStaff = (value) => setStaff(value);
  const handlePayrollReport = (e) => setPayrollReport(e.target.value);
  const handleCancelledAppts = (e) => setCancelledAppts(e.target.checked);
  const handleAppointmentDate = (day) => setAppointmentDate(day["$d"]);
  const handleExportExcel = () => {
    console.log({ AppointmentDate, PayrollReport, CancelledAppts });
  };

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        This report allows you to export Payroll Report.
      </Paragraph>

      <form
        className="bg-white rounded-lg px-10 py-7 space-y-7 gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-2 gap-20">
          <label className="space-y-1.5">
            <span className={"text-base w-full"}>Staff Status</span>

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
              colorBorder={"#667085"}
              value={StaffStatus ? StaffStatus : undefined}
            />
          </label>

          <label className="space-y-1.5">
            <span className={"text-base w-full"}>SELECT STAFF</span>

            <CustomSelect
              onChange={handleStaff}
              placeholder={"SELECT STAFF"}
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
              colorBorder={"#667085"}
              value={Staff ? Staff : undefined}
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

        <div className={"grid grid-cols-2 gap-y-10 gap-x-20"}>
          <Paragraph fontSize={"text-xl font-semibold"}>
            Payroll Report
          </Paragraph>

          <div className="space-y-7">
            <CustomRadio
              value={"BTW"}
              name={"payroll_report"}
              classNames={"w-full"}
              onChange={handlePayrollReport}
            >
              BTW
            </CustomRadio>
            <CustomRadio
              value={"BTW"}
              name={"payroll_report"}
              classNames={"w-full"}
              onChange={handlePayrollReport}
            >
              Classroom
            </CustomRadio>

            <CustomCheckBox
              checked={CancelledAppts}
              onChange={handleCancelledAppts}
            >
              Show Late Cancelled Apps
            </CustomCheckBox>
          </div>

          <label className={"space-y-1.5"}>
            <span className={"text-base font-normal text-gray-800 w-full"}>
              Appointment Date
            </span>

            <DatePicker
              className="w-full border border-[#667085] h-[50px]"
              placeholder={"DD/MM/YYYY"}
              onChange={handleAppointmentDate}
            />
          </label>
        </div>

        <div className="space-x-5">
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
              setPayrollReport("");
              setCancelledAppts(true);
              setAppointmentDate(null);
            }}
          >
            CLEAR
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};
