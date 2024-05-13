import { Paragraph } from "@/components/title/index.jsx";
import { Fragment } from "react";

export const SignedDocuments = ({ ...props }) => {
  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        Signed Documents
      </Paragraph>
    </Fragment>
  );
};
