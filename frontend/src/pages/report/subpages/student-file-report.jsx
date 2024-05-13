import { Paragraph } from "@/components/title/index.jsx";
import { Fragment } from "react";

export const StudentFileReport = ({ ...props }) => {
  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        This report allows you to export student data based on the filtering options below.
      </Paragraph>
    </Fragment>
  );
};
