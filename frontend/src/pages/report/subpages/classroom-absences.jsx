import { Paragraph } from "@/components/title/index.jsx";
import { Fragment } from "react";

export const ClassroomAbsences = ({ ...props }) => {
  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        The Classroom Absences Report searches based on CR Start Date. The report will be populated by all students who have missed at least one class session, for a class that started within the date range you select.
      </Paragraph>
    </Fragment>
  );
};
