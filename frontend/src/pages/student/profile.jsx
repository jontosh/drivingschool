import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomSelect,
} from "@/components/form/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { AlertError, AlertSuccess } from "@/hooks/alert.jsx";
import {
  useRequestGetQuery,
  useRequestIdQuery,
  useRequestPatchMutation,
} from "@/redux/query/index.jsx";
import { Fragment, useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileStyle from "./student-account.module.scss";
import { DatePicker, Form, Input, QRCode, Radio } from "antd";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import moment from "moment";

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
  const [requestPatch] = useRequestPatchMutation();
  const { data, isLoading } = useRequestIdQuery({
    path: "/student_account/student",
    id: studentId,
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
  const { data: LeadData } = useRequestGetQuery({
    path: "/account_management/how_did_you_hear_us/",
  });
  const { data: EmergencyData } = useRequestGetQuery({
    path: "/student_account/emergency_contact/",
  });

  const [InstructorOptions, setInstructorOptions] = useState([]);
  const [SchoolsOptions, setSchoolsOptions] = useState([]);
  const [LeadOptions, setLeadOptions] = useState([]);
  const [Emergency, setEmergency] = useState({});
  const [AssignLocationOptions, setAssignLocationOptions] = useState([]);
  const [IsMore, setIsMore] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

  // INSTRUCTOR
  useEffect(() => {
    const options = [];

    for (let i = 0; i < InstructorData?.length; i++) {
      const instructor = InstructorData[i];
      if (instructor.status === "ACTIVE") {
        options.push({
          ...instructor,
          value: instructor?.id,
          label: instructor?.first_name + " " + instructor?.last_name,
        });
      }
    }

    setInstructorOptions(options);
  }, [InstructorData, isLoading]);

  // Emergency
  useEffect(() => {
    let emergency = {};
    for (let i = 0; i < EmergencyData?.length; i++) {
      const item = EmergencyData[i];

      if (item.student === studentId) {
        emergency = {
          emergencyId: item.id,
          name: item.name,
          phone: item.phone,
          relation: item.relation,
          how_did_you_hear_us: item.how_did_you_hear_us[0],
          wear_glass: item.wear_glass,
          emergency_medical_condition: item.medical_condition,
        };
        break;
      }
    }

    setEmergency(emergency);
  }, [EmergencyData]);

  // LOCATION
  useEffect(() => {
    const options = [];

    for (let i = 0; i < LocationData?.length; i++) {
      const location = LocationData[i];
      if (location.status === "ACTIVE") {
        options.push({
          ...location,
          value: location?.id,
          label: location?.name,
        });
      }
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

  // LeadData
  useEffect(() => {
    const options = [];

    for (let i = 0; i < LeadData?.length; i++) {
      const lead = SchoolsData[i];

      if (lead?.status?.toLowerCase() === "active") {
        options.push({
          ...lead,
          value: lead?.id,
          label: lead?.name,
        });
      }
    }

    setLeadOptions(options);
  }, [LeadData, isLoading]);

  const handleMore = () => setIsMore((prev) => !prev);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const res = await requestPatch({
        path: "/student_account/student",
        data: {
          ...values,
          birth: values["birth"]?.format("YYYY-MM-DD"),
          dl_given_date: values["dl_given_date"]?.format("YYYY-MM-DD"),
          dl_expire_date: values["dl_expire_date"]?.format("YYYY-MM-DD"),
          extension_data: values["extension_data"]?.format("YYYY-MM-DD"),
        },
        id: studentId,
      }).reset();

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
  };

  return (
    <Fragment>
      <Form
        layout={"vertical"}
        form={form}
        onFinish={onFinish}
        initialValues={{
          ...data,
          ...Emergency,
          birth: moment(data?.birth),
          dl_given_date: moment(data?.dl_given_date),
          dl_expire_date: moment(data?.dl_expire_date),
          extension_data: moment(data?.extension_data ?? moment()),
          _disable_self_scheduling: false,
          _payment_plan: false,
          note: "",
          terms_conditions: true,
        }}
      >
        <div className="flex justify-between gap-7 pb-6 border-b border-b-indigo-700 px-5 -mx-5">
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
                      colorBorder={colorsObject.info}
                      disabled={isLoading}
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

        <div className="p-5 grid grid-cols-2 gap-5">
          <div className="space-y-5">
            <Form.Item name={"type"} label={"Student Type"}>
              <CustomSelect
                placeholder={"Type"}
                options={[
                  { value: "TEEN", label: "TEEN" },
                  { value: "ADULT", label: "ADULT" },
                ]}
              />
            </Form.Item>

            <Form.Item name={"staff"} label={"Assign to Staff"}>
              <CustomSelect placeholder={"Staff"} options={InstructorOptions} />
            </Form.Item>

            <Form.Item name={"location"} label={"Assign To Location"}>
              <CustomSelect
                placeholder={"location"}
                options={AssignLocationOptions}
              />
            </Form.Item>

            <Form.Item name={"id"} label={"Student ID"}>
              <CustomInput
                disabled={true}
                classNames={"w-full"}
                placeholder={"Id"}
              />
            </Form.Item>

            <Form.Item
              name={"first_name"}
              label={"First Name"}
              rules={[
                {
                  required: true,
                  message: "Please input First Name!",
                },
              ]}
            >
              <CustomInput classNames={"w-full"} placeholder={"First Name"} />
            </Form.Item>

            <Form.Item name={"mid_name"} label={"Middle Name"}>
              <CustomInput classNames={"w-full"} placeholder={"Middle Name"} />
            </Form.Item>

            <Form.Item
              name={"last_name"}
              label={"Last Name"}
              rules={[
                {
                  required: true,
                  message: "Please input last Name!",
                },
              ]}
            >
              <CustomInput classNames={"w-full"} placeholder={"last Name"} />
            </Form.Item>

            <Form.Item
              name={"address"}
              label={"Address"}
              rules={[
                {
                  required: true,
                  message: "Please input address!",
                },
              ]}
            >
              <CustomInput classNames={"w-full"} placeholder={"Address"} />
            </Form.Item>

            <Form.Item
              name={"city"}
              label={"City"}
              rules={[
                {
                  required: true,
                  message: "Please input city!",
                },
              ]}
            >
              <CustomInput classNames={"w-full"} placeholder={"City"} />
            </Form.Item>

            <Form.Item
              name={"state"}
              label={"State"}
              rules={[
                {
                  required: true,
                  message: "Please select state!",
                },
              ]}
            >
              <CustomSelect
                placeholder={"State"}
                options={[{ value: "USA", label: "USA" }]}
              />
            </Form.Item>

            <Form.Item
              name={"zip"}
              label={"Zip"}
              rules={[
                {
                  required: true,
                  message: "Please input zip!",
                },
              ]}
            >
              <CustomInput classNames={"w-full"} placeholder={"Zip"} />
            </Form.Item>

            <Form.Item
              name={"cell_phone"}
              label={"Cell Phone "}
              rules={[
                {
                  required: true,
                  message: "Please input Cell Phone !",
                },
              ]}
            >
              <CustomInput classNames={"w-full"} placeholder={"Cell Phone "} />
            </Form.Item>

            <Form.Item name={"home_phone"} label={"Home Phone"}>
              <CustomInput classNames={"w-full"} placeholder={"Home Phone"} />
            </Form.Item>

            <Form.Item
              name={"email"}
              label={"Email"}
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <CustomInput
                type={"email"}
                classNames={"w-full"}
                placeholder={"Email"}
              />
            </Form.Item>

            <Form.Item
              name={"gender"}
              label={"Gender"}
              rules={[
                {
                  required: true,
                  message: "Choose one of gender!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
                <Radio value="Other">Other</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name={"preferred_pronoun"}
              label={"Preferred Pronoun"}
              rules={[
                {
                  required: true,
                  message: "Please select preferred pronoun!",
                },
              ]}
            >
              <CustomSelect
                options={[
                  {
                    value: "He",
                    label: "He",
                  },
                  {
                    value: "She",
                    label: "She",
                  },
                  {
                    value: "Other",
                    label: "Other",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div className="space-y-5">
            <Form.Item
              name={"birth"}
              label={"Birthday"}
              rules={[
                {
                  required: true,
                  message: "Please input Birthday!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item name={"dl_permit"} label={"DL/Permit #"}>
              <CustomInput placeholder={"DL/Permit"} />
            </Form.Item>

            <Form.Item name={"dl_given_date"} label={"DL/Permit Issued"}>
              <DatePicker />
            </Form.Item>

            <Form.Item name={"dl_expire_date"} label={"DL Permit Expiration"}>
              <DatePicker />
            </Form.Item>

            <Form.Item
              name={"_disable_self_scheduling"}
              label={"Disable Self Scheduling"}
              valuePropName="checked"
            >
              <CustomCheckBox />
            </Form.Item>

            <Form.Item
              name={"_payment_plan"}
              label={"Payment Plan"}
              valuePropName="checked"
            >
              <CustomCheckBox />
            </Form.Item>

            <Form.Item
              name={"extension_data"}
              label={"Extension Date (New Deadline)"}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item name={"high_school"} label={"High School"}>
              <CustomSelect
                placeholder={"High School"}
                options={SchoolsOptions}
              />
            </Form.Item>

            <Form.Item name={"parent_name"} label={"Parent Name"}>
              <CustomInput placeholder={"Parent Name"} />
            </Form.Item>

            <Form.Item name={"parent_phone"} label={"Parent Phone"}>
              <CustomInput placeholder={"Parent Phone"} />
            </Form.Item>

            <Form.Item
              name={"parent_email"}
              label={"Parent email"}
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <CustomInput type={"email"} placeholder={"Parent email"} />
            </Form.Item>

            {/*  ---------------- */}
            <Form.Item name={"parent_2_name"} label={"Parent Name 2"}>
              <CustomInput placeholder={"Parent Name"} />
            </Form.Item>

            <Form.Item name={"parent_2_phone"} label={"Parent Phone 2"}>
              <CustomInput placeholder={"Parent Phone"} />
            </Form.Item>

            <Form.Item
              name={"parent_2_email"}
              label={"Parent email 2"}
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <CustomInput type={"email"} placeholder={"Parent email"} />
            </Form.Item>
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
                    <Form.Item className={"flex-grow mb-0"} name={"note"}>
                      <Input.TextArea
                        className={"border-black"}
                        placeholder={"Notes"}
                      />
                    </Form.Item>
                    <ButtonComponent
                      defaultBg={"#24C18F"}
                      defaultHoverBg={"#3CE3AE"}
                      defaultColor={colorsObject.main}
                      paddingInline={97}
                      controlHeight={40}
                      borderRadius={5}
                      type={"submit"}
                    >
                      Save
                    </ButtonComponent>
                  </div>

                  {data?.note !== "" && <article>{data?.note}</article>}
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
                    <Form.Item name={"name"} label={"Emergency name"}>
                      <CustomInput
                        placeholder={"Emergency name"}
                        classNames={`w-full`}
                      />
                    </Form.Item>

                    <Form.Item
                      name={"relation"}
                      label={"Emergency relationship"}
                    >
                      <CustomInput
                        placeholder={"Emergency relationship"}
                        classNames={`w-full`}
                      />
                    </Form.Item>

                    <Form.Item name={"phone"} label={"Emergency phone"}>
                      <CustomInput
                        placeholder={"Emergency phone"}
                        classNames={`w-full`}
                      />
                    </Form.Item>

                    <Form.Item name={"how_did_you_hear_us"} label={"Lead"}>
                      <CustomSelect
                        placeholder={"Lead"}
                        className={`shadow-lg w-full h-[50px]`}
                        options={LeadOptions}
                        disabled={isLoading}
                      />
                    </Form.Item>

                    <Form.Item
                      name={"emergency_medical_condition"}
                      label={"Medial condition"}
                    >
                      <Input.TextArea
                        className={"border-black"}
                        placeholder={"Medial condition"}
                      />
                    </Form.Item>

                    <Form.Item
                      label={"Wear glasses contact"}
                      name={"wear_glass"}
                      valuePropName="checked"
                    >
                      <CustomCheckBox />
                    </Form.Item>

                    <Form.Item
                      label={"Terms & Conditions"}
                      name={"terms_conditions"}
                      valuePropName="checked"
                    >
                      <CustomCheckBox />
                    </Form.Item>
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
