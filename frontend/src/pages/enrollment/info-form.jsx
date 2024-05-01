import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import { Paragraph, Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useError } from "@/hooks/error.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import { Checkbox } from "antd";
import classNames from "classnames";
import { Formik } from "formik";
import { Fragment, useContext, useState } from "react";
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

export const InfoForm = ({}) => {
  const [Staff, setStaff] = useState("");
  const [AssignLocation, setAssignLocation] = useState("");
  const [State, setState] = useState("");
  const [Lead, setLead] = useState("Select");
  const { colorsObject } = useContext(ColorsContext);

  const handleStaffSelect = (value) => setStaff(value);
  const handleAssignLocation = (value) => setAssignLocation(value);
  const handleState = (value) => setState(value);

  return (
    <Formik
      initialValues={{}}
      validate={(values) => {
        const errors = {};
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
            <div className={`grid grid-cols-2 gap-7`}>
              <div className={"space-y-5"}>
                <label className="inline-flex items-center w-full">
                  <span className={"text-base flex-shrink-0 w-44"}>
                    Assign to staff
                  </span>

                  <CustomSelect
                    onChange={handleStaffSelect}
                    placeholder={"Account #"}
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
                    className={`h-[50px] w-full ${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                    colorBorder={colorsObject.primary}
                  />
                </label>

                <label className="inline-flex items-center w-full">
                  <span className={"text-base flex-shrink-0 w-44"}>
                    Assign to Location
                  </span>

                  <CustomSelect
                    onChange={handleAssignLocation}
                    placeholder={"Select  Location"}
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
                    className={`h-[50px] w-full ${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                    colorBorder={colorsObject.primary}
                  />
                </label>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse items-center w-full h-[50px]"
                  }
                  className={classNames(
                    ManagementStyle["CheckModal__form-element__shadow"],
                    "w-full text-base",
                  )}
                  type={"text"}
                  spanText={"Student id"}
                  placeholder={"Student ID"}
                  fontSize={"text-base"}
                  spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right relative after:right-16 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  colorBorder={colorsObject.primary}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse items-center w-full h-[50px]"
                  }
                  className={classNames(
                    ManagementStyle["CheckModal__form-element__shadow"],
                    "w-full text-base",
                  )}
                  type={"text"}
                  spanText={"First name"}
                  placeholder={"First name"}
                  fontSize={"text-base"}
                  spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right relative after:right-16 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  colorBorder={colorsObject.primary}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse items-center w-full h-[50px]"
                  }
                  className={classNames(
                    ManagementStyle["CheckModal__form-element__shadow"],
                    "w-full text-base",
                  )}
                  type={"text"}
                  spanText={"Last name"}
                  placeholder={"Last name"}
                  fontSize={"text-base"}
                  spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right relative after:right-16 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  colorBorder={colorsObject.primary}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse items-center w-full h-[50px]"
                  }
                  className={classNames(
                    ManagementStyle["CheckModal__form-element__shadow"],
                    "w-full text-base",
                  )}
                  type={"text"}
                  spanText={" Middle name"}
                  placeholder={" Middle name"}
                  fontSize={"text-base"}
                  spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right relative after:right-11 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  colorBorder={colorsObject.primary}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse items-center w-full h-[50px]"
                  }
                  className={classNames(
                    ManagementStyle["CheckModal__form-element__shadow"],
                    "w-full text-base",
                  )}
                  type={"text"}
                  spanText={"Address"}
                  placeholder={"Address"}
                  fontSize={"text-base"}
                  spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right relative after:right-16 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  colorBorder={colorsObject.primary}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse items-center w-full h-[50px]"
                  }
                  className={classNames(
                    ManagementStyle["CheckModal__form-element__shadow"],
                    "w-full text-base",
                  )}
                  type={"text"}
                  spanText={"City"}
                  placeholder={"City"}
                  fontSize={"text-base"}
                  spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right relative after:right-28 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  colorBorder={colorsObject.primary}
                />

                <label className="inline-flex items-center w-full">
                  <span
                    className={`text-base flex-shrink-0 w-44 relative after:right-28 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    State
                  </span>

                  <CustomSelect
                    onChange={handleAssignLocation}
                    placeholder={"Select  Location"}
                    fontSize={14}
                    options={[
                      {
                        value: "USA",
                        label: "USA",
                      },
                    ]}
                    className={`h-[50px] w-full ${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                    colorBorder={colorsObject.primary}
                  />
                </label>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse items-center w-full h-[50px]"
                  }
                  className={classNames(
                    ManagementStyle["CheckModal__form-element__shadow"],
                    "w-full text-base",
                  )}
                  type={"text"}
                  spanText={"Zip/Postal code"}
                  placeholder={"Zip/Postal code"}
                  fontSize={"text-base"}
                  spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right relative after:right-6 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  colorBorder={colorsObject.primary}
                />

                <label className="flex items-center w-full">
                  <span
                    className={`text-base flex-shrink-0 w-44 relative after:right-11 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Home Phone
                  </span>

                  <div
                    className={`flex rounded-lg border border-indigo-600 overflow-hidden ${ManagementStyle["CheckModal__form-element__shadow"]} flex-grow ${EnrollmentStyle["Enrollment__input-wrap"]}`}
                  >
                    <input
                      placeholder={"Home Phone"}
                      className={`h-[50px] outline-0 flex-grow px-5 py-2`}
                      name={"phone"}
                      value={values.phone}
                      onChange={handleChange}
                    />

                    <CustomCheckBox
                      className={`flex-row-reverse px-3 items-center ${EnrollmentStyle["Enrollment__checkbox"]}`}
                    >
                      Send text
                    </CustomCheckBox>
                  </div>
                </label>

                <CustomCheckBox
                  className={
                    "inline-flex flex-row-reverse items-center justify-end w-full h-[50px]"
                  }
                >
                  <span className={`text-base flex-shrink-0 w-44`}>
                    Home Phone
                  </span>
                </CustomCheckBox>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse items-center w-full h-[50px]"
                  }
                  className={classNames(
                    ManagementStyle["CheckModal__form-element__shadow"],
                    "w-full text-base",
                  )}
                  type={"email"}
                  spanText={"Email"}
                  placeholder={"Email"}
                  fontSize={"text-base"}
                  spanClassName={`flex-shrink-0 w-44 text-start flex-shrink-0 text-right relative after:right-24 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  colorBorder={colorsObject.primary}
                />

                <div className="flex cursor-pointer items-center w-full h-[50px]">
                  <span className={`text-base flex-shrink-0 w-44`}>Gender</span>

                  <div className={`flex flex-grow gap-2.5`}>
                    <CustomRadio
                      classNames={"inline-flex gap-2.5 items-center"}
                      name={"gender"}
                      className={
                        ManagementStyle["CheckModal__form-element__shadow"]
                      }
                    >
                      <span className={`text-base`}>Man</span>
                    </CustomRadio>

                    <CustomRadio
                      classNames={"inline-flex gap-2.5 items-center"}
                      name={"gender"}
                      className={
                        ManagementStyle["CheckModal__form-element__shadow"]
                      }
                    >
                      <span className={`text-base`}>Woman</span>
                    </CustomRadio>

                    <CustomRadio
                      classNames={"inline-flex gap-2.5 items-center"}
                      name={"gender"}
                      className={
                        ManagementStyle["CheckModal__form-element__shadow"]
                      }
                    >
                      <span className={`text-base`}>Other</span>
                    </CustomRadio>
                  </div>
                </div>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse items-center w-full h-[50px]"
                  }
                  className={classNames(
                    ManagementStyle["CheckModal__form-element__shadow"],
                    "w-full text-base",
                  )}
                  type={"text"}
                  spanText={"Preferred Pronoun"}
                  placeholder={"Preferred Pronoun"}
                  fontSize={"text-base"}
                  spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                />

                <label className="flex items-center w-full">
                  <span className={`text-base flex-shrink-0 w-44`}>
                    Medical condition
                  </span>

                  <textarea
                    className={`inline-block text-base p-5 rounded-lg w-full outline-0 border border-indigo-600 min-h-16 max-h-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    name={"condition"}
                    placeholder={"Medical condition"}
                  ></textarea>
                </label>

                <label className="flex items-center gap-4 w-full">
                  <span className={`text-base flex-shrink-0 w-40`}>
                    Student driving notes
                  </span>

                  <textarea
                    className={`inline-block text-base p-5 rounded-lg w-full outline-0 border border-indigo-600 min-h-16 max-h-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    name={"condition"}
                    placeholder={"Student driving notes"}
                  ></textarea>
                </label>

                <CustomCheckBox
                  className={
                    "text-base font-normal inline-flex w-full justify-center"
                  }
                >
                  I have read and agreed to Terms and Conditions
                </CustomCheckBox>
              </div>

              <div className={"space-y-5"}>
                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    DL/Permit
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
                      placeholder={"DL/Permit"}
                      name={"Permit"}
                      value={values.Permit}
                      onClick={handleChange}
                    />
                  </div>
                </label>

                {errors.Permit && touched.Permit && <div>{errors.Permit}</div>}

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    DL/Permit Issued
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
                      placeholder={"DL/Permit Issued"}
                      name={"PermitIssued"}
                      value={values.PermitIssued}
                      onClick={handleChange}
                    />
                  </div>
                </label>

                {errors.PermitIssued && touched.PermitIssued && (
                  <div>{errors.PermitIssued}</div>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    DL Permit Expiration
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
                      placeholder={"DL Permit Expiration"}
                      name={"PermitExpiration"}
                      value={values.PermitExpiration}
                      onClick={handleChange}
                    />
                  </div>
                </label>

                {errors.PermitExpiration && touched.PermitExpiration && (
                  <div>{errors.PermitExpiration}</div>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Self Scheduling
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomCheckBox />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Payment Plan
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomCheckBox />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Extantion Date
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
                      placeholder={"Extantion Date"}
                      name={"ExtantionDate"}
                      value={values.ExtantionDate}
                      onClick={handleChange}
                    />
                  </div>
                </label>

                {errors.ExtantionDate && touched.ExtantionDate && (
                  <div>{errors.ExtantionDate}</div>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    High School
                  </Paragraph>

                  <CustomSelect
                    value={values.Lead}
                    onChange={(value) => setLead(value)}
                    options={LeadOptions}
                    className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}
                    optionFontSize={14}
                    optionSelectedFontWeight={400}
                    fontSize={16}
                    colorBorder={colorsObject.primary}
                    name={"HighSchool"}
                    onClick={handleChange}
                  />
                </label>

                {errors.HighSchool && touched.HighSchool && (
                  <div>{errors.PermitIssued}</div>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Parent name
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
                      placeholder={"Parent name"}
                      name={"ParentName"}
                      value={values.ParentName}
                      onClick={handleChange}
                    />
                  </div>
                </label>

                {errors.ParentName && touched.ParentName && (
                  <div>{errors.ParentName}</div>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Parent Phone
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
                      placeholder={"Parent Phone"}
                      name={"ParentPhone"}
                      value={values.ParentPhone}
                      onClick={handleChange}
                    />
                  </div>
                </label>

                {errors.ParentPhone && touched.ParentPhone && (
                  <div>{errors.ParentPhone}</div>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Parent Email
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
                      placeholder={"Parent Email"}
                      name={"ParentEmail"}
                      value={values.ParentEmail}
                      onClick={handleChange}
                    />
                  </div>
                </label>

                {errors.ParentEmail && touched.ParentEmail && (
                  <div>{errors.ParentEmail}</div>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Parent Name 2
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
                      placeholder={"Parent Name 2"}
                      name={"ParentName2"}
                      value={values.ParentName2}
                      onClick={handleChange}
                    />
                  </div>
                </label>

                {errors.ParentName2 && touched.ParentName2 && (
                  <div>{errors.ParentName2}</div>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Parent Phone 2
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
                      placeholder={"Parent Phone 2"}
                      name={"ParentPhone2"}
                      value={values.ParentPhone2}
                      onClick={handleChange}
                    />
                  </div>
                </label>

                {errors.ParentPhone2 && touched.ParentPhone2 && (
                  <div>{errors.ParentPhone2}</div>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Parent Email 2
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
                      placeholder={"Parent Email 2"}
                      name={"ParentEmail2"}
                      value={values.ParentEmail2}
                      onClick={handleChange}
                    />
                  </div>
                </label>

                {errors.ParentEmail2 && touched.ParentEmail2 && (
                  <div>{errors.ParentEmail2}</div>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Home Dropoff
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomCheckBox />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Date of birth
                  </Paragraph>

                  <div
                    style={{ gap: "20px" }}
                    className={`flex h-10 ${EnrollmentStyle["Enrollment__div"]}`}
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
                    value={values.Lead}
                    onChange={(value) => setLead(value)}
                    options={LeadOptions}
                    className={`mb-2.5 h-10 ${EnrollmentStyle["Enrollment__div"]}`}
                    optionFontSize={14}
                    optionSelectedFontWeight={400}
                    fontSize={16}
                    colorBorder={colorsObject.primary}
                    name={"Lead"}
                    onClick={handleChange}
                  />
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Student notes
                  </Paragraph>

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
                    <textarea
                      className={`block p-5 rounded-lg w-full shadow-lg ${EnrollmentStyle["Enrollment__textarea"]}`}
                      name={"StudentNotes"}
                      value={values.StudentNotes}
                      onClick={handleChange}
                    ></textarea>
                  </div>
                </label>

                {errors.StudentNotes && touched.StudentNotes && (
                  <div>{errors.StudentNotes}</div>
                )}
              </div>
            </div>

            <div className={"py-6 text-center space-x-7"}>
              <ButtonComponent
                defaultBg={"#24C18F"}
                defaultHoverBg={"#24C18F"}
                paddingInline={97}
                controlHeight={40}
                onClick={handleSubmit}
                borderRadius={5}
              >
                Save
              </ButtonComponent>

              <ButtonComponent>
                <CustomSelect
                  value={"Apply Payment & Save"}
                  selectorBg="#1890FF"
                  colorBorder="#1890FF"
                  style={{ width: "234px", height: "40px" }}
                  className={`${EnrollmentStyle["Enrollment__select"]}`}
                  options={[
                    {
                      value: "Process Credit card",
                      label: "Process Credit card",
                    },
                    {
                      value: "Enter Swiped Transaction",
                      label: "Enter Swiped Transaction",
                    },
                    {
                      value: "Enter Cash Payment",
                      label: "Enter Cash Payment",
                    },
                    {
                      value: "Enter Check Payment",
                      label: "Enter Check Payment",
                    },
                  ]}
                />
              </ButtonComponent>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
