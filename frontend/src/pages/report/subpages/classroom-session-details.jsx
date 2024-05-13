import { Paragraph } from "@/components/title/index.jsx";
import { Fragment } from "react";

export const ClassroomSessionDetails = ({ ...props }) => {
  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        This report generates an Excel file with session-specific data. For data on the classroom overall, use the Classroom Information Details report.
      </Paragraph>
    </Fragment>
  );
};
