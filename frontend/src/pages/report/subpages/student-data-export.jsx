import { Paragraph } from "@/components/title/index.jsx";
import { Fragment } from "react";

export const StudentDataExport = ({ ...props }) => {
  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        Student Event Log is a report designed to display data based on the
        students or parents activity inside the student center. Admin staff can
        search for activity data for a specific student account within a certain
        date range, or for all activity within a certain date range or a
        specific date. Information provided will include details about the
        date/time and type of activity, as well as the browser used and the
        users device IP information.
      </Paragraph>
    </Fragment>
  );
};
