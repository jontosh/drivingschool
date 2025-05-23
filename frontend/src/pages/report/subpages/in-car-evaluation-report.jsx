import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker } from "antd";
import { Fragment, useContext, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";
import { useRequestGetQuery } from "@/redux/query/index.jsx";

export const InCarEvaluationReport = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [StartDate, setStartDate] = useState("");
  const [CRStatus, setCRStatus] = useState("");
  const [CR, setCR] = useState("");
  const [StudentLastName, setStudentLastName] = useState("");
  const [Students, setStudents] = useState("");
  const [Instructor, setInstructor] = useState("");

  const { data: instructorsData, isLoading: instructorsLoading } = useRequestGetQuery({
    path: "/account_management/staff/instructors/"
  });

  const formatInstructorOptions = (instructors) => {
    if (!instructors || !Array.isArray(instructors)) return [];
    return instructors.map(instructor => ({
      value: instructor.id,
      label: instructor.name || `${instructor.first_name} ${instructor.last_name}`.trim()
    }));
  };

  // func
  const handleStartDate = (day) => setStartDate(day["$d"]);
  const handleCRStatus = (value) => setCRStatus(value);
  const handleCR = (value) => setCR(value);
  const handleStudentLastName = (value) => setStudentLastName(value);
  const handleStudents = (value) => setStudents(value);
  const handleInstructor = (value) => setInstructor(value);

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        In Car-Evaluation Report
      </Paragraph>

      <form
        onSubmit={(e) => e.preventDefault()}
        className={"bg-white rounded-lg px-10 py-7 space-y-7 gap-5"}
      >
        <div className="grid grid-cols-2">
          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>CR Status</span>
            <CustomSelect
              style={{ width: "100%" }}
              placeholder={"SELECT  STATUS"}
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
              onChange={handleCRStatus}
              value={CRStatus ? CRStatus : undefined}
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
          onClick={() => {
            console.log(CRStatus);
          }}
        >
          FILTER CLASS
        </ButtonComponent>

        {/*-------------*/}
        <div className="grid grid-cols-2 gap-5">
          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>CR #</span>
            <CustomSelect
              style={{ width: "100%" }}
              placeholder={"SELECT  STATUS"}
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
              onChange={handleCR}
              value={CR ? CR : undefined}
            />
          </label>

          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>OR</span>
            <CustomSelect
              style={{ width: "100%" }}
              placeholder={"Student Last Name"}
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
              onChange={handleStudentLastName}
              value={StudentLastName ? StudentLastName : undefined}
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
          onClick={() => {
            console.log(CR, StudentLastName);
          }}
        >
          FILTER CLASS
        </ButtonComponent>

        {/*--------------------*/}

        <div className="grid grid-cols-2 gap-x-7 gap-y-5">
          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>Students</span>
            <CustomSelect
              style={{ width: "100%" }}
              placeholder={"SELECT STUDENTS"}
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
              onChange={handleStudents}
              value={Students ? Students : undefined}
            />
          </label>

          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>Instructor</span>
            <CustomSelect
              style={{ width: "100%" }}
              placeholder={"Select Instructor"}
              className={"h-[50px]"}
              colorBorder={"#DEE2E6"}
              options={formatInstructorOptions(instructorsData)}
              loading={instructorsLoading}
              onChange={handleInstructor}
              value={Instructor}
            />
          </label>

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
        </div>

        <ButtonComponent
          paddingInline={43}
          controlHeight={40}
          borderRadius={5}
          defaultHoverBg={colorsObject.successHover}
          defaultBg={colorsObject.success}
          type={"submit"}
          onClick={() => {
            console.log(StartDate, Students, Instructor);
          }}
        >
          FILTER CLASS
        </ButtonComponent>

        <div className="grid grid-cols-2">
          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>Appointments</span>
            <CustomSelect
              style={{ width: "100%" }}
              placeholder={"SELECT APPOINTMENTS"}
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
      </form>
    </Fragment>
  );
};
