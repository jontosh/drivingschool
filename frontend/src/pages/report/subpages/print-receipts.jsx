import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Fragment, useContext, useState } from "react";

export const PrintReceipts = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [Classroom, setClassroom] = useState("");
  const [StudentLastName, setStudentLastName] = useState("");
  const [Student, setStudent] = useState("");

  // func
  const handleClassroom = (value) => setClassroom(value);
  const handleStudent = (value) => setStudent(value);
  const handleStudentLastName = (value) => setStudentLastName(value);
  const handleFilterStudent = () => {
    console.log({ Classroom, StudentLastName });
  };
  const handleDownload = () => {
    console.log({ Student });
  };

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        Print Receipts
      </Paragraph>

      <form
        className="bg-white rounded-lg px-10 py-7 space-y-7 gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={`max-w-[490px] w-full mx-auto space-y-5`}>
          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full"}>CR LIST</span>
            <CustomSelect
              style={{ width: "100%" }}
              placeholder={"SELECT CLASS ROOM"}
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
              onChange={handleClassroom}
              value={Classroom ? Classroom : undefined}
            />
          </label>

          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full"}>OR</span>
            <CustomSelect
              style={{ width: "100%" }}
              placeholder={"STUDENT LAST NAME"}
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
              onChange={handleStudentLastName}
              value={StudentLastName ? StudentLastName : undefined}
            />
          </label>

          <ButtonComponent
            paddingInline={43}
            controlHeight={40}
            borderRadius={5}
            defaultHoverBg={colorsObject.successHover}
            defaultBg={colorsObject.success}
            type={"submit"}
            onClick={handleFilterStudent}
          >
            FILTER STAFF
          </ButtonComponent>

          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full"}>STUDENT</span>
            <CustomSelect
              style={{ width: "100%" }}
              placeholder={"SELECT STUDENT"}
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
              onChange={handleStudent}
              value={Student ? Student : undefined}
            />
          </label>

          <div className="space-x-5 text-center">
            <ButtonComponent
              paddingInline={43}
              controlHeight={40}
              borderRadius={5}
              defaultHoverBg={colorsObject.successHover}
              defaultBg={colorsObject.success}
              type={"submit"}
              onClick={handleDownload}
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
              }}
            >
              CLEAR
            </ButtonComponent>
          </div>
        </div>
      </form>
    </Fragment>
  );
};
