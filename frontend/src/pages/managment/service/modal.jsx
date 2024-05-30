import {
  CustomCheckBox,
  CustomInput,
  CustomRadio,
  CustomSelect,
  CustomTransfer,
  SwitchCustom,
} from "@/components/form/index.jsx";
import { Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { AlertSuccess, AlertError } from "@/hooks/alert.jsx";
import { useFileReader } from "@/hooks/file-reader.jsx";
import { FormError } from "@/modules/errors.jsx";
import { ToNumber } from "@/modules/number.jsx";
import { ProductModalValidate } from "@/modules/product.jsx";
import TabItem from "@/pages/dashboard/items/tab-content.jsx";
import EnrollmentStyle from "@/pages/enrollment/enrollment.module.scss";
import {
  useRequestGetQuery,
  useRequestPostMutation,
} from "@/redux/query/index.jsx";
import MDEditor from "@uiw/react-md-editor";
import { ConfigProvider, DatePicker, Tabs } from "antd";
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

const mockData = [
  { key: "0", title: "Title 0", description: "Sample Description 0" },
  { key: "1", title: "Title 1", description: "Sample Description 1" },
  { key: "2", title: "Title 2", description: "Sample Description 2" },
  { key: "3", title: "Title 3", description: "Sample Description 3" },
  { key: "4", title: "Title 4", description: "Sample Description 4" },
  { key: "5", title: "Title 5", description: "Sample Description 5" },
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
  const [Status, setStatus] = useState("");
  const [Type, setType] = useState("");
  const [SubType, setSubType] = useState("");
  const [Selections, setSelections] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });
  // dep
  const selects = [Status, Type, SubType];
  const stateSelects = useMemo(() => {
    let state = false;
    for (let i = 0; i < selects.length; i++) {
      if (selects[i] === "") {
        state = true;
        break;
      }
    }

    return state;
  }, [Status, Type, SubType]);

  // func
  const handleStatus = (values) => setStatus(values);
  const handleType = (values) => setType(values);
  const handleSubType = (values) => setSubType(values);
  const handleSubmit = async (values) => {
    setSelections(stateSelects);
    if (!stateSelects) {
      try {
        const res = await requestPost({
          path: "/account_management/services/component/",
          data: {
            ...values,
            status: Status,
            type_component: Type,
            subtype_btw: SubType,
            location: 1,
          },
        });

        if (res?.error?.status >= 400) {
          dispatch({ type: "ERROR", setIsOpen });
          setIsOpen(true);
        } else {
          dispatch({ type: "SUCCESS", setIsOpen });
          setIsOpen(true);
        }

        // console.log(res);

        // dispatch({ type: "SUCCESS" });
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
          public_name: "",
        }}
        validate={(values) => ProductModalValidate(values)}
        onSubmit={handleSubmit}
      >
        {({ values, handleSubmit, errors, handleChange, handleReset }) => (
          <form
            className={classNames("space-y-5 px-5")}
            onSubmit={handleSubmit}
          >
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse items-center justify-center w-full gap-10"
              }
              className={classNames(
                ManagementStyle["CheckModal__form-element__shadow"],
                "w-[40%] text-base",
              )}
              type={"text"}
              spanText={"Component name"}
              placeholder={"Component name"}
              fontSize={"text-base"}
              spanClassName={`flex-shrink-0 w-44 text-right`}
              name={"name"}
              value={values.name}
              onChange={handleChange}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse items-center justify-center w-full gap-10"
              }
              className={classNames(
                ManagementStyle["CheckModal__form-element__shadow"],
                "w-[40%] text-base",
              )}
              type={"text"}
              spanText={"Item#/Code:"}
              placeholder={"Item#/Code"}
              fontSize={"text-base"}
              spanClassName={`flex-shrink-0 w-44 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
              name={"code"}
              value={values.code}
              onChange={handleChange}
            >
              {errors.code && (
                <FormError className={"pl-[40%]"}>{errors.code}</FormError>
              )}
            </CustomInput>

            <label className="inline-flex items-center justify-center gap-10 w-full">
              <span
                className={`text-base flex-shrink-0 w-44 text-right relative text-base ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Assign to Location
              </span>

              <CustomSelect
                placeholder={"Select status"}
                className={`w-[40%] h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                fontSize={"text-base"}
                options={StatusSelect}
                onChange={handleStatus}
                value={Status ? Status : undefined}
              />

              {Selections && (
                <FormError className={"pl-[40%]"}>Select Status:</FormError>
              )}
            </label>

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse items-center justify-center w-full gap-10"
              }
              className={classNames(
                ManagementStyle["CheckModal__form-element__shadow"],
                "w-[40%] text-base",
              )}
              type={"text"}
              spanText={"Public Name:"}
              placeholder={"Public Name"}
              fontSize={"text-base"}
              spanClassName={`flex-shrink-0 w-44 text-right`}
              value={values.paublic_name}
              name={"public_name"}
              onChange={handleChange}
            />
            <label className="inline-flex items-center justify-center gap-10 w-full">
              <span
                className={`text-base flex-shrink-0 w-44 text-right relative text-base ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Type:
              </span>

              <CustomSelect
                placeholder={"Select status"}
                className={`w-[40%] h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                fontSize={"text-base"}
                options={[
                  {
                    value: "BTW",
                    label: "BTW",
                  },
                  {
                    value: "CR",
                    label: "CR",
                  },
                  {
                    value: "WEB",
                    label: "WEB",
                  },
                ]}
                value={Type ? Type : undefined}
                onChange={handleType}
              />

              {Selections && (
                <FormError className={"pl-[40%]"}>Select Type</FormError>
              )}
            </label>
            <label className="inline-flex items-center justify-center gap-10 w-full">
              <span
                className={`text-base flex-shrink-0 w-44 text-right relative text-base ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Sub Type:
              </span>

              <CustomSelect
                placeholder={"Select status"}
                className={`w-[40%] h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                fontSize={"text-base"}
                options={[
                  { value: "ADULT BTW", label: "ADULT BTW" },
                  { value: "CORP BTW", label: "CORP BTW" },
                ]}
                value={SubType ? SubType : undefined}
                onChange={handleSubType}
              />

              {Selections && (
                <FormError className={"pl-[40%]"}>Select Subtype</FormError>
              )}
            </label>
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
                  setSubType("");
                  setType("");
                  setStatus("");
                  setTimeout(() => {
                    navigate("/management/service/product");
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

export const FeesModalContent = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });
  const { colorsObject } = useContext(ColorsContext);
  const [requestPost] = useRequestPostMutation();
  const navigate = useNavigate();
  const [Status, setStatus] = useState("");
  const [Selections, setSelections] = useState(false);
  const [NotesValue, setNotesValue] = useState("Hello");

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
  const handleStatus = (values) => setStatus(values);
  const handleSubmit = async (values) => {
    setSelections(stateSelects);
    if (!stateSelects) {
      try {
        const res = await requestPost({
          path: `/account_management/services/fee/`,
          data: { ...values, status: Status, notes: NotesValue },
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
          amount: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.amount) {
            errors.amount = "Input Free amount is empty";
          }

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleChange, handleSubmit, handleReset }) => (
          <form
            className={classNames("pb-5 grid gap-y-5")}
            onSubmit={handleSubmit}
          >
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse items-center justify-center w-full gap-10"
              }
              className={classNames(
                ManagementStyle["CheckModal__form-element__shadow"],
                "w-[40%] text-base",
              )}
              type={"text"}
              spanText={"Fee name"}
              placeholder={"Fee name"}
              fontSize={"text-base"}
              spanClassName={`flex-shrink-0 w-44 text-right`}
              onChange={handleChange}
              value={values.name}
              name={"name"}
            />

            <label className="inline-flex items-center justify-center gap-10 w-full">
              <span
                className={`text-base flex-shrink-0 w-44 text-right relative text-base ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Status:
              </span>

              <CustomSelect
                placeholder={"Select status"}
                className={`w-[40%] h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                fontSize={"text-base"}
                options={StatusSelect}
                onChange={handleStatus}
                value={Status ? Status : undefined}
              />

              {Selections && (
                <FormError className="pl-[40%]">Select Status</FormError>
              )}
            </label>

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse items-center justify-center w-full gap-10"
              }
              className={classNames(
                ManagementStyle["CheckModal__form-element__shadow"],
                "w-[40%] text-base",
              )}
              type={"number"}
              spanText={"Fee Amount:"}
              placeholder={"Fee Amount:"}
              fontSize={"text-base"}
              spanClassName={`flex-shrink-0 w-44 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
              name={"amount"}
              value={values.amount}
              onChange={handleChange}
            >
              {errors.amount && (
                <FormError className={"pl-[40%]"}>{errors.amount}</FormError>
              )}
            </CustomInput>

            <label className="inline-flex justify-center gap-10 items-center w-full">
              <span className="w-44 text-right">Notes</span>
              <div className="w-[40%]">
                <MDEditor
                  value={NotesValue}
                  onChange={(value) => setNotesValue(value)}
                  previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                  }}
                />
              </div>
            </label>

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
                    navigate("/management/service/fees");
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

export const DiscountModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });
  const [requestPost] = useRequestPostMutation();
  const navigate = useNavigate();
  const [Status, setStatus] = useState("");
  const [Selections, setSelections] = useState(false);
  const [EligibleService, setEligibleService] = useState([]);
  const [EligibleClass, setEligibleClass] = useState([]);
  const [EligibleClassLocation, setEligibleClassLocation] = useState([]);
  const [ExpirationDate, setExpirationDate] = useState(null);

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
  const onChange = (date) => {
    setExpirationDate(`${date["$y"]}-${date["$M"] + 1}-${date["$D"]}`);
  };

  const handleStatus = (value) => setStatus(value);

  const handleSubmit = async (values) => {
    setSelections(stateSelects);

    if (!stateSelects) {
      try {
        const res = await requestPost({
          path: "/account_management/services/discount/",
          data: {
            ...values,
            status: Status,
            expiration_data: ExpirationDate,
            services: ToNumber(EligibleService),
            classes: ToNumber(EligibleClass),
            locations: ToNumber(EligibleClassLocation),
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
          amount: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.code) {
            errors.code = "Input Discount code is empty";
          }
          if (!values.amount) {
            errors.amount = "Input Free Amount is empty";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleChange, handleSubmit, handleReset }) => (
          <form
            className={classNames("pb-5 grid gap-y-5")}
            onSubmit={handleSubmit}
          >
            <div className={`flex grid gap-y-5`}>
              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse items-center justify-center w-full gap-10"
                }
                className={classNames(
                  ManagementStyle["CheckModal__form-element__shadow"],
                  "w-[40%] text-base",
                )}
                type={"text"}
                spanText={"Discount name"}
                placeholder={"Discount name"}
                fontSize={"text-base"}
                spanClassName={`flex-shrink-0 w-44 text-right relative`}
                value={values.name}
                onChange={handleChange}
                name={"name"}
              />

              <label className="inline-flex items-center justify-center gap-10 w-full">
                <span
                  className={`text-base flex-shrink-0 w-44 text-right relative text-base ${EnrollmentStyle["Enrollment__heavy"]}`}
                >
                  Status:
                </span>

                <CustomSelect
                  placeholder={"Select status"}
                  className={`w-[40%] h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  fontSize={"text-base"}
                  options={StatusSelect}
                  value={Status ? Status : undefined}
                  onChange={handleStatus}
                />

                {Selections && (
                  <FormError className="pl-[40%]">Select Status</FormError>
                )}
              </label>

              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse items-center justify-center w-full gap-10"
                }
                className={classNames(
                  ManagementStyle["CheckModal__form-element__shadow"],
                  "w-[40%] text-base",
                )}
                type={"text"}
                spanText={"Discount code:"}
                placeholder={"Discount code"}
                fontSize={"text-base"}
                spanClassName={`flex-shrink-0 w-44 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                value={values.code}
                onChange={handleChange}
                name={"code"}
              >
                {errors.code && (
                  <FormError className={"pl-[40%]"}>{errors.code}</FormError>
                )}
              </CustomInput>

              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse items-center justify-center w-full gap-10"
                }
                className={classNames(
                  ManagementStyle["CheckModal__form-element__shadow"],
                  "w-[40%] text-base",
                )}
                type={"number"}
                spanText={"Fee Amount:"}
                placeholder={"Fee Amount"}
                fontSize={"text-base"}
                spanClassName={`flex-shrink-0 w-44 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                name={"amount"}
                value={values.amount}
                onChange={handleChange}
              >
                {errors.amount && (
                  <FormError className={"pl-[40%]"}>{errors.amount}</FormError>
                )}
              </CustomInput>
            </div>

            <div className={`space-y-10`}>
              <div className={`flex items-center justify-center space-x-12`}>
                <span
                  className={`text-base flex-shrink-0 w-44 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                >
                  Eligible Service
                </span>
                <CustomTransfer
                  dataSource={mockData}
                  listHeight={200}
                  colorBorder={colorsObject.primary}
                  setSelectedKeys={setEligibleService}
                  selectedKeys={EligibleService}
                />
              </div>

              <div className={`flex items-center justify-center space-x-12`}>
                <span className={`text-base flex-shrink-0 w-44 text-right`}>
                  Eligible Class(es):
                </span>
                <CustomTransfer
                  dataSource={mockData}
                  listHeight={200}
                  colorBorder={colorsObject.primary}
                  setSelectedKeys={setEligibleClass}
                  selectedKeys={EligibleClass}
                />
              </div>

              <div className={`flex items-center justify-center space-x-12`}>
                <span className={`text-base flex-shrink-0 w-44 text-right`}>
                  Eligible class Location:
                </span>
                <CustomTransfer
                  dataSource={mockData}
                  listHeight={200}
                  colorBorder={colorsObject.primary}
                  setSelectedKeys={setEligibleClassLocation}
                  selectedKeys={EligibleClassLocation}
                />
              </div>
            </div>

            <label className={"text-center space-x-7"}>
              <Text
                fontSize={"text-base"}
                fontWeightStrong={400}
                className={"w-44 text-right"}
              >
                Discount Expiration:
              </Text>
              <>
                <ConfigProvider
                  theme={{
                    token: {
                      colorBorder: "#667085",
                      controlHeight: 50,
                    },
                  }}
                >
                  <DatePicker
                    onChange={onChange}
                    fontSize={"text-base"}
                    className={`w-[40%] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  />
                </ConfigProvider>
              </>
            </label>

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
                  navigate("/management/service/discounts");
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

export const MiscellaneousModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const [Status, setStatus] = useState("");
  const [SubType, setSubType] = useState("");
  const [Selections, setSelections] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

  // dep
  const selects = [Status, SubType];
  const stateSelects = useMemo(() => {
    let state = false;
    for (let i = 0; i < selects.length; i++) {
      if (selects[i] === "") {
        state = true;
        break;
      }
    }

    return state;
  }, [Status, SubType]);

  // func
  const handleSubmit = (values) => {
    setSelections(stateSelects);

    if (!stateSelects) {
      try {
        console.log({ ...values, status: Status, subtype: SubType });
        dispatch({ type: "SUCCESS", setIsOpen });
        setIsOpen(true);
      } catch (error) {
        console.error(error?.message);
        dispatch({ type: "ERROR", setIsOpen });
        setIsOpen(true);
      }
    }
  };
  const handleStatus = (values) => setStatus(values);
  const handleSubType = (values) => setSubType(values);

  return (
    <Fragment>
      <Formik
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Name is required";
          }
          return errors;
        }}
        initialValues={{
          name: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, errors, handleChange, values, handleReset }) => (
          <form
            className={classNames("pb-5 grid gap-y-5")}
            onSubmit={handleSubmit}
          >
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse items-center justify-center w-full gap-10"
              }
              className={classNames(
                ManagementStyle["CheckModal__form-element__shadow"],
                "w-[40%] text-base",
              )}
              type={"text"}
              spanText={"Miscellaneous Item Name:"}
              placeholder={"Miscellaneous Item Name"}
              fontSize={"text-base"}
              spanClassName={`flex-shrink-0 w-44 text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
              name={"name"}
              value={values.name}
              onChange={handleChange}
            >
              {errors.name && (
                <FormError className={"pl-[40%]"}>{errors.name}</FormError>
              )}
            </CustomInput>

            <label className="inline-flex items-center justify-center gap-10 w-full">
              <span
                className={`text-base flex-shrink-0 w-44 text-right relative text-base ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Status:
              </span>

              <CustomSelect
                placeholder={"Select status"}
                className={`w-[40%] h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                fontSize={"text-base"}
                options={StatusSelect}
                value={Status ? Status : undefined}
                onChange={handleStatus}
              />

              {Selections && (
                <FormError className={"pl-[40%]"}>Select Status</FormError>
              )}
            </label>

            <label className="inline-flex items-center justify-center gap-10 w-full">
              <span
                className={`text-base flex-shrink-0 w-44 text-right relative text-base ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Type:
              </span>

              <CustomSelect
                placeholder={"Select Sub type"}
                className={`w-[40%] h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                fontSize={"text-base"}
                options={StatusSelect}
                value={SubType ? SubType : undefined}
                onChange={handleSubType}
              />
              {Selections && (
                <FormError className={"pl-[40%]"}>Select Sub Type</FormError>
              )}
            </label>

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
                    navigate("/management/service/miscellaneous");
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

export const AddServiceModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [requestPost] = useRequestPostMutation();
  const navigate = useNavigate();
  const [Selections, setSelections] = useState(false);
  const [Status, setStatus] = useState("");
  const [AssociateContract, setAssociateContract] = useState("");
  const [WebDescriptionValue, setWebDescriptionValue] = useState("Hello");
  const [EnrollmentContent, setEnrollmentContent] = useState("Hello");
  const [NotesValue, setNotesValue] = useState("Hello");
  const [AssignLocation, setAssignLocation] = useState([]);
  const [ServiceItems, setServiceItems] = useState([]);
  const [AddOnServices, setAddOnServices] = useState([]);
  const [Discount, setDiscount] = useState([]);
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
  const handleSubmit = async (values) => {
    setSelections(stateSelects);

    if (!stateSelects) {
      try {
        const res = await requestPost({
          path: "/account_management/services/service/",
          data: {
            ...values,
            status: Status,
            oe: AssociateContract,
            notes: NotesValue,
            web_description: WebDescriptionValue,
            enrolment_email: EnrollmentContent,
            add_ons: ToNumber(AddOnServices),
            discount: ToNumber(Discount),
            locations: ToNumber(AssignLocation),
            items: ToNumber(ServiceItems),
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
  const handleStatus = (values) => setStatus(values);
  const handleAssociateContract = (values) => setAssociateContract(values);

  return (
    <Fragment>
      <Formik
        initialValues={{
          name: "",
          code: "",
          taxable: false,
          price: "",
          web_name: "",
          purchase: false,
          portal_purchase: false,
        }}
        validate={(values) => {
          const errors = {};

          if (!values.name) {
            errors.name = "Input Service name is empty";
          }

          if (!values.code) {
            errors.code = "Input Service code is empty";
          }

          if (!values.price) {
            errors.price = "Input Price is empty";
          }

          if (!values.web_name) {
            errors.web_name = "Input Web name is empty";
          }

          console.log(values);

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleChange, handleSubmit, handleReset }) => (
          <form className={"space-y-5"} onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-x-10 px-5">
              <div className={"space-y-5"}>
                <CustomInput
                  placeholder={"Service Name"}
                  className={`text-gray-500 px-5 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  classNames={
                    "inline-flex items-center w-full h-[50px] justify-between gap-10 flex-row-reverse"
                  }
                  spanText={"Service Name:"}
                  spanClassName={`w-32 font-medium text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  name={"name"}
                  value={values.name}
                  onChange={handleChange}
                  fontSize="text-base"
                >
                  {errors.name && (
                    <FormError className={"pl-[170px]"}>
                      {errors.name}
                    </FormError>
                  )}
                </CustomInput>
                <CustomInput
                  placeholder={"Service Code"}
                  className={`text-gray-500 px-5 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  classNames={
                    "inline-flex items-center w-full h-[50px] justify-between gap-10 flex-row-reverse"
                  }
                  spanText={"Service Code:"}
                  spanClassName={`w-32 font-medium text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  name={"code"}
                  value={values.code}
                  onChange={handleChange}
                  fontSize="text-base"
                >
                  {errors.code && (
                    <FormError className={"pl-[170px]"}>
                      {errors.code}
                    </FormError>
                  )}
                </CustomInput>
                <label
                  className={`inline-flex justify-end gap-x-10 items-center w-full`}
                >
                  <span
                    className={`w-32 text-base font-medium text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Status:
                  </span>

                  <div className="w-full">
                    <CustomSelect
                      placeholder={"Select status"}
                      className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                      options={StatusSelect}
                      value={Status ? Status : undefined}
                      onChange={handleStatus}
                    />
                    {Selections && (
                      <FormError className={"pl-[170px]"}>
                        Select Status
                      </FormError>
                    )}
                  </div>
                </label>

                <div className={`space-y-5`}>
                  <div className={`flex items-center gap-10`}>
                    <span
                      className={`w-32 text-base font-medium  text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                    >
                      Assign Locations:
                    </span>
                    <div className={`flex flex-col gap-5 items-center`}>
                      <span className="text-base">Click to select</span>
                      <CustomTransfer
                        dataSource={mockData}
                        listHeight={200}
                        colorBorder={colorsObject.primary}
                        setSelectedKeys={setAssignLocation}
                        selectedKeys={AssignLocation}
                      />
                    </div>
                  </div>

                  <div className={`flex items-center gap-10`}>
                    <span
                      className={`w-32 text-base font-medium text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                    >
                      Service Items:
                    </span>
                    <div className={`flex flex-col gap-5 items-center`}>
                      <span className="text-base">Click to select</span>
                      <CustomTransfer
                        dataSource={mockData}
                        listHeight={200}
                        colorBorder={colorsObject.primary}
                        setSelectedKeys={setServiceItems}
                        selectedKeys={ServiceItems}
                      />
                    </div>
                  </div>
                </div>
                <CustomCheckBox
                  className={"gap-x-2.5 pl-[169px] text-base font-medium"}
                  name={"taxable"}
                  onChange={handleChange}
                >
                  Is Service Taxable
                </CustomCheckBox>
                <CustomInput
                  placeholder={"Service Price:"}
                  className={`text-gray-500 px-5 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  classNames={
                    "inline-flex items-center w-full h-[50px] justify-between gap-10 flex-row-reverse "
                  }
                  spanText={"Service Price:"}
                  spanClassName={`w-32 font-medium text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  name={"price"}
                  value={values.price}
                  onChange={handleChange}
                  fontSize="text-base"
                >
                  {errors.price && (
                    <FormError className={"pl-[170px]"}>
                      {errors.price}
                    </FormError>
                  )}
                </CustomInput>

                <CustomInput
                  placeholder={"Web Name:"}
                  className={`text-gray-500 px-5 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  classNames={
                    "inline-flex items-center w-full h-[50px] justify-between gap-10 flex-row-reverse"
                  }
                  spanText={"Web Name:"}
                  spanClassName={`w-32 font-medium text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  name={"web_name"}
                  value={values.web_name}
                  onChange={handleChange}
                  fontSize="text-base"
                >
                  {errors.web_name && (
                    <FormError className={"pl-[170px]"}>
                      {errors.web_name}
                    </FormError>
                  )}
                </CustomInput>

                <label className="inline-flex justify-end gap-10 items-center w-full">
                  <span className="text-base flex-shrink-0 font-medium w-32 text-right">
                    Web description
                  </span>
                  <div className="w-full">
                    <MDEditor
                      value={WebDescriptionValue}
                      onChange={(value) => setWebDescriptionValue(value)}
                      previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                      }}
                    />
                  </div>
                </label>

                <label className="inline-flex justify-end gap-10 items-center w-full">
                  <span className="text-base flex-shrink-0 font-medium w-32 text-right">
                    Enrollment Email Content
                  </span>
                  <div className="w-full">
                    <MDEditor
                      value={EnrollmentContent}
                      onChange={(value) => setEnrollmentContent(value)}
                      previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                      }}
                    />
                  </div>
                </label>
              </div>
              {/*------------*/}
              <div className={`space-y-5`}>
                <label className={"inline-flex items-center w-full gap-10"}>
                  <span
                    className={`w-36 text-base font-medium text-end flex-shrink-0 `}
                  >
                    Allow Web Purchase:
                  </span>
                  <CustomCheckBox name={"purchase"} onChange={handleChange} />
                </label>

                <label className={"inline-flex items-center w-full gap-10"}>
                  <span
                    className={`w-36 text-base font-medium text-end flex-shrink-0 `}
                  >
                    Allow Portal Purchase:
                  </span>

                  <CustomCheckBox
                    name={"portal_purchase"}
                    onChange={handleChange}
                  />
                </label>

                <div className={`space-y-5`}>
                  <div className={`flex items-center gap-10`}>
                    <span
                      className={`w-36 text-base font-medium text-end flex-shrink-0 `}
                    >
                      Add-On Services:
                    </span>
                    <div className={`flex flex-col gap-5 items-center`}>
                      <span className="text-base">Click to select</span>
                      <CustomTransfer
                        dataSource={mockData}
                        listHeight={200}
                        colorBorder={colorsObject.primary}
                        setSelectedKeys={setAddOnServices}
                        selectedKeys={AddOnServices}
                      />
                    </div>
                  </div>

                  <div className={`flex items-center gap-10`}>
                    <span
                      className={`w-36 text-base font-medium text-end flex-shrink-0`}
                    >
                      Eligible Discounts:
                    </span>
                    <div className={`flex flex-col gap-5 items-center`}>
                      <span className="text-base">Click to select</span>
                      <CustomTransfer
                        dataSource={mockData}
                        listHeight={200}
                        colorBorder={colorsObject.primary}
                        setSelectedKeys={setDiscount}
                        selectedKeys={Discount}
                      />
                    </div>
                  </div>
                </div>
                <label
                  className={`inline-flex items-center w-full justify-between gap-10`}
                >
                  <span
                    className={`w-36 text-base font-medium text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Associate Contract From OE:
                  </span>
                  <div className="w-full">
                    <CustomSelect
                      className={`w-full ${ManagementStyle["CheckModal__form-element__shadow"]} h-[50px]`}
                      placeholder={"Service Status"}
                      value={AssociateContract ? AssociateContract : undefined}
                      onChange={handleAssociateContract}
                      options={[
                        { value: "TEEN", label: "TEEN" },
                        { value: "ADULT", label: "ADULT" },
                        { value: "KNOWLEDGE", label: "KNOWLEDGE" },
                        { value: "ROAD TEST", label: "ROAD TEST" },
                      ]}
                    />
                    {Selections && (
                      <FormError className={"pl-[170px]"}>
                        Select Associate Contract From OE
                      </FormError>
                    )}
                  </div>
                </label>

                <label className="inline-flex justify-end gap-10 items-center w-full">
                  <span className="text-base font-medium flex-shrink-0 font-medium w-36 text-right">
                    Service Notes:
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
                    navigate("/management/service/packages");
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

export const FileCategoryModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [requestPost] = useRequestPostMutation();
  const { data } = useRequestGetQuery({
    path: "/account_management/services/service/",
  });
  const navigate = useNavigate();
  const [Status, setStatus] = useState("");
  const [DisplayStudentPortal, setDisplayStudentPortal] = useState(true);
  const [DisallowStudentPortal, setDisallowStudentPortal] = useState(false);
  const [UploadedStudentAccount, setUploadedStudentAccount] = useState(false);
  const [InstructorPortal, setInstructorPortal] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });
  const [NotesValue, setNotesValue] = useState("Hello");
  const [Packages, setPackages] = useState([]);

  // func
  const handleSubmit = async (values) => {
    try {
      const res = await requestPost({
        path: `/student_account/file_category/`,
        data: {
          ...values,
          status: Status,
          has_portal: DisplayStudentPortal,
          disallow_student_portal: DisallowStudentPortal,
          uploaded_student_account: UploadedStudentAccount,
          instructor_portal: InstructorPortal,
          note: NotesValue,
          package: ToNumber(Packages),
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
  const handleStatus = (values) => setStatus(values);
  const handleDisplayStudentPortal = (e) =>
    setDisplayStudentPortal(e.target.checked);
  const handleDisallowStudentPortal = (e) =>
    setDisallowStudentPortal(e.target.checked);
  const handleUploadedStudentAccount = (e) =>
    setUploadedStudentAccount(e.target.checked);
  const handleInstructorPortal = (e) => setInstructorPortal(e.target.checked);

  return (
    <Fragment>
      <Formik
        initialValues={{
          name: "",
          signature: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ handleReset, errors, handleChange, values, handleSubmit }) => (
          <form className="flex gap-5 flex-col px-5" onSubmit={handleSubmit}>
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse items-center justify-center w-full gap-10"
              }
              className={classNames(
                ManagementStyle["CheckModal__form-element__shadow"],
                "w-[40%] text-base",
              )}
              type={"text"}
              spanText={"Category name"}
              placeholder={"Category name"}
              fontSize={"text-base"}
              spanClassName={`flex-shrink-0 w-44 text-right font-semibold`}
              name={"name"}
              onChange={handleChange}
              value={values.name}
            >
              {errors.name && (
                <FormError className={"pl-48"}>{errors.name}</FormError>
              )}
            </CustomInput>

            <label className="inline-flex items-center justify-center gap-10 w-full">
              <span
                className={`text-base font-semibold flex-shrink-0 w-44 text-right text-base`}
              >
                File status
              </span>

              <CustomSelect
                placeholder={"Select"}
                className={`w-[40%] h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                fontSize={"text-base"}
                options={StatusSelect}
                onChange={handleStatus}
                value={Status ? Status : undefined}
              />
            </label>

            <div className="flex items-center justify-center gap-10 w-full">
              <span
                className={`text-base font-semibold flex-shrink-0 w-44 text-right text-base`}
              >
                Packages:
              </span>

              <CustomTransfer
                dataSource={mockData}
                listHeight={200}
                colorBorder={colorsObject.primary}
                setSelectedKeys={setPackages}
                selectedKeys={Packages}
              />
            </div>

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse items-center justify-center w-full gap-10"
              }
              className={classNames(
                ManagementStyle["CheckModal__form-element__shadow"],
                "w-[40%] text-base",
              )}
              type={"text"}
              spanText={"Signature link:"}
              placeholder={"Signature"}
              fontSize={"text-base"}
              spanClassName={`flex-shrink-0 w-44 text-right font-semibold`}
              name={"signature"}
              onChange={handleChange}
              value={values.signature}
            />

            <label className="inline-flex items-center justify-center gap-10 w-full">
              <span
                className={`text-base font-semibold flex-shrink-0 w-44 text-right text-base`}
              >
                Note:
              </span>

              <div className={"max-w-[600px] w-full"}>
                <div className="w-full">
                  <MDEditor
                    value={NotesValue}
                    onChange={(value) => setNotesValue(value)}
                    previewOptions={{
                      rehypePlugins: [[rehypeSanitize]],
                    }}
                  />
                </div>
              </div>
            </label>

            <div className={"grid grid-cols-2 gap-5 pt-8"}>
              <div className="space-y-5">
                <label
                  className={
                    "inline-flex w-full justify-end items-center gap-6"
                  }
                >
                  <span
                    className={"font-semibold text-end flex-shrink-0 text-base"}
                  >
                    Display on Student Portal:
                  </span>
                  <SwitchCustom
                    checked={DisplayStudentPortal}
                    onChange={handleDisplayStudentPortal}
                  />
                </label>

                <label
                  className={
                    "inline-flex w-full justify-end items-center gap-6"
                  }
                >
                  <span
                    className={
                      "font-semibold text-end w-72 flex-shrink-0 text-base"
                    }
                  >
                    Disallow files associated with category from displaying on
                    Student Portal:
                  </span>
                  <SwitchCustom
                    checked={DisallowStudentPortal}
                    onChange={handleDisallowStudentPortal}
                  />
                </label>
              </div>

              <div className="space-y-5">
                <label
                  className={
                    "inline-flex w-full justify-start items-center gap-6"
                  }
                >
                  <span
                    className={"font-semibold text-end flex-shrink-0 text-base"}
                  >
                    Must Be Uploaded to Student Account:
                  </span>
                  <SwitchCustom
                    checked={UploadedStudentAccount}
                    onChange={handleUploadedStudentAccount}
                  />
                </label>

                <label
                  className={
                    "inline-flex w-full justify-start items-center gap-6"
                  }
                >
                  <span
                    className={
                      "font-semibold text-end w-80 flex-shrink-0 text-base"
                    }
                  >
                    Disallow files associated with this category from displaying
                    on Instructor/Teacher Portal:
                  </span>
                  <SwitchCustom
                    checked={InstructorPortal}
                    onChange={handleInstructorPortal}
                  />
                </label>
              </div>
            </div>

            <div className="text-center space-x-5">
              <ButtonComponent
                type={"submit"}
                defaultBg={colorsObject.success}
                defaultHoverBg={colorsObject.successHover}
                defaultColor={colorsObject.main}
                defaultHoverColor={colorsObject.main}
                borderRadius={5}
                paddingInline={44}
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
                    navigate("/management/file/");
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

export const AddStaffModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { FileReaderResult, ResultFile } = useFileReader();
  const navigate = useNavigate();
  const [Status, setStatus] = useState("");
  const [StaffType, setStaffType] = useState("");
  const [Location, setLocation] = useState("");
  const [State, setState] = useState("");
  const [Vehicle, setVehicle] = useState("");
  const [DOB, setDOB] = useState("");
  const [PermitIssueDate, setPermitIssueDate] = useState("");
  const [PermitExpirationDate, setPermitExpirationDate] = useState("");
  const [requestPost] = useRequestPostMutation();
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

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

  const handleStatus = (value) => setStatus(value);
  const handleStaffType = (value) => setStaffType(value);
  const handleLocation = (value) => setLocation(value);
  const handleVehicle = (value) => setVehicle(value);
  const handleState = (value) => setState(value);

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
          <form className={"space-y-5"} onSubmit={handleSubmit}>
            <div className={"grid grid-cols-2 gap-5 px-5"}>
              <div className={"space-y-5"}>
                <label className="inline-flex gap-5 items-center w-full">
                  <span className="text-base flex-shrink-0 font-medium w-56 text-right">
                    Status
                  </span>

                  <CustomSelect
                    placeholder={"Status"}
                    colorBorder={colorsObject.primary}
                    className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    options={StatusSelect}
                    onChange={handleStatus}
                    value={Status ? Status : undefined}
                  />
                </label>

                <label className="inline-flex gap-5 items-center w-full">
                  <span className="text-base flex-shrink-0 font-medium w-56 text-right">
                    Staff type
                  </span>

                  <CustomSelect
                    placeholder={"Select"}
                    colorBorder={colorsObject.primary}
                    className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    options={[
                      {
                        value: "Instructor",
                        label: "Instructor",
                      },
                    ]}
                    onChange={handleStaffType}
                    value={StaffType ? StaffType : undefined}
                  />
                </label>

                <label className="inline-flex gap-5 items-center w-full">
                  <span className="text-base flex-shrink-0 font-medium w-56 text-right">
                    Location
                  </span>

                  <CustomSelect
                    placeholder={"Select"}
                    colorBorder={colorsObject.primary}
                    className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    options={[
                      {
                        value: 1,
                        label: "USA",
                      },
                    ]}
                    onChange={handleLocation}
                    value={Location ? Location : undefined}
                  />
                </label>

                <label className="inline-flex gap-5 items-center w-full">
                  <span className="text-base font-medium w-56 flex-shrink-0 text-right">
                    Vehicle assigned
                  </span>

                  <CustomSelect
                    placeholder={"Select"}
                    colorBorder={colorsObject.primary}
                    className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    options={[
                      {
                        value: 1,
                        label: "Car",
                      },
                      {
                        value: 2,
                        label: "Car",
                      },
                    ]}
                    onChange={handleVehicle}
                    value={Vehicle ? Vehicle : undefined}
                  />
                </label>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Staff code"}
                  placeholder={"Staff code"}
                  spanClassName={"font-medium w-56 flex-shrink-0 text-right"}
                  fontSize="text-base"
                  colorBorder={colorsObject.primary}
                  name={"code"}
                  onChange={handleChange}
                  value={values.code}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-9 items-center w-full h-[50px]"
                  }
                  fontSize="text-base"
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"First name"}
                  placeholder={"First name"}
                  spanClassName={`font-medium w-52 flex-shrink-0 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  colorBorder={colorsObject.primary}
                  name={"first_name"}
                  onChange={handleChange}
                  value={values.first_name}
                >
                  {errors.first_name && (
                    <FormError className="pl-[245px]">
                      {errors.first_name}
                    </FormError>
                  )}
                </CustomInput>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
                  }
                  fontSize="text-base"
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Middle name"}
                  placeholder={"Middle name"}
                  spanClassName={"font-medium w-56 flex-shrink-0 text-right"}
                  colorBorder={colorsObject.primary}
                  value={values.mid_name}
                  name={"mid_name"}
                  onChange={handleChange}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Last name"}
                  placeholder={"Last name"}
                  spanClassName={"font-medium w-56 flex-shrink-0 text-right"}
                  fontSize="text-base"
                  colorBorder={colorsObject.primary}
                  name={"last_name"}
                  value={values.last_name}
                  onChange={handleChange}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
                  }
                  fontSize="text-base"
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Address"}
                  placeholder={"Address"}
                  spanClassName={"font-medium w-56 flex-shrink-0 text-right"}
                  colorBorder={colorsObject.primary}
                  name={"address"}
                  onChange={handleChange}
                  value={values.address}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"City"}
                  placeholder={"City"}
                  spanClassName={"font-medium w-56 flex-shrink-0 text-right"}
                  fontSize="text-base"
                  colorBorder={colorsObject.primary}
                  name={"city"}
                  onChange={handleChange}
                  value={values.city}
                />

                <label className="inline-flex gap-5 items-center w-full">
                  <span className="text-base flex-shrink-0 font-medium w-56 text-right">
                    State
                  </span>
                  <CustomSelect
                    placeholder={"Select"}
                    colorBorder={colorsObject.primary}
                    className={`w-full h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    options={[
                      {
                        value: "USA",
                        label: "USA",
                      },
                    ]}
                    value={State ? State : undefined}
                    onChange={handleState}
                  />
                </label>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Zip"}
                  placeholder={"Zip"}
                  spanClassName={"font-medium w-56 flex-shrink-0 text-right"}
                  fontSize="text-base"
                  colorBorder={colorsObject.primary}
                  name={"zip"}
                  onChange={handleChange}
                  value={values.zip}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  type={"email"}
                  spanText={"Email"}
                  placeholder={"Email"}
                  spanClassName={"font-medium w-56 flex-shrink-0 text-right"}
                  fontSize="text-base"
                  colorBorder={colorsObject.primary}
                  name={"email"}
                  onChange={handleChange}
                  value={values.email}
                >
                  {errors.email && (
                    <FormError className="pl-[245px]">{errors.email}</FormError>
                  )}
                </CustomInput>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Home phone"}
                  placeholder={"Home phone"}
                  spanClassName={"font-medium w-56 flex-shrink-0 text-right"}
                  fontSize="text-base"
                  colorBorder={colorsObject.primary}
                  name={"home_phone"}
                  onChange={handleChange}
                  value={values.home_phone}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Cell phone"}
                  placeholder={"Cell phone"}
                  spanClassName={"font-medium w-56 flex-shrink-0 text-right"}
                  fontSize="text-base"
                  colorBorder={colorsObject.primary}
                  name={"cell_phone"}
                  value={values.cell_phone}
                  onChange={handleChange}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Emergency Contact Name"}
                  placeholder={"Emergency Contact Name"}
                  spanClassName={"font-medium w-56 flex-shrink-0 text-right"}
                  fontSize="text-base"
                  colorBorder={colorsObject.primary}
                  name={"emergency_name"}
                  onChange={handleChange}
                  value={values.emergency_name}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Emergency Contact Name"}
                  placeholder={"Emergency Contact Name"}
                  spanClassName={"font-medium w-56 flex-shrink-0 text-right"}
                  fontSize="text-base"
                  colorBorder={colorsObject.primary}
                  name={"emergency_relation"}
                  onChange={handleChange}
                  value={values.emergency_relation}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Emergency Contact Phone"}
                  placeholder={"Emergency Contact Phone"}
                  spanClassName={"font-medium w-56 flex-shrink-0 text-right"}
                  fontSize="text-base"
                  colorBorder={colorsObject.primary}
                  name={"emergency_phone"}
                  value={values.emergency_phone}
                  onChange={handleChange}
                />
              </div>
              <div className={"space-y-5"}>
                <label className="inline-flex gap-5 items-center w-full">
                  <span className="w-60 text-base font-medium text-end flex-shrink-0">
                    DOB
                  </span>
                  <DatePicker
                    className={`h-[50px] flex-grow border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    placeholder={"MM/DD/YYYY"}
                    onChange={(day) =>
                      setDOB(`${day["$y"]}-${day["$M"] + 1}-${day["$D"]}`)
                    }
                  />
                </label>

                <CustomInput
                  placeholder={"Instructor Permit  Number"}
                  className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  classNames={
                    "inline-flex items-center w-full justify-between gap-10 flex-row-reverse h-[50px]"
                  }
                  fontSize="text-base"
                  spanText={"Instructor Permit Number"}
                  spanClassName={`w-56 font-medium text-end flex-shrink-0`}
                  name={"permit_number"}
                  value={values.permit_number}
                  onChange={handleChange}
                />

                <label className="inline-flex gap-5 items-center w-full">
                  <span className="w-60 text-base font-medium text-end flex-shrink-0">
                    In Car Permit Issued Date
                  </span>
                  <DatePicker
                    className={`h-[50px] flex-grow border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    placeholder={"MM/DD/YYYY"}
                    onChange={(day) =>
                      setPermitIssueDate(
                        `${day["$y"]}-${day["$M"] + 1}-${day["$D"]}`,
                      )
                    }
                  />
                </label>

                <label className="inline-flex gap-5 items-center w-full">
                  <span className="w-60 text-base font-medium text-end flex-shrink-0">
                    Permit Expiration Date
                  </span>
                  <DatePicker
                    className={`h-[50px] flex-grow border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    placeholder={"MM/DD/YYYY"}
                    onChange={(day) =>
                      setPermitExpirationDate(
                        `${day["$y"]}-${day["$M"] + 1}-${day["$D"]}`,
                      )
                    }
                  />
                </label>

                <CustomInput
                  placeholder={"Select"}
                  className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  classNames={
                    "inline-flex items-center w-full justify-between gap-10 flex-row-reverse h-[50px]"
                  }
                  spanText={"User name"}
                  spanClassName={`w-56 font-medium text-end flex-shrink-0`}
                  fontSize="text-base"
                  name={"username"}
                  value={values.username}
                  onChange={handleChange}
                />

                <CustomInput
                  placeholder={"Password"}
                  className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  classNames={
                    "inline-flex items-center w-full justify-between gap-10 flex-row-reverse h-[50px]"
                  }
                  fontSize="text-base"
                  spanText={"Password"}
                  spanClassName={`w-56 font-medium text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]} `}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                >
                  {errors.password && (
                    <FormError className="pl-[265px]">
                      {errors.password}
                    </FormError>
                  )}
                </CustomInput>

                <CustomInput
                  placeholder={"Re Enter Password *"}
                  className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  classNames={
                    "inline-flex items-center w-full justify-between gap-10 flex-row-reverse h-[50px]"
                  }
                  fontSize="text-base"
                  spanText={"Re Enter Password"}
                  spanClassName={`w-56 text-end font-medium flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]} `}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                >
                  {errors.password && (
                    <FormError className="pl-[265px]">
                      {errors.password}
                    </FormError>
                  )}
                </CustomInput>

                <CustomCheckBox
                  className={"w-full flex justify-center pl-7"}
                  name={"assign_color"}
                  onChange={handleChange}
                >
                  <span className={`font-medium text-base`}>
                    Assign Appointment Color
                  </span>
                </CustomCheckBox>

                <CustomInput
                  type={"color"}
                  placeholder={"#FFFFFF"}
                  className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  classNames={
                    "inline-flex items-center w-full justify-between gap-10 flex-row-reverse h-[50px]"
                  }
                  fontSize="text-base"
                  spanText={"Appointment Color"}
                  spanClassName={`w-56 text-end font-medium flex-shrink-0`}
                  name={"color"}
                  onChange={handleChange}
                  value={values.color}
                />

                <CustomInput
                  placeholder={"Zoom PMI"}
                  className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  classNames={
                    "inline-flex items-center w-full justify-between gap-10 flex-row-reverse h-[50px]"
                  }
                  fontSize="text-base"
                  spanText={"Zoom PMI"}
                  spanClassName={`w-56 text-end font-medium flex-shrink-0`}
                  name={"zoom"}
                  onChange={handleChange}
                  value={values.zoom}
                />

                <label className="inline-flex gap-10 items-center w-full">
                  <span className="text-sm flex-shrink-0 font-medium w-56 text-right">
                    Staff Profile Picture
                  </span>

                  <FileReaderResult
                    className={"overflow-hidden w-60 h-60"}
                    onChange={() => setFieldValue("picture", ResultFile)}
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
                    navigate("/management/staff");
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
                    colorBorder={colorsObject.primary}
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
                    classNames={`w-full h-[50px] rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                  colorBorder={colorsObject.primary}
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
                      colorBorder={colorsObject.primary}
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
                  colorBorder={colorsObject.primary}
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
                  colorBorder={colorsObject.primary}
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
                  colorBorder={colorsObject.primary}
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
                    colorBorder={colorsObject.primary}
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
                  colorBorder={colorsObject.primary}
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
                  colorBorder={colorsObject.primary}
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
                      colorBorder={colorsObject.primary}
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
                  colorBorder={colorsObject.primary}
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
                    className={`w-full border border-indigo-600 h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
              titleFontSize: 16,
              inkBarColor: "transparent",
            },
          },
        }}
      >
        <Tabs defaultActiveKey="1" items={TabItem()} />
      </ConfigProvider>
    </Fragment>
  );
};
