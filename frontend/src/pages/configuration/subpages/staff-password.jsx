import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { AlertError, AlertSuccess } from "@/hooks/alert.jsx";
import { useRequestPostMutation } from "@/redux/query/index.jsx";
import { Form, InputNumber, Switch } from "antd";
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

export const StaffPassword = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [form] = Form.useForm();
  const [requestPost] = useRequestPostMutation();
  const [IsOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, { status: false, setIsOpen });

  const onFinish = async (values) => {
    try {
      const res = await requestPost({
        path: "/configuration/password_management/",
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

  const handleAge = (values) => {
    form.setFieldsValue({
      age: values,
    });
  };

  return (
    <Fragment>
      <Helmet>
        <title>Configuration - Staff Password</title>
      </Helmet>

      <Form
        className={"grid grid-cols-3 gap-5"}
        form={form}
        onFinish={onFinish}
        layout={"vertical"}
        initialValues={{
          checked: false,
          lower: false,
          upper: false,
          number: false,
          symbol: false,
          re_capcha: false,
          has_2AF: false,
          admin_2AF: false,
        }}
      >
        <div className="space-y-5">
          <Form.Item
            label={"Password History Policy"}
            name={"remember_password"}
          >
            <InputNumber
              className={"border-black w-full h-[50px]"}
              placeholder={"History Policy"}
            />
          </Form.Item>

          <Form.Item label={"Max Password Age Policy"} name={"age"}>
            <CustomSelect
              placeholder={"Select Max Password Age Policy"}
              className={`w-full h-[50px]`}
              options={[
                { value: 1, label: "1 Month" },
                { value: 2, label: "2 Month" },
                { value: 3, label: "3 Month" },
                { value: 4, label: "4 Month" },
                { value: 5, label: "5 Month" },
                { value: 6, label: "6 Month" },
              ]}
              onChange={handleAge}
            />
          </Form.Item>

          <Form.Item label={"Min Password Length Policy"} name={"min_length"}>
            <InputNumber
              className={"border-black w-full h-[50px]"}
              placeholder={"Min Password Length Policy"}
            />
          </Form.Item>

          <Form.Item
            label={"Reset Password Link Age (Hours) Policy"}
            name={"reset_password_link"}
          >
            <InputNumber
              className={"border-black w-full h-[50px]"}
              placeholder={"Reset Password Link Age (Hours) Policy"}
            />
          </Form.Item>
        </div>

        <div className="space-y-5">
          <Form.Item
            name={"upper"}
            valuePropName={"checked"}
            label={"Uppercase Letters"}
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name={"number"}
            valuePropName={"checked"}
            label={"Numbers"}
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name={"symbol"}
            valuePropName={"checked"}
            label={"Symbols"}
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name={"re_capcha"}
            valuePropName={"checked"}
            label={"Enable reCaptcha"}
          >
            <Switch />
          </Form.Item>
        </div>

        <div className="space-y-5">
          <Form.Item
            label={"Enable Two Factor Authentication (2FA) for Staff"}
            name={"has_2AF"}
            valuePropName={"checked"}
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label={"Enable Two Factor Authentication (2FA) for Admin"}
            name={"admin_2AF"}
            valuePropName={"checked"}
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label={"Lowercase Letters"}
            name={"lower"}
            valuePropName={"checked"}
          >
            <Switch />
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
