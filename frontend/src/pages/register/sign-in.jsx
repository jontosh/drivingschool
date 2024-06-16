import { CustomCheckBox, CustomInput } from "@/components/form/index.jsx";
import Image from "@/components/image/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Form, Input } from "antd";
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import LoginImage from "../../assets/others/sign-in.png";

const SignIn = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
  };

  return (
    <Fragment>
      <section className={"grid grid-cols-2 gap-5"}>
        <div className={"p-20"}>
          <Title level={1} fontSize={"text-4xl"} titleMarginBottom={80}>
            Welcome to driving <br /> school
          </Title>

          <Form
            form={form}
            onFinish={onFinish}
            layout={"vertical"}
            className={"space-y-5"}
          >
            <Form.Item
              name={"login"}
              label={"Login"}
              rules={[
                {
                  required: true,
                  message: "Please input your login!",
                },
              ]}
            >
              <CustomInput
                classNames={"w-full"}
                placeholder={"Enter your Login"}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                className={"h-[50px] border-black"}
                placeholder={"Enter your password"}
              />
            </Form.Item>

            <Link to={"/"} className={"w-full text-right"}>
              Forgot Password?
            </Link>

            <hr className={"border-[#E5EFFF]"} />

            <div className="flex items-center justify-between">
              <Form.Item name="remember" valuePropName="checked">
                <CustomCheckBox>
                  <span>Remember Me</span>
                </CustomCheckBox>
              </Form.Item>

              <button type={"submit"}>Login</button>
            </div>

            <Paragraph>
              Don’t have an account?{" "}
              <Link to={"/register/sign-up/"} className={"underline"}>
                Sign Up
              </Link>
            </Paragraph>
          </Form>
        </div>
        <div className={"p-20 bg-[#FAFCFF] border border-[#E5EFFF] rounded-xl"}>
          <Title
            level={1}
            className={"pt-2"}
            fontSize={"text-4xl"}
            titleMarginBottom={20}
          >
            Login
          </Title>
          <Paragraph fontSize={"text-lg mb-12"} className={"font-light"}>
            Welcome back! Please log in to access your account. If you don't
            have an account yet, you can create one by clicking on the 'Sign Up'
            button below.
          </Paragraph>

          <Image
            src={LoginImage}
            srcSet={LoginImage}
            className={"py-12 bg-white"}
          />
        </div>
      </section>
    </Fragment>
  );
};

export default SignIn;
