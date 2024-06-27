import { CustomSelect } from "@/components/form/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import { Form } from "antd";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const StudentContact = ({ className, children, ...props }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log(values);
  };

  return (
    <Fragment>
      <Helmet>
        <title>Student - Contact</title>
      </Helmet>
      <section className={"px-11 space-y-5 max-w-full w-full"} {...props}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={26}
          className={"pl-7"}
        >
          Contact
        </Title>

        <Paragraph className={"pl-7"}>
          Please select the location below to get address, phone, map, driving
          directions and more.
        </Paragraph>

        <div className="bg-white p-5 rounded-xl">
          <Form
            form={form}
            onFinish={onFinish}
            className={"grid grid-cols-2 gap-5"}
            layout={"vertical"}
          >
            <Form.Item label={"Location"}>
              <CustomSelect
                placeholder={"Select"}
                options={[{ value: "USA", label: "USA" }]}
              />
            </Form.Item>
            <Form.Item label={"Location"}>
              <CustomSelect
                placeholder={"Select"}
                options={[{ value: "USA", label: "USA" }]}
              />
            </Form.Item>
            <Form.Item label={"Location"}>
              <CustomSelect
                placeholder={"Select"}
                options={[{ value: "USA", label: "USA" }]}
              />
            </Form.Item>
            <Form.Item label={"Location"}>
              <CustomSelect
                placeholder={"Select"}
                options={[{ value: "USA", label: "USA" }]}
              />
            </Form.Item>
          </Form>
        </div>
      </section>
    </Fragment>
  );
};

export default StudentContact;
