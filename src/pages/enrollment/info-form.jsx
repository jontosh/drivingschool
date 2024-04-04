import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomSelect,
} from "@/components/form/index.jsx";
import { Paragraph, Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Checkbox } from "antd";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import EnrollmentStyle from "./enrollment.module.scss";

const InfoTypeOptions = [
  {
    value: "Teen",
  },
  {
    value: "Adult",
  },
  {
    value: "Knowledge test",
  },
  {
    value: "Road test",
  },
];
const LeadOptions = [
  {
    value: 1,
  },
  {
    value: 2,
  },
];

export const InfoForm = ({}) => {
  const [Lead, setLead] = useState("Select");
  const { colorsObject } = useContext(ColorsContext);
  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <form>
        <div className={`grid ${EnrollmentStyle["Enrollment__info-type"]}`}>
          <div className={"space-y-5"}>
            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Assign to staff
              </Paragraph>

              <CustomSelect
                value={"Account #"}
                // onChange={(value) => setInfoType(value)}
                options={InfoTypeOptions}
                style={{ maxWidth: "408px" }}
                className={" w-full"}
                colorBorder={colorsObject.primary}
              />
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Assign to Location
              </Paragraph>

              <CustomSelect
                value={"Select  Location"}
                // onChange={(value) => setInfoType(value)}
                options={InfoTypeOptions}
                style={{ maxWidth: "408px" }}
                className={" w-full"}
                colorBorder={colorsObject.primary}
              />
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Studetn id
              </Paragraph>

              <div style={{ maxWidth: "408px" }} className={"w-full"}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"Student id"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph
                className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                fontWeightStrong={400}
                fontSize={"text-base"}
              >
                First name
              </Paragraph>

              <div style={{ maxWidth: "408px" }} className={" w-full"}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"First name"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph
                className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                fontWeightStrong={400}
                fontSize={"text-base"}
              >
                Last name
              </Paragraph>

              <div style={{ maxWidth: "408px" }} className={" w-full"}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"Last name"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph
                className={`relative`}
                fontWeightStrong={400}
                fontSize={"text-base"}
              >
                Middle name
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"Middle name"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph
                className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                fontWeightStrong={400}
                fontSize={"text-base"}
              >
                Address
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"Address"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph
                className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                fontWeightStrong={400}
                fontSize={"text-base"}
              >
                City
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"City"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph
                className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                fontWeightStrong={400}
                fontSize={"text-base"}
              >
                State
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomSelect
                  value={"State"}
                  // onChange={(value) => setInfoType(value)}
                  options={InfoTypeOptions}
                  style={{ width: "408px" }}
                  className={"mb-2.5"}
                  colorBorder={colorsObject.primary}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph
                className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                fontWeightStrong={400}
                fontSize={"text-base"}
              >
                Zip/Postal code
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"Zip/Postal code"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph
                className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                fontWeightStrong={400}
                fontSize={"text-base"}
              >
                Home Phone
              </Paragraph>

              <div
                style={{ width: "408px" }}
                className={`flex items-center rounded-lg ${EnrollmentStyle["Enrollment__input-wrap"]}`}
              >
                <input
                  placeholder={"Home Phone"}
                  className={`${EnrollmentStyle["Enrollment__input"]} flex-grow px-5 py-2.5 w-44`}
                />

                <CustomCheckBox
                  className={"flex-row-reverse px-5 items-center pt-1.5"}
                >
                  Send text
                </CustomCheckBox>
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Home Phone
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomCheckBox />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph
                className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                fontWeightStrong={400}
                fontSize={"text-base"}
              >
                Email
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomInput
                  type={"email"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"Email"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph
                className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                fontWeightStrong={400}
                fontSize={"text-base"}
              >
                Gender
              </Paragraph>

              <Checkbox.Group
                className={"space-x-2.5 w-full"}
                style={{ maxWidth: "408px" }}
              >
                <CustomCheckBox>
                  <Text fontSize={"text-base"}>Male </Text>
                </CustomCheckBox>

                <CustomCheckBox>
                  <Text fontSize={"text-base"}>Male </Text>
                </CustomCheckBox>

                <CustomCheckBox>
                  <Text fontSize={"text-base"}>Male </Text>
                </CustomCheckBox>
              </Checkbox.Group>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Perferred Pronoun
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"Perferred Pronoun"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Medical condition
              </Paragraph>

              <div style={{ width: "408px" }}>
                <textarea
                  className={`block p-5 rounded-lg w-full shadow-lg ${EnrollmentStyle["Enrollment__textarea"]}`}
                ></textarea>
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Student driving notes
              </Paragraph>

              <div style={{ width: "408px" }}>
                <textarea
                  className={`block p-5 rounded-lg w-full shadow-lg ${EnrollmentStyle["Enrollment__textarea"]}`}
                ></textarea>
              </div>
            </label>

            <label className="flex items-center justify-end w-full">
              <div style={{ width: "408px" }}>
                <CustomCheckBox className={"text-base font-normal"}>
                  I have read and agreed to Terms and Conditions
                </CustomCheckBox>
              </div>
            </label>
          </div>

          <div className={"space-y-5"}>
            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                DL/Permit
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"DL/Permit"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                DL/Permit Issued
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"DL/Permit Issued"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                DL Permit Expiration
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"DL Permit Expiration"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Self Scheduling
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomCheckBox />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Payment Plan
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomCheckBox />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Extantion Date
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"Extantion Date"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                High School
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"High School"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Parent name
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"Parent name"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Parent Phone
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"Parent Phone"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Parent Email
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"Parent Email"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Parent Name 2
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"Parent Name 2"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Parent Phone 2
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"Parent Phone 2"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Parent Email 2
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  classNames={"w-full"}
                  placeholder={"Parent Email 2"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Home Dropoff
              </Paragraph>

              <div style={{ width: "408px" }}>
                <CustomCheckBox />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Date of birth
              </Paragraph>

              <div style={{ width: "408px", gap: "20px" }} className={"flex"}>
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  className={"w-full"}
                  placeholder={"Day"}
                />
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  className={"w-full"}
                  placeholder={"Month"}
                />
                <CustomInput
                  type={"text"}
                  colorBorder={colorsObject.primary}
                  className={"w-full"}
                  placeholder={"Year"}
                />
              </div>
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Lead
              </Paragraph>

              <CustomSelect
                value={Lead}
                onChange={(value) => setLead(value)}
                options={LeadOptions}
                style={{ width: "408px" }}
                className={"mb-2.5"}
                optionFontSize={14}
                optionSelectedFontWeight={400}
                fontSize={16}
                colorBorder={colorsObject.primary}
              />
            </label>

            <label className="flex items-center justify-between w-full">
              <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                Student notes
              </Paragraph>

              <div style={{ width: "408px" }}>
                <textarea
                  className={`block p-5 rounded-lg w-full shadow-lg ${EnrollmentStyle["Enrollment__textarea"]}`}
                ></textarea>
              </div>
            </label>
          </div>
        </div>

        <div className={"py-6 text-center space-x-7"}>
          <ButtonComponent
            defaultBg={"#3CE3AE"}
            defaultHoverBg={"#3CE3AE"}
            paddingInline={97}
            controlHeight={40}
          >
            Save
          </ButtonComponent>

          <ButtonComponent
            defaultBg={colorsObject.primary}
            defaultHoverBg={colorsObject.primary}
            paddingInline={16}
            controlHeight={40}
            className={"inline-flex items-center gap-2.5"}
          >
            <span>Apply Payment & Save</span>
            <IoIosArrowDown />
          </ButtonComponent>
        </div>
      </form>
    </Formik>
  );
};
