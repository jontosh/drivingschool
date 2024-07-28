import ButtonComponent from "@/components/button/index.jsx";
import { CustomCheckBox } from "@/components/form/index.jsx";
import Modal from "@/components/modal/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import {
  StudentAccountEnrollmentModule,
  StudentAccountModule,
} from "@/modules/student-account.jsx";
import { ResultModalButton } from "@/pages/student/items/modal.jsx";
import { useRequestGetQuery, useRequestIdQuery } from "@/redux/query/index.jsx";
import MDEditor from "@uiw/react-md-editor";
import classNames from "classnames";
import { Fragment, useContext, useEffect, useReducer, useState } from "react";
import { Form, Modal as ModalComponent } from "antd";
import { useParams } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize";
import BillingStyle from "./student-account.module.scss";

const reduce = (state, action) => {
  switch (action.type) {
    case "print": {
      return {
        ...state,
        modal: (
          <ModalComponent
            open={action.open}
            onOk={action.onEvent}
            onCancel={action.onEvent}
            title={action.title}
            centered
            footer={null}
          >
            <Form form={action.form} onFinish={action.onFinish}>
              <Form.Item name="billing" valuePropName="checked">
                <CustomCheckBox>
                  <Paragraph>Billing</Paragraph>
                </CustomCheckBox>
              </Form.Item>

              <Form.Item name={"enrollment"} valuePropName="checked">
                <CustomCheckBox>
                  <Paragraph>Enrollment</Paragraph>
                </CustomCheckBox>
              </Form.Item>

              <Form.Item name={""} valuePropName="checked">
                <CustomCheckBox>
                  <Paragraph>
                    3/9/2024 Teens 8hr in car instruction $649.99
                  </Paragraph>
                </CustomCheckBox>
              </Form.Item>

              <div className="text-center space-x-5">
                <ButtonComponent
                  defaultBg={"#24C18F"}
                  defaultHoverBg={"#24C18F"}
                  paddingInline={43}
                  borderRadius={5}
                  type={"submit"}
                  controlHeight={50}
                >
                  Print
                </ButtonComponent>

                <ButtonComponent
                  paddingInline={43}
                  borderRadius={5}
                  onClick={action.onReset}
                  controlHeight={50}
                  defaultBorderColor={"#5459EA"}
                  defaultHoverBorderColor={"#5459EA"}
                  defaultColor={"#5459EA"}
                  defaultHoverColor={"#5459EA"}
                >
                  Cancel
                </ButtonComponent>
              </div>
            </Form>
          </ModalComponent>
        ),
      };
    }
    case "email": {
      return {
        ...state,
        modal: (
          <ModalComponent
            open={action.open}
            onOk={action.onEvent}
            onCancel={action.onEvent}
            title={action.title}
            centered
            footer={null}
          >
            <Form
              layout={"vertical"}
              form={action.form}
              onFinish={action.onFinish}
            >
              <Form.Item name={"email"} valuePropName="checked">
                <CustomCheckBox>
                  <Paragraph>
                    Student Email: {action.form.getFieldValue("email")}
                  </Paragraph>
                </CustomCheckBox>
              </Form.Item>

              <Form.Item name={"parent_email"} valuePropName="checked">
                <CustomCheckBox>
                  <Paragraph>
                    Parent Email: {action.form.getFieldValue("parent_email")}
                  </Paragraph>
                </CustomCheckBox>
              </Form.Item>

              <Form.Item name={"parent_2_email"} valuePropName="checked">
                <CustomCheckBox>
                  <Paragraph>
                    Parent 2 Email:{" "}
                    {action.form.getFieldValue("parent_2_email")}
                  </Paragraph>
                </CustomCheckBox>
              </Form.Item>

              <Form.Item name={"enrollment"} valuePropName="checked">
                <CustomCheckBox>
                  <Paragraph>Enrollemnt</Paragraph>
                </CustomCheckBox>
              </Form.Item>

              <Form.Item name={"teens"} valuePropName="checked">
                <CustomCheckBox>
                  <Paragraph>
                    3/9/2024 Teens 8hr in car instruction $649.99
                  </Paragraph>
                </CustomCheckBox>
              </Form.Item>

              <Form.Item name="" label="Enrollment And Billing Receipt">
                <MDEditor
                  placeholder="Text"
                  previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
                />
              </Form.Item>

              <div className="text-center space-x-5">
                <ButtonComponent
                  defaultBg={"#24C18F"}
                  defaultHoverBg={"#24C18F"}
                  paddingInline={43}
                  borderRadius={5}
                  type={"submit"}
                  controlHeight={50}
                >
                  Print
                </ButtonComponent>

                <ButtonComponent
                  paddingInline={43}
                  borderRadius={5}
                  onClick={action.onReset}
                  controlHeight={50}
                  defaultBorderColor={"#5459EA"}
                  defaultHoverBorderColor={"#5459EA"}
                  defaultColor={"#5459EA"}
                  defaultHoverColor={"#5459EA"}
                >
                  Cancel
                </ButtonComponent>
              </div>
            </Form>
          </ModalComponent>
        ),
      };
    }
    default: {
      console.error(`Unknown action: ${action.type}`);
      return state;
    }
  }
};

const Enrollment = () => {
  const { studentId } = useParams();

  const { data: Packages } = useRequestGetQuery({
    path: "/account_management/services/service/",
  });
  const { data: Instructor } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const { data: StudentData } = useRequestIdQuery({
    path: "/student_account/student",
    id: studentId,
  });

  const { colorsObject } = useContext(ColorsContext);
  const [IsOpen, setIsOpen] = useState(false);
  const { data, columns } = StudentAccountEnrollmentModule();
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [price, setPrice] = useState(0);
  const [form] = Form.useForm();
  const [state, dispatch] = useReducer(reduce, { modal: null, form });

  useEffect(() => {
    if (data && Packages && Instructor) {
      const enrollment = data
        .filter((item) => item.student === studentId)
        .map((item) => ({
          ...item,
          package: Packages.find((pkg) => pkg.id === item.package)?.name,
          instructorName: Instructor.find((inst) => inst.id === item.by)?.name,
        }));
      const totalPrice = enrollment.reduce((sum, item) => sum + item.price, 0);
      setEnrollmentData(enrollment);
      setPrice(totalPrice);
    }
  }, [data, Packages, Instructor, studentId]);

  const handlePrint = () => {
    dispatch({
      type: "print",
      title: "Print Enrollments and Billing Information",
      onEvent: () => setIsOpen((prev) => !prev),
      onFinish: (values) => {
        console.log(values);
      },
      onReset: () => {
        form.resetFields();
        setIsOpen(false);
      },
      form: form,
      open: !IsOpen,
    });
  };

  const handleEmail = () => {
    form.setFieldsValue(StudentData);
    dispatch({
      type: "email",
      title: "Print Enrollments and Billing Information",
      onEvent: () => setIsOpen((prev) => !prev),
      onFinish: (values) => {
        console.log(values);
      },
      onReset: () => {
        form.resetFields();
        setIsOpen(false);
      },
      form: form,
      open: !IsOpen,
    });
  };

  return (
    <Fragment>
      <div className="border shadow-2xl border-indigo-700 px-10 py-5 rounded-2xl">
        <div className="-mx-10 px-3 md:px-10 border-b pb-5 border-b-gray-400 flex items-center flex-col md:flex-row max-md:space-y-2.5 justify-between">
          <Title level={2} fontSize={"text-xl space-x-2"}>
            <span className="text-indigo-700">Enrollment</span>
            <span className={"text-[#24C18F]"}>${price}</span>
          </Title>
          <div className="grid min-[500px]:grid-cols-3 gap-2 max-md:w-full">
            <ButtonComponent
              defaultBg={"#24C18F"}
              defaultHoverBg={"#3CE3AE"}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={16}
              fontSize={14}
              borderRadius={5}
            >
              + Add new
            </ButtonComponent>
            <ButtonComponent
              defaultBg={colorsObject.orange}
              defaultHoverBg={colorsObject.orange}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={29}
              fontSize={14}
              borderRadius={5}
              onClick={handleEmail}
            >
              Email
            </ButtonComponent>
            <ButtonComponent
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.info}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={29}
              fontSize={14}
              borderRadius={5}
              onClick={handlePrint}
            >
              Print
            </ButtonComponent>
          </div>
        </div>
        <div className="pt-5 -mx-10">
          <TableComponent columns={columns} data={enrollmentData} />
        </div>
        {state?.modal}
      </div>
    </Fragment>
  );
};

const Billings = () => {
  const { data: Instructor } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const { colorsObject } = useContext(ColorsContext);
  const { studentId } = useParams();
  const { data, columns } = StudentAccountModule();
  const [isOpen, setIsOpen] = useState(false);
  const [modalCase, setModalCase] = useState("");
  const [billingData, setBillingData] = useState([]);
  const { ResultOfModalContent } = ResultModalButton(modalCase);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (data) {
      const studentData = data.filter((item) => item.student === studentId);
      const totalPrice = studentData.reduce((sum, item) => sum + item.price, 0);
      setBillingData(studentData);
      setPrice(totalPrice);
    }
  }, [data, studentId]);

  const handleModal = (typeModal = "") => {
    setIsOpen((prev) => !prev);
    setModalCase(typeModal);
  };

  return (
    <Fragment>
      <div className="border shadow-2xl border-indigo-700 px-10 py-5 rounded-2xl">
        <div className="-mx-10 px-3 md:px-10 border-b pb-5 border-b-gray-400 flex items-center flex-col md:flex-row max-md:space-y-2.5 justify-between">
          <Title level={2} fontSize={"text-xl space-x-2"}>
            <span className="text-indigo-700">Billing</span>
            <span className={"text-[#24C18F]"}>${price}</span>
          </Title>
          <div className="grid min-[500px]:grid-cols-3 gap-2 max-md:w-full">
            <ButtonComponent
              defaultBg={"#24C18F"}
              defaultHoverBg={"#3CE3AE"}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={16}
              fontSize={14}
              borderRadius={5}
            >
              + Add new
            </ButtonComponent>
            <ButtonComponent
              defaultBg={colorsObject.orange}
              defaultHoverBg={colorsObject.orange}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={29}
              fontSize={14}
              borderRadius={5}
              onClick={() => handleModal("email")}
            >
              Email
            </ButtonComponent>
            <ButtonComponent
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.info}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={29}
              fontSize={14}
              borderRadius={5}
              onClick={() => handleModal("print")}
            >
              Print
            </ButtonComponent>
          </div>
        </div>
        <div className="pt-5 -mx-10">
          <TableComponent columns={columns} data={billingData} />
        </div>
        {isOpen && (
          <Modal setIsOpen={setIsOpen}>
            <div
              className={classNames(
                "py-6 px-8 bg-white rounded-2xl w-full",
                BillingStyle["Modal__content"],
              )}
            >
              <ResultOfModalContent
                modalButton={modalCase}
                handleClose={() => setIsOpen(false)}
              />
            </div>
          </Modal>
        )}
      </div>
    </Fragment>
  );
};

export const Billing = () => {
  return (
    <div className={"space-y-8"}>
      <Enrollment />
      <Billings />
    </div>
  );
};
