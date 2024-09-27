import {
  CustomCheckBox,
  CustomInput,
  CustomRadio,
  CustomSelect,
  CustomTransfer,
} from "@/components/form/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { AlertSuccess, AlertError } from "@/hooks/alert.jsx";
import { AddQuizTab } from "@/modules/management.jsx";
import {
  useRequestGetQuery,
  useRequestPostMutation,
} from "@/redux/query/index.jsx";
import { PlusOutlined } from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";
import {
  ColorPicker,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Switch,
  Tabs,
  Upload,
  Select,
  Divider,
  Space,
  Button,
} from "antd";
import {
  Fragment,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize";
import { StatusSelect } from "./index.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import ButtonComponent from "@/components/button/index.jsx";
import dayjs from "dayjs";
import { FiHelpCircle } from "react-icons/fi";

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
        data: {
          ...values,
          duration: values["duration"].format("YYYY-MM-DD"),
        },
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
      navigate("/admin/management/service/product");
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
        <div className={"px-5 grid grid-cols-2 gap-5 max-[1000px]:grid-cols-1"}>
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
                <div
                  className={
                    "px-5 grid grid-cols-2 gap-5 max-[1000px]:grid-cols-1"
                  }
                >
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
                <div
                  className={
                    "px-5 grid grid-cols-2 gap-5 max-[1000px]:grid-cols-1"
                  }
                >
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
                <div
                  className={
                    "px-5 grid grid-cols-2 gap-5 max-[1000px]:grid-cols-1"
                  }
                >
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
                <div className="flex items-center gap-3 px-5 my-5 max-[1000px]:grid-cols-1">
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
                    className="w-full"
                  >
                    <DatePicker className="border-[#667085] w-full h-[50px]" />
                  </Form.Item>
                </div>
              </Fragment>
            ) : getFieldValue("subtype_web") === "SAFEWAY LMS" &&
              getFieldValue("type_component") === "WEB" ? (
              <Fragment>
                <div className="px-5 grid grid-cols-2 gap-5 max-[1000px]:grid-cols-1">
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
                    <DatePicker className="w-full h-[50px] border-[#667085]" />
                  </Form.Item>
                </div>
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
      navigate("/admin/management/service/fees");
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

  const onFinish = async (values) => {
    try {
      const res = await requestPost({
        path: "/account_management/services/discount/",
        data: {
          ...values,
          expiration_data: values["expiration_data"].format("YYYY-MM-DD"),
        },
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
      navigate("/admin/management/service/discounts");
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

        <Form.Item name={"expiration_data"} label={"Discount Expiration:"}>
          <DatePicker
            placeholder={"MM/DD/YYYY"}
            className="border-[#667085] w-full h-[50px]"
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
      navigate("/admin/management/service/miscellaneous");
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

  const { data: ItemsData } = useRequestGetQuery({
    path: "/account_management/services/component/",
  });

  const [requestPost] = useRequestPostMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [Location, setLocation] = useState([]);
  const [Items, setItems] = useState([]);
  const [AddOn, setAddOn] = useState([]);
  const [DiscountMock, setDiscountMock] = useState([]);
  const [AssignLocation, setAssignLocation] = useState([]);
  const [ServiceItems, setServiceItems] = useState([]);
  const [AddOnServices, setAddOnServices] = useState([]);
  const [Discount, setDiscount] = useState([]);
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

  useEffect(() => {
    // /account_management/location/
    const locationMock = [];
    const addOnMock = [];
    const discountData = [];
    const items = [];

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

    for (let i = 0; i < ItemsData?.length; i++) {
      items.push({
        ...ItemsData[i],
        key: ItemsData[i]?.id,
        title: ItemsData[i]?.name,
      });
    }

    setLocation(locationMock);
    setAddOn(addOnMock);
    setDiscountMock(discountData);
    setItems(items);
  }, [LocationData, AddOnData, DiscountData, ItemsData]);

  useEffect(() => {
    form.setFieldsValue({
      locations: AssignLocation,
      add_ons: AddOnServices,
      discount: Discount,
      items: ServiceItems,
    });
  }, [
    AssignLocation?.length,
    AddOnServices?.length,
    Discount?.length,
    ServiceItems?.length,
  ]);

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
      navigate("/admin/management/service/packages");
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
          items: [],
          web_description: "Hello",
          enrolment_email: "Hello",
          notes: "Hello",
        }}
        form={form}
        className={"space-y-5"}
        onFinish={onFinish}
        layout={"vertical"}
      >
        <div className="grid grid-cols-2 gap-x-10 px-5 max-[1200px]:grid-cols-1">
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

            <Form.Item
              name={"items"}
              label={"Service Items:"}
              rules={[{ required: true }]}
            >
              <CustomTransfer
                dataSource={Items}
                listHeight={200}
                setSelectedKeys={setServiceItems}
                selectedKeys={ServiceItems}
              />
            </Form.Item>

            <Form.Item name={"taxable"} valuePropName="checked">
              <CustomCheckBox className={"gap-x-2.5 text-sm"}>
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
                className={"w-full h-[50px] border-[#667085] py-2.5"}
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
                  { value: "KNOWLEDGE TEST(KT)", label: "KNOWLEDGE TEST(KT)" },
                  { value: "ROAD TEST(RT)", label: "ROAD TEST(RT)" },
                  { value: "UPLOAD DOCUMENTS", label: "UPLOAD DOCUMENTS" },
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
  const { data, isLoading } = useRequestGetQuery({
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
      navigate("/admin/management/file");
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
        onFinish={onFinish}
        layout={"vertical"}
      >
        <div className="px-5 grid grid-cols-2 gap-5 max-[1150px]:grid-cols-1">
          <div className="space-y-5">
            <Form.Item
              name={"name"}
              label={"Category name"}
              rules={[
                {
                  required: true,
                  message: "Category name is empty",
                },
              ]}
            >
              <CustomInput
                disabled={isLoading}
                classNames={"w-full"}
                placeholder={"Category name"}
              />
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
                disabled={isLoading}
              />
            </Form.Item>

            <Form.Item name={"signature"} label={"Signature link:"}>
              <CustomInput
                type={"url"}
                classNames={"w-full"}
                placeholder={"Link"}
                disabled={isLoading}
              />
            </Form.Item>

            <Form.Item name={"note"} label={"Note"}>
              <Input.TextArea
                showCount
                maxLength={100}
                className={"border-[#667085] p-5"}
                placeholder={"Notes"}
                disabled={isLoading}
              />
            </Form.Item>
          </div>

          <div className="space-y-5">
            <Form.Item name={"package"} label={"Packages:"}>
              <CustomTransfer
                dataSource={PackagesMock}
                listHeight={200}
                setSelectedKeys={setPackages}
                selectedKeys={Packages}
                disabled={isLoading}
              />
            </Form.Item>

            <div className="grid grid-cols-2 gap-5">
              <Form.Item
                label={"Display on Student Portal:"}
                valuePropName="checked"
                name={"has_portal"}
                className="max-w-[250px]"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                label={"Must Be Uploaded to Student Account:"}
                valuePropName="checked"
                name={"has_student_account"}
                className="max-w-[250px]"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                label={
                  "Disallow files associated with category from displaying on Student Portal:"
                }
                valuePropName="checked"
                name={"has_category_portal"}
                className="max-w-[250px]"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                label={
                  "Disallow files associated with this category  from displaying on Instructor/Teacher Portal:"
                }
                valuePropName="checked"
                name={"has_teacher_portal"}
                className="max-w-[250px]"
              >
                <Switch />
              </Form.Item>
            </div>
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

export const AddStaffModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data: LocationData } = useRequestGetQuery({
    path: "/account_management/location/",
  });
  const { data: VehicleData } = useRequestGetQuery({
    path: "/account_management/vehicle/",
  });

  const navigate = useNavigate();

  const [Location, setLocation] = useState([]);
  const [Vehicle, setVehicle] = useState([]);
  const [requestPost] = useRequestPostMutation();
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

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

  const handleColor = (_, value) => {
    form.setFieldsValue({
      color: value,
    });
  };

  const onFinish = async (values) => {
    try {
      const { picture } = values;
      const formData = new FormData();
      formData.append("picture", picture[0].originFileObj);

      const response = await requestPost({
        path: "/student_account/instructor/",
        data: {
          ...values,
          picture: formData,
          birth: values["birth"]?.format("YYYY-MM-DD"),
          car_permit_data: values["car_permit_data"]?.format("YYYY-MM-DD"),
          car_permit_expire: values["car_permit_expire"]?.format("YYYY-MM-DD"),
        },
        headers: {
          "Content-Type": "application/json,multipart/form-data",
        },
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

  const onReset = () => {
    form.resetFields();

    setTimeout(() => {
      navigate("/admin/management/staff");
    }, 1000);
  };

  return (
    <Fragment>
      <Form
        form={form}
        className={"space-y-5"}
        onFinish={onFinish}
        layout={"vertical"}
      >
        <div className={"grid grid-cols-2 gap-5 px-5 max-[1000px]:grid-cols-1"}>
          <div className={"space-y-5"}>
            <Form.Item name={"status"} label={"Status"}>
              <CustomSelect
                placeholder={"Status"}
                className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={StatusSelect}
              />
            </Form.Item>

            <Form.Item name={"staff_type"} label={"Staff type"}>
              <CustomSelect
                placeholder={"Staff type"}
                className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Instructor",
                    label: "Instructor",
                  },
                  {
                    value: "Instructor / Teacher",
                    label: "Instructor/Teacher",
                  },
                  {
                    value: "Junior Admin",
                    label: "Junior Admin",
                  },
                  {
                    value: "Office Manager",
                    label: "Office Manager",
                  },
                  {
                    value: "Owner",
                    label: "Owner",
                  },
                  {
                    value: "Senior Admin",
                    label: "Senior Admin",
                  },
                  {
                    value: "Teacher",
                    label: "Teacher",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item name={"location"} label={"Location"}>
              <CustomSelect
                placeholder={"Select"}
                className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={Location}
              />
            </Form.Item>

            <Form.Item name={"vehicle"} label={"Vehicle assigned"}>
              <CustomSelect
                placeholder={"Select"}
                className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={Vehicle}
              />
            </Form.Item>

            <Form.Item name={"code"} label={"Staff code"}>
              <CustomInput
                classNames={"w-full"}
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
                placeholder={"Staff code"}
                fontSize="text-base"
              />
            </Form.Item>

            <Form.Item name={"mid_name"} label={"Middle Name"}>
              <CustomInput
                classNames={"w-full"}
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
                placeholder={"Address"}
                fontSize="text-base"
              />
            </Form.Item>

            <Form.Item name={"city"} label={"City"}>
              <CustomInput
                classNames={"w-full"}
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
              />
            </Form.Item>

            <Form.Item name={"zip"} label={"Zip"}>
              <CustomInput
                classNames={"w-full"}
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
                placeholder={"Email"}
                fontSize="text-base"
                type={"email"}
              />
            </Form.Item>

            <Form.Item name={"home_phone"} label={"Home Phone"}>
              <CustomInput
                classNames={"w-full h-[50px]"}
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
                placeholder={"Cell phone"}
                fontSize="text-base"
              />
            </Form.Item>

            <Form.Item name={"emergency_name"} label={"Emergency Contact Name"}>
              <CustomInput
                classNames={"w-full h-[50px]"}
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
                placeholder={"Emergency Contact Phone"}
                fontSize="text-base"
              />
            </Form.Item>
          </div>

          <div className={"space-y-5"}>
            <Form.Item
              label={"Date of birth"}
              rules={[
                {
                  required: true,
                  message: "Birth is empty",
                  type: "object",
                },
              ]}
              name={"birth"}
            >
              <DatePicker
                className={`h-[50px] w-full border border-[#667085] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                placeholder={"MM/DD/YYYY"}
              />
            </Form.Item>

            <Form.Item
              name={"permit_number"}
              label={"Instructor Permit Number"}
            >
              <CustomInput
                classNames={"w-full h-[50px]"}
                className={ManagementStyle["CheckModal__form-element__shadow"]}
                placeholder={"Instructor Permit Number"}
                fontSize="text-base"
              />
            </Form.Item>

            <Form.Item
              name={"car_permit_data"}
              label={"In Car Permit Issued Date"}
              rules={[
                {
                  type: "object",
                },
              ]}
            >
              <DatePicker
                className={`h-[50px] w-full border border-[#667085] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                placeholder={"MM/DD/YYYY"}
              />
            </Form.Item>

            <Form.Item
              name={"car_permit_expire"}
              label={"Permit Expiration Date"}
              rules={[
                {
                  type: "object",
                },
              ]}
            >
              <DatePicker
                className={`h-[50px] w-full border border-[#667085] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                placeholder={"MM/DD/YYYY"}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
                placeholder={"Password"}
                fontSize="text-base"
              />
            </Form.Item>

            <Form.Item valuePropName="checked" name={"assign_color"}>
              <CustomCheckBox className={"w-full"}>
                <span className={`text-sm`}>Assign Appointment Color</span>
              </CustomCheckBox>
            </Form.Item>

            <Form.Item name={"color"} label={"Appointment Color"}>
              <ColorPicker
                onChange={handleColor}
                defaultValue="#1677FF"
                size="large"
                showText
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
              name={"picture"}
            >
              <Upload
                action={import.meta.env.VITE_API_URL + "/media/files/student/"}
                listType="picture-card"
                maxCount={1}
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

let index = 0;

export const LocationModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data, isLoading } = useRequestGetQuery({
    path: "/configuration/zipcode/",
  });
  const [requestPost] = useRequestPostMutation();
  const navigate = useNavigate();
  const [AreaCoverage, setAreaCoverage] = useState([]);
  const [Coverage, setCoverage] = useState([]);
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });
  const [form] = Form.useForm();
  const [PickUps, setPickUps] = useState([]);
  const [PickUpName, setPickUpName] = useState("");
  const [Dropoffs, setDropoffs] = useState([]);
  const [DropoffName, setDropoffName] = useState("");
  const pickupInputRef = useRef(null);
  const dropoffInputRef = useRef(null);

  useEffect(() => {
    const zipcodeMock = [];
    for (let i = 0; i < data?.length; i++) {
      const item = data[i];
      zipcodeMock.push({
        ...item,
        key: item?.id,
        title: item?.zip_code,
      });
    }

    setCoverage(zipcodeMock);
  }, [data]);

  useEffect(() => {
    form.setFieldsValue({
      other: AreaCoverage,
    });
  }, [AreaCoverage?.length]);

  // func
  const onPickUpChange = (event) => {
    setPickUpName(event.target.value);
  };

  const AddPickUp = (e) => {
    e.preventDefault();
    setPickUps([...PickUps, PickUpName || `New item ${index++}`]);
    setPickUpName("");
    setTimeout(() => {
      pickupInputRef.current?.focus();
    }, 0);
  };

  const onDropoffChange = (event) => {
    setDropoffName(event.target.value);
  };

  const AddDropoff = (e) => {
    e.preventDefault();
    setDropoffs([...Dropoffs, DropoffName || `New item ${index++}`]);
    setDropoffName("");
    setTimeout(() => {
      dropoffInputRef.current?.focus();
    }, 0);
  };

  const handleColor = (_, value) => {
    form.setFieldsValue({
      color: value,
    });
  };

  const onFinish = async (values) => {
    try {
      const res = await requestPost({
        path: `/account_management/location/`,
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
      setIsOpen(true);
      console.error(error.message);
      dispatch({ type: "ERROR", setIsOpen });
    }
  };

  const onReset = () => {
    form.resetFields();

    setTimeout(() => {
      navigate("/admin/management/single-page/location");
    }, 1000);
  };

  return (
    <Fragment>
      <Form
        layout={"vertical"}
        onFinish={onFinish}
        form={form}
        initialValues={{
          other: [],
          location_note: "Hello",
          color: "#1677FF",
        }}
      >
        <div className={"grid grid-cols-2 gap-5 px-5 max-[1000px]:grid-cols-1"}>
          <div className="space-y-5">
            <Form.Item
              label={"Location name"}
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Please enter a location name.",
                },
              ]}
            >
              <CustomInput
                classNames={"w-full"}
                placeholder={"Location name"}
              />
            </Form.Item>

            <Form.Item
              label={"Location code"}
              name={"code"}
              rules={[
                {
                  required: true,
                  message: "Please enter a location code.",
                },
              ]}
            >
              <CustomInput
                classNames={"w-full"}
                placeholder={"Location code"}
              />
            </Form.Item>

            <Form.Item
              label={"Location status"}
              name={"status"}
              rules={[
                {
                  required: true,
                  message: "Please enter a location status.",
                },
              ]}
            >
              <CustomSelect
                placeholder={"Location Status"}
                className={`w-full h-[50px]`}
                options={StatusSelect}
              />
            </Form.Item>

            <Form.Item
              label={"Location Type"}
              name={"type"}
              rules={[
                {
                  required: true,
                  message: "Please enter a location type.",
                },
              ]}
            >
              <div className="grid grid-cols-3 gap-2.5 max-[1410px]:grid-cols-2">
                <CustomRadio
                  className={"space-x-2.5 "}
                  classNames={"inline-flex items-center gap-2.5"}
                  customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                  value={`Main office only`}
                  name={"type"}
                >
                  <span className={"text-sm flex-shrink-0 w-32"}>
                    Main office only
                  </span>
                </CustomRadio>

                <CustomRadio
                  className={"space-x-2.5 "}
                  classNames={"inline-flex items-center gap-2.5"}
                  customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                  value={`Main office with classroom`}
                  name={"type"}
                >
                  <span className={"text-sm flex-shrink-0 w-32"}>
                    Main office with classroom
                  </span>
                </CustomRadio>

                <CustomRadio
                  className={"space-x-2.5 "}
                  classNames={"inline-flex items-center gap-2.5"}
                  customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                  value={`Class Room`}
                  name={"type"}
                >
                  <span className={"text-sm flex-shrink-0 w-32"}>
                    Class Room
                  </span>
                </CustomRadio>

                <CustomRadio
                  className={"space-x-2.5 "}
                  classNames={"inline-flex items-center gap-2.5"}
                  customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                  value={`Other (Satellite Office Only)`}
                  name={"type"}
                >
                  <span className={"text-sm flex-shrink-0 w-32"}>
                    Other (Satellite Office Only)
                  </span>
                </CustomRadio>

                <CustomRadio
                  className={"space-x-2.5 "}
                  classNames={"inline-flex items-center gap-2.5"}
                  customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                  value={`Other Classroom (Satellite Office with Classroom)`}
                  name={"type"}
                >
                  <span className={"text-sm flex-shrink-0 w-32"}>
                    Other Classroom (Satellite Office with Classroom)
                  </span>
                </CustomRadio>

                <CustomRadio
                  className={"space-x-2.5 "}
                  classNames={"inline-flex items-center gap-2.5"}
                  customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                  value={`Range`}
                  name={"type"}
                >
                  <span className={"text-sm flex-shrink-0 w-32"}>Range</span>
                </CustomRadio>
              </div>
            </Form.Item>

            <Form.Item
              label={"Address"}
              name={"address"}
              rules={[
                {
                  required: true,
                  message: "Please enter a address.",
                },
              ]}
            >
              <CustomInput placeholder={"Address"} classNames={"w-full"} />
            </Form.Item>

            <Form.Item
              label={"City"}
              name={"city"}
              rules={[
                {
                  required: true,
                  message: "Please enter a city.",
                },
              ]}
            >
              <CustomInput placeholder={"City"} classNames={"w-full"} />
            </Form.Item>

            <Form.Item label={"State"} name={"state"}>
              <CustomSelect
                placeholder={"Location Status"}
                className={`w-full h-[50px]`}
                options={[{ values: "USA", label: "USA" }]}
              />
            </Form.Item>

            <Form.Item
              label={"Zip"}
              name={"zip"}
              rules={[
                {
                  required: true,
                  message: "Please enter a zip.",
                },
              ]}
            >
              <CustomInput placeholder={"Zip"} classNames={"w-full"} />
            </Form.Item>

            <Form.Item label={"Location manager"} name={"location_manager"}>
              <CustomInput
                placeholder={"Location manager"}
                classNames={"w-full"}
              />
            </Form.Item>

            <Form.Item label={"Pickup Location"} name={"pick_up"}>
              <ConfigProvider
                theme={{
                  token: {
                    colorBorder: "#667085",
                  },
                }}
              >
                <Select
                  style={{
                    width: "100%",
                  }}
                  className="h-[50px]"
                  placeholder="custom dropdown render"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: "8px 0",
                        }}
                      />
                      <Space
                        style={{
                          padding: "0 8px 4px",
                        }}
                      >
                        <Input
                          placeholder="Please enter item"
                          ref={pickupInputRef}
                          value={PickUpName}
                          onChange={onPickUpChange}
                          onKeyDown={(e) => e.stopPropagation()}
                        />
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={AddPickUp}
                        >
                          Add pickup
                        </Button>
                      </Space>
                    </>
                  )}
                  options={PickUps.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </ConfigProvider>
            </Form.Item>

            <Form.Item label={"Drop off location"} name={"drop_off"}>
              <ConfigProvider
                theme={{
                  token: {
                    colorBorder: "#667085",
                  },
                }}
              >
                <Select
                  style={{
                    width: "100%",
                  }}
                  className="h-[50px]"
                  placeholder="custom dropdown render"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: "8px 0",
                        }}
                      />
                      <Space
                        style={{
                          padding: "0 8px 4px",
                        }}
                      >
                        <Input
                          placeholder="Please enter item"
                          ref={dropoffInputRef}
                          value={DropoffName}
                          onChange={onDropoffChange}
                          onKeyDown={(e) => e.stopPropagation()}
                        />
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={AddDropoff}
                        >
                          Add Dropoff
                        </Button>
                      </Space>
                    </>
                  )}
                  options={Dropoffs.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </ConfigProvider>
            </Form.Item>

            <Form.Item label={"County"} name={"county"}>
              <CustomInput placeholder={"County"} classNames={"w-full"} />
            </Form.Item>
          </div>

          <div className="space-y-5">
            <Form.Item
              name={"road_test"}
              label={"Road Test"}
              valuePropName="checked"
            >
              <CustomCheckBox
                classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
              />
            </Form.Item>

            <Form.Item
              name={"knowledge_test"}
              label={"Knowledge Test"}
              valuePropName="checked"
            >
              <CustomCheckBox
                classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
              />
            </Form.Item>

            <Form.Item
              label={"Phone Main"}
              name={"phone_main"}
              rules={[
                {
                  required: true,
                  message: "Please enter a phone main.",
                },
              ]}
            >
              <CustomInput placeholder={"Phone Main"} classNames={"w-full"} />
            </Form.Item>

            <Form.Item label={"Fax"} name={"fax"}>
              <CustomInput placeholder={"Fax"} classNames={"w-full"} />
            </Form.Item>

            <Form.Item label={"Other"} name={"other"}>
              <CustomInput placeholder={"Other"} classNames={"w-full"} />
            </Form.Item>

            <Form.Item label={"Area Coverage"} name={"other"}>
              <CustomTransfer
                dataSource={Coverage}
                listHeight={200}
                setSelectedKeys={setAreaCoverage}
                selectedKeys={AreaCoverage}
                disabled={isLoading}
              />
            </Form.Item>

            <Form.Item label={"Location note"} name={"location_note"}>
              <MDEditor
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
              />
            </Form.Item>

            <Form.Item
              name={"has_color"}
              valuePropName="checked"
              label={"Appointment Color"}
            >
              <CustomCheckBox
                classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
              />
            </Form.Item>

            <Form.Item name={"color"} label={"Color picker"}>
              <ColorPicker
                defaultValue="#1677ff"
                size="large"
                showText
                onChange={handleColor}
              />
            </Form.Item>

            <Form.Item
              name={"has_distance_based_scheduling"}
              label={"Distance based scheduling"}
              valuePropName="checked"
            >
              <CustomCheckBox
                classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
              />
            </Form.Item>

            <Form.Item
              name={"distance_based_scheduling"}
              label={"Distance Coverage in Miles"}
            >
              <InputNumber
                className={"h-[50px] border-[#667085] w-full py-2.5"}
                placeholder={"Distance Coverage in Miles"}
              />
            </Form.Item>

            <Form.Item
              name={"provider_location_id"}
              label={"Provider Location Id"}
            >
              <CustomInput
                classNames={"h-[50px] w-full"}
                placeholder={"Provider Location Id"}
              />
            </Form.Item>
          </div>
        </div>

        <div className="text-center space-x-5 pt-10">
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

export const AddSchoolModalContent = () => {
  const [form] = Form.useForm();
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const [requestPost] = useRequestPostMutation();
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

  // func
  const onFinish = async (values) => {
    try {
      const res = await requestPost({
        path: `/account_management/schools/`,
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
      setIsOpen(true);
      console.error(error.message);
      dispatch({ type: "ERROR", setIsOpen });
    }
  };

  const onReset = () => {
    form.resetFields();
    setTimeout(() => {
      navigate("/admin/management/single-page/high school");
    }, 1000);
  };

  const handleStatus = (value) => {
    form.setFieldsValue({
      status: value,
    });
  };

  const handleState = (value) => {
    form.setFieldsValue({
      state: value,
    });
  };

  return (
    <Fragment>
      <Form form={form} onFinish={onFinish} layout={"vertical"}>
        <div className={"px-5 grid grid-cols-2 gap-5 max-[1000px]:grid-cols-1"}>
          <div className="space-y-5">
            <Form.Item
              name={"name"}
              label={"School Name"}
              rules={[
                {
                  required: true,
                  message: "Please enter a School name.",
                },
              ]}
            >
              <CustomInput classNames={"w-full"} placeholder={"School name"} />
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

            <Form.Item name={"code"} label={"School code"}>
              <InputNumber
                placeholder={"Code"}
                className={"border-[#667085] h-[50px] w-full py-2.5"}
              />
            </Form.Item>

            <Form.Item name={"address"} label={"Address"}>
              <CustomInput placeholder={"Address"} classNames={"w-full"} />
            </Form.Item>

            <Form.Item name={"state"} label={"State:"}>
              <CustomSelect
                placeholder={"Select state"}
                className={`w-full h-[50px]`}
                options={[
                  {
                    value: "USA",
                    label: "USA",
                  },
                ]}
                onChange={handleState}
              />
            </Form.Item>

            <Form.Item name={"zipcode"} label={"Zip code"}>
              <InputNumber
                placeholder={"Zip code"}
                className={"border-[#667085] h-[50px] w-full py-2.5"}
              />
            </Form.Item>

            <Form.Item
              name={"email"}
              label={"Email"}
              rules={[
                {
                  type: "email",
                  message: "Email is not a valid email",
                },
              ]}
            >
              <CustomInput
                type={"email"}
                placeholder={"Email"}
                classNames={"w-full"}
              />
            </Form.Item>
          </div>

          <Form.Item name={"note"} label={"School Note"}>
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    paddingInline: 10,
                    paddingBlock: 10,
                  },
                },
              }}
            >
              <Input.TextArea
                placeholder={"Notes"}
                className={"border-[#667085]"}
                showCount
                maxLength={3900}
              />
            </ConfigProvider>
          </Form.Item>
        </div>

        <div className="text-center space-x-5 pt-10">
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

export const HowHearModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const [requestPost] = useRequestPostMutation();
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });
  const [form] = Form.useForm();

  // func
  const onFinish = async (values) => {
    try {
      const response = await requestPost({
        path: "/account_management/how_did_you_hear_us/",
        data: {
          ...values,
          expiration: values["expiration"]?.format("YYYY-MM-DD"),
        },
      });

      if (response?.error?.status >= 400) {
        setIsOpen(true);
        dispatch({ type: "ERROR", setIsOpen });
      } else {
        setIsOpen(true);
        dispatch({ type: "SUCCESS", setIsOpen });
      }
    } catch (error) {
      setIsOpen(true);
      console.error(error?.message);
      dispatch({ type: "ERROR", setIsOpen });
    }
  };

  const onReset = () => {
    form.resetFields();

    setTimeout(() => {
      navigate("/admin/management/single-page/how did you hear");
    }, 1000);
  };

  const handleStatus = (value) => {
    form.setFieldsValue({
      status: value,
    });
  };

  return (
    <Fragment>
      <Form
        onFinish={onFinish}
        form={form}
        layout={"vertical"}
        initialValues={{ code: 0 }}
      >
        <div className={"grid grid-cols-2 gap-5 px-5 max-[1000px]:grid-cols-1"}>
          <div className="space-y-5">
            <Form.Item
              name={"name"}
              label={"Lead Name"}
              rules={[
                {
                  required: true,
                  message: "Lead name is empty",
                },
              ]}
            >
              <CustomInput classNames={"w-full"} placeholder={"Lead Name"} />
            </Form.Item>

            <Form.Item
              name={"status"}
              label={"Lead Status"}
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

            <Form.Item name={"code"} label={"Lead Code"}>
              <InputNumber
                placeholder={"Lead Code"}
                className="w-full h-[50px] border-[#667085] py-2.5"
              />
            </Form.Item>

            <Form.Item name={"expiration"} label={"Expiration"}>
              <DatePicker className={"w-full h-[50px] border-[#667085]"} />
            </Form.Item>
          </div>

          <Form.Item name={"notes"} label={"Notes"}>
            <Input.TextArea
              showCount
              maxLength={500}
              className={"border-[#667085]"}
              placeholder={"Notes"}
            />
          </Form.Item>
        </div>

        <div className="text-center space-x-5 pt-10">
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

export const VehiclesModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data: LocationData } = useRequestGetQuery({
    path: "/account_management/location/",
  });
  const [requestPost] = useRequestPostMutation();
  const navigate = useNavigate();
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });
  const [form] = Form.useForm();
  const [Location, setLocation] = useState([]);

  useEffect(() => {
    const location = [];

    for (let i = 0; i < LocationData?.length; i++) {
      const item = LocationData[i];

      location.push({
        ...item,
        value: item?.id,
        label: item?.name,
      });
    }

    setLocation(location);
  }, [LocationData]);

  // func
  const onFinish = async (values) => {
    try {
      console.log(values);

      const response = await requestPost({
        path: "/account_management/vehicle/",
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
      setIsOpen(true);
      console.error(error?.message);
      dispatch({ type: "ERROR", setIsOpen });
    }
  };

  const onReset = () => {
    form.resetFields();

    setTimeout(() => {
      navigate("/admin/management/single-page/vehicles");
    }, 1000);
  };

  const handleColor = (_, value) => {
    form.setFieldsValue({
      color: value,
    });
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  return (
    <Fragment>
      <Form form={form} onFinish={onFinish} layout={"vertical"}>
        <div className={"grid grid-cols-2 gap-5 px-5 max-[1000px]:grid-cols-1"}>
          <div className="space-y-5">
            <Form.Item
              name={"name"}
              label={"Vehicle Name"}
              rules={[
                {
                  required: true,
                  message: "Vehicle Name is empty",
                },
              ]}
            >
              <CustomInput classNames={"w-full"} placeholder={"Vehicle Name"} />
            </Form.Item>

            <Form.Item
              name={"status"}
              label={"Vehicle Status"}
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
              />
            </Form.Item>

            <Form.Item
              name={"location"}
              label={"At Location"}
              rules={[
                {
                  required: true,
                  message: "Please select Location",
                },
              ]}
            >
              <CustomSelect
                placeholder={"Select location"}
                className={`w-full h-[50px]`}
                options={Location}
              />
            </Form.Item>

            <Form.Item
              name={"type"}
              label={"Vehicle Type"}
              rules={[
                {
                  required: true,
                  message: "Please select Vehicle Type",
                },
              ]}
            >
              <CustomSelect
                placeholder={"Select Vehicle Type"}
                className={`w-full h-[50px]`}
                options={[
                  { value: "BUS", label: "BUS" },
                  { value: "CAR", label: "CAR" },
                  { value: "MOTORCYCLE", label: "MOTORCYCLE" },
                  { value: "SCHOOL BUS", label: "SCHOOL BUS" },
                  { value: "TANKER", label: "TANKER" },
                  { value: "TRUCK", label: "TRUCK" },
                  { value: "TRACTOR TRAILER", label: "TRACTOR TRAILER" },
                ]}
              />
            </Form.Item>

            <Form.Item
              name={"number"}
              label={"Vehicle No"}
              rules={[
                {
                  required: true,
                  message: "Please select Vehicle No",
                },
              ]}
            >
              <InputNumber
                className={"w-full border-[#667085] h-[50px] py-2.5"}
                placeholder={"Vehicle No"}
              />
            </Form.Item>

            <Form.Item
              name={"make"}
              label={"Vehicle Make"}
              rules={[
                {
                  required: true,
                  message: "Please select Vehicle Make",
                },
              ]}
            >
              <CustomInput placeholder={"Vehicle Make"} classNames={"w-full"} />
            </Form.Item>

            <Form.Item
              name={"plate"}
              label={"License Plate"}
              rules={[
                {
                  required: true,
                  message: "Please select License Plate",
                },
              ]}
            >
              <CustomInput
                placeholder={"License Plate"}
                classNames={"w-full"}
              />
            </Form.Item>

            <Form.Item name={"vin"} label={"VIN#"}>
              <CustomInput placeholder={"VIN#"} classNames={"w-full"} />
            </Form.Item>
          </div>

          <div className="space-y-5">
            <Form.Item name={"color"} label={"Appointment Color"}>
              <ColorPicker
                onChange={handleColor}
                defaultValue="#1677FF"
                size="large"
                showText
              />
            </Form.Item>

            <Form.Item
              name="has_color"
              valuePropName="checked"
              label={"Enable Appointment Color"}
              rules={[
                {
                  required: true,
                  message: "Enable Appointment Color is not selected",
                },
              ]}
            >
              <CustomCheckBox />
            </Form.Item>

            <Form.Item name="note" label={"Vehicle Note"}>
              <ConfigProvider
                theme={{
                  components: {
                    Input: {
                      paddingInline: 10,
                      paddingBlock: 10,
                    },
                  },
                }}
              >
                <Input.TextArea
                  showCount
                  maxLength={500}
                  className={"border-[#667085] py-2.5"}
                  placeholder={"Notes"}
                />
              </ConfigProvider>
            </Form.Item>

            <Form.Item
              name={"asr_esn_id"}
              label={"Vehicle ESN Or AIR ID"}
              rules={[
                {
                  required: true,
                  message: "Select ESN Or AIR ID",
                },
              ]}
            >
              <CustomSelect
                placeholder={"Select Vehicle ESN Or AIR ID"}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                className={`w-full h-[50px]`}
                options={[
                  { value: "BUS", label: "BUS" },
                  { value: "CAR", label: "CAR" },
                  { value: "MOTORCYCLE", label: "MOTORCYCLE" },
                  { value: "SCHOOL BUS", label: "SCHOOL BUS" },
                  { value: "TANKER", label: "TANKER" },
                  { value: "TRUCK", label: "TRUCK" },
                  { value: "TRACTOR TRAILER", label: "TRACTOR TRAILER" },
                ]}
              />
            </Form.Item>

            <Form.Item label={"Odometer Value"} name={"odometer"}>
              <InputNumber
                placeholder={"Odometer Value"}
                className={"h-[50px] w-full border-[#667085] py-2.5"}
              />
            </Form.Item>

            <Form.Item
              label={"Vehicle Initial Mileage"}
              name={"initial_mileage"}
            >
              <InputNumber
                placeholder={"Vehicle Initial Mileage"}
                className={"h-[50px] w-full border-[#667085] py-2.5"}
              />
            </Form.Item>

            <Form.Item
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              name={"image"}
            >
              <Upload
                action={import.meta.env.VITE_API_URL + "/media/files/student/"}
                listType="picture-card"
                maxCount={1}
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

        <div className="text-center space-x-5 pt-10">
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

export const CorporateTimeModalContent = () => {
  const [form] = Form.useForm();
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log({
      ...values,
      dates: values["dates"]?.format("YYYY-MM-DD"),
    });
  };

  const onReset = () => {
    form.resetFields();

    setTimeout(() => {
      navigate("/admin/scheduling/corporate");
    }, 1000);
  };

  return (
    <Fragment>
      <Form
        form={form}
        onFinish={onFinish}
        layout={"vertical"}
        className={"p-5"}
      >
        <Form.Item className={"mb-0"}>
          <CustomSelect
            placeholder={"Insert us standard holiday"}
            className={" max-w-96 h-[50px]"}
            options={[
              {
                value: 1,
                label: 1,
              },
            ]}
          />
        </Form.Item>

        <div className="grid grid-cols-2 pt-8 space-x-16">
          <div className="space-y-5">
            <Form.Item
              name={"name"}
              label={"Name"}
              rules={[
                {
                  required: true,
                  message: "Please input name",
                },
              ]}
            >
              <CustomInput classNames={"w-full"} placeholder={"Name"} />
            </Form.Item>

            <Form.Item
              name={"status"}
              label={"Status"}
              rules={[
                {
                  required: true,
                  message: "Please select status",
                },
              ]}
            >
              <CustomSelect
                className={"h-[50px]"}
                placeholder={"Select status"}
                options={[
                  { value: "ACTIVE", label: "ACTIVE" },
                  { value: "DELETED", label: "DELETED" },
                  { value: "PENDING", label: "PENDING" },
                ]}
              />
            </Form.Item>

            <Form.Item
              name={"code"}
              label={"Code"}
              rules={[
                {
                  required: true,
                  message: "Please input code",
                },
              ]}
            >
              <CustomInput classNames={"w-full"} placeholder={"Code"} />
            </Form.Item>

            <Form.Item
              name={"type"}
              label={"Type"}
              rules={[
                {
                  required: true,
                  message: "Please select type",
                },
              ]}
            >
              <CustomSelect
                className={"h-[50px]"}
                placeholder={"Select type"}
                options={[
                  { value: "Federal Holiday", label: "Federal Holiday" },
                  { value: "State Holiday", label: "State Holiday" },
                  { value: "Religious Holiday", label: "Religious Holiday" },
                  { value: "Corporate", label: "Corporate" },
                ]}
              />
            </Form.Item>

            <Form.Item
              name={"dates"}
              label={"Affected Date(s)"}
              rules={[
                {
                  required: true,
                  message: "Please select date(s)",
                },
              ]}
            >
              <DatePicker className={"w-full h-[50px] border-black"} />
            </Form.Item>
          </div>

          <div className="space-y-5">
            <Form.Item
              name={"all_day"}
              label={"All day"}
              rules={[
                {
                  required: true,
                  message: "Please choose",
                },
              ]}
            >
              <Switch checkedChildren={"Yes"} unCheckedChildren={"No"} />
            </Form.Item>

            <Form.Item
              name={"automatical"}
              label={"Automatically Assign to New Staff"}
              rules={[
                {
                  required: true,
                  message: "Please choose",
                },
              ]}
            >
              <Switch checkedChildren={"Yes"} unCheckedChildren={"No"} />
            </Form.Item>

            <Form.Item
              name={"apply"}
              label={"Apply to All Teaching Staff"}
              rules={[
                {
                  required: true,
                  message: "Please choose",
                },
              ]}
            >
              <Switch checkedChildren={"Yes"} unCheckedChildren={"No"} />
            </Form.Item>

            <Form.Item name={"note"} label={"Note"}>
              <Input.TextArea
                placeholder={"Notes"}
                className={"border-black"}
              />
            </Form.Item>
          </div>
        </div>

        <div className="text-center space-x-5 pt-10">
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
            onClick={onReset}
          >
            Cancel
          </ButtonComponent>
        </div>
      </Form>
    </Fragment>
  );
};
