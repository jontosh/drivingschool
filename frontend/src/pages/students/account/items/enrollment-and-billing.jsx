import ButtonComponent from "@/components/button/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import {
  StudentAccountBilling,
  StudentAccountEnrollment,
} from "@/modules/enrollments.jsx";
import { useContext } from "react";

export const EnrollmentAndBilling = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const { column, data } = StudentAccountEnrollment();
  const { column: BillingColumns } = StudentAccountBilling();

  return (
    <div className={"space-y-5"}>
      <div className="flex gap-5 items-center">
        <Paragraph fontSize={"text-lg"}>Balance: $649.99</Paragraph>
        <ButtonComponent
          defaultColor={colorsObject.black}
          defaultHoverColor={colorsObject.black}
          defaultBorderColor={'#CED8E5'}
          defaultHoverBorderColor={'#CED8E5'}
          borderRadius={5}
          paddingInline={20}
          className={"font-semibold"}
          fontSize={"text-xs"}
        >
          $Pay Balance
        </ButtonComponent>
      </div>

      <div className="border border-[#CED8E5] px-10 pb-5 overflow-hidden rounded-2xl">
        <div className="-mx-10 px-10 border-b py-2.5 border-b-[#CED8E5] flex justify-between bg-[#FFB82F80]">
          <Title level={2} fontSize={"text-xl space-x-2"}>
            <span className="font-normal">Enrollment</span>
            <span className={"text-[#5459EA]"}>$649.99</span>
          </Title>
        </div>
        <div className="pt-5 -mx-10">
          <TableComponent columns={column} data={data} />
        </div>
      </div>

      <div className="border border-[#CED8E5] px-10 pb-5 overflow-hidden rounded-2xl">
        <div className="-mx-10 px-10 border-b py-2.5 border-b-[#CED8E5] flex justify-between bg-[#FFB82F80]">
          <Title level={2} fontSize={"text-xl space-x-2"}>
            <span className="font-normal">Enrollment</span>
            <span className={"text-[#5459EA]"}>$649.99</span>
          </Title>
        </div>
        <div className="pt-5 -mx-10">
          <TableComponent columns={BillingColumns} />
        </div>
      </div>
    </div>
  );
};
