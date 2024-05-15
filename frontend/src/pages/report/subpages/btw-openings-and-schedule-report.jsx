import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Fragment, useContext, useState } from "react";

export const BtwOpeningsAndScheduleReport = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [Classroom, setClassroom] = useState("");
  const [Student, setStudent] = useState("");
  const [StudentLastName, setStudentLastName] = useState("");
  const [Category, setCategory] = useState("");

  // func
  const handleClassroom = (value) => setClassroom(value);
  const handleStudent = (value) => setStudent(value);
  const handleStudentLastName = (e) => setStudentLastName(e.target.value);
  const handleCategory = (value) => setCategory(value);
  const handleFilterStudent = () => {
    console.log({ Classroom, StudentLastName });
  };
  const handleFilterStudent2 = () => {
    console.log({ Student, Category });
  };

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        This report allows you to export BTW Openings and Schedule Report based
        on the filtering options below.
      </Paragraph>

      <form
        className={"bg-white rounded-lg px-10 py-7 space-y-7 space-y-5"}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-6">
            <label className={"space-y-1.5 w-full"}>
              <span className={"text-gray-500 w-full"}>CR LIST</span>
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
                onChange={handleClassroom}
                value={Classroom ? Classroom : undefined}
              />
            </label>

            <CustomInput
              colorBorder={"#DEE2E6"}
              spanText={"OR"}
              placeholder={"STUDENT LAST NAME"}
              className={""}
              classNames={"inline-flex w-full flex-col-reverse gap-1.5"}
              value={StudentLastName}
              onChange={handleStudentLastName}
            />
          </div>

          <ButtonComponent
            defaultHoverBg={colorsObject.successHover}
            defaultBg={colorsObject.success}
            controlHeight={40}
            paddingInline={43}
            borderRadius={5}
            type={"submit"}
            onClick={handleFilterStudent}
          >
            FILTER STUDENT
          </ButtonComponent>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-6">
            <label className={"space-y-1.5 w-full"}>
              <span className={"text-gray-500 w-full"}>STUDENT</span>
              <CustomSelect
                style={{ width: "100%" }}
                placeholder={"SELECT STUDENT"}
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
                onChange={handleStudent}
                value={Student ? Student : undefined}
              />
            </label>

            <label className={"space-y-1.5 w-full"}>
              <span className={"text-gray-500 w-full"}>STUDENT</span>
              <CustomSelect
                style={{ width: "100%" }}
                placeholder={"SELECT FILE CATEGORY"}
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
                onChange={handleCategory}
                value={Category ? Category : undefined}
              />
            </label>
          </div>

          <div className="space-x-5">
            <ButtonComponent
              defaultHoverBg={colorsObject.successHover}
              defaultBg={colorsObject.success}
              controlHeight={40}
              paddingInline={43}
              borderRadius={5}
              type={"submit"}
              onClick={handleFilterStudent2}
            >
              FILTER STUDENT
            </ButtonComponent>

            <ButtonComponent
              defaultHoverBg={colorsObject.secondaryHover}
              defaultBg={colorsObject.secondary}
              controlHeight={40}
              paddingInline={43}
              borderRadius={5}
              onClick={() => {
                setClassroom("");
                setStudentLastName("");
                setStudent("");
                setCategory("");
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
