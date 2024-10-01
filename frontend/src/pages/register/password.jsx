import ButtonComponent from "@/components/button";
import Title, { Paragraph } from "@/components/title";
import { Form, Input } from "antd";
import { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import ColorsContext from "@/context/colors.jsx";

const Password = () => {
  const { id } = useParams();
  const { colorsObject } = useContext(ColorsContext);

  return (
    <Fragment>
      <section
        className={"px-3 sm:px-5 md:px-11 space-y-5 h-full max-w-full w-full"}
      >
        <div className="bg-white h-full rounded-xl p-16 flex items-center justify-center gap-5">
          <div className="w-[273px] space-y-5">
            <Title level={1} fontSize={"text-[25px]"}>
              Change Password
            </Title>

            <Paragraph fontSize={"text-gray-500 text-base"}>
              Password must contain:
            </Paragraph>

            <div className="space-y-2.5">
              <Paragraph fontSize="text-gray-500 text-sm font-normal">
                At least 6 characters
              </Paragraph>
              <Paragraph fontSize="text-gray-500 text-sm font-normal">
                At least 1upper case letter (A ..Z)
              </Paragraph>
              <Paragraph fontSize="text-gray-500 text-sm font-normal">
                At least 1 lower case latter (a..z)
              </Paragraph>
              <Paragraph fontSize="text-gray-500 text-sm font-normal">
                At least 1 number (0..9)
              </Paragraph>
            </div>
          </div>

          <Form layout="vertical" className="w-[366px] space-y-5">
            <Form.Item
              label="Current password"
              rules={[
                {
                  required: true,
                  message: "Please input your current password !",
                },
              ]}
              name="currentPassword"
            >
              <Input.Password
                placeholder="Please enter your old password"
                className="w-full h-[50px] border-[#667085]"
              />
            </Form.Item>

            <Form.Item
              label="New Password"
              rules={[
                { required: true, message: "Please input your new password !" },
              ]}
              name="newName"
            >
              <Input.Password
                placeholder="Please enter your new password"
                className="w-full h-[50px] border-[#667085]"
              />
            </Form.Item>

            <Form.Item
              label="Re-enter Password"
              rules={[
                {
                  required: true,
                  message: "Please input your new password again !",
                },
              ]}
              name="rePassword"
            >
              <Input.Password
                placeholder="Please enter your new password again"
                className="w-full h-[50px] border-[#667085]"
              />
            </Form.Item>

            <ButtonComponent
              defaultBg={colorsObject.success}
              defaultHoverBg={colorsObject.successHover}
              paddingInline={43}
              borderRadius={5}
            >
              Update Password
            </ButtonComponent>
          </Form>
        </div>
      </section>
    </Fragment>
  );
};

export default Password;
