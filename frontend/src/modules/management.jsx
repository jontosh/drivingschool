import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomCheckBox,
  CustomInput,
  CustomRadio,
  CustomSelect,
  SelectCheckbox,
  SwitchCustom,
} from "@/components/form/index.jsx";
import EnrollmentStyle from "@/pages/enrollment/enrollment.module.scss";
import ManagementStyle from "@/pages/managment/management.module.scss";
import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph, Text } from "@/components/title/index.jsx";
import AccountManagementContext from "@/context/account-management.jsx";
import { AlertDelete, AlertEdit } from "@/hooks/alert.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import { StatusSelect } from "@/pages/managment/service/index.jsx";
import { useRequestDeleteMutation } from "@/redux/query/index.jsx";
import {
  DeleteOutlined,
  ExportOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Formik } from "formik";
import { Fragment, useContext, useState, useHistory, useEffect } from "react";
import { FiHelpCircle } from "react-icons/fi";
import { GoClock, GoEye } from "react-icons/go";
import { TbActivityHeartbeat } from "react-icons/tb";
import MDEditor from "@uiw/react-md-editor";
import { useLocation } from "react-router-dom";

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
          <Paragraph className={"text-start pl-[285px]"} fontSize={"text-lg"}>
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
  const [DisplayQuizNameToStudent, setDisplayQuizNameToStudent] =
    useState(false);

  const handleDisplayQuizNameToStudent = () =>
    setDisplayQuizNameToStudent(!DisplayQuizNameToStudent);

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
            <div className="grid grid-cols-3 gap-5">
              <div className="space-y-5">
                <div className={"flex gap-3"}>
                  <CustomInput
                    colorBorder={"#DEE2E6"}
                    spanText={"Quiz name"}
                    spanClassName={"font-medium"}
                    fontSize="text-base"
                    placeholder={"Quiz name"}
                    className={`h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    classNames={
                      "inline-flex w-full flex-col-reverse gap-1.5 h-[76px]"
                    }
                    name="student_name"
                    value={values.student_name}
                    onChange={handleChange}
                  />
                  <span className={"pb-2 pt-[41px]"}>
                    <FiHelpCircle
                      className={"text-xl text-[#98A2B3] cursor-pointer"}
                    />
                  </span>
                </div>

                <label className={"space-y-1.5"}>
                  <span className={"text-base font-medium w-full"}>
                    Display Quiz Name to Student
                  </span>
                  <SwitchCustom
                    checked={DisplayQuizNameToStudent}
                    onChange={handleDisplayQuizNameToStudent}
                  />
                </label>

                <div className={"flex items-center gap-3"}>
                  <label className="space-y-1.5 w-full">
                    <span
                      className={`text-base font-medium w-full relative ${EnrollmentStyle["Enrollment__heavy"]} after:left-20`}
                    >
                      Status
                    </span>

                    <CustomSelect
                      placeholder={"Select Status"}
                      className={`w-full font-medium h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                      fontSize={"text-base"}
                      options={StatusSelect}
                    />
                  </label>
                  <span className={"pb-2 pt-[41px]"}>
                    <FiHelpCircle
                      className={"text-xl text-[#98A2B3] cursor-pointer"}
                    />
                  </span>
                </div>

                <div className={"flex gap-3"}>
                  <CustomInput
                    colorBorder={"#DEE2E6"}
                    spanText={"# Of Questions Displayed to Student"}
                    spanClassName={"font-medium"}
                    fontSize="text-base"
                    placeholder={"Quiz name"}
                    className={`h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    classNames={`inline-flex w-full flex-col-reverse gap-1.5 h-[76px] relative ${EnrollmentStyle["Enrollment__heavy"]} after:right-5`}
                    name="student_name"
                    value={values.student_name}
                    onChange={handleChange}
                  />
                  <span className={"pb-2 pt-[41px]"}>
                    <FiHelpCircle
                      className={"text-xl text-[#98A2B3] cursor-pointer"}
                    />
                  </span>
                </div>

                <label className={"space-y-1.5"}>
                  <span className={"text-base font-medium w-full"}>
                    Final Exam
                  </span>
                  <SwitchCustom
                    checked={DisplayQuizNameToStudent}
                    onChange={handleDisplayQuizNameToStudent}
                  />
                </label>

                <div className={"flex gap-3"}>
                  <CustomInput
                    colorBorder={"#DEE2E6"}
                    spanText={"Associate with This Class Session"}
                    spanClassName={"font-medium"}
                    fontSize="text-base"
                    placeholder={"Quiz name"}
                    className={`h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    classNames={
                      "inline-flex w-full flex-col-reverse gap-1.5 h-[76px]"
                    }
                    name="student_name"
                    value={values.student_name}
                    onChange={handleChange}
                  />
                  <span className={"pb-2 pt-[41px]"}>
                    <FiHelpCircle
                      className={"text-xl text-[#98A2B3] cursor-pointer"}
                    />
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between align-items">
                    <span className={"text-base font-normal w-full"}>
                      Pass Feedback
                    </span>

                    <span>
                      <FiHelpCircle
                        className={"w-5 text-[#98A2B3] cursor-pointer"}
                      />
                    </span>
                  </div>

                  <MDEditor />
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <label className={"space-y-1.5"}>
                    <span className={"text-base font-medium w-full"}>
                      Attendance Required for Associated Session only
                    </span>
                    <SwitchCustom
                      checked={DisplayQuizNameToStudent}
                      onChange={handleDisplayQuizNameToStudent}
                    />
                  </label>

                  <span className="pt-6">
                    <FiHelpCircle
                      className={"w-5 text-[#98A2B3] cursor-pointer"}
                    />
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <label className={"space-y-1.5"}>
                    <span className={"text-base font-medium w-full"}>
                      Attendance Required for Preceding and Associated CR
                      Sessions
                    </span>
                    <SwitchCustom
                      checked={DisplayQuizNameToStudent}
                      onChange={handleDisplayQuizNameToStudent}
                    />
                  </label>

                  <span className="pt-6">
                    <FiHelpCircle
                      className={"w-5 text-[#98A2B3] cursor-pointer"}
                    />
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <label className={"space-y-1.5"}>
                    <span className={"text-base font-medium w-full"}>
                      Attendance Required for All Preceding CR Sessions Only
                    </span>
                    <SwitchCustom
                      checked={DisplayQuizNameToStudent}
                      onChange={handleDisplayQuizNameToStudent}
                    />
                  </label>

                  <span className="pt-6">
                    <FiHelpCircle
                      className={"w-5 text-[#98A2B3] cursor-pointer"}
                    />
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <label className={"space-y-1.5"}>
                    <span className={"text-base font-medium w-full"}>
                      Display Progress Bar During Quiz
                    </span>
                    <SwitchCustom
                      checked={DisplayQuizNameToStudent}
                      onChange={handleDisplayQuizNameToStudent}
                    />
                  </label>

                  <span className="pt-6">
                    <FiHelpCircle
                      className={"w-5 text-[#98A2B3] cursor-pointer"}
                    />
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <label className={"space-y-1.5"}>
                    <span className={"text-base font-medium w-full"}>
                      Randomize Questions Order
                    </span>
                    <SwitchCustom
                      checked={DisplayQuizNameToStudent}
                      onChange={handleDisplayQuizNameToStudent}
                    />
                  </label>

                  <span className="pt-6">
                    <FiHelpCircle
                      className={"w-5 text-[#98A2B3] cursor-pointer"}
                    />
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <label className={"space-y-1.5"}>
                    <span className={"text-base font-medium w-full"}>
                      Enable Quiz Timer
                    </span>
                    <SwitchCustom
                      checked={DisplayQuizNameToStudent}
                      onChange={handleDisplayQuizNameToStudent}
                    />
                  </label>

                  <span className="pt-6">
                    <FiHelpCircle
                      className={"w-5 text-[#98A2B3] cursor-pointer"}
                    />
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <label className={"space-y-1.5"}>
                    <span className={"text-base font-medium w-full"}>
                      Allow Students to View Completed Quizzes
                    </span>
                    <SwitchCustom
                      checked={DisplayQuizNameToStudent}
                      onChange={handleDisplayQuizNameToStudent}
                    />
                  </label>

                  <span className="pt-6">
                    <FiHelpCircle
                      className={"w-5 text-[#98A2B3] cursor-pointer"}
                    />
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between align-items">
                    <span className={"text-base font-normal w-full"}>
                      Fail Feedback
                    </span>

                    <span>
                      <FiHelpCircle
                        className={"w-5 text-[#98A2B3] cursor-pointer"}
                      />
                    </span>
                  </div>

                  <MDEditor />
                </div>
              </div>

              <div className="space-y-5">
                <div className="w-full flex items-center gap-3">
                  <label className={"w-full space-y-1.5"}>
                    <span className={"text-base font-medium w-full"}>
                      Associate with Service
                    </span>
                    <SelectCheckbox
                      placeholder={"Select Service(s)"}
                      className={`${ManagementStyle["CheckModal__form-element__shadow"]}`}
                      options={[
                        {
                          label: "Something",
                          value: "Something",
                        },
                        {
                          label: "Anything",
                          value: "Anything",
                        },
                        {
                          label: "Nothing",
                          value: "Nothing",
                        },
                      ]}
                    />
                  </label>

                  <span className="pt-7">
                    <FiHelpCircle
                      className={"w-5 text-[#98A2B3] cursor-pointer"}
                    />
                  </span>
                </div>

                <div className="w-full flex items-center gap-3">
                  <label className={"w-full space-y-1.5"}>
                    <span
                      className={`text-base font-medium w-full relative ${EnrollmentStyle["Enrollment__heavy"]} after:right-1/3`}
                    >
                      Associate with CR Service
                    </span>
                    <SelectCheckbox
                      placeholder={"Select Service(s)"}
                      className={`${ManagementStyle["CheckModal__form-element__shadow"]}`}
                      options={[
                        {
                          label: "Something",
                          value: "Something",
                        },
                        {
                          label: "Anything",
                          value: "Anything",
                        },
                        {
                          label: "Nothing",
                          value: "Nothing",
                        },
                      ]}
                    />
                  </label>

                  <span className="pt-7">
                    <FiHelpCircle
                      className={"w-5 text-[#98A2B3] cursor-pointer"}
                    />
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between align-items">
                    <span className={"text-base font-normal w-full"}>
                      Welcome Text
                    </span>

                    <span>
                      <FiHelpCircle
                        className={"w-5 text-[#98A2B3] cursor-pointer"}
                      />
                    </span>
                  </div>

                  <MDEditor />
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

const MultipleChoice = ({ ...props }) => {
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
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className={"text-base font-medium w-full"}>
                    QUESTION
                  </span>

                  <MDEditor />
                </div>

                <label className="space-y-2.5 w-full">
                  <span className={"text-base font-medium w-full"}>
                    CHOICE OF ANSWERS
                  </span>

                  <CustomSelect
                    placeholder={"Select Status"}
                    className={`w-full font-medium h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    fontSize={"text-base"}
                    options={[
                      {
                        label: "Something",
                        value: "Something",
                      },
                      {
                        label: "Anything",
                        value: "Anything",
                      },
                      {
                        label: "Nothing",
                        value: "Nothing",
                      },
                    ]}
                  />

                  <CustomCheckBox>
                    <span className={"text-base font-medium w-full"}>
                      correct answer
                    </span>
                  </CustomCheckBox>
                </label>

                <label className="space-y-2.5 w-full">
                  <span className={"text-base font-medium w-full"}>
                    CHOICE OF ANSWERS
                  </span>

                  <CustomSelect
                    placeholder={"Select Status"}
                    className={`w-full font-medium h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    fontSize={"text-base"}
                    options={[
                      {
                        label: "Something",
                        value: "Something",
                      },
                      {
                        label: "Anything",
                        value: "Anything",
                      },
                      {
                        label: "Nothing",
                        value: "Nothing",
                      },
                    ]}
                  />

                  <CustomCheckBox>
                    <span className={"text-base font-medium w-full"}>
                      correct answer
                    </span>
                  </CustomCheckBox>
                </label>

                <label className="space-y-2.5 w-full">
                  <span className={"text-base font-medium w-full"}>
                    CHOICE OF ANSWERS
                  </span>

                  <CustomSelect
                    placeholder={"Select Status"}
                    className={`w-full font-medium h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    fontSize={"text-base"}
                    options={[
                      {
                        label: "Something",
                        value: "Something",
                      },
                      {
                        label: "Anything",
                        value: "Anything",
                      },
                      {
                        label: "Nothing",
                        value: "Nothing",
                      },
                    ]}
                  />

                  <CustomCheckBox>
                    <span className={"text-base font-medium w-full"}>
                      correct answer
                    </span>
                  </CustomCheckBox>
                </label>

                <label className="space-y-2.5 w-full">
                  <span className={"text-base font-medium w-full"}>
                    CHOICE OF ANSWERS
                  </span>

                  <CustomSelect
                    placeholder={"Select Status"}
                    className={`w-full font-medium h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    fontSize={"text-base"}
                    options={[
                      {
                        label: "Something",
                        value: "Something",
                      },
                      {
                        label: "Anything",
                        value: "Anything",
                      },
                      {
                        label: "Nothing",
                        value: "Nothing",
                      },
                    ]}
                  />

                  <CustomCheckBox>
                    <span className={"text-base font-medium w-full"}>
                      correct answer
                    </span>
                  </CustomCheckBox>
                </label>

                <ButtonComponent
                  defaultBg="#1890FF"
                  defaultHoverBg="#4BA9FF"
                  borderRadius={5}
                  paddingInline={48}
                >
                  Add another option
                </ButtonComponent>
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
                    <span className="text-2xl">6</span> What is the problem that
                    you’re trying to solve or goals of this design?
                  </Paragraph>

                  <div className="pr-10">
                    <span className="py-2.5 px-5 rounded-2xl w-full bg-gray-300 text-gray-600 font-normal text-sm">
                      The objective of this user flow is to map out...
                    </span>
                  </div>
                </div>{" "}
                <div className="space-y-1.5">
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

const TrueFalse = ({ ...props }) => {
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
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className={"text-base font-medium w-full"}>
                    QUESTION
                  </span>

                  <MDEditor />
                </div>

                <label className="space-y-2.5 w-full">
                  <span className={"text-base font-medium w-full"}>
                    CHOICE OF ANSWERS
                  </span>

                  <CustomSelect
                    placeholder={"Select Status"}
                    className={`w-full font-medium h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    fontSize={"text-base"}
                    options={[
                      {
                        label: "True",
                        value: "True",
                      },
                      {
                        label: "False",
                        value: "False",
                      },
                      {
                        label: "Nothing",
                        value: "Nothing",
                      },
                    ]}
                  />

                  <CustomCheckBox>
                    <span className={"text-base font-medium w-full"}>
                      correct answer
                    </span>
                  </CustomCheckBox>
                </label>

                <label className="space-y-2.5 w-full">
                  <span className={"text-base font-medium w-full"}>
                    CHOICE OF ANSWERS
                  </span>

                  <CustomSelect
                    placeholder={"Select Status"}
                    className={`w-full font-medium h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    fontSize={"text-base"}
                    options={[
                      {
                        label: "True",
                        value: "True",
                      },
                      {
                        label: "False",
                        value: "False",
                      },
                      {
                        label: "Nothing",
                        value: "Nothing",
                      },
                    ]}
                  />

                  <CustomCheckBox>
                    <span className={"text-base font-medium w-full"}>
                      correct answer
                    </span>
                  </CustomCheckBox>
                </label>
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
                    <span className="text-2xl">6</span> What is the problem that
                    you’re trying to solve or goals of this design?
                  </Paragraph>

                  <div className="pr-10">
                    <span className="py-2.5 px-5 rounded-2xl w-full bg-gray-300 text-gray-600 font-normal text-sm">
                      The objective of this user flow is to map out...
                    </span>
                  </div>
                </div>{" "}
                <div className="space-y-1.5">
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

const Category = ({ ...props }) => {
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
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className={"text-base font-medium w-full"}>
                    QUESTION
                  </span>

                  <MDEditor />
                </div>

                <label className="space-y-2.5 w-full">
                  <span className={"text-base font-medium w-full"}>
                    CHOICE OF ANSWERS
                  </span>

                  <CustomSelect
                    placeholder={"Select Status"}
                    className={`w-full font-medium h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    fontSize={"text-base"}
                    options={[
                      {
                        label: "Something",
                        value: "Something",
                      },
                      {
                        label: "Anything",
                        value: "Anything",
                      },
                      {
                        label: "Nothing",
                        value: "Nothing",
                      },
                    ]}
                  />

                  <CustomCheckBox>
                    <span className={"text-base font-medium w-full"}>
                      correct answer
                    </span>
                  </CustomCheckBox>
                </label>

                <label className="space-y-2.5 w-full">
                  <span className={"text-base font-medium w-full"}>
                    CHOICE OF ANSWERS
                  </span>

                  <CustomSelect
                    placeholder={"Select Status"}
                    className={`w-full font-medium h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    fontSize={"text-base"}
                    options={[
                      {
                        label: "Something",
                        value: "Something",
                      },
                      {
                        label: "Anything",
                        value: "Anything",
                      },
                      {
                        label: "Nothing",
                        value: "Nothing",
                      },
                    ]}
                  />

                  <CustomCheckBox>
                    <span className={"text-base font-medium w-full"}>
                      correct answer
                    </span>
                  </CustomCheckBox>
                </label>

                <label className="space-y-2.5 w-full">
                  <span className={"text-base font-medium w-full"}>
                    CHOICE OF ANSWERS
                  </span>

                  <CustomSelect
                    placeholder={"Select Status"}
                    className={`w-full font-medium h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    fontSize={"text-base"}
                    options={[
                      {
                        label: "Something",
                        value: "Something",
                      },
                      {
                        label: "Anything",
                        value: "Anything",
                      },
                      {
                        label: "Nothing",
                        value: "Nothing",
                      },
                    ]}
                  />

                  <CustomCheckBox>
                    <span className={"text-base font-medium w-full"}>
                      correct answer
                    </span>
                  </CustomCheckBox>
                </label>

                <label className="space-y-2.5 w-full">
                  <span className={"text-base font-medium w-full"}>
                    CHOICE OF ANSWERS
                  </span>

                  <CustomSelect
                    placeholder={"Select Status"}
                    className={`w-full font-medium h-[50px] ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    fontSize={"text-base"}
                    options={[
                      {
                        label: "Something",
                        value: "Something",
                      },
                      {
                        label: "Anything",
                        value: "Anything",
                      },
                      {
                        label: "Nothing",
                        value: "Nothing",
                      },
                    ]}
                  />

                  <CustomCheckBox>
                    <span className={"text-base font-medium w-full"}>
                      correct answer
                    </span>
                  </CustomCheckBox>
                </label>

                <ButtonComponent
                  defaultBg="#1890FF"
                  defaultHoverBg="#4BA9FF"
                  borderRadius={5}
                  paddingInline={48}
                >
                  Add another option
                </ButtonComponent>
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
                    <span className="text-2xl">6</span> What is the problem that
                    you’re trying to solve or goals of this design?
                  </Paragraph>

                  <div className="pr-10">
                    <span className="py-2.5 px-5 rounded-2xl w-full bg-gray-300 text-gray-600 font-normal text-sm">
                      The objective of this user flow is to map out...
                    </span>
                  </div>
                </div>{" "}
                <div className="space-y-1.5">
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
                  <Paragraph
                    className={"text-base font-semibold text-gray-600"}
                  >
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
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

const Preview = ({ ...props }) => {
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
            <div className="flex gap-10">
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
      children: <MultipleChoice /> && <TrueFalse /> && <Category />,
    },
    {
      key: "3",
      label: <span className={"uppercase"}>REARRANGE ORDER</span>,
      children: <span>REARRANGE</span>,
    },
    {
      key: "4",
      label: <span className={"uppercase"}>Preview QUIZ</span>,
      children: <Preview />,
    },
  ].map((item) => {
    return { ...item };
  });
};
