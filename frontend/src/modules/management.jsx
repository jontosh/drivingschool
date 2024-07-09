import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomSelect,
} from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import AccountManagementContext from "@/context/account-management.jsx";
import {
  AlertDelete,
  AlertEdit,
  AlertError,
  AlertSuccess,
} from "@/hooks/alert.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import {
  useRequestDeleteMutation,
  useRequestGetQuery,
  useRequestIdQuery,
  useRequestPatchMutation,
  useRequestPostMutation,
} from "@/redux/query/index.jsx";
import {
  DeleteOutlined,
  ExportOutlined,
  FormOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import {
  Collapse,
  Form,
  InputNumber,
  message,
  Radio,
  Statistic,
  Switch,
  TimePicker,
  Tooltip,
} from "antd";
import classNames from "classnames";
import { Fragment, useContext, useState, useEffect, useReducer } from "react";
import { GoClock, GoEye } from "react-icons/go";
import { IoCheckmarkCircle } from "react-icons/io5";
import { TbActivityHeartbeat } from "react-icons/tb";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import useLocalStorage from "use-local-storage";
import ModuleManagementStyle from "./modules.module.scss";
import { HiDotsVertical } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
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

export const LocationModule = () => {
  const { LocationData: data } = useContext(AccountManagementContext);
  const [IsOpen, setIsOpen] = useState(false);
  const [ModalType, setModalType] = useState("");
  const [ActionIndex, setActionIndex] = useState(-1);
  const { AlertDeleteComponent, Confirm, setConfirm } = AlertDelete();
  const [requestDelete] = useRequestDeleteMutation();

  useEffect(() => {
    if (Confirm) {
      requestDelete({
        path: `/account_management/location/${data[ActionIndex]?.id}`,
      }).reset();
      setConfirm(false);
    }
  }, [Confirm, ActionIndex]);

  const columns = [
    {
      title: "Location name",
      key: "name",
      dataIndex: "name",
      render: (text) => {
        return (
          <Paragraph className={"text-start"} fontSize={"text-lg"}>
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Location code",
      key: "code",
      dataIndex: "code",
      align: "center",
      render: (text) => {
        return (
          <Paragraph className={"text-center"} fontSize={"text-lg"}>
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      align: "center",
      render: (text) => {
        return (
          <Paragraph className={"text-center"} fontSize={"text-lg"}>
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (text) => {
        const { bg, hover } = CheckProgress(text);
        return (
          <ButtonComponent
            defaultBg={bg}
            defaultHoverBg={hover}
            //
            borderRadius={5}
            style={{ width: 128 }}
          >
            {text?.toUpperCase()}
          </ButtonComponent>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, _, index) => {
        return (
          <Fragment>
            <div className={"space-x-2.5"}>
              <IconComponent
                className={"text-xl text-indigo-500 border border-indigo-600"}
                style={{
                  borderRadius: 5,
                  paddingLeft: 4,
                  paddingRight: 4,
                }}
                icon={<FormOutlined />}
                onClick={() => {
                  setIsOpen(true);
                  setModalType("edit");
                  setActionIndex(index);
                }}
              />

              <IconComponent
                className={"text-xl text-red-600 border border-indigo-600"}
                style={{
                  borderRadius: 5,
                  paddingLeft: 4,
                  paddingRight: 4,
                }}
                icon={<DeleteOutlined />}
                onClick={() => {
                  setIsOpen(true);
                  setModalType("delete");
                  setActionIndex(index);
                }}
              />

              <IconComponent
                className={"text-xl text-indigo-500 border border-indigo-600"}
                style={{
                  borderRadius: 5,
                  paddingLeft: 4,
                  paddingRight: 4,
                }}
                icon={<ExportOutlined />}
              />
            </div>
            {ActionIndex === index && IsOpen && ModalType === "delete" && (
              <AlertDeleteComponent setIsOpen={setIsOpen} />
            )}

            {ActionIndex === index && IsOpen && ModalType === "edit" && (
              <AlertEdit setIsOpen={setIsOpen} />
            )}
          </Fragment>
        );
      },
    },
  ];

  return { columns, data, AlertDeleteComponent };
};

export const HighSchoolModule = () => {
  const { SchoolData: data } = useContext(AccountManagementContext);

  const [IsOpen, setIsOpen] = useState(false);
  const [ModalType, setModalType] = useState("");
  const [ActionIndex, setActionIndex] = useState(-1);
  const { AlertDeleteComponent, Confirm, setConfirm } = AlertDelete();
  const [requestDelete] = useRequestDeleteMutation();

  useEffect(() => {
    if (Confirm) {
      requestDelete({
        path: `/account_management/schools/${data[ActionIndex]?.id}`,
      }).reset();
      setConfirm(false);
    }
  }, [Confirm, ActionIndex]);

  const columns = [
    {
      title: "School name",
      key: "name",
      dataIndex: "name",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "School code",
      key: "code",
      dataIndex: "code",
      align: "center",
      render: (text) => {
        return (
          <Paragraph className={"text-center"} fontSize={"text-lg"}>
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "High school map",
      key: "map",
      dataIndex: "map",
      align: "center",
      render: () => (
        <div className={"text-center"}>
          <IconComponent
            className={"text-2xl cursor-default"}
            icon={<GoEye />}
          />
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (text) => {
        const { bg, hover } = CheckProgress(text);
        return (
          <ButtonComponent
            defaultBg={bg}
            defaultHoverBg={hover}
            //
            borderRadius={5}
            style={{ width: 128 }}
          >
            {text?.toUpperCase()}
          </ButtonComponent>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, _, index) => (
        <Fragment>
          <div className={" space-x-2.5 "}>
            <IconComponent
              className={"text-xl text-indigo-500 border border-indigo-600"}
              style={{
                borderRadius: 5,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              icon={<FormOutlined />}
              onClick={() => {
                setIsOpen(true);
                setModalType("edit");
                setActionIndex(index);
              }}
            />

            <IconComponent
              className={
                "text-xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"
              }
              icon={<GoClock />}
              style={{
                borderRadius: 5,
                paddingLeft: 4,
                paddingRight: 4,
              }}
            />
          </div>
          {ActionIndex === index && IsOpen && ModalType === "edit" && (
            <AlertEdit setIsOpen={setIsOpen} />
          )}
        </Fragment>
      ),
    },
  ];

  return { columns, data, AlertDeleteComponent };
};

export const HearModule = () => {
  const { HearData: data } = useContext(AccountManagementContext);

  const [IsOpen, setIsOpen] = useState(false);
  const [ModalType, setModalType] = useState("");
  const [ActionIndex, setActionIndex] = useState(-1);
  const { AlertDeleteComponent, Confirm, setConfirm } = AlertDelete();
  const [requestDelete] = useRequestDeleteMutation();

  useEffect(() => {
    if (Confirm) {
      requestDelete({
        path: `/account_management/how_did_you_hear_us/${data[ActionIndex]?.id}`,
      }).reset();
      setConfirm(false);
    }
  }, [Confirm, ActionIndex]);

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      align: "center",
      render: (text) => {
        return (
          <Paragraph
            className={`text-start ${ModuleManagementStyle["HowDidYouHear__name"]}`}
            fontSize={"text-lg"}
          >
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "School code",
      key: "code",
      dataIndex: "code",
      align: "center",
      render: (text) => {
        return (
          <Paragraph className={"text-center"} fontSize={"text-lg"}>
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (text) => {
        const { bg, hover } = CheckProgress(text);
        return (
          <ButtonComponent
            defaultBg={bg}
            defaultHoverBg={hover}
            borderRadius={5}
            style={{ width: 128 }}
          >
            {text?.toUpperCase()}
          </ButtonComponent>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, _, index) => (
        <Fragment>
          <div className={" space-x-2.5 "}>
            <IconComponent
              className={"text-xl text-indigo-500 border border-indigo-600"}
              style={{
                borderRadius: 5,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              icon={<FormOutlined />}
              onClick={() => {
                setIsOpen(true);
                setActionIndex(index);
              }}
            />

            <IconComponent
              className={
                "text-xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"
              }
              icon={<GoClock />}
              style={{
                borderRadius: 5,
                paddingLeft: 4,
                paddingRight: 4,
              }}
            />
          </div>
          {ActionIndex === index && IsOpen && (
            <AlertEdit setIsOpen={setIsOpen} />
          )}
        </Fragment>
      ),
    },
  ];

  return { columns, data, AlertDeleteComponent };
};

export const VehiclesModule = () => {
  const { VehicleData: data, LocationData: LocationState } = useContext(
    AccountManagementContext,
  );

  const [IsOpen, setIsOpen] = useState(false);
  const [ModalType, setModalType] = useState("");
  const [ActionIndex, setActionIndex] = useState(-1);
  const { AlertDeleteComponent, Confirm, setConfirm } = AlertDelete();
  const [requestDelete] = useRequestDeleteMutation();

  useEffect(() => {
    if (Confirm) {
      requestDelete({
        path: `/account_management/vehicle/${data[ActionIndex]?.id}`,
      }).reset();
      setConfirm(false);
    }
  }, [Confirm, ActionIndex]);

  const columns = [
    {
      title: "Location name",
      key: "name",
      dataIndex: "name",
      render: (text) => {
        return <Paragraph fontSize={"text-lg"}>{text}</Paragraph>;
      },
    },
    {
      title: "Location code",
      key: "code",
      dataIndex: "code",
      align: "center",
      render: (code, _, index) => {
        // console.log(LocationState[index]?.code);
        return (
          <Paragraph className={"text-center"} fontSize={"text-lg"}>
            {LocationState[index]?.code}
          </Paragraph>
        );
      },
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      align: "center",
      render: (text) => {
        return (
          <Paragraph
            className={"text-center"}
            fontSize={"text-lg"}
            fontWeightStrong={400}
          >
            {text}
          </Paragraph>
        );
      },
    },
    {
      title: "Appointment color",
      key: "color",
      dataIndex: "color",
      align: "center",
      render: (color) => {
        return (
          <div
            className="w-32 m-auto"
            style={{
              height: 30,
              borderRadius: 5,
              background: color,
            }}
          />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, _, index) => (
        <Fragment>
          <div className={" space-x-2.5 "}>
            <IconComponent
              className={"text-xl text-indigo-500 border border-indigo-600"}
              style={{
                borderRadius: 5,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              icon={<FormOutlined />}
              onClick={() => {
                setIsOpen(true);
                setModalType("edit");
                setActionIndex(index);
              }}
            />

            <IconComponent
              className={
                "text-xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"
              }
              icon={<TbActivityHeartbeat />}
              classNames={"items-center"}
              style={{
                borderRadius: 5,
                paddingLeft: 4,
                paddingRight: 4,
              }}
            />

            <IconComponent
              className={
                "text-xl text-indigo-600 hover:text-indigo-600 border border-indigo-600"
              }
              icon={<GoClock />}
              style={{
                borderRadius: 5,
                paddingLeft: 4,
                paddingRight: 4,
              }}
            />
          </div>
          {ActionIndex === index && IsOpen && ModalType === "edit" && (
            <AlertEdit setIsOpen={setIsOpen} />
          )}
        </Fragment>
      ),
    },
  ];

  return { columns, data, AlertDeleteComponent };
};

const Settings = ({ ...props }) => {
  const [form] = Form.useForm();
  const { colorsObject } = useContext(ColorsContext);
  const [requestPost] = useRequestPostMutation();
  const { data: ServiceData } = useRequestGetQuery({
    path: "/account_management/services/service/",
  });
  const { data: ClassData } = useRequestGetQuery({
    path: "/account_management/class/",
  });
  const [TestSettings, setTestSettings] = useLocalStorage(
    "test-setting",
    "null",
  );
  const [TestId, setTestId] = useLocalStorage("test-id", "0");

  const [ServiceOption, setServiceOption] = useState([]);
  const [ClassOption, setClassOption] = useState([]);
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

  useEffect(() => {
    const classes = [];
    const services = [];

    for (let i = 0; i < ServiceData?.length; i++) {
      const item = ServiceData[i];
      if (item?.status.toLowerCase() === "active") {
        services.push({
          ...item,
          value: item?.id,
          label: item?.name,
        });
      }
    }

    for (let i = 0; i < ClassData?.length; i++) {
      const item = ClassData[i];
      if (item?.status.toLowerCase() === "active") {
        classes.push({
          ...item,
          value: item?.id,
          label: item?.details,
        });
      }
    }

    setClassOption(classes);
    setServiceOption(services);
  }, [ClassData, ServiceData]);

  // func
  const onFinish = async (values) => {
    try {
      const res = await requestPost({
        path: "/account_management/services/test/",
        data: values,
      });

      if (res?.error?.status >= 400) {
        dispatch({ type: "ERROR", setIsOpen });
        setIsOpen(true);
      } else {
        dispatch({ type: "SUCCESS", setIsOpen });
        setIsOpen(true);
        setTestSettings(JSON.stringify(res?.data));
        setTestId(JSON.parse(TestSettings)?.id);
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
        form={form}
        onFinish={onFinish}
        layout={"vertical"}
        initialValues={{
          pass_text: "Hello",
          fall_text: "Hello",
          welcome_text: "Hello",
          cr: [],
          service: [],
          status: "ACTIVE",
        }}
      >
        <div
          className={
            "grid grid-cols-3 gap-5 max-[1300px]:grid-cols-2 max-[1000px]:grid-cols-1"
          }
        >
          <div className="space-y-5">
            <Form.Item
              name={"name"}
              label={"Quiz name"}
              rules={[
                {
                  required: true,
                  message: "Quiz name is empty",
                },
              ]}
            >
              <CustomInput classNames={"w-full"} placeholder={"Quiz name"} />
            </Form.Item>

            <Form.Item
              name={"_is_display_name"}
              label={"Display Quiz Name to Student"}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name={"status"}
              label={"Status"}
              rules={[
                {
                  required: true,
                  message: "Status is empty",
                },
              ]}
            >
              <CustomSelect
                placeholder={"Please select"}
                options={[
                  { value: "ACTIVE", label: "ACTIVE" },
                  { value: "PENDING", label: "PENDING" },
                ]}
                className={"w-full h-[50px]"}
              />
            </Form.Item>

            <Form.Item
              name={"count"}
              label={"# of Questions Displayed to Student"}
              rules={[
                {
                  required: true,
                  message: "of Questions Displayed to Student is empty",
                },
              ]}
            >
              <InputNumber className={"w-full h-[50px]"} />
            </Form.Item>

            <Form.Item
              name={"passing_grade"}
              label={"Passing Grade"}
              rules={[
                {
                  required: true,
                  message: "Passing Grade is empty",
                },
              ]}
            >
              <InputNumber className={"w-full h-[50px]"} />
            </Form.Item>

            <Form.Item name={"_is_final"} label={"Final Exam"}>
              <Switch />
            </Form.Item>

            <Form.Item
              name={"_is_class_session"}
              label={"Associate with This Class Session"}
            >
              <InputNumber className={"w-full h-[50px]"} />
            </Form.Item>

            <Form.Item name={"timer"} label={"Time"}>
              <TimePicker
                className={"w-full h-[50px]"}
                format="hh:mm:ss"
                placeholder={"Select duration"}
              />
            </Form.Item>

            <Form.Item name={"pass_text"} label={"Pass Feedback"}>
              <MDEditor
                placeholder={"Text"}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
              />
            </Form.Item>
          </div>

          <div className={"space-y-5"}>
            <Form.Item
              name={"_is_attendance_required"}
              label={"Attendance Required for Associated Session only"}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name={"_is_attendance_required_cr"}
              label={
                "Attendance Required for Preceding and Associated CR Sessions"
              }
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name={"_is_attendance_required_cr_only"}
              label={"Attendance Required for All Preceding CR Sessions Only"}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name={"_display_progress_bar"}
              label={"Display Progress Bar During Quiz"}
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name={"_random_order"}
              label={"Randomize Questions Order"}
            >
              <Switch />
            </Form.Item>

            <Form.Item name={"_is_timer"} label={"Enable Quiz Timer"}>
              <Switch />
            </Form.Item>

            <Form.Item
              name={"_allow_view_complete"}
              label={"Allow Students to View Completed Quizzes"}
            >
              <Switch />
            </Form.Item>

            <Form.Item name={"fall_text"} label={"Fail Feedback"}>
              <MDEditor
                placeholder={"Text"}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
              />
            </Form.Item>
          </div>

          <div className="space-y-5">
            <Form.Item
              name={"service"}
              label={"Associate with Service"}
              rules={[
                {
                  required: true,
                  message: "Associate with Service is empty",
                },
              ]}
            >
              <CustomSelect
                mode="multiple"
                placeholder="Please select"
                options={ServiceOption}
                className={"w-full h-[50px]"}
              />
            </Form.Item>
            <Form.Item name={"cr"} label={"Associate with CR Service"}>
              <CustomSelect
                mode="multiple"
                placeholder="Please select"
                options={ClassOption}
                className={"w-full h-[50px]"}
              />
            </Form.Item>

            <Form.Item name={"welcome_text"} label={"Welcome Text"}>
              <MDEditor
                placeholder={"Text"}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
              />
            </Form.Item>
          </div>
        </div>

        <Form.Item className="text-center pt-7">
          <ButtonComponent
            defaultBg={colorsObject.info}
            defaultHoverBg={colorsObject.info}
            paddingInline={44}
            borderRadius={5}
            type={"submit"}
          >
            Save
          </ButtonComponent>
        </Form.Item>
      </Form>
      {IsOpen && state?.status}
    </Fragment>
  );
};

const MultipleChoice = ({ form, ...props }) => {
  const { colorsObject } = useContext(ColorsContext);

  return (
    <div className="space-y-5">
      <Form.List name="answers">
        {(fields, { add, remove }) => {
          // console.log(fields);
          return (
            <Fragment>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <div key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, index, "text"]}
                    label={"CHOISE OF ANSWER"}
                    className="w-full"
                    rules={[
                      {
                        required: true,
                        message: "Please input title!",
                      },
                    ]}
                  >
                    <CustomInput
                      placeholder={"CHOISE OF ANSWER"}
                      classNames={"w-full"}
                    />
                  </Form.Item>
                  <div className="flex items-center justify-between">
                    <Form.Item
                      {...restField}
                      name={[name, index, "is_correct"]}
                      label={"CORRECT ANSWER"}
                      fieldKey={fieldKey}
                      valuePropName="checked"
                    >
                      <CustomCheckBox />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </div>
                </div>
              ))}
              <Form.Item>
                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.info}
                  type="button"
                  onClick={() => add()}
                  paddingInline={44}
                  borderRadius={5}
                >
                  Add another option
                </ButtonComponent>
              </Form.Item>
            </Fragment>
          );
        }}
      </Form.List>
    </div>
  );
};

const TrueFalse = ({ form, ...props }) => {
  const [Index, setIndex] = useState(0);

  const TrueAndFalse = [
    { value: "true", label: "True" },
    { value: "false", label: "False" },
  ].map((option, index) => (
    <Radio
      onChange={() => setIndex(index)}
      key={index}
      value={option.value}
      className={"flex flex-col-reverse"}
    >
      <Form.Item
        label="CHOISE OF ANSWER"
        rules={[
          {
            required: true,
            message: "Please input title",
          },
        ]}
        name={["answers", index, "text"]}
      >
        <div className="space-y-5">
          <CustomInput classNames={"w-full"} placeholder={option.label} />
        </div>
      </Form.Item>
    </Radio>
  ));

  return (
    <Form.Item name={["answers", Index, "is_correct"]}>
      <Radio.Group className={"flex flex-col"}>{TrueAndFalse}</Radio.Group>
    </Form.Item>
  );
};

const Category = ({ form, ...props }) => {
  const { colorsObject } = useContext(ColorsContext);

  return (
    <div className="space-y-5">
      <Form.List name="answers">
        {(fields, { add, remove }) => {
          // console.log(fields);
          return (
            <Fragment>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <div key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, index, "text"]}
                    label={"CHOISE OF ANSWER"}
                    className="w-full"
                    rules={[
                      {
                        required: true,
                        message: "Please input title!",
                      },
                    ]}
                  >
                    <CustomInput
                      placeholder={"CHOISE OF ANSWER"}
                      classNames={"w-full"}
                    />
                  </Form.Item>
                  <div className="flex items-center justify-between">
                    <Form.Item
                      {...restField}
                      name={[name, index, "is_correct"]}
                      label={"CORRECT ANSWER"}
                      fieldKey={fieldKey}
                      valuePropName="checked"
                    >
                      <CustomCheckBox />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </div>
                </div>
              ))}
              <Form.Item>
                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.info}
                  type="button"
                  onClick={() => add()}
                  paddingInline={44}
                  borderRadius={5}
                >
                  Add another option
                </ButtonComponent>
              </Form.Item>
            </Fragment>
          );
        }}
      </Form.List>
    </div>
  );
};

const QuestionAnswerWrap = ({ array }) => {
  return array?.map((item, index) => (
    <div className={"mb-2.5"} key={index}>
      <Paragraph
        key={index}
        className="py-2.5 px-5 rounded-2xl bg-gray-300"
        fontSize={"text-gray-600 font-normal text-sm"}
      >
        {item?.text}
      </Paragraph>
    </div>
  ));
};

const AddNewTest = () => {
  const [requestPost] = useRequestPostMutation();
  const [requestPatch] = useRequestPatchMutation();
  const [requestDelete] = useRequestDeleteMutation();
  const { data, isLoading } = useRequestGetQuery({
    path: "/account_management/services/question_type/",
  });

  const { data: QuestionsData } = useRequestGetQuery({
    path: "/account_management/services/question/",
  });

  const { colorsObject } = useContext(ColorsContext);
  const [TestSettings, setTestSettings] = useLocalStorage(
    "test-setting",
    "null",
  );
  const [Questions, setQuestions] = useLocalStorage(
    "test-questions",
    JSON.stringify([]),
  );

  const [form] = Form.useForm();
  const [QuestionType, setQuestionType] = useState([]);
  const [QuestionsList, setQuestionsList] = useState([]);

  useEffect(() => {
    const options = [];
    for (let i = 0; i < data?.length; i++) {
      options.push({ ...data[i], value: data[i]?.id, label: data[i]?.name });
    }
    setQuestionType(options);
  }, [data, isLoading]);

  useEffect(() => {
    const questionsId = JSON.parse(Questions);
    const questions = [];

    for (let i = 0; i < QuestionsData?.length; i++) {
      for (let j = 0; j < questionsId?.length; j++) {
        if (QuestionsData[i]?.id === questionsId[j]) {
          questions.push(QuestionsData[i]);
        }
      }
    }

    setQuestionsList(questions);
  }, [Questions, QuestionsData]);

  // func
  const onFinish = async (values) => {
    const questions = JSON.parse(Questions);

    try {
      if (values?.answers?.length === 0) {
        message.error("Not selected variants to answers!");
      } else {
        const response = await requestPost({
          path: "/account_management/services/question/",
          data: {
            ...values,
            answers:
              values.type === 2
                ? values.answers.map((item) => ({
                    ...item,
                    is_correct: item.is_correct === "true",
                  }))
                : values,
          },
        });
        if (response?.data) {
          questions.push(response?.data?.id);
        }
      }
      setQuestions(JSON.stringify(questions));
    } catch (error) {
      console.error(error?.message);
    }
  };

  const handleConfirm = () => {
    try {
      if (JSON.parse(TestSettings)?.id) {
        requestPatch({
          path: "/account_management/services/test",
          id: JSON.parse(TestSettings)?.id,
          data: {
            ...JSON.parse(TestSettings),
            questions: JSON.parse(Questions),
          },
        })
          .unwrap()
          .then(() => {
            setQuestions(JSON.stringify([]));
            setTestSettings("null");
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    const questions = JSON.parse(Questions);

    try {
      requestDelete({
        path: "/account_management/services/question/" + id,
      })
        .unwrap()
        .then(() => {
          const newQuestions = questions?.filter((item) => item !== id);
          setQuestions(JSON.stringify(newQuestions));
        });
    } catch (error) {
      console.error(error);
    }
  };

  const AddQuizArrays = [
    <MultipleChoice form={form} key={1} />,
    <TrueFalse form={form} key={2} />,
    <Category form={form} key={3} />,
  ];

  const editButtons = (id) => {
    return (
      <div className="flex flex-col space-y-2 w-[120px]">
        <ButtonComponent
          defaultBg="#FFEA79"
          defaultHoverBg="#FFEA79"
          defaultColor={colorsObject.black}
          defaultHoverColor={colorsObject.black}
          defaultActiveColor={colorsObject.black}
          borderRadius={5}
          className={"flex justify-between items-center w-full px-1.5"}
          fontSize={12}
        >
          <FiEdit className="w-5" />
          Edit Test
        </ButtonComponent>
        <ButtonComponent
          defaultBg="#E37B7B"
          defaultHoverBg="#E37B7B"
          defaultColor={colorsObject.black}
          defaultHoverColor={colorsObject.black}
          defaultActiveColor={colorsObject.black}
          borderRadius={5}
          className={"flex justify-between items-center w-full px-1.5"}
          fontSize={12}
          onClick={() => handleDelete(id)}
        >
          <RiDeleteBin6Line className="w-5" />
          Delete Test
        </ButtonComponent>
      </div>
    );
  };

  const questionItem = QuestionsList?.map((item, index) => {
    index += 1;

    return (
      <Fragment key={index}>
        <div className="space-y-1.5">
          <Paragraph
            className={"text-base font-semibold text-gray-600"}
            fontSize={"flex space-x-1"}
          >
            <span className="text-2xl">{index}</span>
            <span>{item?.question}</span>
          </Paragraph>

          <div className="relative pr-5">
            <QuestionAnswerWrap array={item?.answers} />

            <Tooltip
              className={"absolute top-0 right-0"}
              placement="left"
              color="white"
              title={editButtons(item?.id)}
            >
              <IconComponent icon={<HiDotsVertical />} iconWidth={"text-xl"} />
            </Tooltip>
          </div>
        </div>
      </Fragment>
    );
  });

  return (
    <Fragment>
      <Form
        className={"space-y-5"}
        form={form}
        onFinish={onFinish}
        layout={"vertical"}
        initialValues={{
          question: "Hello",
          answers: [
            {
              is_correct: false,
            },
          ],
        }}
      >
        <Form.Item name={"type"} className="w-[180px]">
          <CustomSelect
            placeholder={"SELECT TYPE"}
            options={QuestionType}
            className={"w-full h-[50px]"}
            disabled={isLoading}
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-5">
          <div className={"space-y-5"}>
            <Form.Item
              name={"question"}
              label={"Question title"}
              className="w-full"
            >
              <MDEditor
                placeholder={"Text"}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                disabled={isLoading}
              />
            </Form.Item>

            <Form.Item
              shouldUpdate={(prev, current) => prev.type !== current.type}
              noStyle
            >
              {({ getFieldValue }) =>
                QuestionType[getFieldValue("type") - 1]?.id ===
                getFieldValue("type")
                  ? AddQuizArrays[getFieldValue("type") - 1]
                  : null
              }
            </Form.Item>

            <div className="space-x-5">
              <ButtonComponent
                defaultBg={colorsObject.info}
                defaultHoverBg={colorsObject.infoHover}
                paddingInline={44}
                borderRadius={5}
                type={"submit"}
                disabled={isLoading}
              >
                Save
              </ButtonComponent>

              <ButtonComponent
                defaultBg={colorsObject.info}
                defaultHoverBg={colorsObject.infoHover}
                paddingInline={44}
                borderRadius={5}
                type={"button"}
                disabled={JSON.parse(Questions)?.length === 0}
                onClick={handleConfirm}
              >
                Confirm
              </ButtonComponent>
            </div>
          </div>

          {!isLoading && (
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <Paragraph className={"text-xl font-normal"}>
                  Test Name: {JSON.parse(TestSettings)?.name}
                </Paragraph>

                <span className="text-xl font-normal">
                  Questions {JSON.parse(Questions)?.length}
                </span>
              </div>

              {questionItem}
            </div>
          )}
        </div>
      </Form>
    </Fragment>
  );
};

const TestView = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [TestId, setTestId] = useLocalStorage("test-id", "0");
  const [QuestionId, setQuestionId] = useState(0);
  const [QuestionIndex, setQuestionIndex] = useState(0);

  const { data: TestData } = useRequestIdQuery({
    path: "/account_management/services/test",
    id: TestId,
  });

  const { data: QuestionItem, isLoading: QuestionLoading } = useRequestIdQuery({
    path: "/account_management/services/question",
    id: QuestionId,
  });

  const handleQuestionItem = (value, index) => {
    setQuestionId(value);
    setQuestionIndex(index);
  };

  const questionItem = TestData?.questions?.map((item, index) => {
    index += 1;

    return (
      <li key={index}>
        <ButtonComponent
          //disabled
          onClick={() => handleQuestionItem(item, index)}
          controlHeight={42}
          paddingInline={16}
          className={"w-full"}
          defaultBorderColor={colorsObject.main}
          borderRadius={5}
          defaultBg={"#5459EA1A"}
          defaultHoverBg={"#5459EA1A"}
        >
          <div className={"flex items-center justify-between"}>
            <Paragraph fontSize={"text-[#9195FF]"}>
              Quiz question {index}
            </Paragraph>

            <IconComponent
              className={"text-[#878CEE]"}
              icon={<IoCheckmarkCircle />}
            />
          </div>
        </ButtonComponent>
      </li>
    );
  });

  const items = [
    {
      key: "1",
      label: "Quiz Questions List",
      children: (
        <ul
          className={classNames(
            "space-y-5 border-t p-4 -m-4",
            TestData?.questions?.length * 42 > 42 * 9
              ? `h-[487px] overflow-y-scroll`
              : null,
          )}
        >
          {questionItem}
        </ul>
      ),
    },
  ];

  const deadline = Date.now() + 1000 * 60 * 60 * 2 + 1000 * 30;

  const onFinish = () => {
    message.info("Time is finished!");
  };

  return (
    <div className={"flex gap-5"}>
      <article className="flex-grow">
        <div className="space-y-5">
          <Title level={1} fontSize={"text-[42px] font-medium"}>
            {TestData?.name}
          </Title>

          <Paragraph fontSize={"text-2xl font-medium"}>
            Question {QuestionIndex} of {TestData?.questions?.length}:
          </Paragraph>

          <Paragraph fontSize={"text-base"}>
            {QuestionLoading ? "Loading..." : QuestionItem?.question}
          </Paragraph>
        </div>
        {/*border-2 border-[#878CEE] rounded-xl p-3 space-x-2*/}
      </article>

      <aside className={"max-w-96 w-full"}>
        <Statistic.Countdown
          title="Timer Remaining :"
          value={deadline}
          onFinish={onFinish}
          className="w-full h-[175px] border rounded-xl shadow-xl text-center py-14"
        />

        <Collapse
          defaultActiveKey={["1"]}
          ghost
          items={items}
          expandIconPosition="end"
          className="text-base font-semibold w-full"
        />
      </aside>
    </div>
  );
};

export const AddQuizTab = () => {
  return [
    {
      key: "1",
      label: <span className={"uppercase"}>Settings</span>,
      children: <Settings />,
    },
    {
      key: "2",
      label: <span className={"uppercase"}>Add new Test</span>,
      children: <AddNewTest />,
    },
    {
      key: "3",
      label: <span className={"uppercase"}>Preview QUIZ</span>,
      children: <TestView />,
    },
  ].map((item) => {
    return { ...item };
  });
};
