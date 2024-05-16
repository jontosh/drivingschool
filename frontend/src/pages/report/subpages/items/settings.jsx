import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomInput,
  CustomSelect,
  SwitchCustom,
} from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useDate } from "@/hooks/useDate.jsx";
import MDEditor from "@uiw/react-md-editor";
import { DatePicker } from "antd";
import { Formik } from "formik";
import { Fragment, useContext, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";
import rehypeSanitize from "rehype-sanitize";

export const Settings = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const { Months, YearsOptions, Days } = useDate();

  const [EnableAdditionalAgreement, setEnableAdditionalAgreement] =
    useState(false);
  const [EnableStudentSignature, setEnableStudentSignature] = useState(false);
  const [EnableParentSignature, setEnableParentSignature] = useState(false);
  const [MandatoryToSign, setMandatoryToSign] = useState(false);
  const [EnrollmentDate, setEnrollmentDate] = useState(null);
  const [Month, setMonth] = useState("");
  const [Day, setDay] = useState(0);
  const [Year, setYear] = useState(0);
  const [NotesValue, setNotesValue] = useState("hello");

  // func
  const handleEnableAdditionalAgreement = (e) =>
    setEnableAdditionalAgreement(e.target.checked);
  const handleEnableStudentSignature = (e) =>
    setEnableStudentSignature(e.target.checked);
  const handleEnableParentSignature = (e) =>
    setEnableParentSignature(e.target.checked);
  const handleMandatoryToSign = (e) => setMandatoryToSign(e.target.checked);
  const handleEnrollmentDate = (day) => setEnrollmentDate(day["$d"]);
  const handleMonth = (value) => setMonth(value);
  const handleDay = (value) => setDay(value);
  const handleYear = (value) => setYear(value);
  const handleNotesValue = (value) => setNotesValue(value);

  return (
    <Fragment>
      <Formik
        initialValues={{
          title: "",
        }}
        onSubmit={(values) => {
          console.log({
            ...values,
            EnableAdditionalAgreement,
            EnableStudentSignature,
            EnableParentSignature,
            MandatoryToSign,
            EnrollmentDate,
            Month,
            Day,
            Year,
            NotesValue,
          });
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <form onSubmit={handleSubmit} className={"space-y-5"}>
            <div className="grid grid-cols-2 gap-x-20 gap-y-5">
              <label className="w-full space-y-4">
                <span className={"w-full"}>Enable Additional Agreement</span>
                <SwitchCustom
                  checked={EnableAdditionalAgreement}
                  onChange={handleEnableAdditionalAgreement}
                />
              </label>

              <label className="w-full space-y-4">
                <span className={"w-full"}>Enable Student Signature</span>
                <SwitchCustom
                  checked={EnableStudentSignature}
                  onChange={handleEnableStudentSignature}
                />
              </label>

              <label className="w-full space-y-4">
                <span className={"w-full"}>Enable Parent Signature</span>
                <SwitchCustom
                  checked={EnableParentSignature}
                  onChange={handleEnableParentSignature}
                />
              </label>

              <label className="w-full space-y-4">
                <span className={"w-full"}>
                  Make Additional Agreement Mandatory to Sign
                </span>
                <SwitchCustom
                  checked={MandatoryToSign}
                  onChange={handleMandatoryToSign}
                />
              </label>
            </div>

            <div className={"grid grid-cols-2 gap-x-20 gap-y-5"}>
              <label className={"space-y-1.5"}>
                <span className={"text-base font-normal text-gray-800 w-full"}>
                  Signing required for enrollments after this date
                </span>

                <DatePicker
                  className="w-full border border-[#667085] h-[50px]"
                  placeholder={"DD/MM/YYYY"}
                  onChange={handleEnrollmentDate}
                />
              </label>

              <div>
                <span className={"text-base font-normal text-gray-800 w-full"}>
                  Student Maximum Age for Parents Signature Required
                </span>

                <div className="grid grid-cols-3 gap-2.5">
                  <CustomSelect
                    options={Months}
                    placeholder={"Select Month"}
                    value={Month ? Month : undefined}
                    onChange={handleMonth}
                  />
                  <CustomSelect
                    options={Days}
                    placeholder={"Select day"}
                    value={Day ? Day : undefined}
                    onChange={handleDay}
                  />
                  <CustomSelect
                    options={YearsOptions()}
                    placeholder={"Select Month"}
                    value={Year ? Year : undefined}
                    onChange={handleYear}
                  />
                </div>
              </div>
              <CustomInput
                colorBorder={"#DEE2E6"}
                spanText={"Additional Agreement Title"}
                spanClassName={"font-normal text-gray-500"}
                fontSize="text-base"
                placeholder={"Enter title"}
                className={"h-[50px]"}
                classNames={"inline-flex flex-col-reverse gap-1.5 h-[76px]"}
                value={values.title}
                onChange={handleChange}
                name={"title"}
              />
            </div>

            <div className="w-full">
              <MDEditor
                value={NotesValue}
                onChange={handleNotesValue}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
              />
            </div>

            <div className="text-center space-x-5">
              <ButtonComponent
                paddingInline={43}
                controlHeight={40}
                borderRadius={5}
                defaultHoverBg={colorsObject.successHover}
                defaultBg={colorsObject.success}
                type={"submit"}
              >
                SAVE
              </ButtonComponent>
              <ButtonComponent
                type={"reset"}
                paddingInline={43}
                controlHeight={40}
                borderRadius={5}
                defaultHoverBg={colorsObject.primary}
                defaultBg={colorsObject.primary}
              >
                View Agreement
              </ButtonComponent>
            </div>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};
