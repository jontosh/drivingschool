import { Paragraph } from "@/components/title/index.jsx";
import { Fragment } from "react";

export const StudentUpdatedProfile = ({ ...props }) => {
  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        Student Updated Permit report was designed to display the students who have updated the field DL/Permit # within the date range selected below. To also review other Student Profile field updates (such as address, email, etc.), you can select the checkbox for “Include updates to non-DL/Permit fields”. Click “Modify Report” (from the blue gear icon) to change which fields populate in the report.
      </Paragraph>
    </Fragment>
  );
};
