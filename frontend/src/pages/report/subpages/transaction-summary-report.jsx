import { Paragraph } from "@/components/title/index.jsx";
import { Fragment } from "react";

export const TransactionSummaryReport = ({ ...props }) => {
  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        The Transaction Summary Report allows you to generate a list of billing transactions for a specific date range. You can further filter by the type of transaction and the staff member who entered the transaction. Some of these filtering options have info buttons you can hover over to see more details. Once you have filtered, you will select the fields you'd like to populate your report. Please email support@drivingschoolsoftware.com with any questions.
      </Paragraph>
    </Fragment>
  );
};
