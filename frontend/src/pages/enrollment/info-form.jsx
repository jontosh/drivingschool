import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { AlertError, AlertSuccess } from "@/hooks/alert.jsx";
import { useDate } from "@/hooks/useDate.jsx";
import { FormValidate } from "@/modules/enrollments.jsx";
import { FormError } from "@/modules/errors.jsx";
import { PronounOptions, StaffType } from "@/modules/select-options.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import {
  useRequestGetQuery,
  useRequestPostMutation,
} from "@/redux/query/index.jsx";
import MDEditor from "@uiw/react-md-editor";
import { DatePicker } from "antd";
import classNames from "classnames";
import { Formik } from "formik";
import {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import rehypeSanitize from "rehype-sanitize";
import EnrollmentStyle from "./enrollment.module.scss";

const reducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS": {
      return {
        ...state,
        status: <AlertSuccess setIsOpen={action.setIsOpen} />,
      };
    }
    case "ERROR": {
      return {
        ...state,
        status: <AlertError setIsOpen={action.setIsOpen} />,
      };
    }

    default: {
      console.error(`Unknown action: ${action.type}`);
    }
  }
};

export const InfoForm = () => {
  const { data: LocationData } = useRequestGetQuery({
    path: "/account_management/location/",
  });

  const { data: SchoolData } = useRequestGetQuery({
    path: "/account_management/schools/",
  });

  const [requestPost] = useRequestPostMutation();

  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });
  const { YearsOptions, Days, Months } = useDate();
  const [SelectSubmit, setSelectSubmit] = useState(false);
  const [Staff, setStaff] = useState("");
  const [NotesValue, setNotesValue] = useState("Hello");
  const [LocationOptions, setLocationOptions] = useState([]);
  const [AssignLocation, setAssignLocation] = useState("");
  const [Pronoun, setPronoun] = useState("");
  const [State, setState] = useState("");
  const [HighSchool, setHighSchool] = useState("");
  const [BirthDay, setBirthDay] = useState("");
  const [BirthMonth, setBirthMonth] = useState("");
  const [BirthYear, setBirthYear] = useState("");
  const [HighSchoolOptions, setHighSchoolOptions] = useState([]);
  const [MedConditionValue, setMedConditionValue] = useState("Hello");
  const [DrivingNotesValue, setDrivingNotesValue] = useState("Hello");
  const [Lead, setLead] = useState("Select");
  const [DLIssued, setDLIssued] = useState(null);
  const [DLExpireDate, setDLExpireDate] = useState(null);
  const [ExtinctionDate, setExtinctionDate] = useState(null);
  const { colorsObject } = useContext(ColorsContext);

  const handleStaffSelect = (value) => {
    setStaff(value);
  };
  const handleMedCondition = (value) => setMedConditionValue(value);
  const handleDay = (value) => setBirthDay(value);
  const handleMonth = (value) => setBirthMonth(value);
  const handleYear = (value) => setBirthYear(value);
  const handleNotesValue = (value) => setNotesValue(value);
  const handleDrivingNotes = (value) => setDrivingNotesValue(value);
  const handleAssignLocation = (value) => setAssignLocation(value);
  const handleState = (value) => setState(value);
  const handleHighSchool = (value) => setHighSchool(value);
  const handlePronoun = (value) => setPronoun(value);
  const handleLead = (value) => setLead(value);
  const handleDLIssued = (day) =>
    setDLIssued(
      `${day["$y"]}-${Number(parseInt(day["$M"]) + 1) > 9 ? parseInt(day["$M"]) + 1 : "0" + (parseInt(day["$M"]) + 1)}-${day["$D"]}`,
    );
  const handleDLExpireDate = (day) =>
    setDLExpireDate(
      `${day["$y"]}-${Number(parseInt(day["$M"]) + 1) > 9 ? parseInt(day["$M"]) + 1 : "0" + (parseInt(day["$M"]) + 1)}-${day["$D"]}`,
    );
  const handleExtinctionDate = (day) =>
    setExtinctionDate(
      `${day["$y"]}-${Number(parseInt(day["$M"]) + 1) > 9 ? parseInt(day["$M"]) + 1 : "0" + (parseInt(day["$M"]) + 1)}-${day["$D"]}`,
    );

  useEffect(() => {
    let options = [];
    for (let i = 0; i < LocationData?.length; i++) {
      options.push({
        ...LocationData[i],
        label: LocationData[i].name,
        value: LocationData[i].id,
      });
    }

    setLocationOptions(options);
  }, [LocationData]);

  useEffect(() => {
    let options = [];
    for (let i = 0; i < SchoolData?.length; i++) {
      options.push({
        ...SchoolData[i],
        label: SchoolData[i].name,
        value: SchoolData[i].id,
      });
    }

    setHighSchoolOptions(options);
  }, [SchoolData]);

  const selects = [State, Staff, AssignLocation, HighSchool, Lead, Pronoun];

  const stateSelects = useMemo(() => {
    let state = false;
    for (let i = 0; i < selects.length; i++) {
      if (selects[i] === "") {
        state = true;
        break;
      }
    }

    return state;
  }, [State, Staff, AssignLocation, HighSchool, Lead, Pronoun]);

  const handleSubmit = async (values) => {
    setSelectSubmit(!stateSelects);

    if (!stateSelects) {
      try {
        const response = await requestPost({
          path: "/student_account/student/",
          data: {
            ...values,
            // ключей надо достать из INSTRUCTOR
            staff: Staff,
            location: AssignLocation,
            state: State,
            school: HighSchool,
            lead: Lead,
            medical_condition: MedConditionValue,
            driving_notes: DrivingNotesValue,
            dl_given_date: DLIssued,
            dl_expire_date: DLExpireDate,
            extinction_date: ExtinctionDate,
            birth: `${BirthYear}-${BirthMonth > 9 ? BirthMonth : "0" + BirthMonth}-${BirthDay > 9 ? BirthDay : "0" + BirthDay}`,
            note: NotesValue,
            preferred_pronoun: Pronoun,
          },
        });

        if (response.error.status >= 400) {
          dispatch({ type: "ERROR", setIsOpen });
          setIsOpen(true);
          console.log("failed");
        } else {
          dispatch({ type: "SUCCESS", setIsOpen });
          setIsOpen(true);
          console.log("ok");
        }
      } catch (error) {
        console.error(error?.message);
      }
    }
  };

  return (
    <Fragment>
      <Formik
        initialValues={{
          studentId: "",
          first_name: "",
          last_name: "",
          mid_name: "",
          address: "",
          city: "",
          zip: "",
          home_phone: "",
          home_phone_2: "",
          gender: "",
          email: "",
          dl_permit: "",
          scheduling: false,
          payment: false,
          parent_name: "",
          parent_phone: "",
          parent_email: "",
          parent_2_name: "",
          parent_2_phone: "",
          parent_2_email: "",
          home_drop_off: false,
          read_and_agreed: false,
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
                        // ключей надо достать из INSTRUCTOR
                        options={StaffType}
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
                        options={LocationOptions}
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
                      "inline-flex flex-row-reverse items-center w-full"
                    }
                    className={classNames(
                      ManagementStyle["CheckModal__form-element__shadow"],
                      "w-full text-base",
                    )}
                    type={"text"}
                    spanText={"Student id"}
                    placeholder={"Student ID"}
                    fontSize={"text-base"}
                    spanClassName={`flex-shrink-0 w-44 text-start flex-shrink-0 text-right`}
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
                    value={values.mid_name}
                    onChange={handleChange}
                    name={"mid_name"}
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
                        name={"home_phone"}
                        value={values.home_phone}
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
                          value={"Male"}
                          className={
                            ManagementStyle["CheckModal__form-element__shadow"]
                          }
                        >
                          <span className={`text-base`}>Man</span>
                        </CustomRadio>

                        <CustomRadio
                          classNames={"inline-flex gap-2.5 items-center"}
                          name={"gender"}
                          value={"Female"}
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

                  <label className="inline-flex items-center w-full">
                    <span className={"text-base flex-shrink-0 w-44"}>
                      Preferred Pronoun
                    </span>

                    <div className={"w-full"}>
                      <CustomSelect
                        onChange={handlePronoun}
                        placeholder={"Select Pronoun"}
                        fontSize={14}
                        options={PronounOptions}
                        className={`h-[50px] w-full ${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                        colorBorder={colorsObject.primary}
                        value={!Pronoun ? undefined : Pronoun}
                      />

                      {SelectSubmit && (
                        <FormError>Preferred Pronoun is not selected</FormError>
                      )}
                    </div>
                  </label>

                  <label className="flex items-center w-full">
                    <span className={`text-base flex-shrink-0 w-44`}>
                      Medical condition
                    </span>

                    <div className="w-full">
                      <MDEditor
                        value={MedConditionValue}
                        onChange={handleMedCondition}
                        previewOptions={{
                          rehypePlugins: [[rehypeSanitize]],
                        }}
                      />
                      {MedConditionValue === "" && (
                        <FormError>Medical condition is empty</FormError>
                      )}
                    </div>
                  </label>

                  <label className="flex items-center gap-4 w-full">
                    <span className={`text-base flex-shrink-0 w-40`}>
                      Student driving notes
                    </span>

                    <div className="w-full">
                      <div className="w-full">
                        <MDEditor
                          value={DrivingNotesValue}
                          onChange={handleDrivingNotes}
                          previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                          }}
                        />
                        {DrivingNotesValue === "" && (
                          <FormError>Medical condition is empty</FormError>
                        )}
                      </div>
                    </div>
                  </label>

                  <CustomCheckBox
                    className={
                      "text-base font-normal inline-flex w-full justify-center pl-44"
                    }
                    onChange={handleChange}
                    name={"read_and_agreed"}
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
                    name={"dl_permit"}
                    value={values.dl_permit}
                  >
                    {errors.error && (
                      <FormError className={"pl-44"}>{errors.error}</FormError>
                    )}
                  </CustomInput>

                  <label className="inline-flex gap-8 items-center w-full">
                    <span className={`text-base flex-shrink-0 w-40`}>
                      DL/Permit Issued
                    </span>
                    <DatePicker
                      className={`w-full border border-indigo-600 h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                      placeholder={"DD/MM/YYYY"}
                      onChange={handleDLIssued}
                    />
                  </label>

                  <label className="inline-flex gap-8 items-center w-full">
                    <span className={`text-base flex-shrink-0 w-40`}>
                      DL Permit Expiration
                    </span>
                    <DatePicker
                      className={`w-full border border-indigo-600 h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                      placeholder={"DD/MM/YYYY"}
                      onChange={handleDLExpireDate}
                    />
                  </label>

                  <div>
                    <CustomCheckBox
                      className={
                        "inline-flex flex-row-reverse items-center justify-end w-full h-[50px]"
                      }
                      name={"scheduling"}
                      onChange={handleChange}
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

                  <label className="inline-flex gap-4 items-center w-full">
                    <span className={`text-base flex-shrink-0 w-40`}>
                      Extinction Date
                    </span>
                    <DatePicker
                      className={`w-full border border-indigo-600 h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                      placeholder={"DD/MM/YYYY"}
                      onChange={handleExtinctionDate}
                    />
                  </label>

                  <label className="inline-flex items-center w-full">
                    <span className={"text-base flex-shrink-0 w-44"}>
                      High School
                    </span>

                    <div className={"w-full"}>
                      <CustomSelect
                        onChange={handleHighSchool}
                        placeholder={"Select school"}
                        fontSize={14}
                        options={HighSchoolOptions}
                        className={`h-[50px] w-full ${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                        colorBorder={colorsObject.primary}
                        value={HighSchool ? HighSchool : undefined}
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
                    onChange={handleChange}
                    name={"parent_2_name"}
                    value={values.parent_2_name}
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
                    onChange={handleChange}
                    name={"parent_2_phone"}
                    value={values.parent_2_phone}
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
                    onChange={handleChange}
                    name={"parent_2_email"}
                    value={values.parent_2_email}
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

                  <div className="flex items-center w-full">
                    <span className={"text-base flex-shrink-0 w-44"}>
                      Date of birth
                    </span>

                    <div className={`grid grid-cols-3 gap-5`}>
                      <CustomSelect
                        colorBorder={colorsObject.primary}
                        className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                        placeholder={"Day"}
                        options={Days}
                        onChange={handleDay}
                      />
                      <CustomSelect
                        colorBorder={colorsObject.primary}
                        className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                        placeholder={"Month"}
                        options={Months}
                        onChange={handleMonth}
                      />
                      <CustomSelect
                        colorBorder={colorsObject.primary}
                        className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                        placeholder={"Year"}
                        options={YearsOptions()}
                        onChange={handleYear}
                      />
                    </div>
                  </div>

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
                        value={!Lead ? undefined : Lead}
                      />

                      {SelectSubmit && <FormError>Select Lead</FormError>}
                    </div>
                  </label>

                  <label className="flex items-center gap-4 w-full">
                    <span className={`text-base flex-shrink-0 w-40`}>
                      Student notes
                    </span>

                    <div className="w-full">
                      <MDEditor
                        value={NotesValue}
                        onChange={handleNotesValue}
                        previewOptions={{
                          rehypePlugins: [[rehypeSanitize]],
                        }}
                      />
                      {NotesValue === "" && (
                        <FormError>Student notes is empty</FormError>
                      )}
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
                  disabled={!values.read_and_agreed}
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

      {IsOpen && state?.status}
    </Fragment>
  );
};
