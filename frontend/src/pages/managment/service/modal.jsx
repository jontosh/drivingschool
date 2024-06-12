import {
  CustomCheckBox,
  CustomInput,
  CustomRadio,
  CustomSelect,
  CustomTransfer,
  SwitchCustom,
} from "@/components/form/index.jsx";
import Title, { Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { AlertSuccess, AlertError } from "@/hooks/alert.jsx";
import { useFileReader } from "@/hooks/file-reader.jsx";
import { FormError } from "@/modules/errors.jsx";
import { AddQuizTab } from "@/modules/management.jsx";
import { ToNumber } from "@/modules/number.jsx";
import EnrollmentStyle from "@/pages/enrollment/enrollment.module.scss";
import {
  useRequestGetQuery,
  useRequestPostMutation,
} from "@/redux/query/index.jsx";
import { PlusOutlined } from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";
import {
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Switch,
  Tabs,
  Upload,
} from "antd";
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
import { useNavigate } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize";
import { StatusSelect } from "./index.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import ButtonComponent from "@/components/button/index.jsx";
import dayjs from "dayjs";
import { FiHelpCircle } from "react-icons/fi";

const mockData = [
  { key: 0, title: "Title 0", description: "Sample Description 0" },
  { key: 1, title: "Title 1", description: "Sample Description 1" },
  { key: 2, title: "Title 2", description: "Sample Description 2" },
  { key: 3, title: "Title 3", description: "Sample Description 3" },
  { key: 4, title: "Title 4", description: "Sample Description 4" },
  { key: 5, title: "Title 5", description: "Sample Description 5" },
];

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

export const ProductModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [requestPost] = useRequestPostMutation();
  const navigate = useNavigate();
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

  // func
  const handleStatus = (values) => {
    form.setFieldsValue({
      status: values,
    });
  };
  const handleType = (values) => {
    form.setFieldsValue({
      type_component: values,
    });
  };
  const handleSubType = (values) => {
    form.setFieldsValue({
      subtype_web: values,
    });
  };
  const handleDrivingHours = (values) => {
    form.setFieldsValue({
      driving_hours: values,
    });
  };
  const handleLocation = (values) => {
    form.setFieldsValue({
      location: values,
    });
  };

  const handleDays = (values) => {
    form.setFieldsValue({
      days: values,
    });
  };

  const handleSessionDuration = (values) => {
    form.setFieldsValue({
      session_duration: values,
    });
  };

  const handleSessionTimes = (values) => {
    form.setFieldsValue({
      session_times: values,
    });
  };
  const handleEZDriveProduct = (values) => {
    form.setFieldsValue({
      ez_drive_product: values,
    });
  };
  const handleSafewayAudience = (values) => {
    form.setFieldsValue({
      safeway_audience: values,
    });
  };

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const res = await requestPost({
        path: "/account_management/services/component/",
        data: values,
      });

      if (res?.error?.status >= 400) {
        setIsOpen(true);
        dispatch({ type: "ERROR", setIsOpen });
      } else {
        setIsOpen(true);
        dispatch({ type: "SUCCESS", setIsOpen });
      }

      // console.log(values);
    } catch (error) {
      console.error(error.message);
      dispatch({ type: "ERROR", setIsOpen });
      setIsOpen(true);
    }
  };

  const onReset = () => {
    form.resetFields();

    setTimeout(() => {
      navigate("/management/service/product");
    }, 1000);
  };

  return (
    <Fragment>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          enrolment_size: 0,
          make_up_size: 0,
          subtype_web: null,
          number_sessions: 0,
          sessions_day: 0,
          web_stu_enrolment: false,
          location: 0,
        }}
      >
        <div className={"px-5 grid grid-cols-2 gap-5"}>
          <Form.Item
            name={"name"}
            label={"Component Name:"}
            rules={[
              {
                required: true,
                message: "Name is empty",
              },
            ]}
          >
            <div className="flex items-center gap-3">
              <CustomInput
                placeholder={"Component Name"}
                classNames={"w-full"}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </Form.Item>

          <Form.Item
            name={"code"}
            label={"Item#/Code:"}
            rules={[
              {
                required: true,
                message: "Code is empty",
              },
            ]}
          >
            <div className="flex items-center gap-3">
              <CustomInput
                placeholder={"Item#/Code"}
                classNames={"w-full"}
                spanClassName={"text-[#344054]"}
                fontSize="text-base"
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </Form.Item>

          <Form.Item
            name={"status"}
            label={"Status:"}
            rules={[
              {
                required: true,
                message: "Status is empty",
              },
            ]}
          >
            <div className="flex items-center gap-3">
              <CustomSelect
                placeholder={"Select status"}
                className={`w-full h-[50px]`}
                options={StatusSelect}
                onChange={handleStatus}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </Form.Item>

          <Form.Item
            name={"public_name"}
            label={"Public Name:"}
            rules={[
              {
                required: true,
                message: "Public name is empty",
              },
            ]}
          >
            <div className="flex items-center gap-3">
              <CustomInput placeholder={"Public Name"} classNames={"w-full"} />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </Form.Item>

          <Form.Item
            name={"type_component"}
            label={"Type:"}
            rules={[
              {
                required: true,
                message: "Type is empty",
              },
            ]}
          >
            <div className="flex items-center gap-3">
              <CustomSelect
                placeholder={"Select status"}
                className={`w-full h-[50px]`}
                options={[
                  { value: "BTW", label: "BTW" },
                  { value: "CR", label: "CR" },
                  { value: "WEB", label: "WEB" },
                ]}
                onChange={handleType}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </Form.Item>

          <Form.Item name={"subtype_web"} label={"Sub Type:"}>
            <div className="flex items-center gap-3">
              <CustomSelect
                placeholder={"Please Select"}
                className={`w-full h-[50px]`}
                options={[
                  { value: "EZ DRIVE", label: "EZ DRIVE" },
                  {
                    value: "OTHER ONLINE COURSE",
                    label: "OTHER ONLINE COURSE",
                  },
                  { value: "SAFEWAY LMS", label: "SAFEWAY LMS" },
                ]}
                onChange={handleSubType}
              />

              <span>
                <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
              </span>
            </div>
          </Form.Item>
        </div>

        <Form.Item
          shouldUpdate={(prev, current) =>
            prev.type_component !== current.type_component
          }
          noStyle
        >
          {({ getFieldValue }) =>
            getFieldValue("type_component") === "BTW" ? (
              <Fragment>
                <div className={"px-5 grid grid-cols-2 gap-5"}>
                  <Form.Item
                    name={"driving_hours"}
                    label={"Driving Time:"}
                    rules={[
                      {
                        required: true,
                        message: "Driving Time is empty",
                      },
                    ]}
                  >
                    <div className="flex items-center gap-3">
                      <CustomSelect
                        placeholder={"Hours"}
                        className={`w-full h-[50px]`}
                        options={[
                          { value: 1, label: 1 },
                          { value: 2, label: 2 },
                          { value: 3, label: 3 },
                        ]}
                        onChange={handleDrivingHours}
                      />

                      <span>
                        <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                      </span>
                    </div>
                  </Form.Item>

                  <Form.Item name={"driving_hours"} label={"Minutes"}>
                    <div className="flex items-center gap-3">
                      <CustomSelect
                        placeholder={"Minute(s)"}
                        className={`w-full h-[50px]`}
                        options={[
                          { value: 1, label: 1 },
                          { value: 2, label: 2 },
                          { value: 3, label: 3 },
                        ]}
                      />
                      <span>
                        <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                      </span>
                    </div>
                  </Form.Item>

                  <Form.Item name={"duration"} label={"Duration"}>
                    <div className="flex items-center gap-3">
                      <CustomSelect
                        placeholder={"Select"}
                        className={`w-full h-[50px]`}
                        options={[
                          { value: 1, label: 1 },
                          { value: 2, label: 2 },
                          { value: 3, label: 3 },
                        ]}
                      />

                      <span>
                        <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                      </span>
                    </div>
                  </Form.Item>

                  <Form.Item name={"evalution"} label={"Evalution:"}>
                    <div className="flex items-center gap-3">
                      <CustomSelect
                        placeholder={"Evalution"}
                        className={`w-full h-[50px]`}
                        options={[
                          { value: 1, label: 1 },
                          { value: 2, label: 2 },
                          { value: 3, label: 3 },
                        ]}
                      />

                      <span>
                        <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                      </span>
                    </div>
                  </Form.Item>
                </div>
              </Fragment>
            ) : getFieldValue("type_component") === "CR" ? (
              <Fragment>
                <div className="flex items-center gap-3 px-5 my-5">
                  <Title level={3} fontSize={"text-xl"}>
                    Add Default Creating Settings
                  </Title>

                  <span>
                    <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                  </span>
                </div>
                <div className={"px-5 grid grid-cols-2 gap-5"}>
                  <Form.Item name={"enrolment_size"} label={"Enrollment Size:"}>
                    <CustomInput
                      classNames={"w-full"}
                      type={"number"}
                      placeholder={"Enrollment Size:"}
                    />
                  </Form.Item>

                  <Form.Item name={"make_up_size"} label={"Makeup Size:"}>
                    <CustomInput
                      classNames={"w-full"}
                      type={"number"}
                      placeholder={"Makeup Size:"}
                    />
                  </Form.Item>

                  <Form.Item
                    name={"web_stu_enrolment"}
                    label={"Website/Student Portal Enrollment:"}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </div>
                <div className={"px-5 grid grid-cols-2 gap-5"}>
                  <Form.Item name={"location"} label={"Location:"}>
                    <div className="flex items-center gap-3">
                      <CustomSelect
                        placeholder={"Please Select"}
                        className={`w-full h-[50px]`}
                        options={[{ value: 1, label: "USA" }]}
                        onChange={handleLocation}
                      />

                      <span>
                        <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                      </span>
                    </div>
                  </Form.Item>

                  <Form.Item name={"days"} label={"Days:"}>
                    <div className="flex items-center gap-3">
                      <CustomSelect
                        placeholder={"Please Select"}
                        className={`w-full h-[50px]`}
                        mode="multiple"
                        options={[
                          { value: 1, label: "Mon" },
                          { value: 2, label: "Tue" },
                          { value: 3, label: "Wen" },
                        ]}
                        onChange={handleDays}
                      />

                      <span>
                        <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                      </span>
                    </div>
                  </Form.Item>

                  <Form.Item name={"location"} label={"Location:"}>
                    <div className="flex items-center gap-3">
                      <CustomSelect
                        placeholder={"Please Select"}
                        className={`w-full h-[50px]`}
                        options={[{ value: 1, label: "USA" }]}
                        onChange={handleLocation}
                      />

                      <span>
                        <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                      </span>
                    </div>
                  </Form.Item>

                  <Form.Item name={"days"} label={"Days:"}>
                    <div className="flex items-center gap-3">
                      <CustomSelect
                        placeholder={"Please Select"}
                        className={`w-full h-[50px]`}
                        mode="multiple"
                        options={[
                          { value: 1, label: "Mon" },
                          { value: 2, label: "Tue" },
                          { value: 3, label: "Wen" },
                        ]}
                        onChange={handleDays}
                      />

                      <span>
                        <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                      </span>
                    </div>
                  </Form.Item>

                  <Form.Item
                    name={"number_sessions"}
                    label={"Number of Sessions:"}
                  >
                    <CustomInput
                      type={"number"}
                      placeholder={"Number of Sessions:"}
                      classNames={"w-full"}
                    />
                  </Form.Item>

                  <Form.Item name={"sessions_day"} label={"Sessions Per Day:"}>
                    <CustomInput
                      type={"number"}
                      placeholder={"Sessions Per Day:"}
                      classNames={"w-full"}
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  name={"session_duration"}
                  label={"Sessions Duration:"}
                  className="px-5"
                >
                  <div className="flex items-center gap-3">
                    <CustomSelect
                      placeholder={"Please Select"}
                      className={`w-full h-[50px]`}
                      options={[
                        { value: 1, label: 1 },
                        { value: 2, label: 2 },
                        { value: 3, label: 3 },
                      ]}
                      onChange={handleSessionDuration}
                    />

                    <span>
                      <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                    </span>
                  </div>
                </Form.Item>

                <div className={"px-5 grid grid-cols-2 gap-5 items-center"}>
                  <Form.Item name={"session_times"} label={"Sessions Times:"}>
                    <CustomSelect
                      placeholder={"Please Select"}
                      className={`w-full h-[50px]`}
                      options={[
                        { value: 1, label: 1 },
                        { value: 2, label: 2 },
                        { value: 3, label: 3 },
                      ]}
                      onChange={handleSessionTimes}
                    />
                  </Form.Item>

                  <Form.Item name={"session_times"} className="pt-7">
                    <CustomSelect
                      placeholder={"Please Select"}
                      className={`w-full h-[50px]`}
                      options={[
                        { value: 1, label: 1 },
                        { value: 2, label: 2 },
                        { value: 3, label: 3 },
                      ]}
                      onChange={handleSessionTimes}
                    />
                  </Form.Item>
                </div>
              </Fragment>
            ) : getFieldValue("subtype_web") === "EZ DRIVE" &&
              getFieldValue("type_component") === "WEB" ? (
              <Fragment>
                <div className="flex items-center gap-3 px-5 my-5">
                  <Form.Item
                    name={"ez_drive_product"}
                    label={"EZ Drive Product:"}
                    className="w-full"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <CustomSelect
                      placeholder={"EZ Drive Product"}
                      className={`w-full h-[50px]`}
                      options={StatusSelect}
                      onChange={handleEZDriveProduct}
                    />
                  </Form.Item>

                  <Form.Item
                    name={"duration"}
                    label={"Duration (Days):"}
                    getValueProps={(value) => ({
                      value: value && dayjs(Number(value)),
                    })}
                    normalize={(value) => value && `${dayjs(value).valueOf()}`}
                    className="w-full"
                  >
                    <DatePicker className="border-[#667085] w-full h-[50px]" />
                  </Form.Item>
                </div>
              </Fragment>
            ) : getFieldValue("subtype_web") === "SAFEWAY LMS" &&
              getFieldValue("type_component") === "WEB" ? (
              <Fragment>
                <Form.Item
                  name={"safeway_audience"}
                  label={"Safeway LMS Audience:"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <CustomSelect
                    placeholder={"EZ Drive Product"}
                    className={`w-full h-[50px]`}
                    options={StatusSelect}
                    colorBorder={colorsObject.black}
                    onChange={handleSafewayAudience}
                  />
                </Form.Item>

                <Form.Item
                  name={"duration"}
                  label={"Duration"}
                  getValueProps={(value) => ({
                    value: value && dayjs(Number(value)),
                  })}
                  normalize={(value) => value && `${dayjs(value).valueOf()}`}
                >
                  <DatePicker />
                </Form.Item>
              </Fragment>
            ) : null
          }
        </Form.Item>

        <div className="text-center space-x-5">
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            borderRadius={5}
            paddingInline={44}
            type={"submit"}
          >
            Save
          </ButtonComponent>
          <ButtonComponent
            defaultBg={colorsObject.main}
            defaultHoverBg={colorsObject.main}
            defaultBorderColor={colorsObject.primary}
            defaultHoverBorderColor={colorsObject.primary}
            defaultColor={colorsObject.primary}
            defaultHoverColor={colorsObject.primary}
            borderRadius={5}
            paddingInline={44}
            type={"reset"}
            onClick={onReset}
          >
            Cancel
          </ButtonComponent>
        </div>
      </Form>
      {IsOpen && state?.status}
    </Fragment>
  );
};

export const FeesModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const [requestPost] = useRequestPostMutation();
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });
  const [form] = Form.useForm();

  // func
  const handleStatus = (values) => {
    form.setFieldsValue({
      status: values,
    });
  };

  const handleNotesValue = (value) => {
    form.setFieldsValue({
      notes: value,
    });
  };

  const onReset = () => {
    form.resetFields();

    setTimeout(() => {
      navigate("/management/service/fees");
    }, 1000);
  };

  const onFinish = async (values) => {
    try {
      const res = await requestPost({
        path: `/account_management/services/fee/`,
        data: values,
      });

      if (res?.error?.status >= 400) {
        setIsOpen(true);
        dispatch({ type: "ERROR", setIsOpen });
      } else {
        setIsOpen(true);
        dispatch({ type: "SUCCESS", setIsOpen });
      }
    } catch (error) {
      console.error(error.message);
      setIsOpen(true);
      dispatch({ type: "ERROR", setIsOpen });
    }
  };

  return (
    <Fragment>
      <Form
        className="grid justify-center gap-y-5 px-5"
        form={form}
        onFinish={onFinish}
        layout={"vertical"}
        initialValues={{
          notes: "Hello",
        }}
      >
        <Form.Item
          label="Fee Name:"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input Fee Name",
            },
          ]}
        >
          <CustomInput placeholder={"Fee Name"} classNames={"w-full"} />
        </Form.Item>

        <Form.Item
          name={"status"}
          label={"Status:"}
          rules={[
            {
              required: true,
              message: "Status is empty",
            },
          ]}
        >
          <CustomSelect
            placeholder={"Select status"}
            className={`w-full h-[50px]`}
            options={StatusSelect}
            onChange={handleStatus}
          />
        </Form.Item>

        <Form.Item
          name={"amount"}
          label={"Amount:"}
          rules={[
            {
              required: true,
              message: "Please input Amount",
            },
          ]}
        >
          <CustomInput
            type={"number"}
            placeholder={"Fee Name"}
            classNames={"w-full"}
          />
        </Form.Item>

        <Form.Item name={"notes"} label={"Notes"} className="w-full">
          <MDEditor
            placeholder={"Text"}
            onChange={handleNotesValue}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        </Form.Item>

        <div className="text-center space-x-5">
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            borderRadius={5}
            paddingInline={44}
            type={"submit"}
          >
            Save
          </ButtonComponent>

          <ButtonComponent
            defaultBg={colorsObject.main}
            defaultHoverBg={colorsObject.main}
            defaultBorderColor={colorsObject.primary}
            defaultHoverBorderColor={colorsObject.primary}
            defaultColor={colorsObject.primary}
            defaultHoverColor={colorsObject.primary}
            borderRadius={5}
            paddingInline={44}
            type={"reset"}
            onClick={onReset}
          >
            Cancel
          </ButtonComponent>
        </div>
      </Form>
      {IsOpen && state?.status}
    </Fragment>
  );
};

export const DiscountModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data: ServiceData } = useRequestGetQuery({
    path: "/account_management/services/service/",
  });
  const { data: ClassData } = useRequestGetQuery({
    path: "/account_management/class/",
  });
  const { data: LocationData } = useRequestGetQuery({
    path: "/account_management/location/",
  });
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });
  const [requestPost] = useRequestPostMutation();
  const navigate = useNavigate();
  const [EligibleService, setEligibleService] = useState([]);
  const [EligibleClass, setEligibleClass] = useState([]);
  const [EligibleClassLocation, setEligibleClassLocation] = useState([]);
  const [Service, setService] = useState([]);
  const [Classes, setClasses] = useState([]);
  const [Location, setLocation] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const services = [];
    for (let i = 0; i < ServiceData?.length; i++) {
      const item = ServiceData[i];
      services.push({
        ...item,
        key: item?.id,
        title: item?.name,
      });
    }

    const classes = [];
    for (let i = 0; i < ClassData?.length; i++) {
      const item = ClassData[i];
      classes.push({
        ...item,
        key: item?.id,
        title: item?.name,
      });
    }
    const location = [];
    for (let i = 0; i < LocationData?.length; i++) {
      const item = LocationData[i];
      location.push({
        ...item,
        key: item?.id,
        title: item?.name,
      });
    }

    setClasses(classes);
    setService(services);
    setLocation(location);
  }, [ServiceData, ClassData, LocationData]);

  useEffect(() => {
    form.setFieldsValue({
      classes: EligibleClass,
      services: EligibleService,
      locations: EligibleClassLocation,
    });
  }, [EligibleClass, EligibleService, EligibleClassLocation]);

  // func
  const handleStatus = (values) => {
    form.setFieldsValue({
      status: values,
    });
  };

  const handleNotesValue = (value) => {
    form.setFieldsValue({
      notes: value,
    });
  };

  const handleExpirationDate = (day) => {
    form.setFieldsValue({
      expiration_data: `${day["$y"]}-${day["$M"] + 1}-${day["$D"]}`,
    });
  };

  const onFinish = async (values) => {
    try {
      const res = await requestPost({
        path: "/account_management/services/discount/",
        data: values,
      });

      if (res?.error?.status >= 400) {
        setIsOpen(true);
        dispatch({ type: "ERROR", setIsOpen });
      } else {
        setIsOpen(true);
        dispatch({ type: "SUCCESS", setIsOpen });
      }
      // console.log(values);
    } catch (error) {
      console.error(error.message);
      setIsOpen(true);
      dispatch({ type: "ERROR", setIsOpen });
    }
  };

  const onReset = () => {
    form.resetFields();
    setEligibleService([]);
    setEligibleClass([]);
    setEligibleClassLocation([]);

    setTimeout(() => {
      navigate("/management/service/discounts");
    }, 1000);
  };

  return (
    <Fragment>
      <Form
        className="grid justify-center gap-y-5 px-5"
        form={form}
        onFinish={onFinish}
        layout={"vertical"}
        initialValues={{
          notes: "Hello",
          expiration_data: null,
        }}
      >
        <Form.Item
          name={"name"}
          label={"Discount Name:"}
          rules={[
            {
              required: true,
              message: "Name is empty",
            },
          ]}
        >
          <CustomInput placeholder={"Discount Name"} classNames={"w-full"} />
        </Form.Item>

        <Form.Item
          name={"status"}
          label={"Status:"}
          rules={[
            {
              required: true,
              message: "Status is empty",
            },
          ]}
        >
          <CustomSelect
            placeholder={"Select status"}
            className={`w-full h-[50px]`}
            options={StatusSelect}
            onChange={handleStatus}
          />
        </Form.Item>

        <Form.Item
          name={"code"}
          label={"Discount Code:"}
          rules={[
            {
              required: true,
              message: "Code is empty",
            },
          ]}
        >
          <CustomInput placeholder={"Discount Code"} classNames={"w-full"} />
        </Form.Item>

        <Form.Item
          name={"amount"}
          label={"Fee amount:"}
          rules={[
            {
              required: true,
              message: "Fee amount is empty",
            },
          ]}
        >
          <CustomInput
            type={"number"}
            placeholder={"Fee amount"}
            classNames={"w-full"}
          />
        </Form.Item>

        <Form.Item
          name={"services"}
          label={"Eligible Service:"}
          className="m-auto"
        >
          <CustomTransfer
            dataSource={Service}
            listHeight={200}
            setSelectedKeys={setEligibleService}
            selectedKeys={EligibleService}
          />
        </Form.Item>

        <Form.Item name={"notes"} label={"Notes"}>
          <MDEditor
            placeholder={"Text"}
            onChange={handleNotesValue}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        </Form.Item>

        <Form.Item
          name={"classes"}
          label={"Eligible Class(es):"}
          className="m-auto"
        >
          <CustomTransfer
            dataSource={Classes}
            listHeight={200}
            setSelectedKeys={setEligibleClass}
            selectedKeys={EligibleClass}
          />
        </Form.Item>

        <Form.Item
          name={"locations"}
          label={"Eligible class Location:"}
          className="m-auto"
        >
          <CustomTransfer
            dataSource={Location}
            listHeight={200}
            setSelectedKeys={setEligibleClassLocation}
            selectedKeys={EligibleClassLocation}
          />
        </Form.Item>

        <Form.Item
          getValueProps={(value) => ({
            value: value && dayjs(Number(value)),
          })}
          normalize={(value) => value && `${dayjs(value).valueOf()}`}
          label={"Discount Expiration:"}
        >
          <DatePicker
            placeholder={"MM/DD/YYYY"}
            className="border-[#667085] w-full h-[50px]"
            onChange={handleExpirationDate}
          />
        </Form.Item>

        <div className="text-center space-x-5">
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            borderRadius={5}
            paddingInline={44}
            type={"submit"}
          >
            Save
          </ButtonComponent>
          <ButtonComponent
            defaultBg={colorsObject.main}
            defaultHoverBg={colorsObject.main}
            defaultBorderColor={colorsObject.primary}
            defaultHoverBorderColor={colorsObject.primary}
            defaultColor={colorsObject.primary}
            defaultHoverColor={colorsObject.primary}
            borderRadius={5}
            paddingInline={44}
            type={"reset"}
            onClick={onReset}
          >
            Cancel
          </ButtonComponent>
        </div>
      </Form>

      {IsOpen && state?.status}
    </Fragment>
  );
};

export const MiscellaneousModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });
  const [form] = Form.useForm();

  // func
  const onFinish = async (values) => {
    try {
      console.log(values);
      setIsOpen(true);
      dispatch({ type: "SUCCESS", setIsOpen });
    } catch (error) {
      setIsOpen(true);
      console.error(error?.message);
      dispatch({ type: "ERROR", setIsOpen });
    }
  };

  const onReset = () => {
    form.resetFields();

    setTimeout(() => {
      navigate("/management/service/miscellaneous");
    }, 1000);
  };

  const handleStatus = (values) => {
    form.setFieldsValue({
      status: values,
    });
  };
  const handleType = (values) => {
    form.setFieldsValue({
      type: values,
    });
  };

  return (
    <Fragment>
      <Form
        className="grid justify-center gap-y-5 px-5"
        form={form}
        onFinish={onFinish}
        layout={"vertical"}
      >
        <Form.Item
          name={"name"}
          label={"Miscellaneous Item Name:"}
          rules={[
            {
              required: true,
              message: "Name is empty",
            },
          ]}
        >
          <CustomInput
            placeholder={"Miscellaneous Item Name:"}
            classNames={"w-full"}
          />
        </Form.Item>

        <Form.Item
          name={"status"}
          label={"Status:"}
          rules={[
            {
              required: true,
              message: "Status is empty",
            },
          ]}
        >
          <CustomSelect
            placeholder={"Select status"}
            className={`w-full h-[50px]`}
            options={StatusSelect}
            onChange={handleStatus}
          />
        </Form.Item>

        <Form.Item
          name={"type"}
          label={"Status:"}
          rules={[
            {
              required: true,
              message: "Type is empty",
            },
          ]}
        >
          <CustomSelect
            placeholder={"Select type"}
            className={`w-full h-[50px]`}
            options={StatusSelect}
            onChange={handleType}
          />
        </Form.Item>

        <div className="text-center space-x-5">
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            borderRadius={5}
            paddingInline={44}
            type={"submit"}
          >
            Save
          </ButtonComponent>
          <ButtonComponent
            defaultBg={colorsObject.main}
            defaultHoverBg={colorsObject.main}
            defaultBorderColor={colorsObject.primary}
            defaultHoverBorderColor={colorsObject.primary}
            defaultColor={colorsObject.primary}
            defaultHoverColor={colorsObject.primary}
            borderRadius={5}
            paddingInline={44}
            type={"reset"}
            onClick={onReset}
          >
            Cancel
          </ButtonComponent>
        </div>
      </Form>
      {IsOpen && state?.status}
    </Fragment>
  );
};

export const AddServiceModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data: LocationData } = useRequestGetQuery({
    path: "/account_management/location/",
  });

  const { data: AddOnData } = useRequestGetQuery({
    path: "/account_management/services/add_on/",
  });
  const { data: DiscountData } = useRequestGetQuery({
    path: "/account_management/services/discount/",
  });

  const [requestPost] = useRequestPostMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [Location, setLocation] = useState([]);
  const [AddOn, setAddOn] = useState([]);
  const [DiscountMock, setDiscountMock] = useState([]);
  const [AssignLocation, setAssignLocation] = useState([]);
  const [AddOnServices, setAddOnServices] = useState([]);
  const [Discount, setDiscount] = useState([]);
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

  useEffect(() => {
    // /account_management/location/
    const locationMock = [];
    const addOnMock = [];
    const discountData = [];

    for (let i = 0; i < LocationData?.length; i++) {
      locationMock.push({
        ...LocationData[i],
        key: LocationData[i]?.id,
        title: LocationData[i]?.name,
      });
    }

    for (let i = 0; i < AddOnData?.length; i++) {
      addOnMock.push({
        ...AddOnData[i],
        key: AddOnData[i]?.id,
        title: AddOnData[i]?.name,
      });
    }

    for (let i = 0; i < DiscountData?.length; i++) {
      discountData.push({
        ...DiscountData[i],
        key: DiscountData[i]?.id,
        title: DiscountData[i]?.name,
      });
    }

    setLocation(locationMock);
    setAddOn(addOnMock);
    setDiscountMock(discountData);
  }, [LocationData, AddOnData, DiscountData]);

  useEffect(() => {
    form.setFieldsValue({
      locations: AssignLocation,
      add_ons: AddOnServices,
      discount: Discount,
    });
  }, [AssignLocation?.length, AddOnServices?.length, Discount?.length]);

  // func
  const onFinish = async (values) => {
    try {
      const res = await requestPost({
        path: "/account_management/services/service/",
        data: values,
      });

      if (res?.error?.status >= 400) {
        setIsOpen(true);
        dispatch({ type: "ERROR", setIsOpen });
      } else {
        setIsOpen(true);
        dispatch({ type: "SUCCESS", setIsOpen });
      }
      // console.log(res);
    } catch (error) {
      setIsOpen(true);
      console.error(error.message);
      dispatch({ type: "ERROR", setIsOpen });
    }
  };

  const handleStatus = (values) => {
    form.setFieldsValue({
      status: values,
    });
  };

  const handleWebDesc = (value) => {
    form.setFieldsValue({
      web_description: value,
    });
  };

  const handleEnrollmentEmail = (value) => {
    form.setFieldsValue({
      enrolment_email: value,
    });
  };

  const handleOE = (value) => {
    form.setFieldsValue({
      oe: value,
    });
  };
  const handleServiceNotes = (value) => {
    form.setFieldsValue({
      notes: value,
    });
  };

  const onReset = () => {
    form.resetFields();
    setAssignLocation([]);
    setAddOnServices([]);
    setDiscount([]);

    setTimeout(() => {
      navigate("/management/service/packages");
    }, 1000);
  };

  return (
    <Fragment>
      <Form
        initialValues={{
          taxable: false,
          locations: [],
          add_ons: [],
          discount: [],
          web_description: "Hello",
          enrolment_email: "Hello",
          notes: "Hello",
        }}
        form={form}
        className={"space-y-5"}
        onFinish={onFinish}
        layout={"vertical"}
      >
        <div className="grid grid-cols-2 gap-x-10 px-5">
          <div className={"space-y-5"}>
            <Form.Item
              label={"Service Name"}
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Service name is empty",
                },
              ]}
            >
              <CustomInput placeholder={"Service name"} classNames={"w-full"} />
            </Form.Item>

            <Form.Item
              label={"Service code"}
              name={"code"}
              rules={[
                {
                  required: true,
                  message: "Service code is empty",
                },
              ]}
            >
              <CustomInput placeholder={"Service name"} classNames={"w-full"} />
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
                placeholder={"Select status"}
                className={`w-full h-[50px] rounded`}
                options={StatusSelect}
                onChange={handleStatus}
              />
            </Form.Item>

            <Form.Item name={"locations"} label={"Assign Locations"}>
              <CustomTransfer
                dataSource={Location}
                listHeight={200}
                setSelectedKeys={setAssignLocation}
                selectedKeys={AssignLocation}
              />
            </Form.Item>

            <Form.Item name={"taxable"} valuePropName="checked">
              <CustomCheckBox
                className={"gap-x-2.5 text-base font-normal"}
              >
                Is Service Taxable
              </CustomCheckBox>
            </Form.Item>

            <Form.Item
              name={"price"}
              label={"Service Price:"}
              rules={[
                {
                  required: true,
                  message: "Price is empty",
                  type: "number",
                },
              ]}
            >
              <InputNumber
                placeholder={"Service Price"}
                className={"w-full h-[50px] border-[#667085]"}
              />
            </Form.Item>

            <Form.Item
              name={"web_name"}
              label={"Web Name"}
              rules={[
                {
                  required: true,
                  message: "Web Name is empty",
                },
              ]}
            >
              <CustomInput
                placeholder={"Web Name"}
                classNames={"w-full"}
                fontSize="text-base"
              />
            </Form.Item>

            <Form.Item
              name={"web_description"}
              label={"Web description"}
              rules={[
                {
                  required: true,
                  message: "Service name is empty",
                },
              ]}
            >
              <MDEditor
                placeholder={"Text"}
                onChange={handleWebDesc}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
              />
            </Form.Item>

            <Form.Item
              name={"enrolment_email"}
              label={"Enrollment Email Content"}
            >
              <MDEditor
                placeholder={"Text"}
                onChange={handleEnrollmentEmail}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
              />
            </Form.Item>
          </div>
          {/*------------*/}
          <div className={`space-y-5`}>
            <Form.Item
              name={"purchase"}
              label={"Allow Web Purchase:"}
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: "purchase is empty",
                },
              ]}
            >
              <CustomCheckBox />
            </Form.Item>

            <Form.Item
              name={"portal_purchase"}
              label={"Allow Web Purchase:"}
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: "Allow Portal Purchase is empty",
                },
              ]}
            >
              <CustomCheckBox />
            </Form.Item>

            <Form.Item name={"add_ons"} label={"Add-On Services"}>
              <CustomTransfer
                dataSource={AddOn}
                listHeight={200}
                setSelectedKeys={setAddOnServices}
                selectedKeys={AddOnServices}
              />
            </Form.Item>

            <Form.Item name={"discount"} label={"Eligible Discounts"}>
              <CustomTransfer
                dataSource={DiscountMock}
                listHeight={200}
                setSelectedKeys={setDiscount}
                selectedKeys={Discount}
              />
            </Form.Item>

            <Form.Item name={"oe"} label={"Associate Contract From OE"}>
              <CustomSelect
                className={`w-full h-[50px]`}
                placeholder={"Associate Contract From OE"}
                onChange={handleOE}
                options={[
                  { value: "TEEN", label: "TEEN" },
                  { value: "ADULT", label: "ADULT" },
                  { value: "KNOWLEDGE", label: "KNOWLEDGE" },
                  { value: "ROAD TEST", label: "ROAD TEST" },
                ]}
              />
            </Form.Item>

            <Form.Item
              name={"notes"}
              label={"Service Notes"}
              rules={[
                {
                  required: true,
                  message: "Service Notes is empty",
                },
              ]}
            >
              <MDEditor
                placeholder={"Text"}
                onChange={handleServiceNotes}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
              />
            </Form.Item>
          </div>
        </div>

        <div className="text-center space-x-5">
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            borderRadius={5}
            paddingInline={44}
            type={"submit"}
          >
            Save
          </ButtonComponent>

          <ButtonComponent
            defaultBg={colorsObject.main}
            defaultHoverBg={colorsObject.main}
            defaultBorderColor={colorsObject.primary}
            defaultHoverBorderColor={colorsObject.primary}
            defaultColor={colorsObject.primary}
            defaultHoverColor={colorsObject.primary}
            borderRadius={5}
            paddingInline={44}
            onClick={onReset}
          >
            Cancel
          </ButtonComponent>
        </div>
      </Form>

      {IsOpen && state?.status}
    </Fragment>
  );
};

export const FileCategoryModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [requestPost] = useRequestPostMutation();
  const { data } = useRequestGetQuery({
    path: "/account_management/services/service/",
  });
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });
  const [Packages, setPackages] = useState([]);
  const [PackagesMock, setPackagesMock] = useState([]);

  useEffect(() => {
    const packages = [];
    for (let i = 0; i < data?.length; i++) {
      const item = data[i];
      packages.push({
        ...item,
        key: item?.id,
        title: item?.name,
      });
    }

    setPackagesMock(packages);
  }, [data]);

  useEffect(() => {
    form.setFieldsValue({
      package: Packages,
    });
  }, [Packages]);

  const onFinish = async (values) => {
    try {
      const response = await requestPost({
        path: "/student_account/file_category/",
        data: values,
      });

      if (response?.error?.status >= 400) {
        setIsOpen(true);
        dispatch({ type: "ERROR", setIsOpen });
      } else {
        setIsOpen(true);
        dispatch({ type: "SUCCESS", setIsOpen });
      }
    } catch (error) {
      console.error(error?.message);
    }
  };

  const handleStatus = (values) => {
    form.setFieldsValue({
      status: values,
    });
  };

  const onReset = () => {
    form.resetFields();
    setPackages([]);

    setTimeout(() => {
      navigate("/management/file");
    }, 1000);
  };

  return (
    <Fragment>
      <Form
        form={form}
        initialValues={{
          package: [],
          has_portal: false,
          has_student_account: false,
          has_category_portal: false,
          has_teacher_portal: false,
          note: "",
          signature: "",
        }}
        className="flex flex-col items-center px-5"
        onFinish={onFinish}
        layout={"vertical"}
      >
        <Form.Item
          name={"name"}
          label={"Category name"}
          className="w-[40%]"
          rules={[
            {
              required: true,
              message: "Category name is empty",
            },
          ]}
        >
          <CustomInput classNames={"w-full"} placeholder={"Category name"} />
        </Form.Item>

        <Form.Item
          name={"status"}
          label={"Status"}
          className="w-[40%]"
          rules={[
            {
              required: true,
              message: "Status is empty",
            },
          ]}
        >
          <CustomSelect
            placeholder={"Select status"}
            className={`w-full h-[50px] rounded`}
            options={StatusSelect}
            onChange={handleStatus}
          />
        </Form.Item>

        <Form.Item name={"package"} label={"Packages:"}>
          <CustomTransfer
            dataSource={PackagesMock}
            listHeight={200}
            setSelectedKeys={setPackages}
            selectedKeys={Packages}
          />
        </Form.Item>

        <Form.Item name={"signature"} label={"Signature link:"} className="w-[40%]">
          <CustomInput
            type={"url"}
            classNames={"w-full"}
            placeholder={"Category name"}
          />
        </Form.Item>

        <Form.Item name={"note"} label={"Note"} className="w-[40%]">
          <Input.TextArea
            showCount
            maxLength={100}
            className={"border-[#667085] min-h-[90px] p-5"}
            placeholder={"Notes"}
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-5">
          <Form.Item
            label={"Display on Student Portal:"}
            valuePropName="checked"
            name={"has_portal"}
            className="w-[215px]"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label={"Must Be Uploaded to Student Account:"}
            valuePropName="checked"
            name={"has_student_account"}
            className="w-[215px]"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label={
              "Disallow files associated with category from displaying on Student Portal:"
            }
            valuePropName="checked"
            name={"has_category_portal"}
            className="w-[215px]"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label={
              "Disallow files associated with this category  from displaying on Instructor/Teacher Portal:"
            }
            valuePropName="checked"
            name={"has_teacher_portal"}
            className="w-[215px]"
          >
            <Switch />
          </Form.Item>
        </div>

        <div className="text-center space-x-5">
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            defaultColor={colorsObject.main}
            defaultHoverColor={colorsObject.main}
            borderRadius={5}
            paddingInline={44}
            type={"submit"}
          >
            Save
          </ButtonComponent>

          <ButtonComponent
            defaultBg={colorsObject.main}
            defaultHoverBg={colorsObject.main}
            defaultBorderColor={colorsObject.primary}
            defaultHoverBorderColor={colorsObject.primary}
            defaultColor={colorsObject.primary}
            defaultHoverColor={colorsObject.primary}
            borderRadius={5}
            paddingInline={44}
            onClick={onReset}
          >
            Cancel
          </ButtonComponent>
        </div>
      </Form>
      {IsOpen && state?.status}
    </Fragment>
  );
};

export const AddStaffModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data: LocationData } = useRequestGetQuery({
    path: "/account_management/location/",
  });
  const { data: VehicleData } = useRequestGetQuery({
    path: "/account_management/vehicle/",
  });
  const { FileReaderResult, ResultFile } = useFileReader();
  const navigate = useNavigate();

  const [Location, setLocation] = useState([]);
  const [Vehicle, setVehicle] = useState([]);
  const [State, setState] = useState("");
  const [Status, setStatus] = useState("");
  const [StaffType, setStaffType] = useState("");
  const [DOB, setDOB] = useState("");
  const [PermitIssueDate, setPermitIssueDate] = useState("");
  const [PermitExpirationDate, setPermitExpirationDate] = useState("");
  const [requestPost] = useRequestPostMutation();
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

  useEffect(() => {
    const locations = [];
    for (let i = 0; i < LocationData?.length; i++) {
      const item = LocationData[i];
      locations.push({
        ...item,
        value: item?.id,
        label: item?.name,
      });
    }

    const vehicles = [];
    for (let i = 0; i < VehicleData?.length; i++) {
      const item = VehicleData[i];
      vehicles.push({
        ...item,
        value: item?.id,
        label: item?.name,
      });
    }
    setLocation(locations);
    setVehicle(vehicles);
  }, [LocationData, VehicleData]);

  // func
  const handleSubmit = async (values) => {
    try {
      const res = await requestPost({
        path: "/student_account/instructor/",
        data: {
          ...values,
          status: Status,
          staff_type: StaffType,
          location: Location,
          state: State,
          vehicle: Vehicle,
          birth: DOB,
          car_permit_data: PermitIssueDate,
          car_permit_expire: PermitExpirationDate,
          working_hours: [],
        },
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
  };

  const handleStatus = (value) => {
    form.setFieldsValue({
      status: value,
    });
  };
  const handleStaffType = (value) => {
    form.setFieldsValue({
      staff_type: value,
    });
  };

  const handleLocation = (value) => {
    form.setFieldsValue({
      location: value,
    });
  };
  const handleVehicle = (value) => {
    form.setFieldsValue({
      vehicle: value,
    });
  };

  const handleState = (value) => {
    form.setFieldsValue({
      state: value,
    });
  };

  const handleBirth = (day) => {
    form.setFieldsValue({
      birth: `${day["$y"]}-${day["$M"]}-${day["$D"]}`,
    });
  };

  const handleCarPermitDate = (day) => {
    form.setFieldsValue({
      car_permit_data: `${day["$y"]}-${day["$M"]}-${day["$D"]}`,
    });
  };

  const handleCarPermitExpire = (day) => {
    form.setFieldsValue({
      car_permit_expire: `${day["$y"]}-${day["$M"]}-${day["$D"]}`,
    });
  };

  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Fragment>
      <Formik
        initialValues={{
          code: "",
          first_name: "",
          mid_name: "",
          last_name: "",
          address: "",
          city: "",
          // state: "",
          zip: "",
          email: "",
          home_phone: "",
          cell_phone: "",
          emergency_name: "",
          emergency_relation: "",
          emergency_phone: "",
          permit_number: "",
          username: "",
          password: "",
          assign_color: false,
          color: "#000",
          zoom: "",
          picture: null,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.first_name) {
            errors.first_name = "Input First name is empty";
          }
          if (!values.password) {
            errors.password = "Input password is empty";
          }

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleReset,
          handleChange,
          errors,
          values,
          setFieldValue,
        }) => (
          <Form form={form} className={"space-y-5"} layout={"vertical"}>
            <div className={"grid grid-cols-2 gap-5 px-5"}>
              <div className={"space-y-5"}>
                <Form.Item name={"status"} label={"Status"}>
                  <CustomSelect
                    placeholder={"Status"}
                    className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    options={StatusSelect}
                    onChange={handleStatus}
                  />
                </Form.Item>

                <Form.Item name={"staff_type"} label={"Staff type"}>
                  <CustomSelect
                    placeholder={"Staff type"}
                    className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    options={StatusSelect}
                    onChange={handleStaffType}
                  />
                </Form.Item>

                <Form.Item name={"location"} label={"Location"}>
                  <CustomSelect
                    placeholder={"Select"}
                    className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    options={Location}
                    onChange={handleLocation}
                  />
                </Form.Item>

                <Form.Item name={"vehicle"} label={"Vehicle assigned"}>
                  <CustomSelect
                    placeholder={"Select"}
                    className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    options={Vehicle}
                    onChange={handleVehicle}
                  />
                </Form.Item>

                <Form.Item name={"code"} label={"Staff code"}>
                  <CustomInput
                    classNames={"w-full"}
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    placeholder={"Staff code"}
                    fontSize="text-base"
                  />
                </Form.Item>

                <Form.Item
                  name={"first_name"}
                  label={"First name"}
                  rules={[
                    {
                      required: true,
                      message: "First name is empty",
                    },
                  ]}
                >
                  <CustomInput
                    classNames={"w-full"}
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    placeholder={"Staff code"}
                    fontSize="text-base"
                  />
                </Form.Item>

                <Form.Item name={"mid_name"} label={"Middle Name"}>
                  <CustomInput
                    classNames={"w-full"}
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    placeholder={"Middle Name"}
                    fontSize="text-base"
                  />
                </Form.Item>

                <Form.Item
                  name={"last_name"}
                  label={"Last Name"}
                  rules={[
                    {
                      required: true,
                      message: "Last Name is empty",
                    },
                  ]}
                >
                  <CustomInput
                    classNames={"w-full"}
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    placeholder={"Last Name"}
                    fontSize="text-base"
                  />
                </Form.Item>

                <Form.Item
                  name={"address"}
                  label={"Address"}
                  rules={[
                    {
                      required: true,
                      message: "Address is empty",
                    },
                  ]}
                >
                  <CustomInput
                    classNames={"w-full"}
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    placeholder={"Address"}
                    fontSize="text-base"
                  />
                </Form.Item>

                <Form.Item name={"city"} label={"City"}>
                  <CustomInput
                    classNames={"w-full"}
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    placeholder={"City"}
                    fontSize="text-base"
                  />
                </Form.Item>

                <Form.Item name={"state"} label={"State"}>
                  <CustomSelect
                    placeholder={"Select"}
                    className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    options={[
                      {
                        value: "USA",
                        label: "USA",
                      },
                    ]}
                    onChange={handleState}
                  />
                </Form.Item>

                <Form.Item name={"zip"} label={"Zip"}>
                  <CustomInput
                    classNames={"w-full"}
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    placeholder={"Zip"}
                    fontSize="text-base"
                  />
                </Form.Item>

                <Form.Item
                  name={"email"}
                  label="Email"
                  rules={[
                    {
                      type: "email",
                    },
                  ]}
                >
                  <CustomInput
                    classNames={"w-full"}
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    placeholder={"Email"}
                    fontSize="text-base"
                    type={"email"}
                  />
                </Form.Item>

                <Form.Item name={"home_phone"} label={"Home Phone"}>
                  <CustomInput
                    classNames={"w-full h-[50px]"}
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    placeholder={"Home phone"}
                    fontSize="text-base"
                  />
                </Form.Item>

                <Form.Item
                  name={"cell_phone"}
                  label={"Cell Phone"}
                  rules={[
                    {
                      required: true,
                      message: "Cell phone is empty",
                    },
                  ]}
                >
                  <CustomInput
                    classNames={"w-full h-[50px]"}
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    placeholder={"Cell phone"}
                    fontSize="text-base"
                  />
                </Form.Item>

                <Form.Item
                  name={"emergency_name"}
                  label={"Emergency Contact Name"}
                >
                  <CustomInput
                    classNames={"w-full h-[50px]"}
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    placeholder={"Emergency Contact Name"}
                    fontSize="text-base"
                  />
                </Form.Item>

                <Form.Item
                  name={"emergency_relation"}
                  label={"Emergency Contact Relation"}
                >
                  <CustomInput
                    classNames={"w-full h-[50px]"}
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    placeholder={"Emergency Contact Relation"}
                    fontSize="text-base"
                  />
                </Form.Item>

                <Form.Item
                  name={"emergency_phone"}
                  label={"Emergency Contact Phone"}
                >
                  <CustomInput
                    classNames={"w-full h-[50px]"}
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    placeholder={"Emergency Contact Phone"}
                    fontSize="text-base"
                  />
                </Form.Item>
              </div>

              <div className={"space-y-5"}>
                <Form.Item
                  name={"birth"}
                  label={"Date of birth"}
                  rules={[
                    {
                      required: true,
                      message: "Birth is empty",
                    },
                  ]}
                >
                  <DatePicker
                    className={`h-[50px] w-full border border-[#667085] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    placeholder={"MM/DD/YYYY"}
                    onChange={handleBirth}
                  />
                </Form.Item>

                <Form.Item
                  name={"permit_number"}
                  label={"Instructor Permit Number"}
                >
                  <CustomInput
                    classNames={"w-full h-[50px]"}
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    placeholder={"Instructor Permit Number"}
                    fontSize="text-base"
                  />
                </Form.Item>

                <Form.Item
                  name={"car_permit_data"}
                  label={"In Car Permit Issued Date"}
                >
                  <DatePicker
                    className={`h-[50px] w-full border border-[#667085] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    placeholder={"MM/DD/YYYY"}
                    onChange={handleCarPermitDate}
                  />
                </Form.Item>

                <Form.Item
                  name={"car_permit_expire"}
                  label={"Permit Expiration Date"}
                >
                  <DatePicker
                    className={`h-[50px] w-full border border-[#667085] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    placeholder={"MM/DD/YYYY"}
                    onChange={handleCarPermitExpire}
                  />
                </Form.Item>

                <Form.Item
                  name={"username"}
                  label={"Username"}
                  rules={[
                    {
                      required: true,
                      message: "Username is invalid",
                    },
                  ]}
                >
                  <CustomInput
                    classNames={"w-full h-[50px]"}
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    placeholder={"Username"}
                    fontSize="text-base"
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <CustomInput
                    classNames={"w-full h-[50px]"}
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    placeholder={"Password"}
                    fontSize="text-base"
                  />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="password2"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The new password that you entered do not match!",
                          ),
                        );
                      },
                    }),
                  ]}
                >
                  <CustomInput
                    classNames={"w-full h-[50px]"}
                    className={
                      ManagementStyle["CheckModal__form-element__shadow"]
                    }
                    placeholder={"Password"}
                    fontSize="text-base"
                  />
                </Form.Item>

                <Form.Item valuePropName="checked" name={"assign_color"}>
                  <CustomCheckBox className={"w-full flex"}>
                    <span className={`font-medium text-base`}>
                      Assign Appointment Color
                    </span>
                  </CustomCheckBox>
                </Form.Item>

                <Form.Item name={"color"} label={"Appointment Color"}>
                  <CustomInput
                    type={"color"}
                    placeholder={"#FFFFFF"}
                    className={`text-gray-500 px-5 py-2 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    classNames={"w-full h-[50px]"}
                    fontSize="text-base"
                  />
                </Form.Item>

                <Form.Item name={"zoom"} label={"Zoom PMI"}>
                  <CustomInput
                    placeholder={"Zoom PMI"}
                    className={`text-gray-500 px-5 py-2 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    classNames={"w-full h-[50px]"}
                    fontSize="text-base"
                  />
                </Form.Item>

                <Form.Item
                  label="Upload"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    action={
                      import.meta.env.VITE_API + "/student_account/files/"
                    }
                    listType="picture-card"
                  >
                    <button
                      style={{
                        border: 0,
                        background: "none",
                      }}
                      type="button"
                    >
                      <PlusOutlined />
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Upload
                      </div>
                    </button>
                  </Upload>
                </Form.Item>
              </div>
            </div>

            <div className="text-center space-x-5">
              <ButtonComponent
                defaultBg={colorsObject.success}
                defaultHoverBg={colorsObject.successHover}
                defaultColor={colorsObject.main}
                defaultHoverColor={colorsObject.main}
                borderRadius={5}
                paddingInline={44}
                type={"submit"}
              >
                Save
              </ButtonComponent>

              <ButtonComponent
                defaultBg={colorsObject.main}
                defaultHoverBg={colorsObject.main}
                defaultBorderColor={colorsObject.primary}
                defaultHoverBorderColor={colorsObject.primary}
                defaultColor={colorsObject.primary}
                defaultHoverColor={colorsObject.primary}
                borderRadius={5}
                paddingInline={44}
                onClick={() => {
                  handleReset();
                  setTimeout(() => {
                    navigate("/management/staff");
                  }, 1000);
                }}
              >
                Cancel
              </ButtonComponent>
            </div>
          </Form>
        )}
      </Formik>
      {IsOpen && state?.status}
    </Fragment>
  );
};

export const LocationModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [requestPost] = useRequestPostMutation();
  const navigate = useNavigate();
  const [Status, setStatus] = useState("");
  const [PickupLocation, setPickupLocation] = useState("");
  const [DropOffLocation, setDropOffLocation] = useState("");
  const [NotesValue, setNotesValue] = useState("Hello");
  const [Selections, setSelections] = useState(false);
  const [AreaCoverage, setAreaCoverage] = useState([]);
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

  // dep
  const selects = [Status, PickupLocation, DropOffLocation];

  const stateSelects = useMemo(() => {
    let state = false;
    for (let i = 0; i < selects.length; i++) {
      if (selects[i] === "") {
        state = true;
        break;
      }
    }

    return state;
  }, [Status, PickupLocation, DropOffLocation]);

  // func
  const handleSubmit = async (values) => {
    setSelections(stateSelects);

    if (!stateSelects) {
      try {
        const res = await requestPost({
          path: `/account_management/location/`,
          data: {
            ...values,
            status: Status,
            pick_up: PickupLocation,
            drop_off: DropOffLocation,
            location_note: NotesValue,
            area_coverage: ToNumber(AreaCoverage),
          },
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
  const handleStatus = (value) => setStatus(value);
  const handlePickupLocation = (value) => setPickupLocation(value);
  const handleDropOffLocation = (value) => setDropOffLocation(value);

  return (
    <Fragment>
      <Formik
        initialValues={{
          name: "",
          code: "",
          type: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          location_manager: "",
          county: "",
          road_test: false,
          knowledge_test: false,
          phone_main: "",
          fax: "",
          has_color: false,
          color: "#333",
          has_distance_based_scheduling: false,
          distance_based_scheduling: "",
          provider_location_id: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "Input name is required";
          }

          if (!values.type) {
            errors.type = "Type is not chosen";
          }

          if (!values.code) {
            errors.type = "Code is empty";
          }

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleChange, handleReset, handleSubmit }) => (
          <form className={"space-y-5 px-5"} onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-7">
              <div className={"space-y-5"}>
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Location name"}
                  placeholder={"Location name"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  name={"name"}
                  value={values.name}
                  onChange={handleChange}
                >
                  {errors.name && (
                    <FormError className="pl-[170px]">{errors.name}</FormError>
                  )}
                </CustomInput>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Location code"}
                  placeholder={"Location Code"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  name={"code"}
                  value={values.code}
                  onChange={handleChange}
                >
                  {errors.code && (
                    <FormError className="pl-[170px]">{errors.code}</FormError>
                  )}
                </CustomInput>

                <label className="inline-flex gap-10 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-32 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Location Status
                  </span>
                  <div className="w-full">
                    <CustomSelect
                      placeholder={"Location Status"}
                      className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                      options={StatusSelect}
                      onChange={handleStatus}
                      value={Status ? Status : undefined}
                    />
                    {Selections && (
                      <FormError>Location Status is not selected</FormError>
                    )}
                  </div>
                </label>
                <label className="inline-flex gap-10 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-32 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Location Type
                  </span>

                  <div className="space-y-4">
                    <div className="space-y-4">
                      <CustomRadio
                        className={"space-x-2.5 "}
                        classNames={"inline-flex items-center gap-2.5"}
                        customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                        name={"type"}
                        onChange={handleChange}
                        value={`Main office only`}
                      >
                        <span
                          className={"text-sm flex-shrink-0 font-medium w-32"}
                        >
                          Main office only
                        </span>
                      </CustomRadio>

                      <CustomRadio
                        className={"space-x-2.5 "}
                        classNames={"inline-flex items-center gap-2.5"}
                        customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                        name={"type"}
                        onChange={handleChange}
                        value={`Main office with classroom`}
                      >
                        <span
                          className={"text-sm flex-shrink-0 font-medium w-32"}
                        >
                          Main office with classroom
                        </span>
                      </CustomRadio>

                      <CustomRadio
                        className={"space-x-2.5 "}
                        classNames={"inline-flex items-center gap-2.5"}
                        customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                        name={"type"}
                        onChange={handleChange}
                        value={`Class Room`}
                      >
                        <span
                          className={"text-sm flex-shrink-0 font-medium w-32"}
                        >
                          Class Room
                        </span>
                      </CustomRadio>

                      <CustomRadio
                        className={"space-x-2.5 "}
                        classNames={"inline-flex items-center gap-2.5"}
                        customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                        name={"type"}
                        onChange={handleChange}
                        value={`Other (Satellite Office Only)`}
                      >
                        <span
                          className={"text-sm flex-shrink-0 font-medium w-32"}
                        >
                          Other (Satellite Office Only)
                        </span>
                      </CustomRadio>

                      <CustomRadio
                        className={"space-x-2.5 "}
                        classNames={"inline-flex items-center gap-2.5"}
                        customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                        name={"type"}
                        onChange={handleChange}
                        value={`Other Classroom (Satellite Office with Classroom)`}
                      >
                        <span
                          className={"text-sm flex-shrink-0 font-medium w-32"}
                        >
                          Other Classroom (Satellite Office with Classroom)
                        </span>
                      </CustomRadio>

                      <CustomRadio
                        className={"space-x-2.5"}
                        classNames={"inline-flex items-center gap-2.5"}
                        customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                        name={"type"}
                        onChange={handleChange}
                        value={`Range`}
                      >
                        <span
                          className={"text-sm flex-shrink-0 font-medium w-32"}
                        >
                          Range
                        </span>
                      </CustomRadio>
                    </div>
                    {errors.type && <FormError>Location Type</FormError>}
                  </div>
                </label>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Address"}
                  placeholder={"Address"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  name={"address"}
                  onChange={handleChange}
                  value={values.address}
                />
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"City"}
                  placeholder={"City"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  name={"city"}
                  onChange={handleChange}
                  value={values.city}
                />
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"State"}
                  placeholder={"State"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  name={"state"}
                  onChange={handleChange}
                  value={values.state}
                />
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Zip"}
                  placeholder={"Zip"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  name={"zip"}
                  onChange={handleChange}
                  value={values.zip}
                />
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Location Manager"}
                  placeholder={"Location Manager"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  name={"location_manager"}
                  onChange={handleChange}
                  value={values.location_manager}
                />
                <label className="inline-flex gap-10 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-32 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Pickup location
                  </span>
                  <div className="w-full">
                    <CustomSelect
                      placeholder={"Pickup location"}
                      className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                      options={[
                        {
                          value: 1,
                          label: "Number",
                        },
                      ]}
                      value={PickupLocation ? PickupLocation : undefined}
                      onChange={handlePickupLocation}
                    />

                    {Selections && (
                      <FormError className="pl-[170px]">
                        Pickup location is not selected
                      </FormError>
                    )}
                  </div>
                </label>
                <label className="inline-flex gap-10 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-32 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Drop off location
                  </span>
                  <div className="w-full">
                    <CustomSelect
                      placeholder={"Drop off location"}
                      className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                      options={[
                        {
                          value: 1,
                          label: "Number",
                        },
                      ]}
                      value={DropOffLocation ? DropOffLocation : undefined}
                      onChange={handleDropOffLocation}
                    />

                    {Selections && (
                      <FormError className="pl-[170px]">
                        Drop off location is not selected
                      </FormError>
                    )}
                  </div>
                </label>
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"County"}
                  placeholder={"County"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  name={"county"}
                  onChange={handleChange}
                  value={values.county}
                />
              </div>
              <div className={"space-y-5"}>
                <label className="flex itmes-center gap-x-10">
                  <span className="w-32 flex-shrink-0"></span>
                  <CustomCheckBox
                    className={"space-x-2.5 w-full"}
                    classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                    name={"road_test"}
                    onChange={handleChange}
                  >
                    <span className={"text-sm flex-shrink-0 font-medium"}>
                      Road Test
                    </span>
                  </CustomCheckBox>
                </label>
                <label className="flex itmes-center gap-x-10">
                  <span className="w-32 flex-shrink-0"></span>
                  <CustomCheckBox
                    className={"space-x-2.5 w-full"}
                    classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                    name={"knowledge_test"}
                    onChange={handleChange}
                  >
                    <span className={"text-sm flex-shrink-0 font-medium"}>
                      Knowledge Test
                    </span>
                  </CustomCheckBox>
                </label>
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Phone Main"}
                  placeholder={"Phone Main"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  name={"phone_main"}
                  value={values.phone_main}
                  onChange={handleChange}
                />
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Fax"}
                  placeholder={"Fax"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  name={"fax"}
                  value={values.fax}
                  onChange={handleChange}
                />
                <div className="inline-flex justify-end gap-10 items-center w-full">
                  <span className="text-right text-sm font-medium">
                    Area Coverage
                  </span>
                  <CustomTransfer
                    dataSource={mockData}
                    listHeight={200}
                    setSelectedKeys={setAreaCoverage}
                    selectedKeys={AreaCoverage}
                  />
                </div>
                <label className="inline-flex justify-end gap-10 items-center w-full">
                  <span className="text-sm flex-shrink-0 font-medium w-32 text-right">
                    Location note
                  </span>
                  <div className="w-full">
                    <MDEditor
                      value={NotesValue}
                      onChange={(value) => setNotesValue(value)}
                      previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                      }}
                    />
                  </div>
                </label>
                <label className="flex itmes-center gap-x-10">
                  <span className="w-32 flex-shrink-0"></span>
                  <CustomCheckBox
                    className={"space-x-2.5 w-full"}
                    classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                    name={"has_color"}
                    onChange={handleChange}
                  >
                    <span className={"text-sm flex-shrink-0 font-medium"}>
                      Appointment Color
                    </span>
                  </CustomCheckBox>
                </label>
                <label className="flex items-center gap-6 justify-center">
                  <span className="text-sm flex-shrink-0 font-medium w-32 text-end ml-4">
                    Color picker
                  </span>

                  <CustomInput
                    type={"color"}
                    className={"w-12"}
                    classNames={`rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    onChange={handleChange}
                    name={"color"}
                    value={values.color}
                  />
                  <CustomInput
                    classNames={`w-full h-[50px] rounded-lg ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    onChange={handleChange}
                    name={"color"}
                    value={values.color}
                  />
                </label>
                <label className="flex itmes-center gap-x-10">
                  <span className="w-32 flex-shrink-0"></span>
                  <CustomCheckBox
                    className={"space-x-2.5 w-full"}
                    classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                    onChange={handleChange}
                    name={"has_distance_based_scheduling"}
                  >
                    <span className={"text-sm flex-shrink-0 font-medium"}>
                      Distance based scheduling
                    </span>
                  </CustomCheckBox>
                </label>
                <CustomInput
                  type={"number"}
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Distance Coverage in Miles"}
                  placeholder={"Distance Coverage in Miles"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  value={values.distance_based_scheduling}
                  onChange={handleChange}
                  name={"distance_based_scheduling"}
                />
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Provider Location Id"}
                  placeholder={"Provider Location Id"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  name={"provider_location_id"}
                  value={values.provider_location_id}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="text-center space-x-5">
              <ButtonComponent
                defaultBg={colorsObject.success}
                defaultHoverBg={colorsObject.successHover}
                defaultColor={colorsObject.main}
                defaultHoverColor={colorsObject.main}
                borderRadius={5}
                paddingInline={44}
                type={"submit"}
              >
                Save
              </ButtonComponent>

              <ButtonComponent
                type={"reset"}
                defaultBg={colorsObject.main}
                defaultHoverBg={colorsObject.main}
                defaultBorderColor={colorsObject.primary}
                defaultHoverBorderColor={colorsObject.primary}
                defaultColor={colorsObject.primary}
                defaultHoverColor={colorsObject.primary}
                borderRadius={5}
                paddingInline={44}
                onClick={() => {
                  handleReset();
                  setTimeout(() => {
                    navigate("/management/single-page/location");
                  }, 1000);
                }}
              >
                Cancel
              </ButtonComponent>
            </div>
          </form>
        )}
      </Formik>
      {IsOpen && state?.status}
    </Fragment>
  );
};

export const AddSchoolModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const [NotesValue, setNotesValue] = useState("Hello");
  const [Status, setStatus] = useState("");
  const [State, setState] = useState("");
  const [Selections, setSelections] = useState(false);
  const [requestPost] = useRequestPostMutation();
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

  // dep
  const selects = [Status];

  const stateSelects = useMemo(() => {
    let state = false;
    for (let i = 0; i < selects.length; i++) {
      if (selects[i] === "") {
        state = true;
        break;
      }
    }

    return state;
  }, [Status]);

  // func
  const handleNotes = (value) => setNotesValue(value);
  const handleStatus = (value) => setStatus(value);
  const handleState = (value) => setState(value);
  const handleSubmit = async (values) => {
    setSelections(stateSelects);

    if (!stateSelects) {
      try {
        const res = await requestPost({
          path: "/account_management/schools/",
          data: {
            ...values,
            note: NotesValue,
            status: Status,
            state: State,
          },
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

  return (
    <Fragment>
      <Formik
        initialValues={{
          name: "",
          code: "",
          address: "",
          city: "",
          zipcode: "",
          email: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.name) {
            errors.name = "Name is empty";
          }

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ handleReset, handleChange, handleSubmit, values, errors }) => (
          <form className={"space-y-5"} onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5 px-5">
              <div className={"space-y-5"}>
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"School Name"}
                  placeholder={"School Name"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right  relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  name={"name"}
                  onChange={handleChange}
                  value={values.name}
                >
                  {errors.name && (
                    <FormError className="pl-[154px]">{errors.name}</FormError>
                  )}
                </CustomInput>

                <label className="inline-flex gap-10 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-28 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    School Status
                  </span>
                  <div className="w-full">
                    <CustomSelect
                      placeholder={"Select School Status"}
                      className={`w-full rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                      options={StatusSelect}
                      onChange={handleStatus}
                      value={Status ? Status : undefined}
                    />

                    {Selections && (
                      <FormError className="pl-[154px]">
                        School Status is not selected
                      </FormError>
                    )}
                  </div>
                </label>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"School Code"}
                  placeholder={"School Code"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  name={"code"}
                  onChange={handleChange}
                  value={values.code}
                />
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"School Address"}
                  placeholder={"School Address"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  name={"address"}
                  onChange={handleChange}
                  value={values.address}
                />
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"School City"}
                  placeholder={"School City"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  name={"city"}
                  onChange={handleChange}
                  value={values.city}
                />

                <label className="inline-flex gap-10 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-28 text-right`}
                  >
                    State
                  </span>
                  <CustomSelect
                    placeholder={"Select State"}
                    className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    options={[
                      {
                        value: "Tashkent",
                        label: "Tashkent",
                      },
                    ]}
                    value={State ? State : undefined}
                    onChange={handleState}
                  />
                </label>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Zip Code"}
                  placeholder={"Zip Code"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  name={"zipcode"}
                  value={values.zipcode}
                  onChange={handleChange}
                  type={"number"}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  type={"email"}
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Email"}
                  placeholder={"Email"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  name={"email"}
                  onChange={handleChange}
                  value={values.email}
                >
                  {errors.email && (
                    <FormError className="pl-[154px]">{errors.email}</FormError>
                  )}
                </CustomInput>
              </div>
              <div>
                <label className="inline-flex justify-end gap-10 items-center w-full">
                  <span
                    className={
                      "text-sm flex-shrink-0 font-medium w-32 text-right"
                    }
                  >
                    School notes
                  </span>

                  <div className={"w-full"}>
                    <MDEditor
                      value={NotesValue}
                      onChange={handleNotes}
                      previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                      }}
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className="text-center space-x-5">
              <ButtonComponent
                defaultBg={colorsObject.success}
                defaultHoverBg={colorsObject.successHover}
                defaultColor={colorsObject.main}
                defaultHoverColor={colorsObject.main}
                borderRadius={5}
                paddingInline={44}
                type={"submit"}
              >
                Save
              </ButtonComponent>

              <ButtonComponent
                defaultBg={colorsObject.main}
                defaultHoverBg={colorsObject.main}
                defaultBorderColor={colorsObject.primary}
                defaultHoverBorderColor={colorsObject.primary}
                defaultColor={colorsObject.primary}
                defaultHoverColor={colorsObject.primary}
                borderRadius={5}
                paddingInline={44}
                onClick={() => {
                  handleReset();
                  setTimeout(() => {
                    navigate("/management/single-page/high school");
                  }, 1000);
                }}
              >
                Cancel
              </ButtonComponent>
            </div>
          </form>
        )}
      </Formik>
      {IsOpen && state?.status}
    </Fragment>
  );
};

export const HowHearModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const [requestPost] = useRequestPostMutation();
  const [NotesValue, setNotesValue] = useState("Hello");
  const [Status, setStatus] = useState("");
  const [Expiration, setExpiration] = useState("");
  const [Selections, setSelections] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

  // dep
  const selects = [Status];

  const stateSelects = useMemo(() => {
    let state = false;
    for (let i = 0; i < selects.length; i++) {
      if (selects[i] === "") {
        state = true;
        break;
      }
    }

    return state;
  }, [Status]);

  // func
  const handleNotes = (value) => setNotesValue(value);
  const handleStatus = (value) => setStatus(value);
  const handleExpiration = (day) => setExpiration(day["$d"]);
  const handleSubmit = async (values) => {
    setSelections(stateSelects);

    if (!stateSelects) {
      try {
        const res = await requestPost({
          path: "/account_management/how_did_you_hear_us/",
          data: {
            ...values,
            notes: NotesValue,
            status: Status,
            expiration: Expiration,
          },
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

  return (
    <Fragment>
      <Formik
        initialValues={{
          name: "",
          code: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "Lead Name is empty";
          }

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, errors, handleReset, handleChange }) => (
          <form className={"space-y-5"} onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5 px-5">
              <div className={"space-y-5"}>
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Lead Name"}
                  placeholder={"Lead Name"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right  relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  name={"name"}
                  onChange={handleChange}
                  value={values.name}
                >
                  {errors.name && (
                    <FormError className="pl-[154px]">{errors.name}</FormError>
                  )}
                </CustomInput>

                <label className="inline-flex gap-10 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-28 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Lead Status
                  </span>

                  <div className="w-full">
                    <CustomSelect
                      placeholder={"Lead Status"}
                      className={`w-full rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                      options={StatusSelect}
                      onChange={handleStatus}
                      value={Status ? Status : undefined}
                    />
                    {Selections && (
                      <FormError className="pl-[154px]">
                        Lead Status is not selected
                      </FormError>
                    )}
                  </div>
                </label>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Lead Code"}
                  placeholder={"Lead Code"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  name={"code"}
                  onChange={handleChange}
                  value={values.code}
                />

                <label className="inline-flex gap-10 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-28 text-right`}
                  >
                    Expiration
                  </span>
                  <DatePicker
                    className={`w-full border border-[#667085] h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    placeholder={"DD/MM/YYYY"}
                    onChange={handleExpiration}
                  />
                </label>
              </div>
              <div>
                <label className="inline-flex justify-end gap-10 items-center w-full">
                  <span
                    className={
                      "text-sm flex-shrink-0 font-medium w-32 text-right"
                    }
                  >
                    Lead notes
                  </span>

                  <div className={"w-full"}>
                    <MDEditor
                      value={NotesValue}
                      onChange={handleNotes}
                      previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                      }}
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className="text-center space-x-5">
              <ButtonComponent
                defaultBg={colorsObject.success}
                defaultHoverBg={colorsObject.successHover}
                defaultColor={colorsObject.main}
                defaultHoverColor={colorsObject.main}
                borderRadius={5}
                paddingInline={44}
                type={"submit"}
              >
                Save
              </ButtonComponent>

              <ButtonComponent
                defaultBg={colorsObject.main}
                defaultHoverBg={colorsObject.main}
                defaultBorderColor={colorsObject.primary}
                defaultHoverBorderColor={colorsObject.primary}
                defaultColor={colorsObject.primary}
                defaultHoverColor={colorsObject.primary}
                borderRadius={5}
                paddingInline={44}
                onClick={() => {
                  handleReset();
                  setTimeout(() => {
                    navigate("/management/single-page/how did you hear");
                  }, 1000);
                }}
              >
                Cancel
              </ButtonComponent>
            </div>
          </form>
        )}
      </Formik>
      {IsOpen && state?.status}
    </Fragment>
  );
};

export const VehiclesModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [requestPost] = useRequestPostMutation();
  const navigate = useNavigate();
  const [Status, setStatus] = useState("");
  const [Location, setLocation] = useState("");
  const [Type, setType] = useState("");
  const [Selections, setSelections] = useState(false);
  const { FileReaderResult, ResultFile } = useFileReader();
  const [NotesValue, setNotesValue] = useState("Hello");
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

  // dep
  const selects = [Status];

  const stateSelects = useMemo(() => {
    let state = false;
    for (let i = 0; i < selects.length; i++) {
      if (selects[i] === "") {
        state = true;
        break;
      }
    }

    return state;
  }, [Status]);

  //func
  const handleSubmit = async (values) => {
    setSelections(stateSelects);

    if (!stateSelects) {
      try {
        const res = await requestPost({
          path: "/account_management/vehicle/",
          data: {
            ...values,
            status: Status,
            location: Location,
            type: Type,
            note: NotesValue,
          },
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

  const handleStatus = (value) => setStatus(value);
  const handleLocation = (value) => setLocation(value);
  const handleType = (value) => setType(value);
  const handleNotes = (value) => setNotesValue(value);

  return (
    <Fragment>
      <Formik
        initialValues={{
          name: "",
          number: "",
          make: "",
          plate: "",
          vin: "",
          color: "#000",
          has_color: false,
          asr_esn_id: "",
          odometer: "",
          initial_mileage: "",
          image: null,
        }}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "Name is empty";
          }

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          setFieldValue,
          handleReset,
          handleChange,
          values,
          errors,
        }) => (
          <form className={"space-y-5 px-5"} onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5">
              <div className={"space-y-5"}>
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Vehicle Name"}
                  placeholder={"Vehicle Name"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  name={"name"}
                  value={values.name}
                  onChange={handleChange}
                >
                  {errors.name && (
                    <FormError className="pl-[154px]">{errors.name}</FormError>
                  )}
                </CustomInput>

                <label className="inline-flex gap-10 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-28 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Vehicle Status
                  </span>
                  <div className="w-full">
                    <CustomSelect
                      placeholder={"Vehicle Status"}
                      className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                      options={StatusSelect}
                      value={Status ? Status : undefined}
                      onChange={handleStatus}
                    />
                    {Selections && (
                      <FormError className="pl-[154px]">
                        Vehicle Status is not selected
                      </FormError>
                    )}
                  </div>
                </label>

                <label className="inline-flex gap-10 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-28 text-right`}
                  >
                    At Location
                  </span>
                  <CustomSelect
                    placeholder={"At Location"}
                    className={`w-full rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    options={[
                      {
                        value: 1,
                        label: "Mason",
                      },
                    ]}
                    value={Location ? Location : undefined}
                    onChange={handleLocation}
                  />
                </label>

                <label className="inline-flex gap-10 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-28 text-right`}
                  >
                    Vehicle Type
                  </span>
                  <CustomSelect
                    placeholder={"Vehicle Type"}
                    className={`w-full rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    options={[
                      {
                        value: "BUS",
                        label: "BUS",
                      },
                      {
                        value: "CAR",
                        label: "CAR",
                      },
                    ]}
                    value={Type ? Type : undefined}
                    onChange={handleType}
                  />
                </label>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Vehicle No"}
                  placeholder={"Vehicle No"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  name={"number"}
                  value={values.number}
                  onChange={handleChange}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Vehicle Make"}
                  placeholder={"Vehicle Make"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  name={"make"}
                  value={values.make}
                  onChange={handleChange}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"License Plate"}
                  placeholder={"License Plate"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  name={"plate"}
                  value={values.plate}
                  onChange={handleChange}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"VIN#"}
                  placeholder={"VIN#"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  name={"vin"}
                  value={values.vin}
                  onChange={handleChange}
                />
              </div>
              <div className={"space-y-5"}>
                <label className="inline-flex gap-10 items-center w-full">
                  <span className={"flex-shrink-0 w-28 text-right"}>
                    Appointment Color
                  </span>

                  <div className="flex flex-grow items-center gap-6">
                    <CustomInput
                      type={"color"}
                      name={"color"}
                      onChange={handleChange}
                      value={values.color}
                      className={`w-full ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                      classNames={"w-14"}
                    />
                    <CustomInput
                      value={values.color}
                      classNames="w-full h-[50px]"
                      className={
                        ManagementStyle["CheckModal__form-element__shadow"]
                      }
                    />
                  </div>
                </label>

                <label className="flex itmes-center gap-x-10">
                  <span className="w-28 flex-shrink-0"></span>
                  <CustomCheckBox name={"has_color"} onChange={handleChange}>
                    <span>Enable Appointment Color</span>
                  </CustomCheckBox>
                </label>

                <label className="inline-flex justify-end gap-10 items-center w-full">
                  <span
                    className={
                      "text-sm font-medium w-28 flex-shrink-0 text-right"
                    }
                  >
                    Vehicle Note
                  </span>

                  <div className={"w-full"}>
                    <MDEditor
                      value={NotesValue}
                      onChange={handleNotes}
                      previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                      }}
                    />
                  </div>
                </label>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Vehicle ESN Or AIR ID"}
                  placeholder={"Vehicle ESN Or AIR ID"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  name={"asr_esn_id"}
                  value={values.asr_esn_id}
                  onChange={handleChange}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Odometer Value"}
                  placeholder={"Odometer Value"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  name={"odometer"}
                  onChange={handleChange}
                  value={values.odometer}
                  type={"number"}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-10 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Vehicle Initial Mileage"}
                  placeholder={"Vehicle Initial Mileage"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  name={"initial_mileage"}
                  value={values.initial_mileage}
                  onChange={handleChange}
                  type={"number"}
                />

                <label className="inline-flex justify-end gap-10 items-center w-full">
                  <span
                    className={
                      "text-sm font-medium w-28 flex-shrink-0 text-right"
                    }
                  >
                    Vehicle Image
                  </span>

                  <FileReaderResult
                    className={`overflow-hidden w-full ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    onChange={() => setFieldValue("image", ResultFile)}
                  />
                </label>
              </div>
            </div>
            <div className="text-center space-x-5">
              <ButtonComponent
                defaultBg={colorsObject.success}
                defaultHoverBg={colorsObject.successHover}
                defaultColor={colorsObject.main}
                defaultHoverColor={colorsObject.main}
                borderRadius={5}
                paddingInline={44}
                type={"submit"}
              >
                Save
              </ButtonComponent>

              <ButtonComponent
                defaultBg={colorsObject.main}
                defaultHoverBg={colorsObject.main}
                defaultBorderColor={colorsObject.primary}
                defaultHoverBorderColor={colorsObject.primary}
                defaultColor={colorsObject.primary}
                defaultHoverColor={colorsObject.primary}
                borderRadius={5}
                paddingInline={44}
                onClick={() => {
                  handleReset();
                  setTimeout(() => {
                    navigate("/management/single-page/vehicles");
                  }, 1000);
                }}
              >
                Cancel
              </ButtonComponent>
            </div>
          </form>
        )}
      </Formik>
      {IsOpen && state?.status}
    </Fragment>
  );
};

export const AddQuiz = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <Fragment>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemColor: colorsObject.secondary,
              itemSelectedColor: colorsObject.primary,
              itemHoverColor: colorsObject.primary,
              titleFontSize: 18,
              inkBarColor: "transparent",
            },
          },
        }}
      >
        <Tabs defaultActiveKey="1" items={AddQuizTab()} />
      </ConfigProvider>
    </Fragment>
  );
};
