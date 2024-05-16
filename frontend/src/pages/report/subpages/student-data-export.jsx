import {
  CustomCheckBox,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { useDate } from "@/hooks/useDate.jsx";
import { DatePicker } from "antd";
import { Formik } from "formik";
import { Fragment, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

export const StudentDataExport = ({ ...props }) => {
  const { Months, YearsOptions, Days } = useDate();
  const [DateRange, setDateRange] = useState(null);
  const [FromMonth, setFromMonth] = useState("");
  const [FromDay, setFromDay] = useState("");
  const [FromYears, setFromYears] = useState("");
  const [ToMonth, setToMonth] = useState("");
  const [ToDay, setToDay] = useState("");
  const [ToYears, setToYears] = useState("");
  const [RangeFromMonth, setRangeFromMonth] = useState("");
  const [RangeFromYear, setRangeFromYear] = useState("");
  const [RangeToMonth, setRangeToMonth] = useState("");
  const [RangeToYear, setRangeToYear] = useState("");

  // func
  const handleDateRange = (day) => setDateRange(day["$d"]);
  const handleFromMonth = (value) => setFromMonth(value);
  const handleFromDay = (value) => setFromDay(value);
  const handleFromYears = (value) => setFromYears(value);
  const handleToMonth = (value) => setToMonth(value);
  const handleToDay = (value) => setToDay(value);
  const handleToYears = (value) => setToYears(value);
  const handleRangeFromMonth = (value) => setRangeFromMonth(value);
  const handleRangeToMonth = (value) => setRangeToMonth(value);
  const handleRangeToYear = (value) => setRangeToYear(value);
  const handleRangeFromYear = (value) => setRangeFromYear(value);

  return (
    <Fragment>
      <Paragraph
        className={"bg-[#FFB82F80] py-8 px-4 rounded-lg"}
        fontSize={"text-base"}
      >
        Export student record.
      </Paragraph>

      <Formik
        initialValues={{
          filter_student_by_date: false,
          range_show: "",
          range_balance: "",
        }}
        onSubmit={(values) => {}}
      >
        {({ handleSubmit, handleChange, handleReset, values }) => (
          <form
            onSubmit={handleSubmit}
            className={"bg-white rounded-lg px-10 py-7 space-y-7"}
          >
            <Paragraph fontSize={"text-xl font-semibold text-gray-500"}>
              Filter students by date
            </Paragraph>

            <div className="gap-x-7 flex">
              <CustomRadio
                name={"filter_student_by_date"}
                classNames={" text-gray-500"}
                onChange={handleChange}
              >
                Date activated
              </CustomRadio>
              <CustomRadio
                name={"filter_student_by_date"}
                classNames={" text-gray-500"}
                onChange={handleChange}
              >
                Date activated
              </CustomRadio>
              <CustomRadio
                name={"filter_student_by_date"}
                classNames={" text-gray-500"}
                onChange={handleChange}
              >
                Date activated
              </CustomRadio>
              <CustomRadio
                name={"filter_student_by_date"}
                classNames={" text-gray-500"}
                onChange={handleChange}
              >
                Date activated
              </CustomRadio>
            </div>

            <label className={"space-y-1.5"}>
              <span className={"text-base font-normal text-gray-500 w-full"}>
                Select date Range
              </span>

              <DatePicker
                className="w-full border border-[#DEE2E6] h-[50px]"
                placeholder={"DD/MM/YYYY"}
                onChange={handleDateRange}
              />
            </label>

            <Paragraph fontSize={"text-xl font-semibold text-gray-500"}>
              Filter Students By Student Info (You can select multiple items):
            </Paragraph>

            <Paragraph fontSize={"text-lg text-gray-500"}>
              Birth Date Range
            </Paragraph>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-5">
                <Paragraph fontSize={"text-lg text-gray-500"}>From:</Paragraph>

                <div className="space-x-2.5">
                  <CustomSelect
                    options={Months}
                    placeholder={"Select Month"}
                    value={FromMonth ? FromMonth : undefined}
                    onChange={handleFromMonth}
                  />
                  <CustomSelect
                    options={Days}
                    placeholder={"Select day"}
                    value={FromDay ? FromDay : undefined}
                    onChange={handleFromDay}
                  />
                  <CustomSelect
                    options={YearsOptions()}
                    placeholder={"Select Years"}
                    value={FromYears ? FromYears : undefined}
                    onChange={handleFromYears}
                  />
                </div>
              </div>

              <div className="space-y-5">
                <Paragraph fontSize={"text-lg text-gray-500"}>To:</Paragraph>

                <div className="space-x-2.5">
                  <CustomSelect
                    options={Months}
                    placeholder={"Select Month"}
                    value={ToMonth ? ToMonth : undefined}
                    onChange={handleToMonth}
                  />
                  <CustomSelect
                    options={Days}
                    placeholder={"Select day"}
                    value={ToDay ? ToDay : undefined}
                    onChange={handleToDay}
                  />
                  <CustomSelect
                    options={YearsOptions()}
                    placeholder={"Select Years"}
                    value={ToYears ? ToYears : undefined}
                    onChange={handleToYears}
                  />
                </div>
              </div>
            </div>

            <Paragraph fontSize={"text-lg text-gray-500"}>Age Range</Paragraph>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-5">
                <Paragraph fontSize={"text-lg text-gray-500"}>From:</Paragraph>
                <div className="space-x-2.5">
                  <CustomSelect
                    options={Months}
                    placeholder={"Select Month"}
                    value={RangeFromMonth ? RangeFromMonth : undefined}
                    onChange={handleRangeFromMonth}
                  />

                  <CustomSelect
                    options={YearsOptions()}
                    placeholder={"Select Years"}
                    value={RangeFromYear ? RangeFromYear : undefined}
                    onChange={handleRangeFromYear}
                  />
                </div>
                <CustomRadio
                  classNames={"w-full"}
                  name={"range_show"}
                  onChange={handleChange}
                  value={"Show account balance only"}
                >
                  Show account balance only
                </CustomRadio>
                <CustomRadio
                  classNames={"w-full"}
                  name={"range_show"}
                  onChange={handleChange}
                  value={"Show outstanding Observation balance Only"}
                >
                  Show outstanding Observation balance Only
                </CustomRadio>
                @todo
              </div>

              <div className="space-y-5">
                <Paragraph fontSize={"text-lg text-gray-500"}>To:</Paragraph>
                <div className="space-x-2.5">
                  <CustomSelect
                    options={Months}
                    placeholder={"Select Month"}
                    value={RangeToMonth ? RangeToMonth : undefined}
                    onChange={handleRangeToMonth}
                  />

                  <CustomSelect
                    options={YearsOptions()}
                    placeholder={"Select Years"}
                    value={RangeToYear ? RangeToYear : undefined}
                    onChange={handleRangeToYear}
                  />
                </div>
                <CustomRadio
                  classNames={"w-full"}
                  name={"range_balance"}
                  onChange={handleChange}
                  value={"Show outstanding BTW balance Only"}
                >
                  Show outstanding BTW balance Only
                </CustomRadio>
                <CustomRadio
                  classNames={"w-full"}
                  name={"range_balance"}
                  onChange={handleChange}
                  value={"Show outstanding Observation balance Only"}
                >
                  Show incomplete BTW balance Only
                </CustomRadio>
                @todo
              </div>
            </div>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};
