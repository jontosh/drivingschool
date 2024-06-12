import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { AlertError, AlertSuccess } from "@/hooks/alert.jsx";
import { useRequestPostMutation } from "@/redux/query/index.jsx";
import { Form, Input } from "antd";
import { Fragment, useContext, useReducer, useState } from "react";
import { Helmet } from "react-helmet";

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

export const Company = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [form] = Form.useForm();
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });
  const [requestPost] = useRequestPostMutation();

  const onFinish = async (values) => {
    try {
      const res = await requestPost({
        path: "/configuration/company/",
        data: values,
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

  const handleState = (values) => {
    form.setFieldsValue({
      state: values,
    });
  };

  return (
    <Fragment>
      <Helmet>
        <title>Configuration - Company info</title>
      </Helmet>

      <Form
        form={form}
        onFinish={onFinish}
        layout={"vertical"}
        className={"grid grid-cols-2 gap-5"}
      >
        <div className="space-y-5">
          <Form.Item name={"name"} label={"Company name"}>
            <CustomInput classNames={"w-full"} placeholder={"Company name"} />
          </Form.Item>

          <Form.Item name={"license"} label={"License Number"}>
            <CustomInput classNames={"w-full"} placeholder={"License Number"} />
          </Form.Item>

          <Form.Item name={"owner_name"} label={"Owner Name"}>
            <CustomInput classNames={"w-full"} placeholder={"Owner Name"} />
          </Form.Item>

          <Form.Item name={"address"} label={"Address"}>
            <CustomInput classNames={"w-full"} placeholder={"Address"} />
          </Form.Item>

          <Form.Item name={"city"} label={"City"}>
            <CustomInput classNames={"w-full"} placeholder={"City"} />
          </Form.Item>

          <Form.Item label={"State/Zip Code"}>
            <div className={"grid grid-cols-2 gap-2.5"}>
              <Form.Item name={"status"}>
                <CustomSelect
                  placeholder={"Select status"}
                  className={`w-full h-[50px]`}
                  options={[{ value: "USA", label: "USA" }]}
                  onChange={handleState}
                />
              </Form.Item>

              <Form.Item name={"zip"}>
                <CustomInput classNames={"w-full"} placeholder={"City"} />
              </Form.Item>
            </div>
          </Form.Item>
        </div>

        <div className="space-y-5">
          <Form.Item name={"email"} label={"Email"} rules={[{ type: "email" }]}>
            <CustomInput classNames={"w-full"} placeholder={"Email"} />
          </Form.Item>

          <Form.Item name={"cell_phone"} label={"Phone"}>
            <CustomInput classNames={"w-full"} placeholder={"Phone"} />
          </Form.Item>

          <Form.Item name={"fax"} label={"Fax"}>
            <CustomInput classNames={"w-full"} placeholder={"Fax"} />
          </Form.Item>

          <Form.Item name={"other"} label={"Other"}>
            <CustomInput classNames={"w-full"} placeholder={"Other"} />
          </Form.Item>

          <Form.Item name={"url"} label={"Web Site"} rules={[{ type: "url" }]}>
            <CustomInput
              type={"url"}
              classNames={"w-full"}
              placeholder={"Web Site"}
            />
          </Form.Item>

          <Form.Item name={"notes"} label={"Notes"}>
            <Input.TextArea
              className={"border-black"}
              placeholder={"Notes"}
              allowClear
            />
          </Form.Item>
        </div>

        <ButtonComponent
          defaultBg={colorsObject.success}
          defaultHoverBg={colorsObject.successHover}
          borderRadius={5}
          paddingInline={43}
          controlHeight={40}
          type={"submit"}
        >
          Save
        </ButtonComponent>
      </Form>

      {IsOpen && state?.status}
    </Fragment>
  );
};
