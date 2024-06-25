import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomInput,
  CustomRadio,
  CustomSelect,
} from "@/components/form/index.jsx";
import Modal from "@/components/modal/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { Form, DatePicker, Input } from "antd";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdLockReset } from "react-icons/md";
import { FiHelpCircle } from "react-icons/fi";

export const ProfileForm = () => {
  const { data: LocationData } = useRequestGetQuery({
    path: "/account_management/location/",
  });
  const { data: InstructorData } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const { colorsObject } = useContext(ColorsContext);
  const [form] = Form.useForm();
  const [Location, setLocation] = useState([]);
  const [Instructor, setInstructor] = useState([]);
  const [IsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const locations = [];
    for (let i = 0; i < LocationData?.length; i++) {
      const item = LocationData[i];
      locations.push({
        ...item,
        value: item.id,
        label: item.name,
      });
    }

    const instructors = [];
    for (let i = 0; i < InstructorData?.length; i++) {
      const item = InstructorData[i];
      instructors.push({
        ...item,
        value: item.id,
        label: item.first_name + " " + item.last_name,
      });
    }

    setLocation(locations);
    setInstructor(instructors);
  }, [LocationData, InstructorData]);

  const onFinish = async (values) => {
    console.log({
      ...values,
      birth: values["birth"].format("YYYY-MM-DD"),
      car_permit_data: values["car_permit_data"]?.format("YYYY-MM-DD"),
      car_permit_expire: values["car_permit_expire"]?.format("YYYY-MM-DD"),
    });
  };

  const onFinishPassword = async (values) => {
    console.log(values);
  };

  const handleOpen = () => setIsOpen((prev) => !prev);

  return (
    <Fragment>
      <Form
        form={form}
        onFinish={onFinish}
        layout={"vertical"}
      >
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
          <div className="space-y-5">
            <Form.Item label={"Assign to Staff"} name={"staff"}>
              <div className="flex items-center gap-3">
                <CustomSelect
                  placeholder={"Assign to Staff"}
                  className={"h-[50px]"}
                  options={Instructor}
                />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <Form.Item label={"Location"} name={"location"}>
              <div className="flex items-center gap-3">
                <CustomSelect
                  placeholder={"Location"}
                  className={"h-[50px]"}
                  options={Location}
                />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <Form.Item
              label={"First name"}
              name={"first_name"}
              rules={[
                {
                  required: true,
                  message: "Please input your first name!",
                },
              ]}
            >
              <div className="flex items-center gap-3">
                <CustomInput classNames={"w-full"} placeholder={"First name"} />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <Form.Item label={"Middle name"} name={"mid_name"}>
              <div className="flex items-center gap-3">
                <CustomInput classNames={"w-full"} placeholder={"Middle name"} />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <Form.Item
              label={"Last name"}
              name={"last_name"}
              rules={[
                {
                  required: true,
                  message: "Please input your first name!",
                },
              ]}
            >
              <div className="flex items-center gap-3">
                <CustomInput classNames={"w-full"} placeholder={"Last name"} />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <Form.Item
              label={"Address"}
              name={"address"}
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <div className="flex items-center gap-3">
                <CustomInput classNames={"w-full"} placeholder={"Address"} />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <Form.Item
              label={"City"}
              name={"city"}
              rules={[
                {
                  required: true,
                  message: "Please input your city!",
                },
              ]}
            >
              <div className="flex items-center gap-3">
                <CustomInput classNames={"w-full"} placeholder={"City"} />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <Form.Item
              label={"State"}
              name={"state"}
              rules={[
                {
                  required: true,
                  message: "Please input your state!",
                },
              ]}
            >
              <div className="flex items-center gap-3">
                <CustomSelect
                  placeholder={"State"}
                  className={"h-[50px]"}
                  options={[{ value: "USA", label: "USA" }]}
                />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <Form.Item label={"Zip Code"} name={"zip"}>
              <div className="flex items-center gap-3">
                <CustomInput classNames={"w-full"} placeholder={"Zip"} />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <Form.Item label={"Home phone"} name={"home_phone"}>
              <div className="flex items-center gap-3">
                <CustomInput classNames={"w-full"} placeholder={"phone number"} />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <Form.Item
              label={"Cell Phone"}
              name={"cell_phone"}
              rules={[
                {
                  required: true,
                  message: "Please input your cell phone!",
                },
              ]}
            >
              <div className="flex items-center gap-3">
                <CustomInput classNames={"w-full"} placeholder={"phone"} />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <Form.Item
              label={"Email"}
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "email",
                },
              ]}
            >
              <div className="flex items-center gap-3">
                <CustomInput
                  type={"email"}
                  classNames={"w-full"}
                  placeholder={"email"}
                />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>
          </div>

          <div className="space-y-5">
            <Form.Item
              label={"Birth"}
              name={"birth"}
              rules={[
                {
                  required: true,
                  message: "Please input your birth!",
                },
              ]}
            >
              <DatePicker className="w-full h-[50px] border-[#667085]" />
            </Form.Item>

            <Form.Item
              label={"Gender"}
              name={"gender"}
              rules={[
                {
                  required: true,
                  message: "Please select gender!",
                },
              ]}
            >
              <div>
                <CustomRadio
                  className={"space-x-2.5 "}
                  classNames={"inline-flex items-center gap-2.5"}
                  customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                  value={`Male`}
                  name={"gender"}
                >
                  <span className={"text-sm flex-shrink-0 w-32"}>Male</span>
                </CustomRadio>

                <CustomRadio
                  className={"space-x-2.5 "}
                  classNames={"inline-flex items-center gap-2.5"}
                  customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                  value={`Female`}
                  name={"gender"}
                >
                  <span className={"text-sm flex-shrink-0 w-32"}>Female</span>
                </CustomRadio>

                <CustomRadio
                  className={"space-x-2.5 "}
                  classNames={"inline-flex items-center gap-2.5"}
                  customWrapClassName={`${ManagementStyle["CheckModal__form-element__shadow"]} rounded`}
                  value={`Other`}
                  name={"gender"}
                >
                  <span className={"text-sm flex-shrink-0 w-32"}>Other</span>
                </CustomRadio>
              </div>
            </Form.Item>

            <Form.Item label={"Emergency Contact Name"} name={"emergency_name"}>
              <div className="flex items-center gap-3">
                <CustomInput
                  classNames={"w-full"}
                  placeholder={"Emergency Contact Name"}
                />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <Form.Item label={"Emergency Contact Phone"} name={"emergency_phone"}>
              <div className="flex items-center gap-3">
                <CustomInput
                  classNames={"w-full"}
                  placeholder={"Emergency Contact Phone"}
                />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <Form.Item
              label={"Emergency Contact Relation"}
              name={"emergency_relation"}
            >
              <div className="flex items-center gap-3">
                <CustomInput
                  classNames={"w-full"}
                  placeholder={"Emergency Contact Relation"}
                />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <Form.Item label={"Permit#"} name={"dl_permit"}>
              <div className="flex items-center gap-3">
                <CustomInput classNames={"w-full"} placeholder={"Permit"} />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <Form.Item label={"Permit Issued Date"} name={"car_permit_data"}>
              <DatePicker className="w-full h-[50px] border-[#667085]" />
            </Form.Item>

            <Form.Item
              label={"Permit Expiration Date"}
              name={"car_permit_expire"}
            >
              <DatePicker className="w-full h-[50px] border-[#667085]" />
            </Form.Item>

            <Form.Item
              label={"User Name"}
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <div className="flex items-center gap-3">
                <CustomInput classNames={"w-full"} placeholder={"Username"} />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <ButtonComponent
              type={"button"}
              defaultBg={colorsObject.success}
              defaultHoverBg={colorsObject.successHover}
              borderRadius={5}
              paddingInline={44}
              onClick={handleOpen}
            >
              FILTER STUDENTS
            </ButtonComponent>
          </div>
        </div>

        <div className="text-center pt-10">
          <ButtonComponent
            type={"submit"}
            defaultBg={colorsObject.secondary}
            defaultHoverBg={colorsObject.secondaryHover}
            borderRadius={5}
            paddingInline={44}
          >
            UPDATE
          </ButtonComponent>
        </div>
      </Form>

      {IsOpen && (
        <Form form={form} onFinish={onFinishPassword} layout={"vertical"}>
          <Modal setIsOpen={setIsOpen}>
            <div className="bg-white max-w-[630px] w-full px-24 py-14 text-center">
              <div className="flex items-center justify-center space-x-1.5">
                <MdLockReset className="w-10 text-[#364152]" />
                <Title fontSize={"text-[31px] font-bold text-[#364152]"}>
                  Reset Your Password
                </Title>
              </div>
              <Paragraph
                colorText="#B7B6B6"
                fontSize={"text-[17px]"}
                className={"py-2.5"}
              >
                Please enter your current passowrd and new password to reset
                your password
              </Paragraph>
              <Form.Item
                name="current_password"
                label="Current password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!",
                        ),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password className="h-[50px] border-[#667085]" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password className="h-[50px] border-[#667085]" />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!",
                        ),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password className="h-[50px] border-[#667085]" />
              </Form.Item>

              <ButtonComponent
                type={"submit"}
                defaultBg={colorsObject.primary}
                defaultHoverBg={colorsObject.primaryHover}
                borderRadius={10}
                className={"w-full mt-2.5"}
              >
                Upgrade
              </ButtonComponent>

              <Link to={"/"} className="pt-2.5 text-[#5F66E9]">
                Forgot Current Password?
              </Link>
            </div>
          </Modal>
        </Form>
      )}
    </Fragment>
  );
};
