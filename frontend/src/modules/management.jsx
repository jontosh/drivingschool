import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph, Text } from "@/components/title/index.jsx";
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
  useRequestPostMutation,
} from "@/redux/query/index.jsx";
import {
  DeleteOutlined,
  ExportOutlined,
  FormOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Form, InputNumber, Radio, Switch } from "antd";
import { Formik } from "formik";
import { Fragment, useContext, useState, useEffect, useReducer } from "react";
import { GoClock, GoEye } from "react-icons/go";
import { TbActivityHeartbeat } from "react-icons/tb";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import useLocalStorage from "use-local-storage";
import ModuleManagementStyle from "./modules.module.scss";

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

      console.log(res);

      if (res?.error?.status >= 400) {
        dispatch({ type: "ERROR", setIsOpen });
        setIsOpen(true);
      } else {
        dispatch({ type: "SUCCESS", setIsOpen });
        setIsOpen(true);
        setTestSettings(JSON.stringify(res?.data));
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
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            paddingInline={43}
            controlHeight={40}
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
              {fields.map(({ key, name, ...restField }) => (
                <div key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, "text"]}
                    label={"choice of answers"}
                    className="w-full"
                  >
                    <CustomInput
                      placeholder={"choice of answers"}
                      classNames={"w-full"}
                    />
                  </Form.Item>
                  <div className="flex items-center justify-between">
                    <Form.Item
                      {...restField}
                      name={[name, "is_correct"]}
                      label={"correct answer"}
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
                  type="dashed"
                  onClick={() => add()}
                  // block
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
  const [isCorrectFirst, setIsCorrectFirst] = useState(false);
  const [isCorrectSecond, setIsCorrectSecond] = useState(false);

  const onChangeFirst = ({ target: { checked } }) => {
    setIsCorrectFirst(checked);
    setIsCorrectSecond(!checked);
  };

  const onChangeSecond = ({ target: { checked } }) => {
    setIsCorrectFirst(!checked);
    setIsCorrectSecond(checked);
  };

  const handleNotesValue = (value) => {
    form?.setFieldsValue({
      note: value,
    });
  };

  return (
    <div className="space-y-5">
      <Form.Item label="choice of answers">
        <div className="space-y-5">
          <CustomInput placeholder={"True"} />
          <CustomRadio name={"is_correct"}>
            <span>correct answer</span>
          </CustomRadio>
        </div>
      </Form.Item>

      <Form.Item label="choice of answers">
        <div className="space-y-5">
          <CustomInput placeholder={"False"} />
          <CustomRadio name={"is_correct"}>
            <span>correct answer</span>
          </CustomRadio>
        </div>
      </Form.Item>
    </div>
  );
};

const Category = ({ form, ...props }) => {
  const { colorsObject } = useContext(ColorsContext);

  return (
    <div className="space-y-5">
      <Form.List name="answers">
        {(fields, { add, remove }) => {
          return (
            <Fragment>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, "text"]}
                    label={"choice of answers"}
                    className="w-full"
                  >
                    <CustomInput
                      placeholder={"choice of answers"}
                      classNames={"w-full"}
                    />
                  </Form.Item>
                  <div className="flex items-center justify-between">
                    <Form.Item
                      {...restField}
                      name={[name, "is_correct"]}
                      label={"correct answer"}
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
                  type="dashed"
                  onClick={() => add()}
                  // block
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

const Preview = ({ form, ...props }) => {
  return (
    <Fragment>
      <Formik
        initialValues={{}}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex gap-10 max-[1100px]:flex-col">
              <div className="w-auto space-y-5">
                <Title fontSize={"text-2xl"} fontWeightStrong={400}>
                  Quiz Title
                </Title>

                <div className="flex flex-col gap-y-2.5 border border-indigo-600 p-2.5 rounded-xl">
                  <Title fontSize={"text-xl"} fontWeightStrong={400}>
                    Question 12
                  </Title>

                  <Text
                    fontSize={16}
                    fontWeightStrong={400}
                    className={"text-gray-600"}
                  >
                    A train passes a station platform in 36 seconds and a man
                    standing on the platform in 20 seconds. If the speed of the
                    train is 54 km/hr, what is the length of the platform?
                  </Text>
                </div>

                <div className="space-y-2">
                  <label
                    className={`p-2.5 w-full rounded-xl shadow-[0px_4px_14px_0px_#00000033]`}
                  >
                    <CustomRadio>
                      <span className="text-lg">120 m</span>
                    </CustomRadio>
                  </label>

                  <label
                    className={`p-2.5 w-full rounded-xl shadow-[0px_4px_14px_0px_#00000033]`}
                  >
                    <CustomRadio>
                      <span className="text-lg">240 m</span>
                    </CustomRadio>
                  </label>

                  <label
                    className={`p-2.5 w-full rounded-xl shadow-[0px_4px_14px_0px_#00000033]`}
                  >
                    <CustomRadio>
                      <span className="text-lg">300 m</span>
                    </CustomRadio>
                  </label>

                  <label
                    className={`p-2.5 w-full rounded-xl shadow-[0px_4px_14px_0px_#00000033]`}
                  >
                    <CustomRadio>
                      <span className="text-lg">None of these</span>
                    </CustomRadio>
                  </label>
                </div>

                <div className="space-x-5">
                  <ButtonComponent
                    defaultBg="#FFAAAF"
                    defaultHoverBg="#FFAAAF"
                    defaultColor="#000000"
                    defaultHoverColor="#000000"
                    paddingInline={20}
                    borderRadius={12}
                  >
                    Prev
                  </ButtonComponent>

                  <ButtonComponent
                    defaultBg="#5F66E9"
                    defaultHoverBg="#5F66E9"
                    paddingInline={20}
                    borderRadius={12}
                  >
                    Prev
                  </ButtonComponent>
                </div>

                <div className="flex flex-col gap-y-2.5 p-2.5 rounded-xl shadow-[0px_4px_14px_0px_#00000033]">
                  <Title fontSize={"text-xl"} fontWeightStrong={400}>
                    Explanation
                  </Title>

                  <Text
                    fontSize={16}
                    fontWeightStrong={400}
                    className={"text-gray-600"}
                  >
                    A train passes a station platform in 36 seconds and a man
                    standing on the platform in 20 seconds. If the speed of the
                    train is 54 km/hr, what is the length of the platform?
                  </Text>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <span className="font-normal text-xl">Question 1/8</span>

                  <span className="font-normal text-xl">Need Help ?</span>
                </div>

                <div className="grid grid-cols-5 gap-2.5 mt-5 w-[310px]">
                  <div className="w-[48px] h-[48px] bg-indigo-500 rounded-full text-center">
                    <span className="text-[22px] text-white pt-1">1</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-indigo-500 rounded-full text-center">
                    <span className="text-[22px] text-white pt-1">2</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-indigo-500 rounded-full text-center">
                    <span className="text-[22px] text-white pt-1">3</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-indigo-500 rounded-full text-center">
                    <span className="text-[22px] text-white pt-1">4</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-indigo-500 rounded-full text-center">
                    <span className="text-[22px] text-white pt-1">5</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-indigo-500 rounded-full text-center">
                    <span className="text-[22px] text-white pt-1">6</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-indigo-500 rounded-full text-center">
                    <span className="text-[22px] text-white pt-1">7</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-indigo-500 rounded-full text-center">
                    <span className="text-[22px] text-white pt-1">8</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-indigo-500 rounded-full text-center">
                    <span className="text-[22px] text-white pt-1">9</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-indigo-500 rounded-full text-center">
                    <span className="text-[22px] text-white pt-1">10</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-[#FFAAAF] rounded-full text-center">
                    <span className="text-[22px] text-white pt-1">11</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-[#C4C4C4] rounded-full text-center">
                    <span className="text-[22px] pt-1">12</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-[#C4C4C4] rounded-full text-center">
                    <span className="text-[22px] pt-1">13</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-[#C4C4C4] rounded-full text-center">
                    <span className="text-[22px] pt-1">14</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-[#C4C4C4] rounded-full text-center">
                    <span className="text-[22px] pt-1">15</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-[#C4C4C4] rounded-full text-center">
                    <span className="text-[22px] pt-1">16</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-[#C4C4C4] rounded-full text-center">
                    <span className="text-[22px] pt-1">17</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-[#C4C4C4] rounded-full text-center">
                    <span className="text-[22px] pt-1">18</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-[#C4C4C4] rounded-full text-center">
                    <span className="text-[22px] pt-1">19</span>
                  </div>

                  <div className="w-[48px] h-[48px] bg-[#C4C4C4] rounded-full text-center">
                    <span className="text-[22px] pt-1">20</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

const AddNewTest = () => {
  const { data, isLoading } = useRequestGetQuery({
    path: "/account_management/services/question_type/",
  });
  const { colorsObject } = useContext(ColorsContext);

  const [form] = Form.useForm();
  const AddQuizArrays = [
    <MultipleChoice form={form} />,
    <TrueFalse form={form} />,
    <Category form={form} />,
  ];
  const [QuestionType, setQuestionType] = useState([]);

  useEffect(() => {
    const options = [];
    for (let i = 0; i < data?.length; i++) {
      options.push({ ...data[i], value: data[i]?.id, label: data[i]?.name });
    }
    setQuestionType(options);
  }, [data, isLoading]);

  // func
  const onFinish = async (values) => {
    try {
      console.log(values);
    } catch (error) {
      console.error(error?.message);
    }
  };

  const onReset = () => {
    form.resetFields();

    setTimeout(() => {}, 1000);
  };

  return (
    <Fragment>
      <Form
        className={"space-y-5"}
        form={form}
        onFinish={onFinish}
        layout={"vertical"}
        initialValues={{
          question: "Hello",
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

            <ButtonComponent
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.infoHover}
              controlHeight={40}
              paddingInline={43}
              borderRadius={5}
              type={"submit"}
              disabled={isLoading}
            >
              Save
            </ButtonComponent>
          </div>

          {/*{isLoading}*/}
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <Paragraph className={"text-xl font-normal"}>
                Test Name:
              </Paragraph>

              <span className="text-xl font-normal">Questions 8</span>
            </div>
            <div className="space-y-1.5">
              <Paragraph className={"text-base font-semibold text-gray-600"}>
                <span className="text-2xl">1</span> What is the problem that
                you’re trying to solve or goals of this design?
              </Paragraph>

              <div className="pr-10">
                <span className="py-2.5 px-5 rounded-2xl w-full bg-gray-300 text-gray-600 font-normal text-sm">
                  The objective of this user flow is to map out...
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Paragraph className={"text-base font-semibold text-gray-600"}>
                <span className="text-2xl">2</span> What is the problem that
                you’re trying to solve or goals of this design?
              </Paragraph>

              <div className="pr-10">
                <span className="py-2.5 px-5 rounded-2xl w-full bg-gray-300 text-gray-600 font-normal text-sm">
                  The objective of this user flow is to map out...
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Paragraph className={"text-base font-semibold text-gray-600"}>
                <span className="text-2xl">3</span> What is the problem that
                you’re trying to solve or goals of this design?
              </Paragraph>

              <div className="pr-10">
                <span className="py-2.5 px-5 rounded-2xl w-full bg-gray-300 text-gray-600 font-normal text-sm">
                  The objective of this user flow is to map out...
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Paragraph className={"text-base font-semibold text-gray-600"}>
                <span className="text-2xl">4</span> What is the problem that
                you’re trying to solve or goals of this design?
              </Paragraph>

              <div className="pr-10">
                <span className="py-2.5 px-5 rounded-2xl w-full bg-gray-300 text-gray-600 font-normal text-sm">
                  The objective of this user flow is to map out...
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Paragraph className={"text-base font-semibold text-gray-600"}>
                <span className="text-2xl">5</span> What is the problem that
                you’re trying to solve or goals of this design?
              </Paragraph>

              <div className="pr-10">
                <span className="py-2.5 px-5 rounded-2xl w-full bg-gray-300 text-gray-600 font-normal text-sm">
                  The objective of this user flow is to map out...
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Paragraph className={"text-base font-semibold text-gray-600"}>
                <span className="text-2xl">6</span> What is the problem that
                you’re trying to solve or goals of this design?
              </Paragraph>

              <div className="pr-10">
                <span className="py-2.5 px-5 rounded-2xl w-full bg-gray-300 text-gray-600 font-normal text-sm">
                  The objective of this user flow is to map out...
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Paragraph className={"text-base font-semibold text-gray-600"}>
                <span className="text-2xl">7</span> What is the problem that
                you’re trying to solve or goals of this design?
              </Paragraph>

              <div className="pr-10">
                <span className="py-2.5 px-5 rounded-2xl w-full bg-gray-300 text-gray-600 font-normal text-sm">
                  The objective of this user flow is to map out...
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Paragraph className={"text-base font-semibold text-gray-600"}>
                <span className="text-2xl">8</span> What is the problem that
                you’re trying to solve or goals of this design?
              </Paragraph>

              <div className="pr-10">
                <span className="py-2.5 px-5 rounded-2xl w-full bg-gray-300 text-gray-600 font-normal text-sm">
                  The objective of this user flow is to map out...
                </span>
              </div>
            </div>
          </div>
        </div>
      </Form>
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
      children: <Preview />,
    },
  ].map((item) => {
    return { ...item };
  });
};
