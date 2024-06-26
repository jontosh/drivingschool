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
        <Paragraph>Balance: $649.99</Paragraph>
        <ButtonComponent
          defaultColor={colorsObject.black}
          defaultHoverColor={colorsObject.black}
          defaultBorderColor={colorsObject.black}
          defaultHoverBorderColor={colorsObject.black}
          borderRadius={5}
          paddingInline={20}
          controlHeight={40}
        >
          $Pay Balance
        </ButtonComponent>
      </div>

      <div className="border shadow-2xl border-indigo-700 px-10 py-5 rounded-2xl">
        <div className="-mx-10 px-10 border-b pb-5 border-b-gray-400 flex justify-between">
          <Title level={2} fontSize={"text-xl space-x-2"}>
            <span className="text-indigo-700">Enrollment</span>
            <span className={"text-[#24C18F]"}>$649.99</span>
          </Title>
        </div>
        <div className="pt-5 -mx-10">
          <TableComponent columns={column} data={data} />
        </div>
      </div>

      <div className="border shadow-2xl border-indigo-700 px-10 py-5 rounded-2xl">
        <div className="-mx-10 px-10 border-b pb-5 border-b-gray-400 flex justify-between">
          <Title level={2} fontSize={"text-xl space-x-2"}>
            <span className="text-indigo-700">BILLING</span>
            <span className={"text-[#24C18F]"}>$0.00</span>
          </Title>
        </div>
        <div className="pt-5 -mx-10">
          <TableComponent columns={BillingColumns} />
        </div>
      </div>
    </div>
  );
};
