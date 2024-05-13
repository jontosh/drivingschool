import { Paragraph } from "@/components/title/index.jsx";
import { Fragment } from "react";

export const BtwOpeningsAndScheduleReport = ({ ...props }) => {
  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        This report allows you to export BTW Openings and Schedule Report based on the filtering options below.
      </Paragraph>
    </Fragment>
  );
};
