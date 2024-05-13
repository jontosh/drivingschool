import { Paragraph } from "@/components/title/index.jsx";
import { Fragment } from "react";

export const AllBtwHoursCompleted = ({ ...props }) => {
  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        All BTW Hours Completed is a report designed to display a list of students who have completed their last in-car appointment (i.e. their BTW Balance went to zero) during the selected date range.
      </Paragraph>
    </Fragment>
  );
};
