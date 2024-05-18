import ButtonComponent from "@/components/button";
import {
  CustomCheckBox,
  CustomInput,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { useDate } from "@/hooks/useDate.jsx";
import { DatePicker } from "antd";
import { Formik } from "formik";
import { Fragment, useContext, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";
import ColorsContext from "@/context/colors.jsx";
import { Select } from 'antd';

const { Option } = Select;

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

  const { colorsObject } = useContext(ColorsContext);

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
        onSubmit={(values) => { }}
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
                classNames={"text-gray-500"}
                onChange={handleChange}
              >
                Date activated
              </CustomRadio>
              <CustomRadio
                name={"filter_student_by_date"}
                classNames={"text-gray-500"}
                onChange={handleChange}
              >
                Date activated
              </CustomRadio>
              <CustomRadio
                name={"filter_student_by_date"}
                classNames={"text-gray-500"}
                onChange={handleChange}
              >
                Date activated
              </CustomRadio>
              <CustomRadio
                name={"filter_student_by_date"}
                classNames={"text-gray-500"}
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
                    colorBorder="#DEE2E6"
                    className={"h-[50px]"}
                  />
                  <CustomSelect
                    options={Days}
                    placeholder={"Select day"}
                    value={FromDay ? FromDay : undefined}
                    onChange={handleFromDay}
                    colorBorder="#DEE2E6"
                    className={"h-[50px]"}
                  />
                  <CustomSelect
                    options={YearsOptions()}
                    placeholder={"Select Years"}
                    value={FromYears ? FromYears : undefined}
                    onChange={handleFromYears}
                    colorBorder="#DEE2E6"
                    className={"h-[50px]"}
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
                    colorBorder="#DEE2E6"
                    className={"h-[50px]"}
                  />
                  <CustomSelect
                    options={Days}
                    placeholder={"Select day"}
                    value={ToDay ? ToDay : undefined}
                    onChange={handleToDay}
                    colorBorder="#DEE2E6"
                    className={"h-[50px]"}
                  />
                  <CustomSelect
                    options={YearsOptions()}
                    placeholder={"Select Years"}
                    value={ToYears ? ToYears : undefined}
                    onChange={handleToYears}
                    colorBorder="#DEE2E6"
                    className={"h-[50px]"}
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
                    colorBorder="#DEE2E6"
                    className={"h-[50px]"}
                  />

                  <CustomSelect
                    options={YearsOptions()}
                    placeholder={"Select Years"}
                    value={RangeFromYear ? RangeFromYear : undefined}
                    onChange={handleRangeFromYear}
                    colorBorder="#DEE2E6"
                    className={"h-[50px]"}
                  />
                </div>
                <CustomRadio
                  classNames={"w-full text-gray-500"}
                  name={"range_show"}
                  onChange={handleChange}
                  value={"Show account balance only"}
                >
                  Show account balance only
                </CustomRadio>
                <CustomRadio
                  classNames={"w-full text-gray-500"}
                  name={"range_show"}
                  onChange={handleChange}
                  value={"Show outstanding Observation balance Only"}
                >
                  Show outstanding Observation balance Only
                </CustomRadio>

                <label className="w-full space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-500">High School</span>

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>

                  <CustomSelect
                    placeholder={"SELECT"}
                    colorBorder="#DEE2E6"
                    className={"h-[50px] w-full"}
                    options={[
                      {
                        value: "School",
                        label: "School",
                      },
                      {
                        value: "School",
                        label: "School",
                      },
                    ]}
                  />
                </label>

                <label className="w-full space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-500">Assigned to Student</span>

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>

                  <CustomSelect
                    placeholder={"SELECT"}
                    colorBorder="#DEE2E6"
                    className={"h-[50px] w-full"}
                    options={[
                      {
                        value: "School",
                        label: "School",
                      },
                      {
                        value: "School",
                        label: "School",
                      },
                    ]}
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-base font-medium text-gray-500">Student Type</span>

                  <div className="flex items-center gap-5">
                    <CustomRadio
                      classNames={"w-full text-gray-500"}
                      name={"range_show"}
                      onChange={handleChange}
                      value={"Show account balance only"}
                    >
                      Adult
                    </CustomRadio>
                    <CustomRadio
                      classNames={"w-full text-gray-500"}
                      name={"range_show"}
                      onChange={handleChange}
                      value={"Show outstanding Observation balance Only"}
                    >
                      Teen
                    </CustomRadio>
                  </div>
                </label>

                <label className="flex items-center gap-3">
                  <CustomInput
                    colorBorder={"#DEE2E6"}
                    spanText={"Last Name:"}
                    spanClassName={"font-normal text-gray-500"}
                    fontSize="text-base"
                    placeholder={"Name"}
                    className={"h-[50px]"}
                    classNames={
                      "inline-flex w-full flex-col-reverse gap-1.5 h-[76px]"
                    }
                  />

                  <span className="pt-8">
                    <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                  </span>
                </label>
              </div>

              <div className="space-y-5">
                <Paragraph fontSize={"text-lg text-gray-500"}>To:</Paragraph>
                <div className="space-x-2.5">
                  <CustomSelect
                    options={Months}
                    placeholder={"Select Month"}
                    value={RangeToMonth ? RangeToMonth : undefined}
                    onChange={handleRangeToMonth}
                    colorBorder="#DEE2E6"
                    className={"h-[50px]"}
                  />

                  <CustomSelect
                    options={YearsOptions()}
                    placeholder={"Select Years"}
                    value={RangeToYear ? RangeToYear : undefined}
                    onChange={handleRangeToYear}
                    colorBorder="#DEE2E6"
                    className={"h-[50px]"}
                  />
                </div>
                <CustomRadio
                  classNames={"w-full text-gray-500"}
                  name={"range_balance"}
                  onChange={handleChange}
                  value={"Show outstanding BTW balance Only"}
                  className={"text-gray-500"}
                >
                  Show outstanding BTW balance Only
                </CustomRadio>
                <CustomRadio
                  classNames={"w-full text-gray-500"}
                  name={"range_balance"}
                  onChange={handleChange}
                  value={"Show outstanding Observation balance Only"}
                >
                  Show incomplete BTW balance Only
                </CustomRadio>

                <label className="w-full space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-500">Location Assigned</span>

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>

                  <CustomSelect
                    placeholder={"SELECT"}
                    colorBorder="#DEE2E6"
                    className={"h-[50px] w-full"}
                    options={[
                      {
                        value: "School",
                        label: "School",
                      },
                      {
                        value: "School",
                        label: "School",
                      },
                    ]}
                  />
                </label>

                <label className="w-full space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-500">Student Status</span>

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>

                  <CustomSelect
                    placeholder={"SELECT"}
                    colorBorder="#DEE2E6"
                    className={"h-[50px] w-full"}
                    options={[
                      {
                        value: "School",
                        label: "School",
                      },
                      {
                        value: "School",
                        label: "School",
                      },
                    ]}
                  />
                </label>

                <label className="flex items-center gap-3">
                  <CustomInput
                    colorBorder={"#DEE2E6"}
                    spanText={"Zip Code:"}
                    spanClassName={"font-normal text-gray-500"}
                    fontSize="text-base"
                    placeholder={"Code"}
                    className={"h-[50px]"}
                    classNames={
                      "inline-flex w-full flex-col-reverse gap-1.5 h-[76px]"
                    }
                  />

                  <span className="pt-8">
                    <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                  </span>
                </label>

                <label className="w-full space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-500">Leed</span>

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>

                  <CustomSelect
                    placeholder={"SELECT"}
                    colorBorder="#DEE2E6"
                    className={"h-[50px] w-full"}
                    options={[
                      {
                        value: "School",
                        label: "School",
                      },
                      {
                        value: "School",
                        label: "School",
                      },
                    ]}
                  />
                </label>
              </div>
            </div>

            <Paragraph fontSize={"text-lg text-gray-500"}>Filter Students by BTW Appointment Data (You can select multiple items):</Paragraph>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-5">
                <label className={"space-y-1.5"}>
                  <span className={"text-base font-normal text-gray-500 w-full"}>
                    Appointment Date
                  </span>

                  <DatePicker
                    className="w-full border border-[#DEE2E6] h-[50px]"
                    placeholder={"DD/MM/YYYY"}
                    onChange={handleDateRange}
                  />

                  <ButtonComponent
                    defaultBg="rgba(0, 0, 0, 0.45)"
                    defaultHoverBg="rgba(0, 0, 0, 0.45)"
                    defaultColor="rgba(255, 255, 255, 1)"
                    borderRadius={5}
                    className={"w-20"}
                  >Clear</ButtonComponent>
                </label>

                <label className="w-full space-y-1.5 pt-[54px]">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-500">Appt. Slot Type:</span>

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>

                  <CustomSelect
                    placeholder={"SELECT"}
                    colorBorder="#DEE2E6"
                    className={"h-[50px] w-full"}
                    options={[
                      {
                        value: "School",
                        label: "School",
                      },
                      {
                        value: "School",
                        label: "School",
                      },
                    ]}
                  />
                </label>

                <label className="w-full space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-500">Appt. Instructor:</span>

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>

                  <CustomSelect
                    placeholder={"SELECT"}
                    colorBorder="#DEE2E6"
                    className={"h-[50px] w-full"}
                    options={[
                      {
                        value: "School",
                        label: "School",
                      },
                      {
                        value: "School",
                        label: "School",
                      },
                    ]}
                  />
                </label>

                <label className="w-full space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-500">Appt. Vehicle:</span>

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>

                  <CustomSelect
                    placeholder={"SELECT"}
                    colorBorder="#DEE2E6"
                    className={"h-[50px] w-full"}
                    options={[
                      {
                        value: "School",
                        label: "School",
                      },
                      {
                        value: "School",
                        label: "School",
                      },
                    ]}
                  />
                </label>
              </div>

              <div className="space-y-5">
                <label className="w-full space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-500">Appt. Status:</span>

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>

                  <CustomSelect
                    placeholder={"SELECT"}
                    colorBorder="#DEE2E6"
                    className={"h-[50px] w-full"}
                    options={[
                      {
                        value: "School",
                        label: "School",
                      },
                      {
                        value: "School",
                        label: "School",
                      },
                    ]}
                  />
                </label>

                <label className="w-full space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-500">BTW Number:</span>

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>

                  <CustomSelect
                    placeholder={"SELECT"}
                    colorBorder="#DEE2E6"
                    className={"h-[50px] w-full"}
                    options={[
                      {
                        value: "School",
                        label: "School",
                      },
                      {
                        value: "School",
                        label: "School",
                      },
                    ]}
                  />
                </label>

                <label className="w-full space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-500">Appt. Sub Type</span>

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>

                  <CustomSelect
                    placeholder={"SELECT"}
                    colorBorder="#DEE2E6"
                    className={"h-[50px] w-full"}
                    options={[
                      {
                        value: "School",
                        label: "School",
                      },
                      {
                        value: "School",
                        label: "School",
                      },
                    ]}
                  />
                </label>

                <label className="w-full space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-500">Appt. Location:</span>

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>

                  <CustomSelect
                    placeholder={"SELECT"}
                    colorBorder="#DEE2E6"
                    className={"h-[50px] w-full"}
                    options={[
                      {
                        value: "School",
                        label: "School",
                      },
                      {
                        value: "School",
                        label: "School",
                      },
                    ]}
                  />
                </label>

                <label className="w-full space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-500">Appt. Day:</span>

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>

                  <CustomSelect
                    placeholder={"SELECT"}
                    colorBorder="#DEE2E6"
                    className={"h-[50px] w-full"}
                    options={[
                      {
                        value: "School",
                        label: "School",
                      },
                      {
                        value: "School",
                        label: "School",
                      },
                    ]}
                  />
                </label>
              </div>
            </div>

            <Paragraph fontSize={"text-lg text-gray-500"}>Select Students Name and Address format for excel export:</Paragraph>

            <div className="grid grid-cols-2 gap-5">
              <label className="w-full space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-gray-500">Student Name Format:</span>

                  <span>
                    <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                  </span>
                </div>

                <CustomSelect
                  placeholder={"SELECT"}
                  colorBorder="#DEE2E6"
                  className={"h-[50px] w-full"}
                  options={[
                    {
                      value: "School",
                      label: "School",
                    },
                    {
                      value: "School",
                      label: "School",
                    },
                  ]}
                />
              </label>

              <label className="w-full space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-gray-500">Address Format:</span>

                  <span>
                    <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                  </span>
                </div>

                <CustomSelect
                  placeholder={"SELECT"}
                  colorBorder="#DEE2E6"
                  className={"h-[50px] w-full"}
                  options={[
                    {
                      value: "School",
                      label: "School",
                    },
                    {
                      value: "School",
                      label: "School",
                    },
                  ]}
                />
              </label>

              <ButtonComponent
                type={"submit"}
                paddingInline={50}
                controlHeight={40}
                borderRadius={5}
                defaultHoverBg={colorsObject.successHover}
                defaultBg={colorsObject.success}
              >FILTER STUDENTS</ButtonComponent>
              <ButtonComponent
                type={"reset"}
                paddingInline={43}
                controlHeight={40}
                borderRadius={5}
                defaultHoverBg={colorsObject.secondary}
                defaultBg={colorsObject.secondary}
                defaultColor={colorsObject.main}
                defaultHoverColor={colorsObject.main}
              >FILTER STUDENTS</ButtonComponent>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                @to do
              </div>

              <div className="text-center">
                <ButtonComponent
                  type={"submit"}
                  paddingInline={43}
                  controlHeight={40}
                  borderRadius={5}
                  defaultHoverBg={colorsObject.successHover}
                  defaultBg={colorsObject.success}
                >EXPORT INTO EXCEL</ButtonComponent>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};
