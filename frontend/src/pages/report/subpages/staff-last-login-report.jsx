import { Paragraph } from "@/components/title/index.jsx";
import { Fragment } from "react";

export const StaffLastLoginReport = ({ ...props }) => {
  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        This report allows you to view the last date your staff members logged into the software. Simply click the button below and you will get an Excel file listing all active and pending staff, along with their staff type, status and last login date/time.
      </Paragraph>
    </Fragment>
  );
};
