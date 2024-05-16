import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker } from "antd";
import { Fragment, useContext, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

export const SalesDetailReport = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [Services, setServices] = useState("");
  const [Components, setComponents] = useState("");
  const [Location, setLocation] = useState("");
  const [DateRange, setDateRange] = useState(null);

  // func
  const handleServices = (value) => setServices(value);
  const handleComponents = (value) => setComponents(value);
  const handleLocation = (value) => setLocation(value);
  const handleDateRange = (date) => setDateRange(date["$d"]);
  const handleExportExcel = () => {
    console.log("excel", { Services, Components, Location, DateRange });
  };
  const handleExportPDF = () => {
    console.log("pdf", { Services, Components, Location, DateRange });
  };

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        Open Balance Report
      </Paragraph>

      <form
        className="bg-white rounded-lg px-10 py-7 space-y-7 gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-2 gap-x-20 gap-y-5">
          <label className="space-y-1.5">
            <span className={"text-base w-full"}>
              Select Services (Packages)
            </span>

            <div className="flex items-center">
              <CustomSelect
                onChange={handleServices}
                placeholder={"SELECT"}
                fontSize={14}
                options={[
                  {
                    value: "Admin",
                    label: "Admin",
                  },
                  {
                    value: "Admin 2",
                    label: "Admin 2",
                  },
                ]}
                className={`h-[50px] w-full rounded`}
                colorBorder={"#667085"}
                value={Services ? Services : undefined}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </label>

          <label className="space-y-1.5">
            <span className={"text-base w-full"}>
              Select Components (Products)
            </span>

            <div className="flex items-center">
              <CustomSelect
                onChange={handleComponents}
                placeholder={"SELECT"}
                fontSize={14}
                options={[
                  {
                    value: "Admin",
                    label: "Admin",
                  },
                  {
                    value: "Admin 2",
                    label: "Admin 2",
                  },
                ]}
                className={`h-[50px] w-full rounded`}
                colorBorder={"#667085"}
                value={Components ? Components : undefined}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </label>

          <label className="space-y-1.5">
            <span className={"text-base w-full"}>
              Locations (Assigned to Students)
            </span>

            <div className="flex items-center">
              <CustomSelect
                onChange={handleLocation}
                placeholder={"SELECT"}
                fontSize={14}
                options={[
                  {
                    value: "Admin",
                    label: "Admin",
                  },
                  {
                    value: "Admin 2",
                    label: "Admin 2",
                  },
                ]}
                className={`h-[50px] w-full rounded`}
                colorBorder={"#667085"}
                value={Location ? Location : undefined}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </label>

          <label className="space-y-1.5">
            <span className={"text-base w-full"}>Date Range</span>

            <div className="flex items-center gap-3">
              <DatePicker
                className="w-full border border-[#667085] h-[50px]"
                placeholder={"DD/MM/YYYY"}
                onChange={handleDateRange}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </label>
        </div>

        <div className="text-center space-x-5">
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
          <ButtonComponent
            paddingInline={43}
            controlHeight={40}
            borderRadius={5}
            defaultHoverBg={colorsObject.successHover}
            defaultBg={colorsObject.success}
            type={"submit"}
            onClick={handleExportPDF}
          >
            EXPORT INTO PDF
          </ButtonComponent>
          <ButtonComponent
            type={"reset"}
            paddingInline={43}
            controlHeight={40}
            borderRadius={5}
            defaultHoverBg={colorsObject.secondary}
            defaultBg={colorsObject.secondary}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            onClick={() => {
              setServices("");
              setComponents("");
              setLocation("");
              setDateRange(null);
            }}
          >
            CLEAR
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};
