import ButtonComponent from "@/components/button/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Fragment, useContext } from "react";

export const StaffLastLoginReport = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);

  const handleExportExcel = () => {
    console.log("ok");
  };

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        This report allows you to view the last date your staff members logged
        into the software. Simply click the button below and you will get an
        Excel file listing all active and pending staff, along with their staff
        type, status and last login date/time.
      </Paragraph>

      <form
        className={"bg-white rounded-lg px-10 py-7"}
        onSubmit={(e) => e.preventDefault()}
      >
        <ButtonComponent
          paddingInline={43}
          controlHeight={40}
          borderRadius={5}
          defaultHoverBg={colorsObject.successHover}
          defaultBg={colorsObject.success}
          type={"submit"}
          onClick={handleExportExcel}
        >
          EXPORT INTO EXCEL
        </ButtonComponent>
      </form>
    </Fragment>
  );
};
