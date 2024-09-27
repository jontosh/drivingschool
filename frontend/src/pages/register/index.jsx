import LoginImage from "@/assets/others/sign-in.png";
import { Crypto } from "@/auth/crypto.jsx";
import ButtonComponent from "@/components/button/index.jsx";
import { CustomCheckBox, CustomInput } from "@/components/form/index.jsx";
import Image from "@/components/image/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import { useBaseURL } from "@/hooks/portal.jsx";
import {
  useRequestPatchMutation,
  useRequestPostMutation,
} from "@/redux/query/index.jsx";
import { Form, Input, message } from "antd";
import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import useSessionStorageState from "use-session-storage-state";

const Register = () => {
  const [AuthUser, setAuthUser] = useSessionStorageState("auth-user", {
    defaultValue: null,
  });
  const [UserRegister, setUserRegister] = useSessionStorageState("register", {
    defaultValue: null,
  });
  const [AuthRefresh, setAuthRefresh] = useSessionStorageState("auth-upgrade", {
    defaultValue: null,
  });
  const [User, setUser] = useSessionStorageState("user", {
    defaultValue: null,
  });
  const [RememberMe, setRememberMe] = useLocalStorage("register", null);
  const [LogTime, setLogTime] = useLocalStorage("log-time", null);
  const [form] = Form.useForm();
  const [requestPost] = useRequestPostMutation();
  const [requestPatch] = useRequestPatchMutation();
  const navigate = useNavigate();
  const { pathname } = useBaseURL();

  useEffect(() => {
    if (RememberMe) {
      const { decrypted } = Crypto(RememberMe, import.meta.env.VITE_SECRET_KEY);
      form.setFieldsValue(decrypted);
    }
  }, [RememberMe, form]);

  const onFinish = async (values) => {
    const { encrypted } = Crypto(values, import.meta.env.VITE_SECRET_KEY);
    values.remember ? setRememberMe(encrypted) : setUserRegister(encrypted);
    setLogTime(JSON.stringify(new Date()));

    try {
      const response = await requestPost({
        path: "/authentication/token_obtain_pair",
        data: values,
      }).unwrap();

      if (response?.access) {
        setAuthUser(response?.access);
        setAuthRefresh(response?.refresh);
        const { encrypted } = Crypto(
          response?.user,
          import.meta.env.VITE_SECRET_KEY,
        );

        setUser(encrypted);

        if (response?.user?.usertype === 3) {
          await requestPatch({
            path: "/student_account/student",
            id: response?.user?.id,
            data: {
              last_login: new Date(),
            },
          })
            .unwrap()
            .then(() => {
              navigate("/student/dashboard/" + response?.user?.id, {
                replace: true,
              });
            });
        } else if (response?.user?.usertype === 4) {
          await requestPatch({
            path: "/student_account/instructor",
            id: response?.user?.id,
            data: {
              last_login: new Date(),
            },
          })
            .unwrap()
            .then(() => {
              navigate("/instructor/dashboard/" + response?.user?.id, {
                replace: true,
              });
            });
        } else if (response?.user?.usertype === 5) {
          await requestPatch({
            path: "/student_account/instructor",
            id: response?.user?.id,
            data: {
              last_login: new Date(),
            },
          })
            .unwrap()
            .then(() => {
              navigate("/admin/dashboard/", {
                replace: true,
              });
            });
        } else {
          navigate(pathname + "register/sign-in", { replace: true });
        }
      }
    } catch (error) {
      console.error(error);
      if (error?.status >= 400) {
        message.error(error?.data?.detail);
      }
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>Sign in - Register page</title>
      </Helmet>

      <section className="bg-white p-5 flex flex-col-reverse xl:grid xl:grid-cols-2 xl:gap-5">
        <div className="p-2.5 xl:p-20">
          <Title level={1} fontSize="text-4xl" titleMarginBottom={80}>
            Welcome to driving <br /> school
          </Title>

          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className="space-y-5"
            initialValues={{ remember: false }}
          >
            <Form.Item
              name="username"
              label="Login"
              rules={[{ required: true, message: "Please input your login!" }]}
            >
              <CustomInput classNames="w-full" placeholder="Enter your Login" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                className="h-[50px] border-[#667085]"
                placeholder="Enter your password"
              />
            </Form.Item>

            <Paragraph className={"text-right"}>
              <Link to="/" className="text-[#4C4C4C] text-lg">
                Forgot Password?
              </Link>
            </Paragraph>

            <hr className="border-[#E5EFFF]" />

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
                type="submit"
              >
                Login
              </ButtonComponent>
            </div>
          </Form>
        </div>
        <div className="rounded-xl xl:border p-2.5 xl:p-20 xl:bg-[#FAFCFF] xl:border-[#E5EFFF]">
          <Title
            level={1}
            className="pt-2"
            fontSize="text-4xl"
            titleMarginBottom={20}
          >
            Login
          </Title>
          <Paragraph
            fontSize="text-lg mb-12"
            className="font-light"
            colorText="#4C4C4C"
          >
            Welcome back! Please log in to access your account. If you don't
            have an account yet, you can create one by clicking on the 'Sign Up'
            button below.
          </Paragraph>

          <Image
            src={LoginImage}
            srcSet={LoginImage}
            className="py-12 bg-white hidden xl:block"
          />
        </div>
      </section>
    </Fragment>
  );
};

export default Register;
