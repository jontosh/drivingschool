import ButtonComponent from "@/components/button/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import {
  StudentAccountEnrollmentModule,
  StudentAccountModule,
} from "@/modules/student-account.jsx";
import { useRequestGetQuery, useRequestIdQuery } from "@/redux/query/index.jsx";
import { Fragment, useContext, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";
import { Editor } from "@/components/editor";
const onEmail = (Student, form) => {
  const onFinish = async (values) => {
    console.log(values);
  };

  Modal.info({
    title: "Email enrollment and/or Billing",
    width: 1020,
    content: (
      <Form form={form} onFinish={onFinish}>
        <Form.Item name={"email"} className={"mb-2"}>
          <Checkbox>
            <b className={"font-semibold"}>Student Email: {Student?.email}</b>
          </Checkbox>
        </Form.Item>

        <Form.Item name={"parent_email"} className={"mb-2"}>
          <Checkbox>
            <b className={"font-semibold"}>
              Parent Email: {Student?.parent_email ?? "Not found"}
            </b>
          </Checkbox>
        </Form.Item>

        <Form.Item name={"parent_2_email"} className={"mb-2"}>
          <Checkbox>
            <b className={"font-semibold"}>
              Parent Email 2: {Student?.parent_2_email ?? "Not found"}
            </b>
          </Checkbox>
        </Form.Item>

        <Form.Item name={"enrollment"} className={"mb-2"}>
          <Checkbox>
            <b className={"font-semibold"}>Enrollment</b>
          </Checkbox>
        </Form.Item>

        <Form.Item name={"start_date"} className={"mb-2"}>
          <Checkbox>
            <b className={"font-semibold"}>
              3/9/2024 Teens 8hr in car instruction $649.99
            </b>
          </Checkbox>
        </Form.Item>

        <Form.Item
          name={"subject"}
          rules={[
            {
              required: true,
              message: "Subject is required!",
            },
          ]}
        >
          <Input className={"h-[50px]"} placeholder={"Subject"} />
        </Form.Item>

        <Form.Item name={"body"}>
          <Editor />
        </Form.Item>

        <Button type={"primary"} htmlType={"submit"}>
          Send
        </Button>
      </Form>
    ),
  });
};

const onPrint = (form) => {
  const onFinish = async (values) => {
    console.log(values);
  };

  Modal.info({
    title: "Print Enrollments and Billing Information",
    content: (
      <Form form={form} onFinish={onFinish}>
        <Form.Item name={"bill"} className={"mb-2"}>
          <Checkbox>
            <b className={"font-semibold"}>Billing</b>
          </Checkbox>
        </Form.Item>

        <Form.Item name={"enrollment"} className={"mb-2"}>
          <Checkbox>
            <b className={"font-semibold"}>Enrollment</b>
          </Checkbox>
        </Form.Item>

        <Form.Item name={"start_date"} className={"mb-2"}>
          <Checkbox>
            <b className={"font-semibold"}>
              3/9/2024 Teens 8hr in car instruction $649.99
            </b>
          </Checkbox>
        </Form.Item>

        <Button type={"primary"} htmlType={"submit"}>
          Print
        </Button>
      </Form>
    ),
  });
};

const Enrollment = () => {
  const studentId = useURLSearchParams("studentId");
  const { data: Student } = useRequestIdQuery({
    path: "/student_account/student",
    id: studentId,
  });
  const { colorsObject } = useContext(ColorsContext);
  const [form] = Form.useForm();

  const { data, columns } = StudentAccountEnrollmentModule();
  const totalPrice = data?.reduce((cur, acc) => cur + acc?.price, 0);

  return (
    <Fragment>
      <div className="border shadow-2xl border-indigo-700 px-10 py-5 rounded-2xl">
        <div className="-mx-10 px-3 md:px-10 border-b pb-5 border-b-gray-400 flex items-center flex-col md:flex-row max-md:space-y-2.5 justify-between">
          <Title level={2} fontSize="text-xl space-x-2">
            <span className="text-indigo-700">Enrollment</span>
            <span className="text-[#24C18F]">${totalPrice}</span>
          </Title>
          <div className="grid min-[500px]:grid-cols-3 gap-2 max-md:w-full">
            <ButtonComponent
              defaultBg="#24C18F"
              defaultHoverBg="#3CE3AE"
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
              onClick={() => onEmail(Student, form)}
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
              onClick={() => onPrint(form)}
            >
              Print
            </ButtonComponent>
          </div>
        </div>
        <div className="pt-5 -mx-10">
          <TableComponent columns={columns} data={data} />
        </div>
      </div>
    </Fragment>
  );
};

const Billings = () => {
  const studentId = useURLSearchParams("studentId");
  const { colorsObject } = useContext(ColorsContext);
  const { data, columns } = StudentAccountModule();
  const [form] = Form.useForm();

  const { data: StudentAPI } = useRequestIdQuery({
    path: "/student_account/student",
    id: studentId,
  });

  const totalPrice = data?.reduce((cur, acc) => cur + acc?.price, 0);

  return (
    <Fragment>
      <div className="border shadow-2xl border-indigo-700 px-10 py-5 rounded-2xl">
        <div className="-mx-10 px-3 md:px-10 border-b pb-5 border-b-gray-400 flex items-center flex-col md:flex-row max-md:space-y-2.5 justify-between">
          <Title level={2} fontSize={"text-xl space-x-2"}>
            <span className="text-indigo-700">Billing</span>
            <span className={"text-[#24C18F]"}>${totalPrice}</span>
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
              onClick={() => onEmail(StudentAPI, form)}
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
              onClick={() => onPrint(form)}
            >
              Print
            </ButtonComponent>
          </div>
        </div>
        <div className="pt-5 -mx-10">
          <TableComponent columns={columns} data={data} />
        </div>
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
