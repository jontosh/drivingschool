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
  ExclamationCircleFilled,
  ExportOutlined,
  FormOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import {
  Collapse,
  ConfigProvider,
  Form,
  InputNumber,
  message,
  Radio,
  Statistic,
  Switch,
  TimePicker,
  Tooltip,
  Modal,
  Input,
} from "antd";
import classNames from "classnames";
import {
  Fragment,
  useContext,
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { BiTime } from "react-icons/bi";
import { GoClock, GoEye } from "react-icons/go";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
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
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { LuRefreshCw } from "react-icons/lu";

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

const Settings = () => {
  const [form] = Form.useForm();
  const { colorsObject } = useContext(ColorsContext);
  const [requestPost] = useRequestPostMutation();
  const { data: ServiceData } = useRequestGetQuery({
    path: "/account_management/services/service/",
  });
  const { data: ClassData } = useRequestGetQuery({
    path: "/account_management/class/",
  });
  const [TestSettings, setTestSettings] = useLocalStorage("test-setting", null);
  const [TestId, setTestId] = useLocalStorage("test-id", null);
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

  const ServiceOption = useMemo(() => {
    return (ServiceData || [])
      .filter((item) => item?.status.toLowerCase() === "active")
      .map((item) => ({
        ...item,
        value: item?.id,
        label: item?.name,
      }));
  }, [ServiceData]);

  const ClassOption = useMemo(() => {
    return (ClassData || [])
      .filter((item) => item?.status.toLowerCase() === "active")
      .map((item) => ({
        ...item,
        value: item?.id,
        label: item?.details,
      }));
  }, [ClassData]);

  const onFinish = async (values) => {
    try {
      const res = await requestPost({
        path: "/account_management/services/test/",
        data: values,
      });

      if (res?.error?.status >= 400) {
        message.error("Request failed with status " + res?.error?.status);
      }

      dispatch({ type: "SUCCESS", setIsOpen });
      setTestSettings(JSON.stringify(res?.data));
      setTestId(res?.data?.id);
    } catch (error) {
      console.error(error.message);
      dispatch({ type: "ERROR", setIsOpen });
    } finally {
      setIsOpen(true);
    }
  };

  return (
    <Fragment>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          pass_text: "Hello",
          fall_text: "Hello",
          welcome_text: "Hello",
          cr: [],
          service: [],
          status: "ACTIVE",
        }}
      >
        <div className="grid grid-cols-3 gap-5 max-[1300px]:grid-cols-2 max-[1000px]:grid-cols-1">
          <div className="space-y-5">
            <Form.Item
              name="name"
              label="Quiz name"
              rules={[{ required: true, message: "Quiz name is empty" }]}
            >
              <CustomInput classNames="w-full" placeholder="Quiz name" />
            </Form.Item>
            <Form.Item
              name="_is_display_name"
              label="Display Quiz Name to Student"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Status is empty" }]}
            >
              <CustomSelect
                placeholder="Please select"
                options={[
                  { value: "ACTIVE", label: "ACTIVE" },
                  { value: "PENDING", label: "PENDING" },
                ]}
                className="w-full h-[50px]"
              />
            </Form.Item>
            <Form.Item
              name="count"
              label="# of Questions Displayed to Student"
              rules={[
                {
                  required: true,
                  message: "Number of Questions Displayed to Student is empty",
                },
              ]}
            >
              <InputNumber className="w-full h-[50px] py-2.5" />
            </Form.Item>
            <Form.Item
              name="passing_grade"
              label="Passing Grade"
              rules={[{ required: true, message: "Passing Grade is empty" }]}
            >
              <InputNumber className="w-full h-[50px] py-2.5" />
            </Form.Item>
            <Form.Item name="_is_final" label="Final Exam">
              <Switch />
            </Form.Item>
            <Form.Item
              name="_is_class_session"
              label="Associate with This Class Session"
            >
              <InputNumber className="w-full h-[50px] py-2.5" />
            </Form.Item>
            <Form.Item
              name="timer"
              label="Time"
              rules={[
                {
                  required: true,
                  message: "Please select time!",
                },
              ]}
            >
              <TimePicker
                className="w-full h-[50px]"
                format="hh:mm:ss"
                placeholder="Select duration"
              />
            </Form.Item>
            <Form.Item name="pass_text" label="Pass Feedback">
              <MDEditor
                placeholder="Text"
                previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
              />
            </Form.Item>
          </div>
          <div className="space-y-5">
            <Form.Item
              name="_is_attendance_required"
              label="Attendance Required for Associated Session only"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name="_is_attendance_required_cr"
              label="Attendance Required for Preceding and Associated CR Sessions"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name="_is_attendance_required_cr_only"
              label="Attendance Required for All Preceding CR Sessions Only"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name="_display_progress_bar"
              label="Display Progress Bar During Quiz"
            >
              <Switch />
            </Form.Item>
            <Form.Item name="_random_order" label="Randomize Questions Order">
              <Switch />
            </Form.Item>
            <Form.Item name="_is_timer" label="Enable Quiz Timer">
              <Switch />
            </Form.Item>
            <Form.Item
              name="_allow_view_complete"
              label="Allow Students to View Completed Quizzes"
            >
              <Switch />
            </Form.Item>
            <Form.Item name="fall_text" label="Fail Feedback">
              <MDEditor
                placeholder="Text"
                previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
              />
            </Form.Item>
          </div>
          <div className="space-y-5">
            <Form.Item
              name="service"
              label="Associate with Service"
              rules={[
                { required: true, message: "Associate with Service is empty" },
              ]}
            >
              <CustomSelect
                mode="multiple"
                placeholder="Please select"
                options={ServiceOption}
                className="w-full h-[50px]"
              />
            </Form.Item>
            <Form.Item name="cr" label="Associate with CR Service">
              <CustomSelect
                mode="multiple"
                placeholder="Please select"
                options={ClassOption}
                className="w-full h-[50px]"
              />
            </Form.Item>
            <Form.Item name="welcome_text" label="Welcome Text">
              <MDEditor
                placeholder="Text"
                previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
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
            type="submit"
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
        {(fields, { add, remove }) => (
          <Fragment>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key}>
                <Form.Item
                  {...restField}
                  name={[name, "text"]}
                  label="CHOOSE OF ANSWER"
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: "Please input title!",
                    },
                  ]}
                >
                  <CustomInput
                    placeholder="CHOOSE OF ANSWER"
                    classNames="w-full"
                  />
                </Form.Item>
                <div className="flex items-center justify-between">
                  <Form.Item
                    {...restField}
                    name={[name, "is_correct"]}
                    label="CORRECT ANSWER"
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
        )}
      </Form.List>
    </div>
  );
};

const TrueFalse = ({ form, ...props }) => {
  const [index, setIndex] = useState(0);

  const trueAndFalseOptions = [
    { value: "true", label: "True" },
    { value: "false", label: "False" },
  ];

  return (
    <Form.Item name={["answers", index, "is_correct"]}>
      <Radio.Group className="flex flex-col">
        {trueAndFalseOptions.map((option, idx) => (
          <Radio
            onChange={() => setIndex(idx)}
            key={option.value}
            value={option.value}
            className="flex flex-col-reverse"
          >
            <Form.Item
              label="CHOICE OF ANSWER"
              rules={[
                {
                  required: true,
                  message: "Please input title",
                },
              ]}
              name={["answers", idx, "text"]}
            >
              <div className="space-y-5">
                <CustomInput classNames="w-full" placeholder={option.label} />
              </div>
            </Form.Item>
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

const Category = ({ form, ...props }) => {
  const { colorsObject } = useContext(ColorsContext);

  return (
    <div className="space-y-5">
      <Form.List name="answers">
        {(fields, { add, remove }) => (
          <Fragment>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key}>
                <Form.Item
                  {...restField}
                  name={[name, "text"]}
                  label="CHOOSE OF ANSWER"
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: "Please input title!",
                    },
                  ]}
                >
                  <CustomInput
                    placeholder="CHOOSE OF ANSWER"
                    classNames="w-full"
                  />
                </Form.Item>
                <div className="flex items-center justify-between">
                  <Form.Item
                    {...restField}
                    name={[name, "is_correct"]}
                    label="CORRECT ANSWER"
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
                onClick={add}
                paddingInline={44}
                borderRadius={5}
              >
                Add another option
              </ButtonComponent>
            </Form.Item>
          </Fragment>
        )}
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
  const { data: questionTypesData, isLoading: isLoadingQuestionTypes } =
    useRequestGetQuery({
      path: "/account_management/services/question_type/",
    });

  const { data: questionsData } = useRequestGetQuery({
    path: "/account_management/services/question/",
  });

  const { colorsObject } = useContext(ColorsContext);
  const [TestSettings, setTestSettings] = useLocalStorage("test-setting", null);
  const [Questions, setQuestions] = useLocalStorage(
    "test-questions",
    JSON.stringify([]),
  );

  const [form] = Form.useForm();
  const [QuestionType, setQuestionType] = useState([]);
  const [QuestionsList, setQuestionsList] = useState([]);

  const questionTypes = useMemo(() => {
    return (questionTypesData || []).map((type) => ({
      ...type,
      value: type.id,
      label: type.name,
    }));
  }, [questionTypesData]);

  const questionsList = useMemo(() => {
    const questionsId = JSON.parse(Questions);
    return (questionsData || []).filter((question) =>
      questionsId.includes(question.id),
    );
  }, [Questions, questionsData]);

  useEffect(() => {
    setQuestionType(questionTypes);
  }, [questionTypes]);

  useEffect(() => {
    setQuestionsList(questionsList);
  }, [questionsList]);

  const onFinish = async (values) => {
    const questions = JSON.parse(Questions);
    if (!values?.answers?.length) {
      message.error("Not selected variants to answers!");
      return;
    }

    try {
      const response = await requestPost({
        path: "/account_management/services/question/",
        data: {
          ...values,
          answers: values.answers.map((item) => ({
            ...item,
            is_correct: item.is_correct === "true" || item.is_correct === true,
          })),
        },
      });

      if (response?.data) {
        questions.push(response.data.id);
        setQuestions(JSON.stringify(questions));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleConfirm = useCallback(async () => {
    const testSettings = JSON.parse(TestSettings);
    const questions = JSON.parse(Questions);

    if (!testSettings?.id) return;

    try {
      await requestPatch({
        path: "/account_management/services/test",
        id: testSettings.id,
        data: {
          ...testSettings,
          questions,
        },
      }).unwrap();

      setQuestions(JSON.stringify([]));
      setTestSettings(null);
    } catch (error) {
      console.error(error);
    }
  }, [requestPatch, TestSettings, Questions, setQuestions, setTestSettings]);

  const handleDelete = useCallback(
    async (id) => {
      const questions = JSON.parse(Questions);

      try {
        await requestDelete({
          path: `/account_management/services/question/${id}`,
        }).unwrap();

        const updatedQuestions = questions.filter((item) => item !== id);
        setQuestions(JSON.stringify(updatedQuestions));
      } catch (error) {
        console.error(error);
      }
    },
    [requestDelete, Questions, setQuestions],
  );

  const AddQuizComponents = [
    <MultipleChoice form={form} key={1} />,
    <TrueFalse form={form} key={2} />,
    <Category form={form} key={3} />,
  ];

  const editButtons = (id) => (
    <div className="flex flex-col space-y-2 w-[120px]">
      <ButtonComponent
        defaultBg="#E37B7B"
        defaultHoverBg="#E37B7B"
        defaultColor={colorsObject.black}
        defaultHoverColor={colorsObject.black}
        defaultActiveColor={colorsObject.black}
        borderRadius={5}
        className="flex justify-between items-center w-full px-1.5"
        fontSize={12}
        onClick={() => handleDelete(id)}
      >
        <RiDeleteBin6Line className="w-5" />
        Delete Test
      </ButtonComponent>
    </div>
  );

  const questionItem = questionsList.map((item, index) => (
    <Fragment key={item.id}>
      <div className="space-y-1.5">
        <Paragraph className="text-base font-semibold text-gray-600">
          <span className="text-2xl">{index + 1}</span>
          <span>{item.question}</span>
        </Paragraph>
        <div className="relative pr-5">
          <QuestionAnswerWrap array={item.answers} />
          <Tooltip
            className="absolute top-0 right-0"
            placement="left"
            color="white"
            title={editButtons(item.id)}
          >
            <IconComponent icon={<HiDotsVertical />} iconWidth="text-xl" />
          </Tooltip>
        </div>
      </div>
    </Fragment>
  ));

  return (
    <Fragment>
      <Form
        className="space-y-5"
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          question: "Hello",
          answers: [{ is_correct: false }],
        }}
      >
        <Form.Item name="type" className="w-[180px]">
          <CustomSelect
            placeholder="SELECT TYPE"
            options={QuestionType}
            className="w-full h-[50px]"
            disabled={isLoadingQuestionTypes}
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-5">
            <Form.Item
              name="question"
              label="Question title"
              className="w-full"
            >
              <MDEditor
                placeholder="Text"
                previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
                disabled={isLoadingQuestionTypes}
              />
            </Form.Item>
            <Form.Item
              shouldUpdate={(prev, current) => prev.type !== current.type}
              noStyle
            >
              {({ getFieldValue }) => {
                const type = getFieldValue("type");
                return QuestionType[type - 1]?.id === type
                  ? AddQuizComponents[type - 1]
                  : null;
              }}
            </Form.Item>
            <div className="space-x-5">
              <ButtonComponent
                defaultBg={colorsObject.info}
                defaultHoverBg={colorsObject.infoHover}
                paddingInline={44}
                borderRadius={5}
                type="submit"
                disabled={isLoadingQuestionTypes}
              >
                Save
              </ButtonComponent>
              <ButtonComponent
                defaultBg={colorsObject.info}
                defaultHoverBg={colorsObject.infoHover}
                paddingInline={44}
                borderRadius={5}
                type="button"
                disabled={JSON.parse(Questions).length === 0}
                onClick={handleConfirm}
              >
                Confirm
              </ButtonComponent>
            </div>
          </div>
          {!isLoadingQuestionTypes && (
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <Paragraph className="text-xl font-normal">
                  Test Name: {JSON.parse(TestSettings)?.name}
                </Paragraph>
                <span className="text-xl font-normal">
                  Questions {JSON.parse(Questions).length}
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

export const TestForm = ({ data, disabled, border }) => {
  const [selectedIndices, setSelectedIndices] = useState([]);
  const { colorsObject } = useContext(ColorsContext);

  useEffect(() => {
    if (data?.type === 2) {
      setSelectedIndices([]);
    }
  }, [data?.type]);

  const handleCheckboxChange = useCallback((index) => {
    setSelectedIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((idx) => idx !== index)
        : [...prevIndices, index],
    );
  }, []);

  const handleRadioChange = useCallback((index) => {
    setSelectedIndices([index]);
  }, []);

  const renderCheckboxAnswers = () =>
    data?.answers?.map((item, index) => (
      <Form.Item
        name={["answers", index, "is_correct"]}
        key={index}
        className={border ? "border-2 border-[#878CEE] rounded-xl p-3" : null}
        valuePropName="checked"
      >
        <CustomCheckBox
          onChange={() => handleCheckboxChange(index)}
          className="space-x-2"
          disabled={disabled}
        >
          <div>{item?.text}</div>
        </CustomCheckBox>
      </Form.Item>
    ));

  const renderRadioAnswers = () => (
    <Form.Item name={["answers", 0, "is_correct"]}>
      <Radio.Group className="flex flex-col gap-5">
        {data?.answers?.map((item, index) => (
          <ConfigProvider
            key={index}
            theme={{
              components: {
                Radio: {
                  radioSize: 20,
                  dotColorDisabled: colorsObject.primary,
                  colorBorder: colorsObject.primary,
                },
              },
            }}
          >
            <Radio
              onChange={() => handleRadioChange(index)}
              value={index % 2 === 0}
              className={
                border ? "border-2 border-[#878CEE] rounded-xl p-3" : null
              }
              disabled={disabled}
            >
              {item?.text}
            </Radio>
          </ConfigProvider>
        ))}
      </Radio.Group>
    </Form.Item>
  );

  const renderAnswers = () => {
    switch (data?.type) {
      case 1:
      case 3:
        return renderCheckboxAnswers();
      case 2:
        return renderRadioAnswers();
      default:
        console.error(`Unknown type: ${data?.type}`);
        return null;
    }
  };

  return renderAnswers();
};

const TestPreview = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [TestId] = useLocalStorage("test-id", null);
  const [TestIndex, setTestIndex] = useState(0);
  const [TestItemId, setTestItemId] = useState(0);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
  const { confirm } = Modal;
  const [requestDelete] = useRequestDeleteMutation();
  const [requestPatch] = useRequestPatchMutation();
  const { data: TestData, isLoading: isTestData } = useRequestIdQuery({
    path: "/account_management/services/test",
    id: TestId,
  });

  const { data: Question, isLoading: isQuestion } = useRequestIdQuery({
    path: "/account_management/services/question",
    id: TestItemId,
  });

  useEffect(() => {
    if (Question) {
      form.setFieldsValue(Question);
      updateForm.setFieldsValue(Question);
    }
  }, [Question, form, updateForm]);

  const onDelete = useCallback(async () => {
    await requestPatch({
      path: "/account_management/services/test",
      id: TestId,
      data: {
        ...TestData,
        questions: TestData?.questions?.filter((item) => item !== TestItemId),
      },
    }).reset();

    await requestDelete({
      path: `/account_management/services/question/${TestItemId}`,
    })
      .unwrap()
      .then(() => setTestIndex(TestData?.questions?.length));
  }, [requestDelete, requestPatch, TestItemId, TestId, TestData]);

  const onUpdate = useCallback(() => {
    confirm({
      title: `Update: ${Question?.question}`,
      icon: <ExclamationCircleFilled />,
      content: (
        <Fragment>
          <Form form={updateForm} className="space-y-5">
            {Question?.type === 1 || Question?.type === 3
              ? Question?.answers?.map((item, index) => (
                <div className="flex gap-2.5 items-end" key={index}>
                  <Form.Item
                    name={["answers", index, "is_correct"]}
                    valuePropName="checked"
                  >
                    <CustomCheckBox />
                  </Form.Item>
                  <Form.Item name={["answers", index, "text"]}>
                    <Input placeholder="Text" />
                  </Form.Item>
                </div>
              ))
              : Question?.type === 2 && (
                <Form.Item name={["answers", 0, "is_correct"]}>
                  <Radio.Group className="flex flex-col gap-5">
                    {Question?.answers?.map((item, index) => (
                      <ConfigProvider
                        key={index}
                        theme={{
                          components: {
                            Radio: {
                              radioSize: 20,
                              dotColorDisabled: colorsObject.primary,
                              colorBorder: colorsObject.primary,
                            },
                          },
                        }}
                      >
                        <div
                          className="flex gap-2.5 items-center"
                          key={index}
                        >
                          <Radio value={index % 2 === 0} />
                          <Form.Item
                            name={["answers", index, "text"]}
                            className="mb-0"
                          >
                            <Input placeholder="Text" />
                          </Form.Item>
                        </div>
                      </ConfigProvider>
                    ))}
                  </Radio.Group>
                </Form.Item>
              )}
          </Form>
        </Fragment>
      ),
      onOk: async () => {
        try {
          await requestPatch({
            path: "/account_management/services/question",
            id: TestItemId,
            data: {
              ...Question,
              answers: updateForm.getFieldValue("answers"),
            },
          }).reset();
        } catch (error) {
          console.error(error);
        }
      },
    });
  }, [
    confirm,
    Question,
    requestPatch,
    TestItemId,
    colorsObject.primary,
    updateForm,
  ]);

  const handleQuestionChange = useCallback((index, itemId) => {
    setTestIndex(index);
    setTestItemId(itemId);
  }, []);

  const questionButtons = useMemo(
    () =>
      TestData?.questions?.map((item, index) => (
        <ButtonComponent
          onClick={() => handleQuestionChange(index + 1, item)}
          defaultBg={
            TestIndex === index + 1 ? colorsObject?.primary : "#C4C4C4"
          }
          defaultHoverBg="#FFAAAF"
          key={index}
          paddingInline={15}
          className="rounded-full"
        >
          {index + 1}
        </ButtonComponent>
      )),
    [TestData, TestIndex, colorsObject?.primary, handleQuestionChange],
  );

  if (isTestData) return "Loading...";

  return (
    <Fragment>
      <Title titleMarginBottom={20} level={2} fontSize="text-2xl font-normal">
        {TestData?.name}
      </Title>
      <div className="grid grid-cols-2 gap-5">
        {isQuestion ? (
          "Loading..."
        ) : TestIndex === 0 ? (
          "Select test"
        ) : (
          <div className="space-y-5">
            <blockquote className="py-5 px-4 border border-indigo-600 rounded-xl">
              <Title
                titleMarginBottom={20}
                level={4}
                fontSize="text-xl font-medium"
              >
                Question {TestIndex}
              </Title>
              <Paragraph className="text-gray-500" fontSize="text-base">
                {Question?.question}
              </Paragraph>
            </blockquote>
            <Form form={form} className="space-y-5">
              <TestForm data={Question} />
              <div className="space-x-5">
                <ButtonComponent
                  defaultBg={colorsObject?.danger}
                  defaultHoverBg={colorsObject?.dangerHover}
                  paddingInline={43}
                  controlHeight={40}
                  borderRadius={5}
                  type="submit"
                  onClick={onDelete}
                >
                  Delete
                </ButtonComponent>
                <ButtonComponent
                  defaultBg={colorsObject?.orange}
                  defaultHoverBg={colorsObject?.orange}
                  paddingInline={43}
                  controlHeight={40}
                  borderRadius={5}
                  type="submit"
                  onClick={onUpdate}
                >
                  Update
                </ButtonComponent>
              </div>
            </Form>
            <div className="p-5 rounded-xl shadow-[0px_4px_14px_0px_rgba(0,0,0,0.2)] space-y-5">
              <Title level={3} fontSize="text-[22px] font-medium">
                Explanation
              </Title>
              <Paragraph fontSize="text-base text-gray-500">
                A train passes a station platform in 36 seconds and a man
                standing on the platform in 20 seconds. If the speed of the
                train is 54 km/hr, what is the length of the platform?
              </Paragraph>
            </div>
          </div>
        )}
        <div className="space-y-5">
          <div className="flex gap-2.5 justify-between">
            <Paragraph fontSize="text-xl">
              Question {TestIndex}/{TestData?.questions?.length}
            </Paragraph>
            <Tooltip title="Empty">
              <span className="text-xl cursor-pointer">Need Help?</span>
            </Tooltip>
          </div>
          <div className="flex gap-3">{questionButtons}</div>
        </div>
      </div>
    </Fragment>
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
      children: <TestPreview />,
    },
  ].map((item) => {
    return { ...item };
  });
};
