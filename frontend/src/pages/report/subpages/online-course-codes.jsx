import { CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { Fragment, useState } from "react";

export const OnlineCourseCodes = ({ ...props }) => {
  const [Product, setProduct] = useState("");
  const handleProduct = (value) => setProduct(value);
  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        Online Course Codes Upload and Status
      </Paragraph>

      <form
        className="bg-white rounded-lg px-10 py-7 space-y-7 gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-2 gap-x-7 gap-y-5">
          <CustomSelect
            style={{ width: "100%" }}
            placeholder={"PLEASE SELECT PRODUCT"}
            className={"h-[50px]"}
            options={[
              {
                value: 1,
                label: 1,
              },
              {
                value: 2,
                label: 2,
              },
            ]}
            onChange={handleProduct}
            value={Product ? Product : undefined}
          />
        </div>
      </form>
    </Fragment>
  );
};
