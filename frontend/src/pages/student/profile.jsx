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
import { AlertError, AlertSuccess } from "@/hooks/alert.jsx";
import { useDate } from "@/hooks/useDate.jsx";
import { FormError } from "@/modules/errors.jsx";
import { PronounOptions } from "@/modules/select-options.jsx";
import EnrollmentStyle from "@/pages/enrollment/enrollment.module.scss";
import { StatusSelect } from "@/pages/managment/service/index.jsx";
import {
  useRequestGetQuery,
  useRequestPatchMutation,
} from "@/redux/query/index.jsx";
import {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import CoverImage from "../../assets/others/cover.png";
import ProfileStyle from "./student-account.module.scss";
import IconComponent from "@/components/icons";
import { TfiEmail } from "react-icons/tfi";
import { DatePicker } from "antd";
import ManagementStyle from "./../managment/management.module.scss";
import dayjs from "dayjs";

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

const Profile = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { studentId } = useParams();
  const { Months, Days, YearsOptions } = useDate();
  const [requestPatch] = useRequestPatchMutation();
  const { data, isLoading } = useRequestGetQuery({
    path: "/student_account/student/" + studentId,
  });
  const { data: InstructorData } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const { data: LocationData } = useRequestGetQuery({
    path: "/account_management/location/",
  });
  const { data: SchoolsData } = useRequestGetQuery({
    path: "/account_management/schools/",
  });
  const { data: UserTypeData } = useRequestGetQuery({
    path: "/student_account/user_type/",
  });

  const [InstructorOptions, setInstructorOptions] = useState([]);
  const [SchoolsOptions, setSchoolsOptions] = useState([]);
  const [StudentTypeOptions, setStudentTypeOptions] = useState([]);
  const [AssignLocationOptions, setAssignLocationOptions] = useState([]);
  const [IsMore, setIsMore] = useState(false);
  const [Selections, setSelections] = useState(false);
  const [Student, setStudent] = useState(null);
  const [DlIssued, setDLIssued] = useState(null);
  const [DLExpiration, setDLExpiration] = useState(null);
  const [ExtensionDate, setExtensionDate] = useState(null);
  const [StudentType, setStudentType] = useState(undefined);
  const [School, setSchool] = useState(undefined);
  const [Instructor, setInstructor] = useState("");
  const [Location, setLocation] = useState("");
  const [State, setState] = useState("");
  const [Pronoun, setPronoun] = useState("");
  const [BirthDay, setBirthDay] = useState("");
  const [BirthMonth, setBirthMonth] = useState("");
  const [BirthYear, setBirthYear] = useState("");
  const [Status, setStatus] = useState("");
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

  // ALL
  useEffect(() => {
    setBirthYear(data?.birth?.split("-")[0]);
    setBirthMonth(data?.birth?.split("-")[1]);
    setBirthDay(data?.birth?.split("-")[2]);
    setStudent(data);
    setPronoun(data?.preferred_pronoun);
    setDLIssued(Student?.dl_given_date);
    setDLExpiration(Student?.dl_expire_date);
    setStudentType(Student?.type);
    setStatus(Student?.status);
  }, [
    data,
    InstructorData,
    LocationData,
    SchoolsData,
    UserTypeData,
    StudentTypeOptions,
  ]);

  // INSTRUCTOR
  useEffect(() => {
    const options = [];

    for (let i = 0; i < InstructorData?.length; i++) {
      const instructor = InstructorData[i];
      options.push({
        ...instructor,
        value: instructor?.id,
        label: instructor?.first_name + " " + instructor?.last_name,
      });

      if (instructor.id === data?.staff) {
        setInstructor(instructor?.first_name + " " + instructor?.last_name);
      }
    }

    setInstructorOptions(options);
  }, [InstructorData, isLoading]);

  // TYPES
  useEffect(() => {
    const options = [];

    for (let i = 0; i < UserTypeData?.length; i++) {
      const type = UserTypeData[i];
      options.push({
        ...type,
        value: type?.id,
        label: type?.name,
      });
    }

    setStudentTypeOptions(options);
  }, [UserTypeData, isLoading]);

  // LOCATION
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
  }, [LocationData, isLoading]);

  // Schools
  useEffect(() => {
    const options = [];

    for (let i = 0; i < SchoolsData?.length; i++) {
      const school = SchoolsData[i];

      if (school?.status?.toLowerCase() === "active") {
        options.push({
          ...school,
          value: school?.id,
          label: school?.name,
        });
      }
    }

    setSchoolsOptions(options);
  }, [SchoolsData, isLoading]);

  const selects = [
    Student?.first_name,
    Student?.last_name,
    Student?.id,
    Student?.address,
    Student?.city,
    Student?.state,
    Student?.zip,
    Student?.home_phone,
    Student?.cell_phone,
    Student?.gender,
  ];

  const stateSelects = useMemo(() => {
    let state = false;
    for (let i = 0; i < selects.length; i++) {
      if (selects[i] === "") {
        state = true;
        break;
      } else {
        state = false;
      }
    }

    return state;
  }, [
    Student?.first_name,
    Student?.last_name,
    Student?.id,
    Student?.address,
    Student?.city,
    Student?.state,
    Student?.zip,
    Student?.home_phone,
    Student?.cell_phone,
    Student?.gender,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSelections(stateSelects);

    if (!stateSelects) {
      try {
        const res = await requestPatch({
          path: "/student_account/student",
          data: {
            ...Student,
            status: Status,
            type: StudentType,
            staff: Instructor,
            location: Location,
            state: State,
            preferred_pronoun: Pronoun,
            birth: `${BirthYear}-${BirthMonth > 9 ? BirthMonth : "0" + BirthMonth}-${BirthDay > 9 ? BirthDay : "0" + BirthDay}`,
            dl_given_date: DlIssued,
            dl_expire_date: DLExpiration,
            extension_date: ExtensionDate,
          },
          id: studentId,
        });

        if (res?.error?.status >= 400) {
          dispatch({ type: "ERROR", setIsOpen });
          setIsOpen(true);
        } else {
          dispatch({ type: "SUCCESS", setIsOpen });
          setIsOpen(true);
        }
      } catch (error) {
        console.error(error.message);
        dispatch({ type: "ERROR", setIsOpen });
        setIsOpen(true);
      }
    }
  };
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setStudent({ ...Student, [e.target?.name]: e.target.checked });
    } else {
      setStudent({ ...Student, [e.target?.name]: e.target.value });
    }
  };

  const handleMore = () => setIsMore((prev) => !prev);
  const handleStudentType = (value) => setStudentType(value);
  const handleStaff = (value) => setInstructor(value);
  const handleLocation = (value) => setLocation(value);
  const handleState = (value) => setState(value);
  const handlePronoun = (value) => setPronoun(value);
  const handleBirthDay = (value) => setBirthDay(value);
  const handleBirthMonth = (value) => setBirthMonth(value);
  const handleBirthYear = (value) => setBirthYear(value);
  const handleSchool = (value) => setSchool(value);
  const handleStatus = (value) => setStatus(value);
  const handleExtensionDate = (day) =>
    setExtensionDate(`${day["$y"]}-${day["$M"]}-${day["$D"]}`);
  const handleDLIssued = (day) =>
    setDLIssued(`${day["$y"]}-${day["$M"]}-${day["$D"]}`);
  const handleDLExpireDate = (day) =>
    setDLExpiration(`${day["$y"]}-${day["$M"]}-${day["$D"]}`);

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
                <CustomSelect
                  placeholder={"Select Status"}
                  options={StatusSelect}
                  className={"w-full h-[50px]"}
                  onChange={handleStatus}
                />

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

      <form>
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
                options={StudentTypeOptions}
                onChange={handleStudentType}
                value={StudentType}
                disabled={isLoading}
              />
            </label>

            <label className="inline-flex items-center w-full gap-5">
              <span className={"w-40 text-base flex-shrink-0"}>
                Assign to staff
              </span>
              <CustomSelect
                placeholder={"Select"}
                value={Instructor}
                colorBorder={colorsObject.primary}
                className={`shadow-lg w-full h-[50px]`}
                onChange={handleStaff}
                options={InstructorOptions}
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </label>

            <CustomInput
              placeholder={"Student id"}
              className={`shadow-lg w-full px-4 p-2.5`}
              spanText={"Student id"}
              colorBorder={colorsObject.primary}
              spanClassName={`w-40 flex-shrink-0 text-start flex-shrink-0 text-right relative after:right-10 ${EnrollmentStyle["Enrollment__heavy"]}`}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
              value={data?.id}
              disabled
            />

            <CustomInput
              placeholder={"First name"}
              className={`shadow-lg border border-indigo-700 w-full px-4 p-2.5`}
              spanText={"First name"}
              spanClassName={`w-40 flex-shrink-0 text-start flex-shrink-0 text-right relative after:right-10 ${EnrollmentStyle["Enrollment__heavy"]}`}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
              name={"first_name"}
              value={Student?.first_name}
              disabled={isLoading}
              onChange={handleChange}
            >
              {Selections && (
                <FormError className={"pl-44"}>Is Empty</FormError>
              )}
            </CustomInput>

            <CustomInput
              placeholder={"Last name"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
              spanText={"Last name"}
              spanClassName={`w-40 flex-shrink-0 text-start flex-shrink-0 text-right relative after:right-10 ${EnrollmentStyle["Enrollment__heavy"]}`}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
              name={"last_name"}
              value={Student?.last_name}
              disabled={isLoading}
              onChange={handleChange}
            >
              {Selections && (
                <FormError className={"pl-44"}>Is Empty</FormError>
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
              value={Student?.mid_name}
              onChange={handleChange}
              disabled={isLoading}
            />

            <CustomInput
              placeholder={"Address"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
              spanText={"Address"}
              spanClassName={`w-40 flex-shrink-0 text-start flex-shrink-0 text-right relative after:right-16 ${EnrollmentStyle["Enrollment__heavy"]}`}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
              name={"address"}
              value={Student?.address}
              disabled={isLoading}
              onChange={handleChange}
            >
              {Selections && (
                <FormError className={"pl-44"}>Is Empty</FormError>
              )}
            </CustomInput>

            <CustomInput
              placeholder={"City"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
              spanText={"City"}
              spanClassName={`w-40 flex-shrink-0 text-start flex-shrink-0 text-right relative after:right-24 ${EnrollmentStyle["Enrollment__heavy"]}`}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
              name={"city"}
              value={Student?.city}
              disabled={isLoading}
              onChange={handleChange}
            >
              {Selections && (
                <FormError className={"pl-44"}>Is Empty</FormError>
              )}
            </CustomInput>

            <label className="inline-flex items-center w-full gap-5">
              <span
                className={`w-40 flex-shrink-0 text-start relative after:right-20 ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                State
              </span>
              <div className={"space-y-5 flex-grow"}>
                <CustomSelect
                  placeholder={"State"}
                  colorBorder={colorsObject.primary}
                  className={`shadow-lg w-full h-[50px]`}
                  onChange={handleState}
                  value={State || Student?.state}
                  disabled={isLoading}
                  options={[
                    {
                      value: 1,
                      label: "USA",
                    },
                  ]}
                />
                {Selections && <FormError>Is Empty</FormError>}
              </div>
            </label>

            <CustomInput
              placeholder={"Zip/Postal code"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
              spanText={"Zip/Postal code"}
              spanClassName={`w-40 flex-shrink-0 text-start relative after:right-0 ${EnrollmentStyle["Enrollment__heavy"]}`}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
              name={"zip"}
              value={Student?.zip}
              disabled={isLoading}
              onChange={handleChange}
            >
              {Selections && (
                <FormError className={"pl-44"}>Is Empty</FormError>
              )}
            </CustomInput>

            <CustomInput
              placeholder={"Home Phone"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
              spanText={"Home Phone"}
              spanClassName={`w-40 flex-shrink-0 text-start relative after:right-5 ${EnrollmentStyle["Enrollment__heavy"]}`}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
              name={"home_phone"}
              value={Student?.home_phone}
              disabled={isLoading}
              onChange={handleChange}
            >
              {Selections && (
                <FormError className={"pl-44"}>Is Empty</FormError>
              )}
            </CustomInput>

            <CustomInput
              placeholder={"Cell Phone"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
              spanText={"Cell Phone"}
              spanClassName={`w-40 flex-shrink-0 text-start relative after:right-5 ${EnrollmentStyle["Enrollment__heavy"]}`}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
              name={"cell_phone"}
              value={Student?.cell_phone}
              disabled={isLoading}
              onChange={handleChange}
            >
              {Selections && (
                <FormError className={"pl-44"}>Is Empty</FormError>
              )}
            </CustomInput>

            <label className="inline-flex items-center w-full gap-5">
              <span
                className={`w-36 flex-shrink-0 text-start relative after:right-5 ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Email
              </span>
              <div className="flex items-center gap-2 flex-grow">
                <div className={"flex-grow"}>
                  <CustomInput
                    placeholder={"Email"}
                    classNames={"w-full h-[50px] px-4"}
                    className={`shadow-lg border border-indigo-700 w-full px-4 p-2.5`}
                    type="email"
                    value={Student?.email}
                    name={"email"}
                    disabled={isLoading}
                    onChange={handleChange}
                  >
                    {Selections && (
                      <FormError className={"pl-44"}>Is Empty</FormError>
                    )}
                  </CustomInput>
                </div>
                <IconComponent>
                  <TfiEmail
                    className={`w-[25.5px] h-[23.57px] text-[#00000073]`}
                  />
                </IconComponent>
              </div>
            </label>

            <label className="flex items-center gap-9">
              <span
                className={`w-36 flex-shrink-0 text-start relative after:right-5 ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Gender
              </span>

              <div className={"space-y-5"}>
                <div className={"space-x-2.5"}>
                  <CustomRadio
                    classNames={"inline-flex gap-2.5 items-center"}
                    name={"gender"}
                    value={"Male"}
                    checked={"Male" === Student?.gender}
                    onChange={handleChange}
                  >
                    <Text fontSize={"text-base"}>Male</Text>
                  </CustomRadio>
                  <CustomRadio
                    classNames={"inline-flex gap-2.5 items-center"}
                    name={"gender"}
                    value={"Female"}
                    checked={"Female" === Student?.gender}
                    onChange={handleChange}
                  >
                    <Text fontSize={"text-base"}>Female</Text>
                  </CustomRadio>
                  <CustomRadio
                    classNames={"inline-flex gap-2.5 items-center"}
                    name={"gender"}
                    value={"Other"}
                    checked={"Other" === Student?.gender}
                    onChange={handleChange}
                  >
                    <Text fontSize={"text-base"}>Other</Text>
                  </CustomRadio>
                </div>

                {Selections && (
                  <FormError className={"pl-44"}>Is Empty</FormError>
                )}
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
                disabled={isLoading}
                value={Pronoun}
                onChange={handlePronoun}
              />
            </label>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center w-full gap-5">
              <span
                className={`w-40 flex-shrink-0 text-start relative after:right-5 ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Date of birth
              </span>

              <div className={"space-x-5"}>
                <CustomSelect
                  placeholder={"Month"}
                  colorBorder={colorsObject.primary}
                  options={Months}
                  className={"w-[90px] h-[50px]"}
                  onChange={handleBirthMonth}
                  value={BirthMonth}
                  disabled={isLoading}
                />
                <CustomSelect
                  placeholder={"Day"}
                  colorBorder={colorsObject.primary}
                  options={Days}
                  className={"w-[90px] h-[50px]"}
                  onChange={handleBirthDay}
                  value={BirthDay}
                  disabled={isLoading}
                />
                <CustomSelect
                  placeholder={"Year"}
                  colorBorder={colorsObject.primary}
                  options={YearsOptions()}
                  className={"w-[90px] h-[50px]"}
                  onChange={handleBirthYear}
                  value={BirthYear}
                  disabled={isLoading}
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
              name={"dl_permit"}
              value={Student?.dl_permit}
              disabled={isLoading}
              onChange={handleChange}
            />

            <label className="inline-flex gap-5 items-center w-full">
              <span className={`text-base flex-shrink-0 w-40`}>
                DL/Permit Issued
              </span>
              <DatePicker
                className={`w-full border border-indigo-600 h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                placeholder={"DD/MM/YYYY"}
                onChange={handleDLIssued}
                defaultValue={DlIssued || dayjs(Student?.dl_given_date)}
                disabled={isLoading}
              />
            </label>

            <label className="inline-flex gap-5 items-center w-full">
              <span className={`text-base flex-shrink-0 w-40`}>
                DL Permit Expiration
              </span>
              <DatePicker
                className={`w-full border border-indigo-600 h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                placeholder={"DD/MM/YYYY"}
                onChange={handleDLExpireDate}
                defaultValue={DLExpiration || dayjs(Student?.dl_expire_date)}
                disabled={isLoading}
              />
            </label>

            <CustomCheckBox
              className={`inline-flex justify-end items-center w-full flex-row-reverse`}
              name={"scheduling"}
              onChange={handleChange}
            >
              <span className={"w-44 text-base flex-shrink-0"}>
                Self Scheduling
              </span>
            </CustomCheckBox>

            <CustomCheckBox
              className={`inline-flex justify-end items-center w-full flex-row-reverse`}
              name={"payment"}
              onChange={handleChange}
            >
              <span className={"w-44 text-base flex-shrink-0"}>
                Payment Plan
              </span>
            </CustomCheckBox>

            <label className="inline-flex gap-5 items-center w-full">
              <span className={`text-base flex-shrink-0 w-40`}>
                Extension Date
              </span>
              <DatePicker
                className={`w-full border border-indigo-600 h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                placeholder={"DD/MM/YYYY"}
                onChange={handleExtensionDate}
                defaultValue={ExtensionDate}
                disabled={isLoading}
              />
            </label>

            <label className="inline-flex items-center w-full gap-5">
              <span className={"w-40 text-base flex-shrink-0"}>
                High School
              </span>
              <CustomSelect
                placeholder={"High School"}
                colorBorder={colorsObject.primary}
                className={`shadow-lg w-full h-[50px]`}
                options={SchoolsOptions}
                onChange={handleSchool}
                value={School}
              />
            </label>

            <CustomInput
              placeholder={"Parent name"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
              spanText={"Parent name"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
              name={"parent_name"}
              value={Student?.parent_name}
            />

            <CustomInput
              placeholder={"Parent Phone"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
              spanText={"Parent Phone"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
              name={"parent_phone"}
              value={Student?.parent_phone}
            />

            <CustomInput
              placeholder={"Parent Email"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
              spanText={"Parent Email"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              type={"email"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
              name={"parent_email"}
              value={Student?.parent_email}
            />

            <CustomInput
              placeholder={"Parent name 2"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
              spanText={"Parent name 2"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
              name={"parent_2_name"}
              value={Student?.parent_2_name}
            />

            <CustomInput
              placeholder={"Parent Phone 2"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
              spanText={"Parent Phone 2"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
              name={"parent_2_phone"}
              value={Student?.parent_2_phone}
            />

            <CustomInput
              placeholder={"Parent Email 2"}
              className={`shadow-lg w-full px-4 border border-indigo-700 p-2.5`}
              spanText={"Parent Email 2"}
              spanClassName={"w-40 flex-shrink-0"}
              fontSize={"text-base"}
              type={"email"}
              classNames={`inline-flex flex-shrink-0 justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
              name={"parent_2_email"}
              value={Student?.parent_2_email}
            />

            <CustomCheckBox
              className={
                "inline-flex flex-row-reverse items-center justify-end w-full h-[50px]"
              }
              name={"home_drop_off"}
              onChange={handleChange}
            >
              <span className={`text-base flex-shrink-0 w-44`}>
                Home Drop off
              </span>
            </CustomCheckBox>
          </div>
        </div>

        {IsMore && (
          <Fragment>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-7">
                <div
                  className={"bg-white shadow-2xl space-y-3 rounded-2xl p-5"}
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
                  className={"bg-white shadow-2xl space-y-3 rounded-2xl p-5"}
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
                  className={"bg-white shadow-2xl space-y-3 rounded-2xl p-5"}
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
                  className={"bg-white shadow-2xl space-y-3 rounded-2xl p-5"}
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
              borderRadius={5}
              className={"w-[234px]"}
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
              paddingInline={99}
              borderRadius={5}
              type={"submit"}
              onClick={handleSubmit}
            >
              Save
            </ButtonComponent>
          </div>
        </div>
      </form>

      {IsOpen && state?.status}
    </Fragment>
  );
};

export default Profile;
