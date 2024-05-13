import { Paragraph } from "@/components/title/index.jsx";
import { Fragment } from "react";

export const SalesDetailReport = ({ ...props }) => {
  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        Open Balance Report
      </Paragraph>
    </Fragment>
  );
};
