import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import Image from "@/components/image/index.jsx";
import Title, { Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useDate } from "@/hooks/useDate.jsx";
import { EnrollmentsSelections } from "@/modules/enrollments.jsx";
import { FormError } from "@/modules/errors.jsx";
import { PronounOptions } from "@/modules/select-options.jsx";
import EnrollmentStyle from "@/pages/enrollment/enrollment.module.scss";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { Formik } from "formik";
import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoverImage from "../../assets/others/cover.png";
import ProfileStyle from "./student-account.module.scss";
import IconComponent from "@/components/icons";
import { TfiEmail } from "react-icons/tfi";
import { ConfigProvider, DatePicker } from "antd";
import ManagementStyle from "./../managment/management.module.scss";

const Profile = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { studentId } = useParams();
  const { data, isLoading } = useRequestGetQuery({
    path: "/student_account/student/" + studentId,
  });
  const { data: InstructorData, isLoading: isInstructorData } =
    useRequestGetQuery({
      path: "/student_account/instructor/",
    });
  const { data: LocationData, isLoading: isLocationData } = useRequestGetQuery({
    path: "/account_management/location/",
  });
  const { Months, Days, YearsOptions } = useDate();
  const { StudentInfoTypeOptions } = EnrollmentsSelections();

  const [Student, setStudent] = useState(null);
  const [IsMore, setIsMore] = useState(false);
  const [Instructor, setInstructor] = useState("");
  const [InstructorOptions, setInstructorOptions] = useState([]);
  const [StudentType, setStudentType] = useState("TEEN");
  const [AssignStaff, setAssignStaff] = useState("");
  const [AssignLocation, setAssignLocation] = useState("");
  const [AssignLocationOptions, setAssignLocationOptions] = useState([]);
  const [Pronoun, setPronoun] = useState("");
  const [DlIssued, setDLIssued] = useState(null);
  const [DLExpiration, setDLExpiration] = useState(null);
  const [BirthDay, setBirthDay] = useState("");
  const [BirthMonth, setBirthMonth] = useState("");
  const [BirthYear, setBirthYear] = useState("");
  const [State, setState] = useState(null);

  useEffect(() => {
    const options = [];

    const Instructor = InstructorData?.filter(
      (instructor) => instructor.id === data?.staff,
    );

    setAssignStaff(() =>
      Instructor
        ? Instructor[0]?.first_name + " " + Instructor[0]?.last_name
        : undefined,
    );

    for (let i = 0; i < InstructorData?.length; i++) {
      const instructor = InstructorData[i];
      options.push({
        ...instructor,
        value: instructor?.id,
        label: instructor?.first_name + " " + instructor?.last_name,
      });
    }

    setInstructorOptions(options);
  }, [InstructorData, isInstructorData, isLoading]);

  useEffect(() => {
    const options = [];

    for (let i = 0; i < LocationData?.length; i++) {
      const location = LocationData[i];
      options.push({
        ...location,
        value: location?.id,
        label: location?.name,
      });
    }

    setAssignLocationOptions(options);
  }, [LocationData, isLocationData, isLoading]);

  useEffect(() => {
    setStudent(data);
  }, [data, InstructorData, LocationData]);

  const handleExtensionDate = (date) => console.log(date);
  const handleMore = () => setIsMore((prev) => !prev);
  const handleDLIssued = (date) => setDLIssued(date["$d"]);
  const handleDLExpireDate = (date) => setDLExpiration(date["$d"]);
  const handleBirthDay = (value) => setBirthDay(value);
  const handleBirthMonth = (value) => setBirthMonth(value);
  const handleBirthYear = (value) => setBirthYear(value);
  const handleStudentType = (value) => setStudentType(value);
  const handleStaff = (value) => setAssignStaff(value);
  const handleLocation = (value) => setAssignLocation(value);
  const handleState = (value) => setState(value);

  return (
    <Fragment>
      <div className=" flex justify-between gap-7 pb-6 border-b border-b-indigo-700 px-5 -mx-5">
        <div>
          <div
            className={`rounded-2xl border-2 border-indigo-700 ${ProfileStyle["Student-profile__imageholder"]}`}
          >
            <Image src={CoverImage} srcSet={CoverImage} />
          </div>
        </div>
        <div className={"flex-grow"}>
          <div className={`rounded-2xl border-2 border-indigo-700 py-5 px-7`}>
            <Title
              className={"text-center"}
              fontSize={"text-base text-green-600"}
              fontWeightStrong={600}
              titleMarginBottom={10}
            >
              Activated
            </Title>
            <div className={`grid grid-cols-2 gap-7`}>
              <div className={"space-y-5"}>
                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.info}
                  className={"w-full"}
                  controlHeight={30}
                  borderRadius={5}
                >
                  Change status
                </ButtonComponent>

                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.info}
                  className={"w-full"}
                  controlHeight={30}
                  borderRadius={5}
                >
                  Send Text
                </ButtonComponent>
                <div className="flex gap-5 items-center">
                  <div
                    className={`${ProfileStyle["Student-profile__imageholder-small"]} rounded-lg border-2 border-indigo-700`}
                  >
                    <Image src={CoverImage} srcSet={CoverImage} />
                  </div>

                  <ButtonComponent
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.info}
                    className={"flex-grow"}
                    controlHeight={30}
                    borderRadius={5}
                  >
                    Print
                  </ButtonComponent>
                </div>
              </div>
              {/*-------------*/}
              <div className={"space-y-5"}>
                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.info}
                  className={"w-full"}
                  controlHeight={30}
                  borderRadius={5}
                >
                  Acces Student Center
                </ButtonComponent>

                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.info}
                  className={"w-full"}
                  controlHeight={30}
                  borderRadius={5}
                >
                  Username/Password
                </ButtonComponent>
                <div className="flex gap-5 items-center">
                  <div
                    className={`${ProfileStyle["Student-profile__imageholder-small"]} rounded-lg border-2 border-indigo-700`}
                  >
                    <Image src={CoverImage} srcSet={CoverImage} />
                  </div>

                  <ButtonComponent
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.info}
                    className={"flex-grow"}
                    controlHeight={30}
                    borderRadius={5}
                  >
                    Print
                  </ButtonComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Formik
        initialValues={{
          first_name: data?.first_name,
          mid_name: data?.mid_name,
          last_name: data?.last_name,
          address: data?.address,
          city: data?.city,
          state: data?.state,
          zip: data?.zip,
          home_phone: data?.home_phone,
          cell_phone: data?.cell_phone,
          gender: data?.gender,
          email: data?.email,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.first_name || !values.last_name) {
            errors.error = "Is empty";
          }
          return errors;
        }}
        onSubmit={(values) => {}}
      >
        {({ handleChange, handleSubmit, errors, values }) => (
          <form onSubmit={handleSubmit}>
            <div
              className={`grid grid-cols-2 gap-6 pt-5 pb-5 mb-5 -mx-5 px-5 bg-white rounded-2xl `}
            >
              <div className="flex flex-col gap-5">
                <label className="inline-flex items-center w-full gap-5">
                  <span className={"w-40 text-base flex-shrink-0"}>
                    Student type
                  </span>
                  <CustomSelect
                    placeholder={"Select"}
                    colorBorder={colorsObject.primary}
                    className={`shadow-lg w-full h-[50px]`}
                    options={StudentInfoTypeOptions}
                    onChange={handleStudentType}
                    value={StudentType}
                  />
                </label>

                <label className="inline-flex items-center w-full gap-5">
                  <span className={"w-40 text-base flex-shrink-0"}>
                    Assign to staff
                  </span>
                  <CustomSelect
                    placeholder={"Select"}
                    value={AssignStaff}
                    colorBorder={colorsObject.primary}
                    className={`shadow-lg w-full h-[50px]`}
                    onChange={handleStaff}
                    options={InstructorOptions}
                  />
                </label>

                <label className="inline-flex items-center w-full gap-5">
                  <span className={"w-40 text-base flex-shrink-0"}>
                    Assign to Location
                  </span>
                  <CustomSelect
                    placeholder={"Select"}
                    colorBorder={colorsObject.primary}
                    className={`shadow-lg w-full h-[50px]`}
                    options={AssignLocationOptions}
                    onChange={handleLocation}
                  />
                </label>

                <CustomInput
                  placeholder={"Student id"}
                  className={`shadow-lg w-full px-4 p-2.5`}
                  spanText={"Student id"}
                  colorBorder={colorsObject.primary}
                  spanClassName={`w-40 flex-shrink-0 text-start flex-shrink-0 text-right relative after:right-16 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                  value={data?.id}
                  disabled
                />

                <CustomInput
                  placeholder={"First name"}
                  className={`shadow-lg border border-indigo-700 w-full px-4 p-2.5`}
                  spanText={"First name"}
                  spanClassName={`w-40 flex-shrink-0 text-start flex-shrink-0 text-right relative after:right-16 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                  name={"first_name"}
                  onChange={handleChange}
                  value={values.first_name || data.first_name}
                >
                  {errors.error && (
                    <FormError className={"pl-44"}>{errors.error}</FormError>
                  )}
                </CustomInput>

                <CustomInput
                  placeholder={"Last name"}
                  className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
                  spanText={"Last name"}
                  spanClassName={`w-40 flex-shrink-0 text-start flex-shrink-0 text-right relative after:right-16 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                  name={"last_name"}
                  value={values.last_name || data.last_name}
                >
                  {errors.error && (
                    <FormError className={"pl-44"}>{errors.error}</FormError>
                  )}
                </CustomInput>

                <CustomInput
                  placeholder={"Middle name"}
                  className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
                  spanText={"Middle name"}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                  name={"mid_name"}
                  onChange={handleChange}
                  value={values.mid_name || data.mid_name}
                />

                <CustomInput
                  placeholder={"Address"}
                  className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
                  spanText={"Address"}
                  spanClassName={`w-40 flex-shrink-0 text-start flex-shrink-0 text-right relative after:right-16 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                  name={"address"}
                  onChange={handleChange}
                  value={values.address || data.address}
                >
                  {errors.error && (
                    <FormError className={"pl-44"}>{errors.error}</FormError>
                  )}
                </CustomInput>

                <CustomInput
                  placeholder={"City"}
                  className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
                  spanText={"City"}
                  spanClassName={`w-40 flex-shrink-0 text-start flex-shrink-0 text-right relative after:right-16 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                  onChange={handleChange}
                  name={"city"}
                  value={values.city || data?.city}
                >
                  {errors.error && (
                    <FormError className={"pl-44"}>{errors.error}</FormError>
                  )}
                </CustomInput>

                <label className="inline-flex items-center w-full gap-5">
                  <span
                    className={`w-40 flex-shrink-0 text-start relative after:right-16 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    State
                  </span>
                  <CustomSelect
                    placeholder={"State"}
                    colorBorder={colorsObject.primary}
                    className={`shadow-lg w-full h-[50px]`}
                    onChange={handleState}
                    value={State || data?.state}
                    options={[
                      {
                        value: "USA",
                        label: "USA",
                      },
                    ]}
                  />
                </label>

                <CustomInput
                  placeholder={"Zip/Postal code"}
                  className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
                  spanText={"Zip/Postal code"}
                  spanClassName={`w-40 flex-shrink-0 text-start relative after:right-5 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                  name={"zip"}
                  onChange={handleChange}
                  value={values.zip || data?.zip}
                >
                  {errors.error && (
                    <FormError className={"pl-44"}>{errors.error}</FormError>
                  )}
                </CustomInput>

                <CustomInput
                  placeholder={"Home Pickup"}
                  className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
                  spanText={"Home Pickup"}
                  spanClassName={`w-40 flex-shrink-0 text-start relative after:right-10 ${EnrollmentStyle["Enrollment__heavy"]}`}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                  name={"home_phone"}
                  onChange={handleChange}
                  value={values.home_phone || data?.home_phone}
                >
                  {errors.error && (
                    <FormError className={"pl-44"}>{errors.error}</FormError>
                  )}
                </CustomInput>

                <CustomInput
                  placeholder={"Cell Phone"}
                  className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
                  spanText={"Cell Phone"}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                  name={"cell_phone"}
                  onChange={handleChange}
                  value={values.cell_phone || data?.cell_phone}
                >
                  {errors.error && (
                    <FormError className={"pl-44"}>{errors.error}</FormError>
                  )}
                </CustomInput>

                <CustomCheckBox
                  className={`inline-flex justify-end items-center w-full flex-row-reverse`}
                >
                  <span className={"w-44 text-base flex-shrink-0"}>
                    Home Phone
                  </span>
                </CustomCheckBox>

                <label className="inline-flex items-center w-full gap-5">
                  <span className={"w-36"}>Email</span>
                  <div className="flex items-center gap-2 flex-grow">
                    <CustomInput
                      placeholder={"Email"}
                      classNames={"w-full h-[50px] px-4"}
                      className={`shadow-lg border border-indigo-700 w-full px-4 p-2.5`}
                      type="email"
                    />
                    <IconComponent>
                      <TfiEmail
                        className={`w-[25.5px] h-[23.57px] text-[#00000073]`}
                      />
                    </IconComponent>
                  </div>
                </label>

                <label className="flex items-center gap-9">
                  <span className={"w-36"}>Gender</span>

                  <div className={"space-x-2.5"}>
                    <CustomRadio
                      classNames={"inline-flex gap-2.5 items-center"}
                      name={"gender"}
                      value={"Male"}
                    >
                      <Text fontSize={"text-base"}>Male</Text>
                    </CustomRadio>
                    <CustomRadio
                      classNames={"inline-flex gap-2.5 items-center"}
                      name={"gender"}
                      value={"Female"}
                    >
                      <Text fontSize={"text-base"}>Female</Text>
                    </CustomRadio>
                    <CustomRadio
                      classNames={"inline-flex gap-2.5 items-center"}
                      name={"gender"}
                      value={"Other"}
                    >
                      <Text fontSize={"text-base"}>Other</Text>
                    </CustomRadio>
                  </div>
                </label>

                <label className="inline-flex items-center w-full gap-5">
                  <span className={"w-40 text-base flex-shrink-0"}>
                    Preferred Pronoun
                  </span>
                  <CustomSelect
                    placeholder={"State"}
                    colorBorder={colorsObject.primary}
                    className={`shadow-lg w-full h-[50px]`}
                    options={PronounOptions}
                  />
                </label>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center w-full gap-5">
                  <span className={"w-40 text-base flex-shrink-0"}>
                    Date of birth
                  </span>

                  <div className={"space-x-5"}>
                    <CustomSelect
                      placeholder={"Month"}
                      colorBorder={colorsObject.primary}
                      options={Months}
                      className={"w-[90px] h-[50px]"}
                      onChange={handleBirthMonth}
                    />
                    <CustomSelect
                      placeholder={"Day"}
                      colorBorder={colorsObject.primary}
                      options={Days}
                      className={"w-[90px] h-[50px]"}
                      onChange={handleBirthDay}
                    />
                    <CustomSelect
                      placeholder={"Year"}
                      colorBorder={colorsObject.primary}
                      options={YearsOptions()}
                      className={"w-[90px] h-[50px]"}
                      onChange={handleBirthYear}
                    />
                  </div>
                </div>

                <CustomInput
                  className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                  type={"text"}
                  spanText={"DL/Permit"}
                  placeholder={"DL/Permit"}
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

                <CustomCheckBox
                  className={`inline-flex justify-end items-center w-full flex-row-reverse`}
                >
                  <span className={"w-44 text-base flex-shrink-0"}>
                    Self Scheduling
                  </span>
                </CustomCheckBox>

                <CustomCheckBox
                  className={`inline-flex justify-end items-center w-full flex-row-reverse`}
                >
                  <span className={"w-44 text-base flex-shrink-0"}>
                    Payment Plan
                  </span>
                </CustomCheckBox>

                <label className="flex items-center gap-1">
                  <span className={"w-44 text-base flex-shrink-0"}>
                    Extantion Date
                  </span>

                  <ConfigProvider
                    theme={{
                      token: {
                        colorBorder: colorsObject.primary,
                      },
                    }}
                  >
                    <DatePicker
                      className={`w-full h-[50px] shadow-lg`}
                      onChange={handleExtensionDate}
                    />
                  </ConfigProvider>
                </label>

                <label className="inline-flex items-center w-full gap-5">
                  <span className={"w-40 text-base flex-shrink-0"}>
                    High School
                  </span>
                  <CustomSelect
                    placeholder={"High School"}
                    colorBorder={colorsObject.primary}
                    className={`shadow-lg w-full h-[50px]`}
                    options={[
                      {
                        value: "High School",
                        label: "High School",
                      },
                    ]}
                  />
                </label>

                <CustomInput
                  placeholder={"Parent name"}
                  className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
                  spanText={"Parent name"}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                />

                <CustomInput
                  placeholder={"Parent Phone"}
                  className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
                  spanText={"Parent Phone"}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                />

                <CustomInput
                  placeholder={"Parent Email"}
                  className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
                  spanText={"Parent Email"}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  type={"email"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                />

                <CustomInput
                  placeholder={"Parent name 2"}
                  className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
                  spanText={"Parent name 2"}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                />

                <CustomInput
                  placeholder={"Parent Phone 2"}
                  className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
                  spanText={"Parent Phone 2"}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                />

                <CustomInput
                  placeholder={"Parent Email 2"}
                  className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
                  spanText={"Parent Email 2"}
                  spanClassName={"w-40 flex-shrink-0"}
                  fontSize={"text-base"}
                  type={"email"}
                  classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                />

                <label className="flex items-center gap-8">
                  <span className={"w-36"}>Home Drop off</span>

                  <div>
                    <CustomCheckBox className={"shadow-lg"} />
                  </div>
                </label>
              </div>
            </div>

            {IsMore && (
              <Fragment>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-7">
                    <div
                      className={
                        "bg-white shadow-2xl space-y-3 rounded-2xl p-5"
                      }
                    >
                      <div className="flex items-center justify-between">
                        <Title
                          fontSize={"text-2xl text-indigo-700"}
                          fontWeightStrong={600}
                        >
                          Student notes
                        </Title>

                        <ButtonComponent
                          controlHeight={40}
                          defaultBg={colorsObject.main}
                          defaultHoverBg={colorsObject.main}
                          defaultColor={colorsObject.primary}
                          defaultHoverColor={colorsObject.primary}
                          defaultBorderColor={colorsObject.primary}
                          paddingInline={53}
                          borderRadius={5}
                        >
                          Reset
                        </ButtonComponent>
                      </div>

                      <div className="flex gap-6 justify-between items-center">
                        <CustomInput
                          classNames={"w-full h-[50px]"}
                          className={"border border-indigo-700 px-4"}
                        />
                        <ButtonComponent
                          defaultBg={"#24C18F"}
                          defaultHoverBg={"#3CE3AE"}
                          defaultColor={colorsObject.main}
                          paddingInline={97}
                          controlHeight={40}
                          borderRadius={5}
                        >
                          Save
                        </ButtonComponent>
                      </div>
                    </div>

                    <div
                      className={
                        "bg-white shadow-2xl space-y-3 rounded-2xl p-5"
                      }
                    >
                      <div className="flex items-center justify-between">
                        <Title
                          fontSize={"text-2xl text-indigo-700"}
                          fontWeightStrong={600}
                        >
                          Tasks
                        </Title>

                        <ButtonComponent
                          controlHeight={40}
                          defaultBg={colorsObject.main}
                          defaultHoverBg={colorsObject.main}
                          defaultColor={colorsObject.primary}
                          defaultHoverColor={colorsObject.primary}
                          defaultBorderColor={colorsObject.primary}
                          paddingInline={53}
                          borderRadius={5}
                        >
                          Reset
                        </ButtonComponent>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-7">
                    <div
                      className={
                        "bg-white shadow-2xl space-y-3 rounded-2xl p-5"
                      }
                    >
                      <Title
                        fontSize={"text-2xl text-indigo-700"}
                        fontWeightStrong={600}
                      >
                        Emergency
                      </Title>

                      <div className="space-y-5">
                        <CustomInput
                          placeholder={"Emergency name"}
                          className={`shadow-lg px-4 py-2.5 w-full border border-indigo-700`}
                          spanText={"Emergency name"}
                          spanClassName={"w-48 flex-shrink-0"}
                          fontSize={"text-base"}
                          classNames={`inline-flex justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                        />
                        <CustomInput
                          placeholder={"Emergency relationship"}
                          className={`shadow-lg px-4 py-2.5 w-full border border-indigo-700`}
                          spanText={"Emergency relationship"}
                          spanClassName={"w-48 flex-shrink-0"}
                          fontSize={"text-base"}
                          classNames={`inline-flex justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                        />
                        <CustomInput
                          placeholder={"Emergency phone"}
                          className={`shadow-lg px-4 py-2.5 w-full border border-indigo-700`}
                          spanText={"Emergency phone"}
                          spanClassName={"w-48 flex-shrink-0"}
                          fontSize={"text-base"}
                          classNames={`inline-flex justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                        />

                        <label className="inline-flex items-center w-full gap-5">
                          <span className={"w-48 text-base flex-shrink-0"}>
                            Lead
                          </span>
                          <CustomSelect
                            placeholder={"Lead"}
                            colorBorder={colorsObject.primary}
                            className={`shadow-lg w-full h-[50px]`}
                            options={[
                              {
                                value: "Facebook",
                                label: "Facebook",
                              },
                            ]}
                          />
                        </label>

                        <CustomInput
                          placeholder={"Medial condition"}
                          className={`shadow-lg px-4 py-2.5 w-full border border-indigo-700`}
                          spanText={"Medial condition"}
                          spanClassName={"w-48 flex-shrink-0"}
                          fontSize={"text-base"}
                          classNames={`inline-flex justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                        />

                        <label className="inline-flex items-center w-full gap-5">
                          <span className={"w-48 text-base flex-shrink-0"}>
                            Wear glasses contact
                          </span>
                          <CustomSelect
                            placeholder={"No"}
                            colorBorder={colorsObject.primary}
                            className={`shadow-lg w-full h-[50px]`}
                            options={[
                              {
                                value: 1,
                                label: 1,
                              },
                            ]}
                          />
                        </label>

                        <label className="flex items-center gap-5">
                          <span className={"w-48 flex-shrink-0"}>
                            Terms & condition
                          </span>

                          <CustomCheckBox className={"shadow-lg"} />
                        </label>
                      </div>
                    </div>

                    <div
                      className={
                        "bg-white shadow-2xl space-y-3 rounded-2xl p-5"
                      }
                    >
                      <div className="flex items-center justify-between">
                        <Title
                          fontSize={"text-2xl text-indigo-700"}
                          fontWeightStrong={600}
                        >
                          Driving notes
                        </Title>

                        <ButtonComponent
                          controlHeight={40}
                          defaultBg={colorsObject.main}
                          defaultHoverBg={colorsObject.main}
                          defaultColor={colorsObject.primary}
                          defaultActiveColor={colorsObject.primary}
                          defaultHoverColor={colorsObject.primary}
                          defaultBorderColor={colorsObject.primary}
                          paddingInline={53}
                          borderRadius={5}
                        >
                          Reset
                        </ButtonComponent>
                      </div>

                      <div className="flex gap-6 justify-between items-center">
                        <CustomInput
                          classNames={"w-full h-[50px]"}
                          className={"border border-indigo-700 px-4 py-2.5"}
                        />
                        <ButtonComponent
                          defaultBg={"#24C18F"}
                          defaultHoverBg={"#3CE3AE"}
                          defaultColor={colorsObject.main}
                          paddingInline={97}
                          controlHeight={40}
                          borderRadius={5}
                        >
                          Save
                        </ButtonComponent>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}

            <div
              className={`text-center space-y-6 pt-6 ${!IsMore ? "bg-white" : null}`}
            >
              <div>
                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.infoHover}
                  paddingInline={43}
                  controlHeight={40}
                  borderRadius={5}
                  onClick={handleMore}
                >
                  {IsMore ? "Hide" : "Show more"}
                </ButtonComponent>
              </div>
              <div>
                <ButtonComponent
                  defaultBg={colorsObject.success}
                  defaultHoverBg={colorsObject.successHover}
                  controlHeight={40}
                  paddingInline={43}
                  borderRadius={5}
                  type={"submit"}
                >
                  Save
                </ButtonComponent>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

export default Profile;
