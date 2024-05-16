import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker } from "antd";
import { Fragment, useContext, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

export const StudentFileReport = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [CRList, setCRList] = useState("");
  const [StudentLastName, setStudentLastName] = useState("");
  const [Student, setStudent] = useState("");
  const [FileCategory, setFileCategory] = useState("");
  const [DateRange, setDateRange] = useState(null);

  const handleCRList = (value) => setCRList(value);
  const handleStudentLastName = (e) => setStudentLastName(e.target.value);
  const handleStudent = (value) => setStudent(value);
  const handleFileCategory = (value) => setFileCategory(value);
  const handleDateRange = (day) => setDateRange(day["$d"]);
  const handleFilterStudent = () => {
    console.log({ CRList, StudentLastName });
  };

  const handleExportExcel = () => {
    console.log({ Student, FileCategory, DateRange });
  };

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        This report allows you to export student data based on the filtering
        options below.
      </Paragraph>

      <form
        className="bg-white rounded-lg px-10 py-7 space-y-7"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-2 gap-x-7 gap-y-5">
          <label className="space-y-1.5">
            <span className={"text-base font-normal w-full text-gray-500"}>
              CR LIST
            </span>

            <CustomSelect
              onChange={handleCRList}
              placeholder={"SELECT CLASS ROOM"}
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
              value={CRList ? CRList : undefined}
            />
          </label>

          <CustomInput
            colorBorder={"#DEE2E6"}
            spanText={"OR"}
            spanClassName={"font-normal text-gray-500"}
            fontSize="text-base"
            placeholder={"STUDENT LAST NAME"}
            className={"h-[50px]"}
            classNames={"inline-flex w-full flex-col-reverse gap-1.5 h-[76px]"}
            value={StudentLastName}
            onChange={handleStudentLastName}
          />
        </div>
        <ButtonComponent
          paddingInline={43}
          controlHeight={40}
          borderRadius={5}
          defaultHoverBg={colorsObject.successHover}
          defaultBg={colorsObject.success}
          type={"submit"}
          onClick={handleFilterStudent}
        >
          Filter Student
        </ButtonComponent>

        <div className="grid grid-cols-2 gap-x-7 gap-y-5">
          <label className="space-y-1.5">
            <span className={"text-base font-normal w-full text-gray-500"}>
              STUDENT
            </span>

            <CustomSelect
              onChange={handleStudent}
              placeholder={"SELECT STUDENT"}
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
              value={Student ? Student : undefined}
            />
          </label>
          <label className="space-y-1.5">
            <span className={"text-base font-normal w-full text-gray-500"}>
              STUDENT
            </span>

            <CustomSelect
              onChange={handleFileCategory}
              placeholder={"SELECT FILE CATEGORY"}
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
              value={FileCategory ? FileCategory : undefined}
            />
          </label>

          <label className={"space-y-1.5"}>
            <span className={"text-base font-normal text-gray-500 w-full"}>
              Date Range (of file upload)
            </span>

            <DatePicker
              className="w-full border border-[#DEE2E6] h-[50px]"
              placeholder={"DD/MM/YYYY"}
              onChange={handleDateRange}
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
              setStudent("");
              setFileCategory("");
              setDateRange(null);
            }}
          >
            CLEAR
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};
