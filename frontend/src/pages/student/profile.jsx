import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomSelect,
} from "@/components/form/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { AlertError, AlertSuccess } from "@/hooks/alert.jsx";
import { useDate } from "@/hooks/useDate.jsx";
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
import ProfileStyle from "./student-account.module.scss";
import { Form, QRCode } from "antd";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

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

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
  };

  return (
    <Fragment>
      <Form form={form} onFinish={onFinish} initialValues={{}}>
        <div className=" flex justify-between gap-7 pb-6 border-b border-b-indigo-700 px-5 -mx-5">
          <div
            className={`rounded-2xl border-2 border-indigo-700 w-[460px] overflow-hidden`}
          >
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
              <Map
                defaultCenter={{ lat: 22.54992, lng: 32 }}
                style={{ height: "100%" }}
                defaultZoom={3}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
              />
            </APIProvider>
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
                  <Form.Item name={"status"} className={"mb-0"}>
                    <CustomSelect
                      placeholder={"Select Status"}
                      options={[
                        { value: "ACTIVE", label: "ACTIVE" },
                        { value: "DELETED", label: "DELETED" },
                        { value: "PENDING", label: "PENDING" },
                      ]}
                      className={`w-full h-[40px] text-white ${ProfileStyle["Status"]}`}
                      selectorBg={colorsObject.info}
                      onChange={handleStatus}
                      colorBorder={colorsObject.info}
                    />
                  </Form.Item>

                  <ButtonComponent
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.info}
                    className={"w-full pt-1.5"}
                    borderRadius={5}
                    href={"/admin/student/account/messages/" + studentId}
                  >
                    Send Text
                  </ButtonComponent>
                  <div className="flex gap-5 items-center">
                    <div
                      className={`${ProfileStyle["Student-profile__imageholder-small"]} rounded-lg border-2 border-indigo-700`}
                    >
                      <QRCode
                        style={{ width: "100%", height: "100%" }}
                        type="svg"
                        value="https://ant.design/"
                      />
                    </div>

                    <ButtonComponent
                      defaultBg={colorsObject.info}
                      defaultHoverBg={colorsObject.info}
                      className={"flex-grow"}
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
                    className={"w-full pt-1.5"}
                    borderRadius={5}
                    href={"/student/dashboard/"}
                    target={"_blank"}
                  >
                    Access Student Center
                  </ButtonComponent>

                  <ButtonComponent
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.info}
                    className={"w-full"}
                    borderRadius={5}
                  >
                    Username/Password
                  </ButtonComponent>

                  <ButtonComponent
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.info}
                    className={"w-full"}
                    borderRadius={5}
                  >
                    Other
                  </ButtonComponent>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5">@todo</div>

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
                      className={"px-4"}
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
                      className={`shadow-lg px-4 py-2.5 w-full`}
                      spanText={"Emergency name"}
                      spanClassName={"w-48 flex-shrink-0"}
                      fontSize={"text-base"}
                      classNames={`inline-flex justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                    />
                    <CustomInput
                      placeholder={"Emergency relationship"}
                      className={`shadow-lg px-4 py-2.5 w-full`}
                      spanText={"Emergency relationship"}
                      spanClassName={"w-48 flex-shrink-0"}
                      fontSize={"text-base"}
                      classNames={`inline-flex justify-end items-center w-full h-[50px] gap-5 flex-row-reverse`}
                    />
                    <CustomInput
                      placeholder={"Emergency phone"}
                      className={`shadow-lg px-4 py-2.5 w-full`}
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
                      className={`shadow-lg px-4 py-2.5 w-full`}
                      spanText={"Medial condition"}
                      spanClassName={"w-48 flex-shrink-0"}
                      fontSize={"text-base"}
                      classNames={`inline-flex justify-end items-center w-full gap-5 flex-row-reverse`}
                    />

                    <label className="inline-flex items-center w-full gap-5">
                      <span className={"w-48 text-base flex-shrink-0"}>
                        Wear glasses contact
                      </span>
                      <CustomSelect
                        placeholder={"No"}
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
      </Form>

      {IsOpen && state?.status}
    </Fragment>
  );
};

export default Profile;
