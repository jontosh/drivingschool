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
import { AlertSuccess, AlertError, AlertDelete } from "@/hooks/alert.jsx";
import { useFileReader } from "@/hooks/file-reader.jsx";
import { FormError } from "@/modules/errors.jsx";
import { ToNumber } from "@/modules/number.jsx";
import { ProductModalValidate } from "@/modules/product.jsx";
import EnrollmentStyle from "@/pages/enrollment/enrollment.module.scss";
import { useRequestPostMutation } from "@/redux/query/index.jsx";
import MDEditor from "@uiw/react-md-editor";
import { ConfigProvider, DatePicker, message } from "antd";
import classNames from "classnames";
import { Formik } from "formik";
import { Fragment, useContext, useMemo, useReducer, useState } from "react";
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
  { key: "6", title: "Title 0", description: "Sample Description 0" },
  { key: "7", title: "Title 1", description: "Sample Description 1" },
  { key: "8", title: "Title 2", description: "Sample Description 2" },
  { key: "9", title: "Title 3", description: "Sample Description 3" },
  { key: "10", title: "Title 4", description: "Sample Description 4" },
  { key: "11", title: "Title 5", description: "Sample Description 5" },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS": {
      return {
        ...state,
        status: <AlertSuccess />,
      };
    }
    case "ERROR": {
      return {
        ...state,
        status: <AlertError />,
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
  const [state, dispatch] = useReducer(reducer, { status: false });
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

        if (res.error.status >= 400) {
          dispatch({ type: "ERROR" });
        } else {
          dispatch({ type: "SUCCESS" });
        }

        // dispatch({ type: "SUCCESS" });
      } catch (error) {
        console.error(error.message);
        dispatch({ type: "ERROR" });
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
                "inline-flex gap-x-10 items-center justify-center flex-row-reverse gap-5 h-[50px] w-full"
              }
              spanText={"Component name"}
              placeholder={"Component name"}
              className={`w-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              spanClassName={`w-40 text-right`}
              fontSize="text-base"
              colorBorder={colorsObject.primary}
              name={"name"}
              value={values.name}
              onChange={handleChange}
            />

            <CustomInput
              classNames={
                "inline-flex gap-x-10 items-center justify-center flex-row-reverse gap-5 h-[50px] w-full"
              }
              spanText={"Item#/Code:"}
              placeholder={"Item#/Code"}
              className={`w-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              spanClassName={`w-40 text-right relative flex-shrink-0 after:left-10 ${EnrollmentStyle["Enrollment__heavy"]}`}
              fontSize="text-base"
              colorBorder={colorsObject.primary}
              name={"code"}
              value={values.code}
              onChange={handleChange}
            >
              {errors.code && (
                <FormError className={"pl-[48.8%]"}>{errors.code}</FormError>
              )}
            </CustomInput>

            <label
              className={`inline-flex items-center gap-10 w-full justify-center`}
            >
              <span
                className={`w-40 text-right after:left-24 relative text-base ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Status:
              </span>

              <div className={"flex-shrink-0"}>
                <CustomSelect
                  placeholder={"Select status"}
                  className={`w-[240px] h-[50px] text-base rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  options={StatusSelect}
                  colorBorder={colorsObject.primary}
                  onChange={handleStatus}
                  value={Status ? Status : undefined}
                />

                {Selections && (
                  <FormError className={"pl-[48.8%]"}>Select Status:</FormError>
                )}
              </div>
            </label>
            <CustomInput
              classNames={
                "inline-flex gap-x-10 items-center justify-center flex-row-reverse gap-5 h-[50px] w-full"
              }
              spanText={"Public Name:"}
              placeholder={"Public Name"}
              className={`w-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              spanClassName={`w-40 text-right`}
              fontSize="text-base"
              colorBorder={colorsObject.primary}
              value={values.paublic_name}
              name={"public_name"}
              onChange={handleChange}
            />
            <label
              className={`inline-flex items-center gap-10 w-full justify-center`}
            >
              <span
                className={`w-40 text-right after:left-24 relative text-base ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Type:
              </span>

              <div className={"flex-shrink-0"}>
                <CustomSelect
                  placeholder={"Select status"}
                  className={`w-[240px] h-[50px] text-base rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                  colorBorder={colorsObject.primary}
                  value={Type ? Type : undefined}
                  onChange={handleType}
                />

                {Selections && (
                  <FormError className={"pl-[48.8%]"}>Select Type</FormError>
                )}
              </div>
            </label>
            <label
              className={`inline-flex items-center gap-10 w-full justify-center`}
            >
              <span
                className={`w-40 text-right after:left-16 relative text-base ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Sub Type:
              </span>

              <div className={"flex-shrink-0"}>
                <CustomSelect
                  placeholder={"Select status"}
                  className={`w-[240px] h-[50px] text-base rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  options={[
                    { value: "ADULT BTW", label: "ADULT BTW" },
                    { value: "CORP BTW", label: "CORP BTW" },
                  ]}
                  colorBorder={colorsObject.primary}
                  value={SubType ? SubType : undefined}
                  onChange={handleSubType}
                />

                {Selections && (
                  <FormError className={"pl-[48.8%]"}>Select Subtype</FormError>
                )}
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
      {state.status}
    </Fragment>
  );
};

export const FeesModalContent = () => {
  const [state, dispatch] = useReducer(reducer, { status: false });
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

        if (res.error.status >= 400) {
          dispatch({ type: "ERROR" });
        } else {
          dispatch({ type: "SUCCESS" });
        }
      } catch (error) {
        console.error(error.message);
        dispatch({ type: "ERROR" });
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
            className={classNames("pb-5 grid gap-y-5 justify-center")}
            onSubmit={handleSubmit}
          >
            <CustomInput
              classNames={
                "inline-flex gap-x-10 items-center flex-row-reverse justify-center gap-5 h-[50px] pl-5"
              }
              spanText={"Fee name"}
              placeholder={"Fee name"}
              fontSize="text-base"
              className={`w-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              spanClassName={`text-right`}
              colorBorder={colorsObject.primary}
              onChange={handleChange}
              value={values.name}
              name={"name"}
            />

            <label
              className={`inline-flex items-center gap-10 w-full justify-center pl-1`}
            >
              <span
                className={`w-24 text-right after:left-16 relative text-base ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Status:
              </span>

              <div className="flex-shrink-0">
                <CustomSelect
                  placeholder={"Select status"}
                  className={`w-60 h-[50px] text-base ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  options={StatusSelect}
                  colorBorder={colorsObject.primary}
                  onChange={handleStatus}
                  value={Status ? Status : undefined}
                />
                {Selections && (
                  <FormError className="pl-[42%]">Select Status</FormError>
                )}
              </div>
            </label>

            <CustomInput
              classNames={
                "inline-flex gap-x-10 items-center flex-row-reverse justify-center gap-5 h-[50px]"
              }
              spanText={"Fee Amount:"}
              placeholder={"Fee Amount:"}
              className={`w-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              fontSize="text-base"
              spanClassName={`relative ${EnrollmentStyle["Enrollment__heavy"]}`}
              colorBorder={colorsObject.primary}
              name={"amount"}
              value={values.amount}
              onChange={handleChange}
              type={"number"}
            >
              {errors.amount && (
                <FormError className={"pl-[42%]"}>{errors.amount}</FormError>
              )}
            </CustomInput>

            <label className="inline-flex justify-end gap-8 items-center w-full">
              <span className="max-w-46">Notes</span>
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
      {state.status}
    </Fragment>
  );
};

export const DiscountModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [state, dispatch] = useReducer(reducer, { status: false });
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

        if (res.error.status >= 400) {
          dispatch({ type: "ERROR" });
        } else {
          dispatch({ type: "SUCCESS" });
        }

        // dispatch({ type: "SUCCESS" });
      } catch (error) {
        console.error(error.message);
        dispatch({ type: "ERROR" });
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
            className={classNames("pb-5 grid gap-y-5 justify-center")}
            onSubmit={handleSubmit}
          >
            <div className={`flex grid gap-y-5 justify-center`}>
              <CustomInput
                classNames={
                  "inline-flex gap-x-7 items-center flex-row-reverse h-[50px]"
                }
                spanText={"Discount name"}
                placeholder={"Discount name"}
                className={"w-60"}
                fontSize="text-base"
                spanClassName={`max-w-46`}
                colorBorder={colorsObject.primary}
                value={values.name}
                onChange={handleChange}
                name={"name"}
              />

              <label className={`inline-flex gap-x-7 items-center`}>
                <span
                  className={`w-[190px] text-base text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                >
                  Status:
                </span>

                <div className="flex-shrink-0">
                  <CustomSelect
                    placeholder={"Select status"}
                    style={{ width: 240 }}
                    className={"h-[50px]"}
                    options={StatusSelect}
                    colorBorder={colorsObject.primary}
                    value={Status ? Status : undefined}
                    onChange={handleStatus}
                  />
                  {Selections && (
                    <FormError className="pl-[48%]">Select Status</FormError>
                  )}
                </div>
              </label>

              <CustomInput
                classNames={
                  "inline-flex gap-x-7 items-center flex-row-reverse gap-5 h-[50px]"
                }
                spanText={`Discount code:`}
                placeholder={`Discount code`}
                className={"w-60"}
                fontSize="text-base"
                spanClassName={`max-w-46 relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                colorBorder={colorsObject.primary}
                value={values.code}
                onChange={handleChange}
                name={"code"}
              >
                {errors.code && (
                  <FormError className={"pl-[48%]"}>{errors.code}</FormError>
                )}
              </CustomInput>

              <CustomInput
                classNames={
                  "inline-flex gap-x-7 items-center flex-row-reverse gap-5 h-[50px]"
                }
                spanText={`Free Amount:`}
                placeholder={`Free Amount`}
                className={"w-60"}
                fontSize="text-base"
                spanClassName={`max-w-46 relative ${EnrollmentStyle["Enrollment__heavy"]}`}
                colorBorder={colorsObject.primary}
                name={"amount"}
                value={values.amount}
                onChange={handleChange}
                type={"number"}
              >
                {errors.amount && (
                  <FormError className={"pl-[48%]"}>{errors.amount}</FormError>
                )}
              </CustomInput>
            </div>

            <div className={`space-y-10`}>
              <div className={`flex items-center space-x-12`}>
                <span
                  className={`w-[190px] text-base text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
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

              <div className={`flex items-center space-x-12`}>
                <span className={`w-[190px] text-base text-right`}>
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

              <div className={`flex items-center space-x-12`}>
                <span className={`w-[190px] text-base text-right`}>
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
              <Text fontSize={"text-base"} fontWeightStrong={400}>
                Discount Expiration:
              </Text>
              <>
                <ConfigProvider
                  theme={{
                    token: {
                      colorBorder: colorsObject.primary,
                      controlHeight: 40,
                    },
                  }}
                >
                  <DatePicker onChange={onChange} className="w-60 h-[50px]" />
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
      {state.status}
    </Fragment>
  );
};

export const MiscellaneousModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const [Status, setStatus] = useState("");
  const [SubType, setSubType] = useState("");
  const [Selections, setSelections] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false });

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
        dispatch({ type: "SUCCESS" });
      } catch (error) {
        console.error(error?.message);
        dispatch({ type: "ERROR" });
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
            className={classNames("pb-5 grid gap-y-5 justify-center")}
            onSubmit={handleSubmit}
          >
            <CustomInput
              classNames={
                "inline-flex items-center flex-row-reverse gap-10 h-[50px]"
              }
              spanText={"Miscellaneous Item Name:"}
              placeholder={"Miscellaneous Item Name"}
              fontSize="text-base"
              className={"w-60"}
              spanClassName={`max-w-46 relative ${EnrollmentStyle["Enrollment__heavy"]}`}
              colorBorder={colorsObject.primary}
              name={"name"}
              value={values.name}
              onChange={handleChange}
            >
              {errors.name && (
                <FormError className={"pl-[51%]"}>{errors.name}</FormError>
              )}
            </CustomInput>

            <label className={`inline-flex justify-end gap-x-10 items-center`}>
              <span
                className={`max-w-40 text-base text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Status:
              </span>

              <div className="flex-shrink-0">
                <CustomSelect
                  placeholder={"Select status"}
                  style={{ width: 240 }}
                  className={"h-[50px]"}
                  options={StatusSelect}
                  colorBorder={colorsObject.primary}
                  value={Status ? Status : undefined}
                  onChange={handleStatus}
                />
                {Selections && (
                  <FormError className={"pl-[51%]"}>Select Status</FormError>
                )}
              </div>
            </label>

            <label className={`inline-flex justify-end gap-x-10 items-center`}>
              <span
                className={`max-w-40 text-base text-right relative ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Type:
              </span>

              <div className="flex-shrink-0">
                <CustomSelect
                  placeholder={"Select Sub type"}
                  style={{ width: 240 }}
                  options={StatusSelect}
                  className={"h-[50px]"}
                  colorBorder={colorsObject.primary}
                  value={SubType ? SubType : undefined}
                  onChange={handleSubType}
                />
                {Selections && (
                  <FormError className={"pl-[51%]"}>Select Sub Type</FormError>
                )}
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
      {state.status}
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
  const [state, dispatch] = useReducer(reducer, { status: false });

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

        if (res.error.status >= 400) {
          dispatch({ type: "ERROR" });
        } else {
          dispatch({ type: "SUCCESS" });
        }

        // dispatch({ type: "SUCCESS" });
      } catch (error) {
        console.error(error);
        dispatch({ type: "ERROR" });
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
                  className={`text-gray-500 px-5 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                  className={`text-gray-500 px-5 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                      colorBorder={colorsObject.primary}
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
                    <label className={`flex flex-col gap-5 items-center`}>
                      <span className="text-base">Click to select</span>
                      <CustomTransfer
                        dataSource={mockData}
                        listHeight={200}
                        colorBorder={colorsObject.primary}
                        setSelectedKeys={setAssignLocation}
                        selectedKeys={AssignLocation}
                      />
                    </label>
                  </div>

                  <div className={`flex items-center gap-10`}>
                    <span
                      className={`w-32 text-base font-medium text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                    >
                      Service Items:
                    </span>
                    <label className={`flex flex-col gap-5 items-center`}>
                      <span className="text-base">Click to select</span>
                      <CustomTransfer
                        dataSource={mockData}
                        listHeight={200}
                        colorBorder={colorsObject.primary}
                        setSelectedKeys={setServiceItems}
                        selectedKeys={ServiceItems}
                      />
                    </label>
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
                  className={`text-gray-500 px-5 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                  className={`text-gray-500 px-5 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                  <div className={"space-x-5"}>
                    <CustomRadio
                      classNames={"inline-flex items-center gap-x-2.5"}
                      name={"purchase"}
                      onChange={handleChange}
                    >
                      <span className={"text-sm font-medium"}>Yes</span>
                    </CustomRadio>

                    <CustomRadio
                      classNames={"inline-flex items-center gap-x-2.5"}
                      name={"purchase"}
                      onChange={handleChange}
                    >
                      <span className={"text-sm font-medium"}>None</span>
                    </CustomRadio>
                  </div>
                </label>

                <label className={"inline-flex items-center w-full gap-10"}>
                  <span
                    className={`w-36 text-base font-medium text-end flex-shrink-0 `}
                  >
                    Allow Portal Purchase:
                  </span>
                  <div className={"space-x-5"}>
                    <CustomRadio
                      classNames={"inline-flex items-center gap-x-2.5"}
                      name={"portal_purchase"}
                      onChange={handleChange}
                    >
                      <span className={"text-sm font-medium"}>Yes</span>
                    </CustomRadio>

                    <CustomRadio
                      classNames={"inline-flex items-center gap-x-2.5"}
                      name={"portal_purchase"}
                      onChange={handleChange}
                    >
                      <span className={"text-sm font-medium"}>None</span>
                    </CustomRadio>
                  </div>
                </label>

                <div className={`space-y-5`}>
                  <div className={`flex items-center gap-10`}>
                    <span
                      className={`w-36 text-base font-medium text-end flex-shrink-0 `}
                    >
                      Add-On Services:
                    </span>
                    <label className={`flex flex-col gap-5 items-center`}>
                      <span className="text-base">Click to select</span>
                      <CustomTransfer
                        dataSource={mockData}
                        listHeight={200}
                        colorBorder={colorsObject.primary}
                        setSelectedKeys={setServiceItems}
                        selectedKeys={ServiceItems}
                      />
                    </label>
                  </div>

                  <div className={`flex items-center gap-10`}>
                    <span
                      className={`w-36 text-base font-medium text-end flex-shrink-0`}
                    >
                      Eligible Discounts:
                    </span>
                    <label className={`flex flex-col gap-5 items-center`}>
                      <span className="text-base">Click to select</span>
                      <CustomTransfer
                        dataSource={mockData}
                        listHeight={200}
                        colorBorder={colorsObject.primary}
                        setSelectedKeys={setDiscount}
                        selectedKeys={Discount}
                      />
                    </label>
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
                      style={{ width: "100%" }}
                      colorBorder={colorsObject.primary}
                      className={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded h-[50px]`}
                      placeholder={"Service Status"}
                      value={AssociateContract ? AssociateContract : undefined}
                      onChange={handleAssociateContract}
                      options={[
                        {
                          value: "Active",
                          label: "Active",
                        },
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
      {state.status}
    </Fragment>
  );
};

export const FileCategoryModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const [Status, setStatus] = useState("");
  const [DisplayStudentPortal, setDisplayStudentPortal] = useState(true);
  const [DisallowStudentPortal, setDisallowStudentPortal] = useState(false);
  const [UploadedStudentAccount, setUploadedStudentAccount] = useState(false);
  const [InstructorPortal, setInstructorPortal] = useState(false);

  // func
  const handleSubmit = (values) => {
    console.log({
      ...values,
      status: Status,
      display_student_portal: DisplayStudentPortal,
      disallow_student_portal: DisallowStudentPortal,
      uploaded_student_account: UploadedStudentAccount,
      instructor_portal: InstructorPortal,
    });
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
    <Formik
      initialValues={{
        name: "",
        signature_link: "",
        note: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ handleReset, errors, handleChange, values, handleSubmit }) => (
        <form className="flex gap-5 flex-col px-5" onSubmit={handleSubmit}>
          <CustomInput
            className={"border-indigo-700 border w-[451px] shadow-xl"}
            classNames={
              "inline-flex justify-center h-[50px] items-center flex-row-reverse gap-5"
            }
            spanText={"Category name"}
            spanClassName={"font-semibold flex-shrink-0"}
            fontSize={"text-base"}
            placeholder={"Category name"}
            name={"name"}
            onChange={handleChange}
            value={values.name}
          >
            {errors.name && (
              <FormError className={"pl-48"}>{errors.name}</FormError>
            )}
          </CustomInput>

          <label className={"inline-flex justify-center items-center gap-5"}>
            <span
              className={"font-semibold text-end w-32 flex-shrink-0 text-base"}
            >
              File status
            </span>

            <div className={"w-[451px]"}>
              <CustomSelect
                placeholder={"Select"}
                colorBorder={colorsObject.primary}
                className={"w-full h-[50px] shadow-xl"}
                options={[
                  {
                    value: "active",
                    label: "active",
                  },
                ]}
                onChange={handleStatus}
                value={Status ? Status : undefined}
              />
            </div>
          </label>

          <label className={"inline-flex justify-center items-center gap-5"}>
            <span
              className={"font-semibold text-end w-32 flex-shrink-0 text-base"}
            >
              Packages:
            </span>

            <CustomTransfer
              dataSource={mockData}
              titles={["Source", "Target"]}
              colorBorder={colorsObject.primary}
              colorBgContainer={"transparent"}
              headerHeight={30}
              listHeight={200}
            />
          </label>

          <label className={"inline-flex justify-center items-center gap-5"}>
            <span
              className={"font-semibold text-end w-32 flex-shrink-0 text-base"}
            >
              Signature link:
            </span>

            <div className={"w-[451px]"}>
              <textarea
                className={
                  "border w-full outline-0 border-indigo-700 p-5 rounded-2xl min-h-[90px] shadow-xl"
                }
                name={"signature_link"}
                placeholder={"text"}
                onChange={handleChange}
                value={values.signature_link}
              ></textarea>
            </div>
          </label>

          <label className={"inline-flex justify-center items-center gap-5"}>
            <span
              className={"font-semibold text-end w-32 flex-shrink-0 text-base"}
            >
              Note:
            </span>

            <div className={"w-[451px]"}>
              <textarea
                className={
                  "border w-full outline-0 border-indigo-700 p-5 rounded-2xl min-h-[90px] shadow-xl"
                }
                name={"note"}
                placeholder={"text"}
                onChange={handleChange}
                value={values.note}
              ></textarea>
            </div>
          </label>

          <div className={"grid grid-cols-2 gap-5 pt-8"}>
            <div className="space-y-5">
              <label
                className={"inline-flex w-full justify-end items-center gap-6"}
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
                className={"inline-flex w-full justify-end items-center gap-6"}
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
  );
};

export const AddStaffModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { FileReaderResult, Result } = useFileReader();
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
  const [state, dispatch] = useReducer(reducer, { status: false });

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
          picture: Result,
          birth: DOB,
          car_permit_data: PermitIssueDate,
          car_permit_expire: PermitExpirationDate,
          working_hours: [],
        },
      });

      if (res.error.status >= 400) {
        dispatch({ type: "ERROR" });
      } else {
        console.log({
          ...values,
          status: Status,
          staff_type: StaffType,
          location: Location,
          state: State,
          vehicle: Vehicle,
          picture: Result,
          birth: DOB,
          car_permit_data: PermitIssueDate,
          car_permit_expire: PermitExpirationDate,
          working_hours: [],
        });

        dispatch({ type: "SUCCESS" });
      }
      dispatch({ type: "SUCCESS" });
    } catch (e) {
      console.error(e.message);
      dispatch({ type: "ERROR" });
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
        {({ handleSubmit, handleReset, handleChange, errors, values }) => (
          <form className={"space-y-5"} onSubmit={handleSubmit}>
            <div className={"grid grid-cols-2 gap-5 px-5"}>
              <div className={"space-y-5"}>
                <label className="inline-flex gap-5 items-center w-full">
                  <span className="text-base flex-shrink-0 font-medium w-56 text-right">
                    Status
                  </span>

                  <CustomSelect
                    placeholder={"Status"}
                    style={{ width: "100%" }}
                    colorBorder={colorsObject.primary}
                    className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                    style={{ width: "100%" }}
                    colorBorder={colorsObject.primary}
                    className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                    style={{ width: "100%" }}
                    colorBorder={colorsObject.primary}
                    className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                    style={{ width: "100%" }}
                    colorBorder={colorsObject.primary}
                    className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                    style={{ width: "100%" }}
                    colorBorder={colorsObject.primary}
                    className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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

                  <FileReaderResult className={"overflow-hidden w-60 h-60"} />
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
      {state?.status}
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
  const [state, dispatch] = useReducer(reducer, { status: false });

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

        if (res.error.status >= 400) {
          dispatch({ type: "ERROR" });
        } else {
          dispatch({ type: "SUCCESS" });
        }

        // dispatch({ type: "SUCCESS" });
      } catch (error) {
        console.error(error?.message);
        dispatch({ type: "ERROR" });
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
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Location name"}
                  placeholder={"Location name"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  colorBorder={colorsObject.primary}
                  name={"name"}
                  value={values.name}
                  onChange={handleChange}
                >
                  {errors.name && (
                    <FormError className="pl-[160px]">{errors.name}</FormError>
                  )}
                </CustomInput>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Location code"}
                  placeholder={"Location Code"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  colorBorder={colorsObject.primary}
                  name={"code"}
                  value={values.code}
                  onChange={handleChange}
                >
                  {errors.code && (
                    <FormError className="pl-[160px]">{errors.code}</FormError>
                  )}
                </CustomInput>

                <label className="inline-flex gap-8 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-32 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Location Status
                  </span>
                  <div className="w-full">
                    <CustomSelect
                      placeholder={"Location Status"}
                      style={{ width: "100%" }}
                      colorBorder={colorsObject.primary}
                      className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                      options={StatusSelect}
                      onChange={handleStatus}
                      value={Status ? Status : undefined}
                    />
                    {Selections && (
                      <FormError>Location Status is not selected</FormError>
                    )}
                  </div>
                </label>
                <label className="inline-flex gap-8 items-center w-full">
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
                        className={"space-x-2.5 "}
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
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Address"}
                  placeholder={"Address"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"address"}
                  onChange={handleChange}
                  value={values.address}
                />
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"City"}
                  placeholder={"City"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"city"}
                  onChange={handleChange}
                  value={values.city}
                />
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"State"}
                  placeholder={"State"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"state"}
                  onChange={handleChange}
                  value={values.state}
                />
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Zip"}
                  placeholder={"Zip"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"zip"}
                  onChange={handleChange}
                  value={values.zip}
                />
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Location Manager"}
                  placeholder={"Location Manager"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"location_manager"}
                  onChange={handleChange}
                  value={values.location_manager}
                />
                <label className="inline-flex gap-8 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-32 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Pickup location
                  </span>
                  <div className="w-full">
                    <CustomSelect
                      placeholder={"Pickup location"}
                      style={{ width: "100%" }}
                      colorBorder={colorsObject.primary}
                      className={`h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                      <FormError>Pickup location is not selected</FormError>
                    )}
                  </div>
                </label>
                <label className="inline-flex gap-8 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-32 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Drop off location
                  </span>
                  <div className="w-full">
                    <CustomSelect
                      placeholder={"Drop off location"}
                      style={{ width: "100%" }}
                      colorBorder={colorsObject.primary}
                      className={`h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
                      <FormError>Drop off location is not selected</FormError>
                    )}
                  </div>
                </label>
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"County"}
                  placeholder={"County"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"county"}
                  onChange={handleChange}
                  value={values.county}
                />
              </div>
              <div className={"space-y-5"}>
                <label className="flex itmes-center gap-x-8">
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
                <label className="flex itmes-center gap-x-8">
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
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Phone Main"}
                  placeholder={"Phone Main"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"phone_main"}
                  value={values.phone_main}
                  onChange={handleChange}
                />
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Fax"}
                  placeholder={"Fax"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"fax"}
                  value={values.fax}
                  onChange={handleChange}
                />
                <label className="inline-flex justify-end gap-8 items-center w-full">
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
                </label>
                <label className="inline-flex justify-end gap-8 items-center w-full">
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
                <label className="flex itmes-center gap-x-8">
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
                <label className="flex items-center gap-4 justify-center">
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
                    colorBorder={colorsObject.primary}
                  />
                  <CustomInput
                    classNames={`w-full h-[50px] rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    onChange={handleChange}
                    name={"color"}
                    value={values.color}
                    colorBorder={colorsObject.primary}
                  />
                </label>
                <label className="flex itmes-center gap-x-8">
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
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Distance Coverage in Miles"}
                  placeholder={"Distance Coverage in Miles"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  value={values.distance_based_scheduling}
                  onChange={handleChange}
                  name={"distance_based_scheduling"}
                />
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Provider Location Id"}
                  placeholder={"Provider Location Id"}
                  spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
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
      {state?.status}
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
  const [state, dispatch] = useReducer(reducer, { status: false });

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

        if (res.error.status >= 400) {
          dispatch({ type: "ERROR" });
        } else {
          dispatch({ type: "SUCCESS" });
        }

        // dispatch({ type: "SUCCESS" });
      } catch (error) {
        console.log(error?.message);
        dispatch({ type: "ERROR" });
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
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
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
                    <FormError className="pl-[145px]">{errors.name}</FormError>
                  )}
                </CustomInput>

                <label className="inline-flex gap-8 items-center w-full">
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
                      <FormError className="pl-[35%]">
                        School Status is not selected
                      </FormError>
                    )}
                  </div>
                </label>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
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
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
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
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
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

                <label className="inline-flex gap-8 items-center w-full">
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
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
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
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
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
                    <FormError className="pl-[145px]">{errors.email}</FormError>
                  )}
                </CustomInput>
              </div>
              <div>
                <label className="inline-flex justify-end gap-8 items-center w-full">
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
      {state?.status}
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
  const [state, dispatch] = useReducer(reducer, { status: false });

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

        if (res.error.status >= 400) {
          dispatch({ type: "ERROR" });
        } else {
          dispatch({ type: "SUCCESS" });
        }
      } catch (error) {
        console.error(error?.message);
        dispatch({ type: "ERROR" });
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
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Lead Name"}
                  placeholder={"Lead Name"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right  relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  colorBorder={colorsObject.primary}
                  name={"name"}
                  onChange={handleChange}
                  value={values.name}
                >
                  {errors.name && (
                    <FormError className="pl-[145px]">{errors.name}</FormError>
                  )}
                </CustomInput>

                <label className="inline-flex gap-8 items-center w-full">
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
                      <FormError className="pl-[145px]">
                        Lead Status is not selected
                      </FormError>
                    )}
                  </div>
                </label>

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
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

                <label className="inline-flex gap-8 items-center w-full">
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
                <label className="inline-flex justify-end gap-8 items-center w-full">
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
      {state?.status}
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
  const { FileReaderResult, Result } = useFileReader();
  const [NotesValue, setNotesValue] = useState("Hello");
  const [state, dispatch] = useReducer(reducer, { status: false });

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
            image: Result,
            status: Status,
            location: Location,
            type: Type,
            note: NotesValue,
          },
        });

        if (res.error.status >= 400) {
          dispatch({ type: "ERROR" });
        } else {
          dispatch({ type: "SUCCESS" });
        }
        // dispatch({ type: "SUCCESS" });
      } catch (error) {
        console.error(error?.message);
        dispatch({ type: "ERROR" });
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
        {({ handleSubmit, handleReset, handleChange, values, errors }) => (
          <form className={"space-y-5 px-5"} onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5">
              <div className={"space-y-5"}>
                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Vehicle Name"}
                  placeholder={"Vehicle Name"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  colorBorder={colorsObject.primary}
                  name={"name"}
                  value={values.name}
                  onChange={handleChange}
                >
                  {errors.name && (
                    <FormError className="pl-[145px]">{errors.name}</FormError>
                  )}
                </CustomInput>

                <label className="inline-flex gap-8 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-28 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Vehicle Status
                  </span>
                  <div className="w-full">
                    <CustomSelect
                      placeholder={"Vehicle Status"}
                      colorBorder={colorsObject.primary}
                      className={`w-full rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                      options={StatusSelect}
                      value={Status ? Status : undefined}
                      onChange={handleStatus}
                    />
                    {Selections && (
                      <FormError className="pl-[145px]">
                        Vehicle Status is not selected
                      </FormError>
                    )}
                  </div>
                </label>

                <label className="inline-flex gap-8 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-28 text-right`}
                  >
                    At Location
                  </span>
                  <CustomSelect
                    placeholder={"At Location"}
                    colorBorder={colorsObject.primary}
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

                <label className="inline-flex gap-8 items-center w-full">
                  <span
                    className={`text-sm flex-shrink-0 font-medium w-28 text-right`}
                  >
                    Vehicle Type
                  </span>
                  <CustomSelect
                    placeholder={"Vehicle Type"}
                    colorBorder={colorsObject.primary}
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
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Vehicle No"}
                  placeholder={"Vehicle No"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"number"}
                  value={values.number}
                  onChange={handleChange}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Vehicle Make"}
                  placeholder={"Vehicle Make"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"make"}
                  value={values.make}
                  onChange={handleChange}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"License Plate"}
                  placeholder={"License Plate"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"plate"}
                  value={values.plate}
                  onChange={handleChange}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"VIN#"}
                  placeholder={"VIN#"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"vin"}
                  value={values.vin}
                  onChange={handleChange}
                />
              </div>
              <div className={"space-y-5"}>
                <label className="inline-flex gap-8 items-center w-full">
                  <span className={"flex-shrink-0 w-28 text-right"}>
                    Appointment Color
                  </span>

                  <div className="flex flex-grow items-center gap-4">
                    <CustomInput
                      type={"color"}
                      name={"color"}
                      onChange={handleChange}
                      value={values.color}
                      className={`w-full ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                      classNames={"w-14"}
                      colorBorder={colorsObject.primary}
                    />
                    <CustomInput
                      value={values.color}
                      classNames="w-full h-[50px]"
                      colorBorder={colorsObject.primary}
                      className={
                        ManagementStyle["CheckModal__form-element__shadow"]
                      }
                    />
                  </div>
                </label>

                <label className="flex itmes-center gap-x-8">
                  <span className="w-28 flex-shrink-0"></span>
                  <CustomCheckBox name={"has_color"} onChange={handleChange}>
                    <span>Enable Appointment Color</span>
                  </CustomCheckBox>
                </label>

                <label className="inline-flex justify-end gap-8 items-center w-full">
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
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Vehicle ESN Or AIR ID"}
                  placeholder={"Vehicle ESN Or AIR ID"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"asr_esn_id"}
                  value={values.asr_esn_id}
                  onChange={handleChange}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Odometer Value"}
                  placeholder={"Odometer Value"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"odometer"}
                  onChange={handleChange}
                  value={values.odometer}
                  type={"number"}
                />

                <CustomInput
                  classNames={
                    "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
                  }
                  className={
                    ManagementStyle["CheckModal__form-element__shadow"]
                  }
                  spanText={"Vehicle Initial Mileage"}
                  placeholder={"Vehicle Initial Mileage"}
                  spanClassName={`text-sm font-medium w-28 flex-shrink-0 text-right`}
                  colorBorder={colorsObject.primary}
                  name={"initial_mileage"}
                  value={values.initial_mileage}
                  onChange={handleChange}
                  type={"number"}
                />

                <label className="inline-flex justify-end gap-8 items-center w-full">
                  <span
                    className={
                      "text-sm font-medium w-28 flex-shrink-0 text-right"
                    }
                  >
                    Vehicle Image
                  </span>

                  <FileReaderResult
                    className={`overflow-hidden w-60 h-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
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
      {state?.status}
    </Fragment>
  );
};
