import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Form } from "antd";
import { Fragment, useContext } from "react";

export const ZipCode = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Fragment>
      <title>Configuration - ZIP CODE</title>
      <div className={`bg-white rounded-2xl p-5`}>
        <Form form={form} layout={"vertical"} onFinish={onFinish}>
          <Form.Item
            name={"zip_code"}
            label={"Add new zip code"}
            className={"relative"}
            rules={[
              {
                required: true,
                message: "Please input your zip code",
              },
            ]}
          >
            <CustomInput
              classNames={"w-full h-[50px] "}
              placeholder={"Add new zip code"}
            />

            <ButtonComponent
              paddingInline={43}
              controlHeight={48}
              borderRadius={5}
              defaultBg={colorsObject.success}
              defaultHoverBg={colorsObject.successHover}
              className={"absolute top-px right-px"}
              type={"submit"}
            >
              Add
            </ButtonComponent>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
};
