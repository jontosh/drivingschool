import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DatePicker } from "antd";
import { Fragment, useContext, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

export const TransactionSummaryReport = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [Staff, setStaff] = useState("");
  const [PaymentMethod, setPaymentMethod] = useState("");
  const [DateRange, setDateRange] = useState(null);
  const [CR, setCR] = useState("");
  const [DataField, setDataField] = useState("");

  // func
  const handleExportExcel = () => {
    console.log({ Staff, PaymentMethod, DateRange, CR, DataField });
  };

  const handleStaff = (value) => setStaff(value);
  const handlePaymentMethod = (value) => setPaymentMethod(value);
  const handleDateRange = (day) => setDateRange(day["$d"]);
  const handleCR = (value) => setCR(value);
  const handleDataField = (value) => setDataField(value);

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        The Transaction Summary Report allows you to generate a list of billing
        transactions for a specific date range. You can further filter by the
        type of transaction and the staff member who entered the transaction.
        Some of these filtering options have info buttons you can hover over to
        see more details. Once you have filtered, you will select the fields
        you'd like to populate your report. Please email
        support@drivingschoolsoftware.com with any questions.
      </Paragraph>

      <form
        className={"bg-white rounded-lg px-10 py-7 space-y-7"}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-2 gap-x-20 gap-y-5">
          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>
              Staff{" "}
            </span>

            <div className="flex items-center gap-3">
              <CustomSelect
                style={{ width: "100%" }}
                placeholder={"SELECT"}
                className={"h-[50px]"}
                colorBorder={"#DEE2E6"}
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
                onChange={handleStaff}
                value={Staff ? Staff : undefined}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </label>

          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>
              Payment Method
            </span>

            <div className="flex items-center gap-3">
              <CustomSelect
                style={{ width: "100%" }}
                placeholder={"SELECT Payment Method"}
                className={"h-[50px]"}
                colorBorder={"#DEE2E6"}
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
                onChange={handlePaymentMethod}
                value={PaymentMethod ? PaymentMethod : undefined}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </label>

          <label className={"space-y-1.5"}>
            <span className={"text-base font-normal text-gray-500 w-full"}>
              Date Range
            </span>

            <div className="flex items-center gap-3">
              <DatePicker
                className="w-full border border-[#DEE2E6] h-[50px]"
                placeholder={"DD/MM/YYYY"}
                onChange={handleDateRange}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </label>

          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>
              CR#
            </span>
            <CustomSelect
              style={{ width: "100%" }}
              placeholder={"SELECT"}
              className={"h-[50px]"}
              colorBorder={"#DEE2E6"}
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
              onChange={handleCR}
              value={CR ? CR : undefined}
            />
          </label>

          <label className={"space-y-1.5 w-full"}>
            <span className={"text-gray-500 w-full text-base font-normal"}>
              Select Data Field
            </span>

            <div className="flex items-center gap-3">
              <CustomSelect
                style={{ width: "100%" }}
                placeholder={"SELECT"}
                className={"h-[50px]"}
                colorBorder={"#DEE2E6"}
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
                onChange={handleDataField}
                value={DataField ? DataField : undefined}
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
            type={"reset"}
            paddingInline={43}
            controlHeight={40}
            borderRadius={5}
            defaultHoverBg={colorsObject.secondary}
            defaultBg={colorsObject.secondary}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            onClick={() => {
              setStaff("");
              setPaymentMethod("");
              setDateRange(null);
              setCR("");
              setDataField("");
            }}
          >
            CLEAR
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};
