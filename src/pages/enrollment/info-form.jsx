import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomSelect,
} from "@/components/form/index.jsx";
import { Paragraph, Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useError } from "@/hooks/error.jsx";
import { Checkbox } from "antd";
import { Formik } from "formik";
import { Fragment, useContext, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import EnrollmentStyle from "./enrollment.module.scss";

const InfoTypeOptions = [
  {
    value: "Teen",
    label: "Teen",
  },
  {
    value: "Adult",
    label: "Adult",
  },
  {
    value: "Knowledge test",
    label: "Knowledge test",
  },
  {
    value: "Road test",
    label: "Road test",
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

export const InfoForm = ({ }) => {
  const [Staff, setStaff] = useState("");
  const [State, setState] = useState("");
  const [Lead, setLead] = useState("Select");
  const { colorsObject } = useContext(ColorsContext);
  const { errors, Validation } = useError();
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: State,
        postalCode: "",
        phone: "",
        email: "",
        gender: "",
      }}
      validate={(values) => {
        if (
          !values.email ||
          !values.firstName ||
          !values.lastName ||
          !values.address ||
          !values.city ||
          !values.state ||
          !values.postalCode ||
          !values.phone ||
          !values.email ||
          !values.gender
        ) {
          Validation("EMPTY");
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        return errors;
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => {
        return (
          <form>
            <div className={`grid ${EnrollmentStyle["Enrollment__info-type"]}`}>
              <div className={"space-y-5"}>
                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Assign to staff
                  </Paragraph>

                  <CustomSelect
                    value={Staff !== "" ? Staff : "Account #"}
                    options={InfoTypeOptions}
                    onChange={(value) => setStaff(value)}
                    className={`${EnrollmentStyle["Enrollment__div"]}`}
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
                    className={`${EnrollmentStyle["Enrollment__div"]}`}
                    colorBorder={colorsObject.primary}
                  />
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Studetn id
                  </Paragraph>

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"First name"}
                      name={"firstName"}
                      value={values.firstName}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                {(errors.input || touched.input) && (
                  <Fragment>
                    <div>{errors.input}</div>
                  </Fragment>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    Last name
                  </Paragraph>

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"Last name"}
                      name={"lastName"}
                      value={values.lastName}
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"Address"}
                      name={"address"}
                      value={values.address}
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"City"}
                      name={"city"}
                      value={values.city}
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomSelect
                      value={State !== "" ? State : "State"}
                      onChange={(value) => setState(value)}
                      options={InfoTypeOptions}
                      // style={{ width: "408px" }}
                      className={"mb-2.5 w-full"}
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={`w-full`}
                      placeholder={"Zip/Postal code"}
                      name={"postalCode"}
                      value={values.postalCode}
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
                    className={`flex items-center rounded-lg ${EnrollmentStyle["Enrollment__input-wrap"]}`}
                  >
                    <input
                      placeholder={"Home Phone"}
                      className={`${EnrollmentStyle["Enrollment__input"]} flex-grow px-5 py-2.5 w-44`}
                      name={"phone"}
                      value={values.phone}
                    />

                    <CustomCheckBox
                      className={`flex-row-reverse px-3 items-center pt-1.5  ${EnrollmentStyle["Enrollment__checkbox"]}`}
                    >
                      Send text
                    </CustomCheckBox>
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Home Phone
                  </Paragraph>

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"email"}
                      colorBorder={colorsObject.primary}
                      classNames={"w-full"}
                      placeholder={"Email"}
                      name={"email"}
                      value={values.email}
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
                    className={`${EnrollmentStyle["Enrollment__div"]}`}
                  >
                    <CustomCheckBox name={"gender"}>
                      <Text fontSize={"text-base"}>Male</Text>
                    </CustomCheckBox>

                    <CustomCheckBox name={"gender"}>
                      <Text fontSize={"text-base"}>Female</Text>
                    </CustomCheckBox>

                    <CustomCheckBox name={"gender"}>
                      <Text fontSize={"text-base"}>Other</Text>
                    </CustomCheckBox>
                  </Checkbox.Group>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Perferred Pronoun
                  </Paragraph>

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
                    <textarea
                      className={`block p-5 rounded-lg w-full shadow-lg ${EnrollmentStyle["Modal__textarea"]}`}
                    ></textarea>
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Student driving notes
                  </Paragraph>

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
                    <textarea
                      className={`block p-5 rounded-lg w-full shadow-lg ${EnrollmentStyle["Enrollment__textarea"]}`}
                    ></textarea>
                  </div>
                </label>

                <label className="flex items-center justify-end w-full">
                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomCheckBox />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Payment Plan
                  </Paragraph>

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomCheckBox />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Extantion Date
                  </Paragraph>

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomCheckBox />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Date of birth
                  </Paragraph>

                  <div
                    style={{ gap: "20px" }}
                    className={`flex ${EnrollmentStyle["Enrollment__div"]}`}
                  >
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
                    className={`mb-2.5 ${EnrollmentStyle["Enrollment__div"]}`}
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

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
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
                onClick={handleSubmit}
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
        );
      }}
    </Formik>
  );
};
