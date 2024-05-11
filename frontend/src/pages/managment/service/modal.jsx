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
import { useFileReader } from "@/hooks/file-reader.jsx";
import { FormError } from "@/modules/errors.jsx";
import { ProductModalValidate } from "@/modules/product.jsx";
import EnrollmentStyle from "@/pages/enrollment/enrollment.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import {
  ColorPicker,
  ConfigProvider,
  DatePicker,
  Image,
  Switch,
  Upload,
} from "antd";
import classNames from "classnames";
import { Formik } from "formik";
import {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { zip } from "rxjs/internal/operators/zip";
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

export const ProductModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const [Status, setStatus] = useState("");
  const [Type, setType] = useState("");
  const [SubType, setSubType] = useState("");
  const [Selections, setSelections] = useState(false);
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
  const handleSubmit = (values) => {
    setSelections(stateSelects);
    if (!Selections) {
      console.log({ ...values, status: Status, type: Type, subtype: SubType });
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
                <FormError className={"pl-[48%]"}>{errors.code}</FormError>
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
                  style={{ width: 240 }}
                  className={`h-[50px] text-base rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  options={StatusSelect}
                  colorBorder={colorsObject.primary}
                  onChange={handleStatus}
                  value={Status ? Status : undefined}
                />

                {Selections && <FormError>Select Status:</FormError>}
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
                  style={{ width: 240 }}
                  className={`h-[50px] text-base rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  options={StatusSelect}
                  colorBorder={colorsObject.primary}
                  value={Type ? Type : undefined}
                  onChange={handleType}
                />

                {Selections && <FormError>Select Type</FormError>}
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
                  style={{ width: 240 }}
                  className={`h-[50px] text-base rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  options={StatusSelect}
                  colorBorder={colorsObject.primary}
                  value={SubType ? SubType : undefined}
                  onChange={handleSubType}
                />

                {Selections && <FormError>Select Subtype</FormError>}
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
    </Fragment>
  );
};

export const FeesModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const [Status, setStatus] = useState("");
  const [Selections, setSelections] = useState(false);

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
  const handleSubmit = (values) => {
    setSelections(stateSelects);
    if (!stateSelects) {
      console.log({ ...values, status: Status });
    }
  };

  return (
    <Fragment>
      <Formik
        initialValues={{
          name: "",
          free_amount: "",
          notes: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.free_amount) {
            errors.free_amount = "Input Free amount is empty";
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
                "inline-flex gap-x-10 items-center flex-row-reverse gap-5 h-[50px]"
              }
              spanText={"Free name"}
              placeholder={"Free name"}
              fontSize="text-base"
              className={`w-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              spanClassName={`max-w-46 text-right`}
              colorBorder={colorsObject.primary}
              onChange={handleChange}
              value={values.name}
              name={"name"}
            />

            <label
              className={`inline-flex items-center gap-10 w-full justify-center`}
            >
              <span
                className={`w-40 text-right after:left-16 relative text-base ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Status:
              </span>

              <div className="flex-shrink-0">
                <CustomSelect
                  placeholder={"Select status"}
                  style={{ width: 240 }}
                  className={`h-[50px] text-base rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  options={StatusSelect}
                  colorBorder={colorsObject.primary}
                  onChange={handleStatus}
                  value={Status ? Status : undefined}
                />
                {Selections && <FormError className="pl-[46%]">Select Status</FormError>}
              </div>
            </label>

            <CustomInput
              classNames={
                "inline-flex gap-x-10 items-center flex-row-reverse gap-5 h-[50px]"
              }
              spanText={"Fee Amount:"}
              placeholder={"Fee Amount:"}
              className={`w-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              fontSize="text-base"
              spanClassName={`max-w-46 relative ${EnrollmentStyle["Enrollment__heavy"]}`}
              colorBorder={colorsObject.primary}
              name={"free_amount"}
              value={values.free_amount}
              onChange={handleChange}
            >
              {errors.free_amount && (
                <FormError className={"pl-[46%]"}>
                  {errors.free_amount}
                </FormError>
              )}
            </CustomInput>

            <CustomInput
              classNames={
                "inline-flex gap-x-10 items-center flex-row-reverse gap-5 h-[50px]"
              }
              spanText={"Notes"}
              placeholder={"Notes"}
              className={`w-60 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              fontSize="text-base"
              spanClassName={`max-w-46`}
              colorBorder={colorsObject.primary}
              onChange={handleChange}
              name={"notes"}
              value={values.notes}
            />

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
    </Fragment>
  );
};

export const DiscountModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const [Status, setStatus] = useState("");
  const [Selections, setSelections] = useState(false);

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
  const handleCancel = () => navigate(-1);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleSubmit = (values) => {
    setSelections(stateSelects);

    if (!stateSelects) {
      console.log(values);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        discount_code: "",
        free_amount: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.discount_code) {
          errors.discount_code = "Input Discount code is empty";
        }
        if (!values.free_amount) {
          errors.free_amount = "Input Free Amount is empty";
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
                "inline-flex gap-x-3.5 items-center flex-row-reverse gap-5 h-[50px]"
              }
              spanText={"Discount name"}
              placeholder={"Discount name"}
              className={"w-60"}
              fontSize="text-base"
              spanClassName={`max-w-46`}
              colorBorder={colorsObject.primary}
              value={values.name}
              onChange={handleChange}
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
                />
                {Selections && <FormError className="pl-[48%]">Select Status</FormError>}
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
              value={values.discount_code}
              onChange={handleChange}
              name={"discount_code"}
            >
              {errors.discount_code && (
                <FormError className={"pl-[48%]"}>
                  {errors.discount_code}
                </FormError>
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
              name={"free_amount"}
              value={values.free_amount}
              onChange={handleChange}
            >
              {errors.free_amount && (
                <FormError className={"pl-[48%]"}>
                  {errors.free_amount}
                </FormError>
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
              />
            </div>

            <div className={`flex items-center space-x-10`}>
              <span className={`w-[190px] text-base text-right`}>
                Eligible Class(es):
              </span>
              <CustomTransfer
                dataSource={mockData}
                listHeight={200}
                colorBorder={colorsObject.primary}
              />
            </div>

            <div className={`flex items-center space-x-11`}>
              <span className={`w-[190px] text-base text-right`}>
                Eligible Class(es):
              </span>
              <CustomTransfer
                dataSource={mockData}
                listHeight={200}
                colorBorder={colorsObject.primary}
              />
            </div>
          </div>

          <label className={"text-center space-x-5"}>
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
                <DatePicker onChange={onChange} />
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
  );
};

export const MiscellaneousModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const [Status, setStatus] = useState("");
  const [SubType, setSubType] = useState("");
  const [Selections, setSelections] = useState(false);

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
      console.log({ ...values, status: Status, subtype: SubType });
    }
  };
  const handleStatus = (values) => setStatus(values);
  const handleSubType = (values) => setSubType(values);

  return (
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
              {Selections && <FormError className={"pl-[51%]"}>Select Status</FormError>}
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
              {Selections && <FormError className={"pl-[51%]"}>Select Sub Type</FormError>}
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
  );
};

export const AddServiceModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const [Selections, setSelections] = useState(false);
  const [Status, setStatus] = useState("");
  const [AssociateContract, setAssociateContract] = useState("");
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
  const handleSubmit = (values) => {
    setSelections(stateSelects);

    if (!stateSelects) {
      console.log({ ...values, status: Status, contact: AssociateContract });
    }
  };
  const handleStatus = (values) => setStatus(values);
  const handleAssociateContract = (values) => setAssociateContract(values);

  return (
    <Formik
      initialValues={{
        name: "",
        code: "",
        price: "",
        web_name: "",
        web_description: "",
        enrollment_email_content: "",
        web_purchase: false,
        portal_purchase: false,
        notes: "",
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

        if (!values.web_description) {
          errors.web_description = "Input Web description is empty";
        }

        if (!values.enrollment_email_content) {
          errors.enrollment_email_content = "Input Web description is empty";
        }

        if (!values.notes) {
          errors.notes = "Input Notes is empty";
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
                spanClassName={`w-32 text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                name={"name"}
                value={values.name}
                onChange={handleChange}
              >
                {errors.name && (
                  <FormError className={"pl-[170px]"}>{errors.name}</FormError>
                )}
              </CustomInput>
              <CustomInput
                placeholder={"Service Code"}
                className={`text-gray-500 px-5 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                classNames={
                  "inline-flex items-center w-full h-[50px] justify-between gap-10 flex-row-reverse"
                }
                spanText={"Service Code:"}
                spanClassName={`w-32 text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                name={"code"}
                value={values.code}
                onChange={handleChange}
              >
                {errors.code && (
                  <FormError className={"pl-[170px]"}>{errors.code}</FormError>
                )}
              </CustomInput>
              <label
                className={`inline-flex justify-end gap-x-10 items-center w-full`}
              >
                <span
                  className={`w-32 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                >
                  Status:
                </span>

                <div className="w-full">
                  <CustomSelect
                    placeholder={"Select status"}
                    style={{ width: "100%" }}
                    className={`h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                    options={StatusSelect}
                    colorBorder={colorsObject.primary}
                    value={Status ? Status : undefined}
                    onChange={handleStatus}
                  />
                  {Selections && <FormError className={"pl-[170px]"}>Select Status</FormError>}
                </div>
              </label>

              <div className={`space-y-5`}>
                <div className={`flex items-center gap-10`}>
                  <span
                    className={`w-32 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Assign Locations:
                  </span>
                  <label className={`flex flex-col gap-5 items-center`}>
                    <span>Click to select</span>
                    <CustomTransfer
                      dataSource={mockData}
                      listHeight={200}
                      colorBorder={colorsObject.primary}
                    />
                  </label>
                </div>

                <div className={`flex items-center gap-10`}>
                  <span
                    className={`w-32 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Service Items:
                  </span>
                  <label className={`flex flex-col gap-5 items-center`}>
                    <span>Click to select</span>
                    <CustomTransfer
                      dataSource={mockData}
                      listHeight={200}
                      colorBorder={colorsObject.primary}
                    />
                  </label>
                </div>
              </div>
              <CustomCheckBox className={"gap-x-2.5 pl-[185px]"}>
                Is Service Taxable
              </CustomCheckBox>
              <CustomInput
                placeholder={"Service Price:"}
                className={`text-gray-500 px-5 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                classNames={
                  "inline-flex items-center w-full h-[50px] justify-between gap-10 flex-row-reverse "
                }
                spanText={"Service Price:"}
                spanClassName={`w-32 text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                name={"price"}
                value={values.price}
                onChange={handleChange}
              >
                {errors.price && (
                  <FormError className={"pl-[170px]"}>{errors.price}</FormError>
                )}
              </CustomInput>

              <CustomInput
                placeholder={"Web Name:"}
                className={`text-gray-500 px-5 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                classNames={
                  "inline-flex items-center w-full h-[50px] justify-between gap-10 flex-row-reverse"
                }
                spanText={"Web Name:"}
                spanClassName={`w-32 text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                name={"web_name"}
                value={values.web_name}
                onChange={handleChange}
              >
                {errors.web_name && (
                  <FormError className={"pl-[170px]"}>{errors.web_name}</FormError>
                )}
              </CustomInput>
              <label
                className={`inline-flex items-center w-full justify-between gap-10`}
              >
                <span
                  className={`w-32 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                >
                  Web description
                </span>
                <div className={"w-full"}>
                  <textarea
                    className={`w-full min-h-[428px] p-3 rounded-xl outline-0 border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]} `}
                    name={"web_description"}
                    value={values.web_description}
                    onChange={handleChange}
                    placeholder={"text"}
                  ></textarea>
                  {errors.web_description && (
                    <FormError>{errors.web_description}</FormError>
                  )}
                </div>
              </label>
              <label
                className={`inline-flex items-center w-full justify-between gap-10`}
              >
                <span
                  className={`w-32 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                >
                  Enrollment Email Content:
                </span>
                <div className={"w-full"}>
                  <textarea
                    className={`w-full min-h-[428px] p-3 rounded-xl outline-0 border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    name={"enrollment_email_content"}
                    value={values.enrollment_email_content}
                    onChange={handleChange}
                    placeholder={"text"}
                  ></textarea>
                  {errors.enrollment_email_content && (
                    <FormError>{errors.enrollment_email_content}</FormError>
                  )}
                </div>
              </label>
            </div>
            {/*------------*/}
            <div className={`space-y-5`}>
              <label className={"inline-flex items-center w-full gap-10"}>
                <span className={`w-36 text-sm text-end flex-shrink-0 `}>
                  Allow Web Purchase:
                </span>
                <div className={"space-x-5"}>
                  <CustomRadio
                    classNames={"inline-flex items-center gap-x-2.5"}
                    name={"web_purchase"}
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
              <label className={"inline-flex items-center w-full gap-10"}>
                <span className={`w-36 text-sm text-end flex-shrink-0 `}>
                  Allow Portal Purchase:
                </span>
                <div className={"space-x-5"}>
                  <CustomRadio
                    classNames={"inline-flex items-center gap-x-2.5"}
                    name={"portal"}
                  >
                    <span className={"text-sm font-medium"}>Yes</span>
                  </CustomRadio>

                  <CustomRadio
                    classNames={"inline-flex items-center gap-x-2.5"}
                    name={"portal"}
                  >
                    <span className={"text-sm font-medium"}>None</span>
                  </CustomRadio>
                </div>
              </label>
              <div className={`space-y-5`}>
                <div className={`flex items-center gap-10`}>
                  <span
                    className={`w-36 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Assign Locations:
                  </span>
                  <label className={`flex flex-col gap-5 items-center`}>
                    <span>Click to select</span>
                    <CustomTransfer
                      dataSource={mockData}
                      listHeight={200}
                      colorBorder={colorsObject.primary}
                    />
                  </label>
                </div>

                <div className={`flex items-center gap-10`}>
                  <span
                    className={`w-36 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                  >
                    Service Items:
                  </span>
                  <label className={`flex flex-col gap-5 items-center`}>
                    <span>Click to select</span>
                    <CustomTransfer
                      dataSource={mockData}
                      listHeight={200}
                      colorBorder={colorsObject.primary}
                    />
                  </label>
                </div>
              </div>
              <label
                className={`inline-flex items-center w-full justify-between gap-10`}
              >
                <span
                  className={`w-36 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
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
                    <FormError className={"pl-[170px]"}>Select Associate Contract From OE</FormError>
                  )}
                </div>
              </label>
              <label
                className={`inline-flex items-center w-full justify-between gap-10`}
              >
                <span
                  className={`w-36 text-sm text-end flex-shrink-0 relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
                >
                  Service Notes:
                </span>
                <div className={"w-full"}>
                  <textarea
                    className={`w-full p-3 min-h-[428px] rounded-xl outline-0 border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]} `}
                    name={"notes"}
                    value={values.notes}
                    onChange={handleChange}
                    placeholder={"text"}
                  ></textarea>
                  {errors.notes && <FormError>{errors.notes}</FormError>}
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
            className={"border-indigo-700 border w-[451px]"}
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
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={"h-[50px]"}
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
                  "border w-full outline-0 border-indigo-700 p-5 rounded-2xl min-h-[90px]"
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
                  "border w-full outline-0 border-indigo-700 p-5 rounded-2xl min-h-[90px]"
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
  const [EmergencyContactRelation, setEmergencyContactRelation] = useState("");
  const [Vehicle, setVehicle] = useState("");
  const [DOB, setDOB] = useState("");
  const [PermitIssueDate, setPermitIssueDate] = useState("");
  const [PermitExpirationDate, setPermitExpirationDate] = useState("");

  // func
  const handleSubmit = (values) => {
    console.log({
      ...values,
      status: Status,
      subtype: StaffType,
      location: Location,
      state: State,
      emergency_contact_relation: EmergencyContactRelation,
      vehicle: Vehicle,
      picture: Result,
      date_of_birth: DOB,
      permit_issue_date: PermitIssueDate,
      permit_expiration_date: PermitExpirationDate,
    });
  };

  const handleStatus = (value) => setStatus(value);
  const handleStaffType = (value) => setStaffType(value);
  const handleLocation = (value) => setLocation(value);
  const handleVehicle = (value) => setVehicle(value);
  const handleState = (value) => setState(value);
  const handleEmergencyContactRelation = (value) => {
    setEmergencyContactRelation(value);
  };

  return (
    <Formik
      initialValues={{
        staff_code: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        email: "",
        home_phone: "",
        cell_phone: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
        instructor_permit_number: "",
        user_name: "",
        password: "",
        assign_color: "",
        appointment_color: "",
        zoom_pmi: "",
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
                  options={[
                    {
                      value: "Active",
                      label: "Active",
                    },
                  ]}
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
                      value: "Active",
                      label: "Active",
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
                      value: "USA",
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
                      value: "Car",
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
                spanText={"Staff code"}
                placeholder={"Staff code"}
                spanClassName={"font-medium w-56 flex-shrink-0 text-right"}
                fontSize="text-base"
                colorBorder={colorsObject.primary}
                name={"staff_code"}
                onChange={handleChange}
                value={values.staff_code}
              />

              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse gap-9 items-center w-full h-[50px]"
                }
                fontSize="text-base"
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
                spanText={"Middle name"}
                placeholder={"Middle name"}
                spanClassName={"font-medium w-56 flex-shrink-0 text-right"}
                colorBorder={colorsObject.primary}
                value={values.middle_name}
                name={"middle_name"}
                onChange={handleChange}
              />

              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
                }
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
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
                className={ManagementStyle["CheckModal__form-element__shadow"]}
                spanText={"Emergency Contact Name"}
                placeholder={"Emergency Contact Name"}
                spanClassName={"font-medium w-56 flex-shrink-0 text-right"}
                fontSize="text-base"
                colorBorder={colorsObject.primary}
                name={"emergency_contact_name"}
                onChange={handleChange}
                value={values.emergency_contact_name}
              />

              <label className="inline-flex gap-5 items-center w-full">
                <span className="text-base flex-shrink-0 font-medium w-56 text-right">
                  Emergency Contact Relation
                </span>
                <CustomSelect
                  placeholder={"Please select"}
                  style={{ width: "100%" }}
                  colorBorder={colorsObject.primary}
                  className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  options={[
                    {
                      value: "Number",
                      label: "Number",
                    },
                  ]}
                  onChange={handleEmergencyContactRelation}
                  value={
                    EmergencyContactRelation ? EmergencyContactRelation : null
                  }
                />
              </label>

              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse gap-5 items-center w-full h-[50px]"
                }
                className={ManagementStyle["CheckModal__form-element__shadow"]}
                spanText={"Emergency Contact Phone"}
                placeholder={"Emergency Contact Phone"}
                spanClassName={"font-medium w-56 flex-shrink-0 text-right"}
                fontSize="text-base"
                colorBorder={colorsObject.primary}
                name={"emergency_contact_phone"}
                value={values.emergency_contact_phone}
                onChange={handleChange}
              />
            </div>
            <div className={"space-y-5"}>
              <label className="inline-flex gap-5 items-center w-full">
                <span className="w-60 text-base font-medium text-end flex-shrink-0">
                  Emergency Contact Relation
                </span>
                <DatePicker
                  className={`h-[50px] flex-grow border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  placeholder={"MM/DD/YYYY"}
                  onChange={(day) => setDOB(day["$d"])}
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
                name={"instructor_permit_number"}
                value={values.instructor_permit_number}
                onChange={handleChange}
              />

              <label className="inline-flex gap-5 items-center w-full">
                <span className="w-60 text-base font-medium text-end flex-shrink-0">
                  In Car Permit Issued Date
                </span>
                <DatePicker
                  className={`h-[50px] flex-grow border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  placeholder={"MM/DD/YYYY"}
                  onChange={(day) => setPermitIssueDate(day["$d"])}
                />
              </label>

              <label className="inline-flex gap-5 items-center w-full">
                <span className="w-60 text-base font-medium text-end flex-shrink-0">
                  Permit Expiration Date
                </span>
                <DatePicker
                  className={`h-[50px] flex-grow border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                  placeholder={"MM/DD/YYYY"}
                  onChange={(day) => setPermitExpirationDate(day["$d"])}
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
                name={"user_name"}
                value={values.user_name}
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

              <CustomCheckBox className={"w-full flex justify-center"}>
                <span className={`font-medium text-base`}>
                  Assign Appointment Color
                </span>
              </CustomCheckBox>

              <CustomInput
                placeholder={"#FFFFFF"}
                className={`text-gray-500 px-5 py-2 border border-indigo-700 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                classNames={
                  "inline-flex items-center w-full justify-between gap-10 flex-row-reverse h-[50px]"
                }
                fontSize="text-base"
                spanText={"Appointment Color"}
                spanClassName={`w-56 text-end font-medium flex-shrink-0`}
                name={"appointment_color"}
                onChange={handleChange}
                value={values.appointment_color}
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
                name={"zoom_pmi"}
                onChange={handleChange}
                value={values.zoom_pmi}
              />

              <label className="inline-flex gap-5 items-center w-full">
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
  );
};

export const LocationModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const handleCancel = () => navigate(-1);

  return (
    <Fragment>
      <form className={"space-y-5"}>
        <div className="grid grid-cols-2 gap-5 px-5">
          <div className={"space-y-5"}>
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Location name"}
              placeholder={"Location name"}
              spanClassName={
                "text-sm font-medium w-32 flex-shrink-0 text-right"
              }
              colorBorder={colorsObject.primary}
            />
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Location name"}
              placeholder={"Location Code *"}
              spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              colorBorder={colorsObject.primary}
            />

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-32 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Location Status
              </span>
              <CustomSelect
                placeholder={"Location Status *"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-32 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Location Type
              </span>

              <div className="space-y-4">
                <CustomCheckBox
                  className={"space-x-2.5 "}
                  classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                >
                  <span className={"text-sm flex-shrink-0 font-medium w-32"}>
                    Main office only
                  </span>
                </CustomCheckBox>

                <CustomCheckBox
                  className={"space-x-2.5 "}
                  classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                >
                  <span className={"text-sm flex-shrink-0 font-medium w-32"}>
                    Main office with classroom
                  </span>
                </CustomCheckBox>

                <CustomCheckBox
                  className={"space-x-2.5 "}
                  classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                >
                  <span className={"text-sm flex-shrink-0 font-medium w-32"}>
                    Class Room
                  </span>
                </CustomCheckBox>

                <CustomCheckBox
                  className={"space-x-2.5 "}
                  classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                >
                  <span className={"text-sm flex-shrink-0 font-medium w-32"}>
                    Other (Satellite Office Only)
                  </span>
                </CustomCheckBox>

                <CustomCheckBox
                  className={"space-x-2.5 "}
                  classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                >
                  <span className={"text-sm flex-shrink-0 font-medium w-32"}>
                    Other Classroom (Satellite Office with Classroom)
                  </span>
                </CustomCheckBox>

                <CustomCheckBox
                  className={"space-x-2.5 "}
                  classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                >
                  <span className={"text-sm flex-shrink-0 font-medium w-32"}>
                    Range
                  </span>
                </CustomCheckBox>
              </div>
            </label>

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Address"}
              placeholder={"Address"}
              spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"City"}
              placeholder={"City"}
              spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"State"}
              placeholder={"State"}
              spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Zip"}
              placeholder={"Zip"}
              spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Location Manager"}
              placeholder={"Location Manager"}
              spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-32 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Pickup location
              </span>
              <CustomSelect
                placeholder={"Pickup location"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-32 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Drop off location
              </span>
              <CustomSelect
                placeholder={"Drop off location"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"County"}
              placeholder={"County"}
              spanClassName={`text-sm font-medium w-32 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
          </div>
          <div className={"space-y-5"}>
            <CustomCheckBox
              className={"space-x-2.5 w-full justify-center h-[50px]"}
              classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
            >
              <span className={"text-sm flex-shrink-0 font-medium w-56"}>
                Road Test
              </span>
            </CustomCheckBox>
            <CustomCheckBox
              className={"space-x-2.5 w-full justify-center"}
              classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
            >
              <span className={"text-sm flex-shrink-0 font-medium w-56"}>
                Knowledge Test
              </span>
            </CustomCheckBox>
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Phone Main"}
              placeholder={"Phone Main"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Fax"}
              placeholder={"Fax"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
            <label className="inline-flex justify-end gap-8 items-center w-full">
              <span className="text-right">Area Coverage</span>
              <CustomTransfer
                dataSource={mockData}
                titles={["Source", "Target"]}
                colorBorder={colorsObject.primary}
                colorBgContainer={"transparent"}
                headerHeight={30}
                listHeight={200}
              />
            </label>
            <label className="inline-flex justify-end gap-8 items-center w-full">
              <span className="text-sm flex-shrink-0 font-medium w-56 text-right">
                Location note
              </span>
              <textarea
                className={`p-3 min-h-[240px] w-full outline-0 border border-indigo-600 shadow-2xl rounded-lg`}
              ></textarea>
            </label>
            <CustomCheckBox
              className={"space-x-2.5 w-full justify-center pl-8"}
              classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
            >
              <span className={"text-sm flex-shrink-0 font-medium w-56"}>
                Appointment Color
              </span>
            </CustomCheckBox>
            <label className="flex items-center gap-4 justify-center">
              <span>Color picker</span>
              <CustomCheckBox />
              <CustomInput
                classNames={
                  "inline-flex flex-row-reverse gap-8 items-center w-56 h-[50px]"
                }
                className={ManagementStyle["CheckModal__form-element__shadow"]}
                type="color"
                placeholder={"#FFFFFF"}
                colorBorder={colorsObject.primary}
              />
            </label>
            <CustomCheckBox
              className={"space-x-2.5 w-full justify-center pl-9"}
              classNames={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
            >
              <span className={"text-sm flex-shrink-0 font-medium w-56"}>
                Distance based scheduling
              </span>
            </CustomCheckBox>
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Distance Coverage in Miles"}
              placeholder={"Distance Coverage in Miles"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Provider Location Id"}
              placeholder={"Provider Location Id"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
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
            onClick={handleCancel}
          >
            Cancel
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};

export const AddSchoolModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const handleCancel = () => navigate(-1);

  return (
    <Fragment>
      <form className={"space-y-5"}>
        <div className="grid grid-cols-2 gap-5 px-5">
          <div className={"space-y-5"}>
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"School Name"}
              placeholder={"School Name"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right  relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              colorBorder={colorsObject.primary}
            />

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                School Status
              </span>
              <CustomSelect
                placeholder={"Location Status *"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"School Code"}
              placeholder={"School Code"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"School Address"}
              placeholder={"School Address"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"School City"}
              placeholder={"School City"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right`}
              >
                State
              </span>
              <CustomSelect
                placeholder={"Pickup location"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={"h-[50px]"}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Zip Code"}
              placeholder={"Zip Code"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              type={"email"}
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Email"}
              placeholder={"Email"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
          </div>
          <div>
            <label className="inline-flex justify-end gap-8 items-center w-full">
              <span>School notes</span>
              <textarea
                className={`p-3 outline-0 border border-indigo-600 shadow-2xl rounded-lg w-full min-h-[145px]`}
                placeholder={"School notes"}
              ></textarea>
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
            onClick={handleCancel}
          >
            Cancel
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};

export const HowHearModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const handleCancel = () => navigate(-1);

  return (
    <Fragment>
      <form className={"space-y-5"}>
        <div className="grid grid-cols-2 gap-5 px-5">
          <div className={"space-y-5"}>
            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Lead Name"}
              placeholder={"Lead Name"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right  relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              colorBorder={colorsObject.primary}
            />

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Lead Status
              </span>
              <CustomSelect
                placeholder={"Lead Status"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Lead Code"}
              placeholder={"Lead Code"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Lead Status
              </span>
              <DatePicker
                className={"w-full border border-indigo-600 h-[50px]"}
                placeholder={"DD/MM/YYYY"}
              />
            </label>
          </div>
          <div>
            <label className="inline-flex justify-end gap-8 items-center w-full">
              <span>School notes</span>
              <textarea
                className={`p-3 outline-0 border border-indigo-600 shadow-2xl rounded-lg w-full min-h-[145px]`}
                placeholder={"School notes"}
              ></textarea>
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
            onClick={handleCancel}
          >
            Cancel
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};

export const VehiclesModalContent = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const handleCancel = () => navigate(-1);

  return (
    <Fragment>
      <form className={"space-y-5 px-5"}>
        <div className="grid grid-cols-2 gap-5">
          <div className={"space-y-5"}>
            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Vehicle Name
              </span>
              <CustomSelect
                placeholder={"Vehicle Name"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right relative ${ManagementStyle["CheckModal__heavy"]} ${EnrollmentStyle["Enrollment__heavy"]}`}
              >
                Vehicle Status
              </span>
              <CustomSelect
                placeholder={"Vehicle Status"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right`}
              >
                At Location
              </span>
              <CustomSelect
                placeholder={"At Location"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <label className="inline-flex gap-8 items-center w-full">
              <span
                className={`text-sm flex-shrink-0 font-medium w-56 text-right `}
              >
                Vehicle Type
              </span>
              <CustomSelect
                placeholder={"Vehicle Type"}
                style={{ width: "100%" }}
                colorBorder={colorsObject.primary}
                className={`rounded h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                options={[
                  {
                    value: "Number",
                    label: "Number",
                  },
                ]}
              />
            </label>

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Vehicle No"}
              placeholder={"Vehicle No"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Vehicle Make"}
              placeholder={"Vehicle Make"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"License Plate"}
              placeholder={"License Plate"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"VIN#"}
              placeholder={"VIN#"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0 text-right`}
              colorBorder={colorsObject.primary}
            />
          </div>
          <div className={"space-y-5"}>
            <label className="inline-flex justify-end gap-8 items-center w-full">
              <span className={"flex-shrink-0 w-56"}>Appointment Color</span>

              <ColorPicker
                defaultValue="#000"
                showText={(color) => <span>{color.toHexString()}</span>}
                className={`w-full justify-start pl-2 border border-indigo-600 h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              />
            </label>

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Enable Appointment Color"}
              placeholder={"Enable Appointment Color"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Vehicle Note"}
              placeholder={"Vehicle Note"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Vehicle ESN Or AIR ID"}
              placeholder={"Vehicle ESN Or AIR ID"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Odometer Value"}
              placeholder={"Odometer Value"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0`}
              colorBorder={colorsObject.primary}
            />

            <CustomInput
              classNames={
                "inline-flex flex-row-reverse gap-8 items-center w-full h-[50px]"
              }
              className={ManagementStyle["CheckModal__form-element__shadow"]}
              spanText={"Vehicle Initial Mileage"}
              placeholder={"Vehicle Initial Mileage"}
              spanClassName={`text-sm font-medium w-56 flex-shrink-0`}
              colorBorder={colorsObject.primary}
            />

            <label className="inline-flex justify-end gap-8 items-center w-full">
              <span className={"flex-shrink-0 w-56"}>Vehicle Image</span>

              <div className="w-full ">@todo</div>
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
            onClick={handleCancel}
          >
            Cancel
          </ButtonComponent>
        </div>
      </form>
    </Fragment>
  );
};
