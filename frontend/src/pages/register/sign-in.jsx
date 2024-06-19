import { CustomCheckBox, CustomInput } from "@/components/form/index.jsx";
import Image from "@/components/image/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Form, Input } from "antd";
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import LoginImage from "../../assets/others/sign-in.png";
import ButtonComponent from "@/components/button";
import { TfiArrowTopRight } from "react-icons/tfi";

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
                className={"h-[50px] border-[#667085]"}
                placeholder={"Enter your password"}
              />
            </Form.Item>

            <Link to={"/"} className={"w-full text-right text-[#4C4C4C] text-lg"}>
              Forgot Password?
            </Link>

            <hr className={"border-[#E5EFFF]"} />

            <div className="flex items-center justify-between">
              <Form.Item name="remember" valuePropName="checked">
                <CustomCheckBox>
                  <span className="text-lg text-[#4C4C4C]">Remember Me</span>
                </CustomCheckBox>
              </Form.Item>

              <ButtonComponent
                defaultBg="linear-gradient(90deg, #93B4F6 0%, #5ACDFF 100%)"
                defaultHoverBg="linear-gradient(90deg, #93B4F6 0%, #5ACDFF 100%)"
                paddingInline={44}
                controlHeight={63}
                borderRadius={10}
                type={"submit"}
              >Login</ButtonComponent>
            </div>

            <div className="flex items-center justify-center gap-2 pt-10">
              <Paragraph colorText="#4C4C4C" fontWeightStrong={"font-normal"}>Don’t have an account?</Paragraph>

              <Link to={"/register/sign-up/"} className={"flex items-center gap-1 underline font-medium text-[#4C4C4C]"}>
                <span>Sign Up</span>
                <TfiArrowTopRight className="w-4 mt-1" />
              </Link>
            </div>
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
          <Paragraph fontSize={"text-lg mb-12"} className={"font-light"} colorText="#4C4C4C">
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
