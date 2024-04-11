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
  const [State, setState] = useState("");
  const [Lead, setLead] = useState("Select");
  const { colorsObject } = useContext(ColorsContext);
  const { errors, Validation } = useError();
  const ErrorValid = errors;
  return (
    <Formik
      initialValues={{
        Staff: Staff,
        Location: "",
        studentId: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: State,
        postalCode: "",
        phone: "",
        email: "",
        gender: "",
        Perferred: "",
        MedicalCondition: "",
        StudentDrivingNotes: "",
        Permit: "",
        PermitIssued: "",
        PermitExpiration: "",
        ExtantionDate: "",
        HighSchool: "",
        ParentName: "",
        ParentPhone: "",
        ParentEmail: "",
        ParentName2: "",
        ParentPhone2: "",
        ParentEmail2: "",
        Lead: "",
        StudentNotes: "",
      }}
      validate={(values) => {
        if (
          !values.Staff
          // !values.Location ||
          // !values.studentId ||
          // !values.email ||
          // !values.firstName ||
          // !values.lastName ||
          // !values.address ||
          // !values.city ||
          // !values.state ||
          // !values.postalCode ||
          // !values.phone ||
          // // !values.email ||
          // !values.gender ||
          // !values.Perferred ||
          // !values.MedicalCondition ||
          // !values.StudentDrivingNotes ||
          // !values.Permit ||
          // !values.PermitIssued ||
          // !values.PermitExpiration ||
          // !values.ExtantionDate ||
          // !values.HighSchool ||
          // !values.ParentName ||
          // !values.ParentPhone ||
          // !values.ParentEmail ||
          // !values.ParentName2 ||
          // !values.ParentPhone2 ||
          // !values.ParentEmail2 ||
          // !values.Lead ||
          // !values.StudentNotes
        ) {
          errors.Staff = "Selector cannot be unselected";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          // Validation("EMAIL_VALID");
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
                    value={Staff}
                    onBlur={handleBlur}
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
                    onChange={(value) => setStaff(value)}
                    className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}
                    colorBorder={colorsObject.primary}
                    name={"Staff"}
                  />
                </label>

                {(errors.AssignToLocation || touched.AssignToLocation) && (
                  <Fragment>
                    <div>{ErrorValid.input}</div>
                  </Fragment>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Assign to Location
                  </Paragraph>

                  <CustomSelect
                    value={Location !== "" ? Location : "Select  Location"}
                    // onChange={(value) => setInfoType(value)}
                    options={InfoTypeOptions}
                    className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}
                    colorBorder={colorsObject.primary}
                    name={"Location"}
                    onChange={handleChange}
                  />
                </label>

                {(errors.Location || touched.Location) && (
                  <Fragment>
                    <div>{errors.Location}</div>
                  </Fragment>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Studetn id
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
                      placeholder={"Student id"}
                      name={"studentId"}
                      value={values.studentId}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                {(errors.studentId || touched.studentId) && (
                  <Fragment>
                    <div>{errors.studentId}</div>
                  </Fragment>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    First name
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
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

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
                      placeholder={"Last name"}
                      name={"lastName"}
                      value={values.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    Middle name
                  </Paragraph>
                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
                      placeholder={"Middle name"}
                      name={"middleName"}
                      value={values.middleName}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                {errors.middleName && touched.middleName && (
                  <div>{errors.middleName}</div>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    Address
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
                      placeholder={"Address"}
                      name={"address"}
                      value={values.address}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                {errors.address && touched.address && (
                  <div>{errors.address}</div>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    City
                  </Paragraph>
                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
                      placeholder={"City"}
                      name={"city"}
                      value={values.city}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                {errors.city && touched.city && <div>{errors.city}</div>}

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    State
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomSelect
                      value={State !== "" ? State : "State"}
                      onChange={(value) => setState(value)}
                      options={InfoTypeOptions}
                      // style={{ width: "408px" }}
                      className={"mb-2.5 h-full w-full"}
                      colorBorder={colorsObject.primary}
                      name={"state"}
                    />
                  </div>
                </label>

                {errors.state && touched.state && <div>{errors.state}</div>}

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    Zip/Postal code
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={`h-full w-full`}
                      placeholder={"Zip/Postal code"}
                      name={"postalCode"}
                      value={values.postalCode}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                {errors.postalCode && touched.postalCode && (
                  <div>{errors.postalCode}</div>
                )}

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
                      className={`h-10 ${EnrollmentStyle["Enrollment__input"]} flex-grow px-5 py-2 w-44`}
                      name={"phone"}
                      value={values.phone}
                      onChange={handleChange}
                    />

                    <CustomCheckBox
                      className={`flex-row-reverse px-3 items-center  ${EnrollmentStyle["Enrollment__checkbox"]}`}
                    >
                      Send text
                    </CustomCheckBox>
                  </div>
                </label>

                {errors.phone && touched.phone && <div>{errors.phone}</div>}

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Home Phone
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
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

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"email"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
                      placeholder={"Email"}
                      name={"email"}
                      value={values.email}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                {errors.email && touched.email && <div>{errors.email}</div>}

                <label className="flex items-center justify-between w-full">
                  <Paragraph
                    className={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                    fontWeightStrong={400}
                    fontSize={"text-base"}
                  >
                    Gender
                  </Paragraph>

                  <Checkbox.Group
                    className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}
                  >
                    <CustomCheckBox name={"gender"} onChange={handleChange}>
                      <Text fontSize={"text-base"}>Male</Text>
                    </CustomCheckBox>

                    <CustomCheckBox name={"gender"} onChange={handleChange}>
                      <Text fontSize={"text-base"}>Female</Text>
                    </CustomCheckBox>

                    <CustomCheckBox name={"gender"} onChange={handleChange}>
                      <Text fontSize={"text-base"}>Other</Text>
                    </CustomCheckBox>
                  </Checkbox.Group>
                </label>

                {errors.gender && touched.gender && <div>{errors.gender}</div>}

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Perferred Pronoun
                  </Paragraph>

                  <div className={`h-10 ${EnrollmentStyle["Enrollment__div"]}`}>
                    <CustomInput
                      type={"text"}
                      colorBorder={colorsObject.primary}
                      classNames={"h-full w-full"}
                      placeholder={"Perferred Pronoun"}
                      name={"Perferred"}
                      value={values.Perferred}
                      onChange={handleChange}
                    />
                  </div>
                </label>

                {errors.Perferred && touched.Perferred && (
                  <div>{errors.Perferred}</div>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Medical condition
                  </Paragraph>

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
                    <textarea
                      className={`block p-5 rounded-lg w-full shadow-lg ${EnrollmentStyle["Enrollment__textarea"]}`}
                      name={"MedicalCondition"}
                      value={values.MedicalCondition}
                      onClick={handleChange}
                    ></textarea>
                  </div>
                </label>

                {errors.MedicalCondition && touched.MedicalCondition && (
                  <div>{errors.MedicalCondition}</div>
                )}

                <label className="flex items-center justify-between w-full">
                  <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                    Student driving notes
                  </Paragraph>

                  <div className={`${EnrollmentStyle["Enrollment__div"]}`}>
                    <textarea
                      className={`block p-5 rounded-lg w-full shadow-lg ${EnrollmentStyle["Enrollment__textarea"]}`}
                      name={"StudentDrivingNotes"}
                      value={values.StudentDrivingNotes}
                      onClick={handleChange}
                    ></textarea>
                  </div>
                </label>

                {errors.StudentDrivingNotes && touched.StudentDrivingNotes && (
                  <div>{errors.StudentDrivingNotes}</div>
                )}

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
