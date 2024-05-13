import { Paragraph } from "@/components/title/index.jsx";
import { Fragment } from "react";

export const StaffEventLogs = ({ ...props }) => {
  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        Staff Event Log is a report designed to display data based on staff activity in the Admin Portal (New Admin pages only) and Instructor/Teacher Portal. For events within the "Old Admin" pages, please navigate to the old Reports page and use that version of the Staff Event Log.
        <br />
        Admin staff can search for activity data within a certain date range, or for all activity within a certain date range or a specific date. Information provided will include details about the date/time and type of activity, as well as the browser used and the users device IP information.
        </Paragraph>
        </Fragment>
  );
};
