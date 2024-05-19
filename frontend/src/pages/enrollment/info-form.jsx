import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Modal from "@/components/modal/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { FormValidate } from "@/modules/enrollments.jsx";
import { FormError } from "@/modules/errors.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import classNames from "classnames";
import { Formik } from "formik";
import { Fragment, useContext, useMemo, useReducer, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { VscError } from "react-icons/vsc";
import EnrollmentStyle from "./enrollment.module.scss";

const reducer = (state, action) => {
  switch (action.type) {
    case "SUBMITTED": {
      return {
        ...state,
        icon: <IoMdCheckmarkCircleOutline />,
        title: "Submitted",
        status: true,
      };
    }
    case "DISMISSED": {
      return {
        ...state,
        icon: <VscError />,
        title: "Dismissed",
        status: false,
      };
    }
    default: {
      throw new Error(`Error, unknown type ${action.type}`);
    }
  }
};

export const InfoForm = () => {
  const [state, dispatch] = useReducer(reducer, {
    icon: <IoMdCheckmarkCircleOutline />,
    title: "Submitted",
    status: true,
  });

  const [SelectSubmit, setSelectSubmit] = useState(false);
  const [Staff, setStaff] = useState("");
  const [AssignLocation, setAssignLocation] = useState("");
  const [State, setState] = useState("");
  const [HighSchool, setHighSchool] = useState("");
  const [Lead, setLead] = useState("Select");
  const [IsOpen, setIsOpen] = useState(false);
  const { colorsObject } = useContext(ColorsContext);

  const handleStaffSelect = (value) => {
    setStaff(value);
  };

  const handleAssignLocation = (value) => setAssignLocation(value);
  const handleState = (value) => setState(value);
  const handleHighSchool = (value) => setHighSchool(value);
  const handleLead = (value) => setHighSchool(value);
  const handleModal = (state = false) => {
    setIsOpen(true);
    if (state) {
      dispatch({ type: "SUBMITTED" });
    } else {
      dispatch({ type: "DISMISSED" });
    }
  };

  const selects = [State, Staff, AssignLocation, HighSchool, Lead];

  const stateSelects = useMemo(() => {
    let state = false;
    for (let i = 0; i < selects.length; i++) {
      if (selects[i] === "") {
        state = true;
        break;
      }
    }

    return state;
  }, [State, Staff, AssignLocation, HighSchool, Lead]);

  const handleSubmit = (values) => {
    handleModal(!stateSelects);

    setSelectSubmit(!!stateSelects);
    console.log({
      ...values,
      staff: Staff,
      location: AssignLocation,
      state: State,
      school: HighSchool,
      lead: Lead,
    });
  };

  return (
    <Fragment>
      <Formik
        initialValues={{
          studentId: "",
          first_name: "",
          last_name: "",
          middle_name: "",
          address: "",
          city: "",
          zip: "",
          home_phone_1: "",
          home_phone_2: "",
          gender: "",
          preferred_pronoun: "",
          email: "",
          condition: "",
          driving_notes: "",
          permit: "",
          permit_issued: "",
          permit_expiration: "",
          scheduling: "",
          payment: "",
          date: "",
          parent_name: "",
          parent_phone: "",
          parent_email: "",
          home_drop_off: "",
          birthday: "",
          student_notes: "",
        }}
        validate={(values) => FormValidate(values)}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className={`grid grid-cols-2 gap-7`}>
                <div className={"space-y-5"}>
                  <label className="inline-flex items-center w-full">
                    <span className={"text-base flex-shrink-0 w-44"}>
                      Assign to staff
                    </span>

                    <div className={"w-full"}>
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
                        value={!Staff ? undefined : Staff}
                      />

                      {SelectSubmit && (
                        <FormError>Select Assign to staff</FormError>
                      )}
                    </div>
                  </label>

                  <label className="inline-flex items-center w-full">
                    <span className={"text-base flex-shrink-0 w-44"}>
                      Assign to Location
                    </span>

                    <div className="w-full">
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
                      {SelectSubmit && (
                        <FormError>Select Assign to Location</FormError>
                      )}
                    </div>
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
                    spanClassName={`flex-shrink-0 w-44 text-start flex-shrink-0 text-right relative after:right-16 ${EnrollmentStyle["Enrollment__heavy"]}`}
                    colorBorder={colorsObject.primary}
                    value={values.studentId}
                    onChange={handleChange}
                    name={"studentId"}
                  >
                    {errors.error && (
                      <FormError className={"pl-44"}>{errors.error}</FormError>
                    )}
                  </CustomInput>

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
                    spanClassName={`flex-shrink-0 w-44 text-start flex-shrink-0 text-right relative after:right-16 ${EnrollmentStyle["Enrollment__heavy"]}`}
                    colorBorder={colorsObject.primary}
                    value={values.first_name}
                    onChange={handleChange}
                    name={"first_name"}
                  >
                    {errors.error && (
                      <FormError className={"pl-44"}>{errors.error}</FormError>
                    )}
                  </CustomInput>

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
                    spanClassName={`flex-shrink-0 w-44 text-start flex-shrink-0 text-right relative after:right-16 ${EnrollmentStyle["Enrollment__heavy"]}`}
                    colorBorder={colorsObject.primary}
                    value={values.last_name}
                    onChange={handleChange}
                    name={"last_name"}
                  >
                    {errors.error && (
                      <FormError className={"pl-44"}>{errors.error}</FormError>
                    )}
                  </CustomInput>

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
                    spanClassName={`flex-shrink-0 w-44 text-start flex-shrink-0 text-right relative after:right-11 ${EnrollmentStyle["Enrollment__heavy"]}`}
                    colorBorder={colorsObject.primary}
                    value={values.middle_name}
                    onChange={handleChange}
                    name={"middle_name"}
                  >
                    {errors.error && (
                      <FormError className={"pl-44"}>{errors.error}</FormError>
                    )}
                  </CustomInput>

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
                    value={values.address}
                    onChange={handleChange}
                    name={"address"}
                  >
                    {errors.error && (
                      <FormError className={"pl-44"}>{errors.error}</FormError>
                    )}
                  </CustomInput>

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
                    value={values.city}
                    onChange={handleChange}
                    name={"city"}
                  >
                    {errors.error && (
                      <FormError className={"pl-44"}>{errors.error}</FormError>
                    )}
                  </CustomInput>

                  <label className="inline-flex items-center w-full">
                    <span
                      className={`text-base flex-shrink-0 w-44 relative after:right-28 ${EnrollmentStyle["Enrollment__heavy"]}`}
                    >
                      State
                    </span>

                    <CustomSelect
                      onChange={handleState}
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
                    value={values.zip}
                    onChange={handleChange}
                    name={"zip"}
                  >
                    {errors.error && (
                      <FormError className={"pl-44"}>{errors.error}</FormError>
                    )}
                  </CustomInput>

                  <label className="flex items-center w-full">
                    <span
                      className={`text-base flex-shrink-0 w-44 relative after:right-11 ${EnrollmentStyle["Enrollment__heavy"]}`}
                    >
                      Home Phone
                    </span>

                    <div
                      className={`flex rounded-lg border border-indigo-600 overflow-hidden ${ManagementStyle["CheckModal__form-element__shadow"]} ${EnrollmentStyle["Enrollment__input-wrap"]}`}
                    >
                      <input
                        placeholder={"Home Phone"}
                        className={`h-[50px] outline-0 w-full px-5 py-2`}
                        name={"home_phone_1"}
                        value={values.home_phone_1}
                        onChange={handleChange}
                      />

                      <CustomCheckBox
                        className={`flex-row-reverse flex-shrink-0 px-3 items-center `}
                      >
                        Send text
                      </CustomCheckBox>
                    </div>
                  </label>

                  <div>
                    <CustomCheckBox
                      className={
                        "inline-flex flex-row-reverse items-center justify-end w-full h-[50px]"
                      }
                      classNames={"w-[40px] h-[40px]"}
                      name={"home_phone_2"}
                      onChange={handleChange}
                      value={"+www"}
                    >
                      <span className={`text-base flex-shrink-0 w-44`}>
                        Home Phone
                      </span>
                    </CustomCheckBox>

                    {errors.error && (
                      <FormError className={"pl-44"}>
                        Select Home phone
                      </FormError>
                    )}
                  </div>

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
                    name={"email"}
                    onChange={handleChange}
                  >
                    {errors.email && (
                      <FormError className={"pl-44"}>{errors.email}</FormError>
                    )}
                  </CustomInput>

                  <div className="flex cursor-pointer items-center w-full h-[50px]">
                    <span className={`text-base flex-shrink-0 w-44`}>
                      Gender
                    </span>

                    <div className={"w-full"}>
                      <div className={`flex flex-grow gap-2.5`}>
                        <CustomRadio
                          classNames={"inline-flex gap-2.5 items-center"}
                          name={"gender"}
                          onChange={handleChange}
                          value={"Man"}
                          className={
                            ManagementStyle["CheckModal__form-element__shadow"]
                          }
                        >
                          <span className={`text-base`}>Man</span>
                        </CustomRadio>

                        <CustomRadio
                          classNames={"inline-flex gap-2.5 items-center"}
                          name={"gender"}
                          value={"Woman"}
                          onChange={handleChange}
                          className={
                            ManagementStyle["CheckModal__form-element__shadow"]
                          }
                        >
                          <span className={`text-base`}>Woman</span>
                        </CustomRadio>

                        <CustomRadio
                          classNames={"inline-flex gap-2.5 items-center"}
                          name={"gender"}
                          value={"Other"}
                          onChange={handleChange}
                          className={
                            ManagementStyle["CheckModal__form-element__shadow"]
                          }
                        >
                          <span className={`text-base`}>Other</span>
                        </CustomRadio>
                      </div>
                      {errors.error && <FormError>Choose gender</FormError>}
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
                    value={values.preferred_pronoun}
                    onChange={handleChange}
                    name={"preferred_pronoun"}
                  >
                    {errors.error && (
                      <FormError className={"pl-44"}>{errors.error}</FormError>
                    )}
                  </CustomInput>

                  <label className="flex items-center w-full">
                    <span className={`text-base flex-shrink-0 w-44`}>
                      Medical condition
                    </span>

                    <div className="w-full">
                      <textarea
                        className={`inline-block text-base p-5 rounded-lg w-full outline-0 border border-indigo-600 min-h-16 max-h-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                        name={"condition"}
                        placeholder={"Medical condition"}
                        onChange={handleChange}
                        value={values.condition}
                      ></textarea>
                      {errors.error && <FormError>{errors.error}</FormError>}
                    </div>
                  </label>

                  <label className="flex items-center gap-4 w-full">
                    <span className={`text-base flex-shrink-0 w-40`}>
                      Student driving notes
                    </span>

                    <div className="w-full">
                      <textarea
                        className={`inline-block text-base p-5 rounded-lg w-full outline-0 border border-indigo-600 min-h-16 max-h-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                        name={"driving_notes"}
                        placeholder={"Student driving notes"}
                        onChange={handleChange}
                        value={values.driving_notes}
                      ></textarea>
                      {errors.error && <FormError>{errors.error}</FormError>}
                    </div>
                  </label>

                  <CustomCheckBox
                    className={
                      "text-base font-normal inline-flex w-full justify-center pl-44"
                    }
                  >
                    I have read and agreed to Terms and Conditions
                  </CustomCheckBox>
                </div>

                <div className={"space-y-5"}>
                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse items-center w-full h-[50px]"
                    }
                    className={classNames(
                      ManagementStyle["CheckModal__form-element__shadow"],
                      "w-full text-base",
                    )}
                    type={"text"}
                    spanText={"DL/Permit"}
                    placeholder={"DL/Permit"}
                    fontSize={"text-base"}
                    spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                    onChange={handleChange}
                    name={"permit"}
                    value={values.permit}
                  >
                    {errors.error && (
                      <FormError className={"pl-44"}>{errors.error}</FormError>
                    )}
                  </CustomInput>

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse items-center w-full h-[50px]"
                    }
                    className={classNames(
                      ManagementStyle["CheckModal__form-element__shadow"],
                      "w-full text-base",
                    )}
                    type={"text"}
                    spanText={"DL/Permit Issued"}
                    placeholder={"DL/Permit Issued"}
                    fontSize={"text-base"}
                    spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                    onChange={handleChange}
                    value={values.permit_issued}
                    name={"permit_issued"}
                  >
                    {errors.error && (
                      <FormError className={"pl-44"}>{errors.error}</FormError>
                    )}
                  </CustomInput>

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse items-center w-full h-[50px]"
                    }
                    className={classNames(
                      ManagementStyle["CheckModal__form-element__shadow"],
                      "w-full text-base",
                    )}
                    type={"text"}
                    spanText={"DL Permit Expiration"}
                    placeholder={"DL Permit Expiration"}
                    fontSize={"text-base"}
                    spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                    name={"permit_expiration"}
                    onChange={handleChange}
                    value={values.permit_expiration}
                  >
                    {errors.error && (
                      <FormError className={"pl-44"}>{errors.error}</FormError>
                    )}
                  </CustomInput>

                  <div>
                    <CustomCheckBox
                      className={
                        "inline-flex flex-row-reverse items-center justify-end w-full h-[50px]"
                      }
                      name={"scheduling"}
                      onChange={handleChange}
                      value={"self"}
                    >
                      <span className={`text-base flex-shrink-0 w-44`}>
                        Self Scheduling
                      </span>
                    </CustomCheckBox>
                    {errors.error && (
                      <FormError className={"pl-44"}>
                        Select Self scheduling
                      </FormError>
                    )}
                  </div>

                  <div>
                    <CustomCheckBox
                      className={
                        "inline-flex flex-row-reverse items-center justify-end w-full h-[50px]"
                      }
                      name={"payment"}
                      onChange={handleChange}
                      value={"payment"}
                    >
                      <span className={`text-base flex-shrink-0 w-44`}>
                        Payment Plan
                      </span>
                    </CustomCheckBox>
                    {errors.error && (
                      <FormError className={"pl-44"}>
                        Select Payment Plan
                      </FormError>
                    )}
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
                    spanText={"Extinction Date"}
                    placeholder={"Extinction Date"}
                    fontSize={"text-base"}
                    spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                    name={"date"}
                    onChange={handleChange}
                    value={values.date}
                  >
                    {errors.error && (
                      <FormError className={"pl-44"}>{errors.error}</FormError>
                    )}
                  </CustomInput>

                  <label className="inline-flex items-center w-full">
                    <span className={"text-base flex-shrink-0 w-44"}>
                      High School
                    </span>

                    <div className={"w-full"}>
                      <CustomSelect
                        onChange={handleHighSchool}
                        placeholder={"Select school"}
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
                        value={!HighSchool ? undefined : Staff}
                      />

                      {SelectSubmit && (
                        <FormError>Select Assign to staff</FormError>
                      )}
                    </div>
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
                    spanText={"Parent name"}
                    placeholder={"Parent name"}
                    fontSize={"text-base"}
                    spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                    name={"parent_name"}
                    onChange={handleChange}
                    value={values.parent_name}
                  >
                    {errors.error && (
                      <FormError className={"pl-44"}>{errors.error}</FormError>
                    )}
                  </CustomInput>

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse items-center w-full h-[50px]"
                    }
                    className={classNames(
                      ManagementStyle["CheckModal__form-element__shadow"],
                      "w-full text-base",
                    )}
                    type={"text"}
                    spanText={"Parent Phone"}
                    placeholder={"Parent Phone"}
                    fontSize={"text-base"}
                    spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                    name={"parent_phone"}
                    onChange={handleChange}
                    value={values.parent_phone}
                  >
                    {errors.error && (
                      <FormError className={"pl-44"}>{errors.error}</FormError>
                    )}
                  </CustomInput>

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse items-center w-full h-[50px]"
                    }
                    className={classNames(
                      ManagementStyle["CheckModal__form-element__shadow"],
                      "w-full text-base",
                    )}
                    type={"email"}
                    spanText={"Parent Email"}
                    placeholder={"Parent Email"}
                    fontSize={"text-base"}
                    spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                    name={"parent_email"}
                    onChange={handleChange}
                    value={values.parent_email}
                  >
                    {errors.email && (
                      <FormError className={"pl-44"}>{errors.email}</FormError>
                    )}
                  </CustomInput>

                  <CustomInput
                    classNames={
                      "inline-flex flex-row-reverse items-center w-full h-[50px]"
                    }
                    className={classNames(
                      ManagementStyle["CheckModal__form-element__shadow"],
                      "w-full text-base",
                    )}
                    type={"text"}
                    spanText={"Parent name 2"}
                    placeholder={"Parent name"}
                    fontSize={"text-base"}
                    spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
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
                    spanText={"Parent Phone 2"}
                    placeholder={"Parent Phone"}
                    fontSize={"text-base"}
                    spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
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
                    type={"email"}
                    spanText={"Parent Email 2"}
                    placeholder={"Parent Email"}
                    fontSize={"text-base"}
                    spanClassName={` flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
                    colorBorder={colorsObject.primary}
                  />

                  <div>
                    <CustomCheckBox
                      className={
                        "inline-flex flex-row-reverse items-center justify-end w-full h-[50px]"
                      }
                      name={"home_drop_off"}
                      value={values.home_drop_off}
                      onChange={handleChange}
                    >
                      <span className={`text-base flex-shrink-0 w-44`}>
                        Home Drop off
                      </span>
                    </CustomCheckBox>

                    {errors.error && (
                      <FormError className={"pl-44"}>
                        Select Home phone
                      </FormError>
                    )}
                  </div>

                  <label className="flex items-center w-full">
                    <span className={"text-base flex-shrink-0 w-44"}>
                      Date of birth
                    </span>

                    <div className={`grid grid-cols-3 gap-5`}>
                      <CustomSelect
                        colorBorder={colorsObject.primary}
                        className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                        placeholder={"Day"}
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
                      />
                      <CustomSelect
                        colorBorder={colorsObject.primary}
                        className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                        placeholder={"Month"}
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
                      />
                      <CustomSelect
                        colorBorder={colorsObject.primary}
                        className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                        placeholder={"Year"}
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
                      />
                    </div>
                  </label>

                  <label className="inline-flex items-center w-full">
                    <span className={"text-base flex-shrink-0 w-44"}>Lead</span>

                    <div className={"w-full"}>
                      <CustomSelect
                        onChange={handleLead}
                        placeholder={"Select Lead"}
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
                        value={!Lead ? undefined : Staff}
                      />

                      {SelectSubmit && <FormError>Select Lead</FormError>}
                    </div>
                  </label>

                  <label className="flex items-center gap-4 w-full">
                    <span className={`text-base flex-shrink-0 w-40`}>
                      Student notes
                    </span>

                    <div className={"w-full"}>
                      <textarea
                        className={`inline-block text-base p-5 rounded-lg w-full outline-0 border border-indigo-600 min-h-16 max-h-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                        name={"student_notes"}
                        placeholder={"Student notes"}
                        value={values.student_notes}
                        onChange={handleChange}
                      ></textarea>

                      {errors.error && <FormError>{errors.error}</FormError>}
                    </div>
                  </label>
                </div>
              </div>

              <div className={"py-6 text-center space-x-7"}>
                <ButtonComponent
                  defaultBg={colorsObject.success}
                  defaultHoverBg={colorsObject.successHover}
                  paddingInline={97}
                  controlHeight={40}
                  type={"submit"}
                  borderRadius={5}
                >
                  Save
                </ButtonComponent>

                <CustomSelect
                  placeholder={"Apply Payment & Save"}
                  selectorBg={colorsObject.info}
                  colorBorder={colorsObject.info}
                  style={{ width: "234px" }}
                  className={`h-10 placeholder:text-white ${EnrollmentStyle["Enrollment__select"]}`}
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
              </div>
            </form>
          );
        }}
      </Formik>

      {IsOpen && (
        <Modal setIsOpen={setIsOpen}>
          <div className="border border-indigo-600 rounded-2xl text-center pt-[68px] pb-24 relative bg-white max-w-[636px] w-full">
            <IconComponent
              className={"absolute top-6 right-6 text-2xl"}
              icon={<IoCloseOutline />}
              onClick={() => setIsOpen(false)}
            />

            <IconComponent
              className={`text-8xl ${state.status ? "text-indigo-600" : "text-red-600"}`}
              icon={state.icon}
            />

            <Title fontSize={"text-3xl"}>{state.title}</Title>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};
