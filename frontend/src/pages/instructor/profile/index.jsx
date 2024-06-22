import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Modal from "@/components/modal/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { Form, Upload, message, DatePicker, Input } from "antd";
import { Fragment, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { PiCameraLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import ProfileStyle from "./profile.module.scss";

const InstructorProfile = () => {
  const { data: LocationData } = useRequestGetQuery({
    path: "/account_management/location/",
  });
  const { colorsObject } = useContext(ColorsContext);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [Location, setLocation] = useState([]);
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

    setLocation(locations);
  }, [LocationData]);

  const handleUploadChange = (info) => {
    let fileList = [...info.fileList];

    // Ограничение на количество файлов до одного
    fileList = fileList.slice(-1);

    // Обновляем список файлов
    setFileList(fileList);

    // Если файл успешно загружен, выводим сообщение
    if (info.file.status === "done") {
      message.success(`${info.file.name} успешно загружен`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} не удалось загрузить`);
    }
  };

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

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleOpen = () => setIsOpen((prev) => !prev);

  return (
    <Fragment>
      <Helmet>
        <title>Instructor - Profile</title>
      </Helmet>
      <section className={"px-11 space-y-5 max-w-full w-full"}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={26}
          className={"pl-7"}
        >
          Staff Profile
        </Title>

        <Form
          form={form}
          onFinish={onFinish}
          className="bg-white rounded-xl py-16 px-[75px] space-y-5"
          layout={"vertical"}
        >
          <Form.Item
            name={"picture"}
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <div className="flex items-center gap-2">
              <Upload
                listType={"picture-circle"}
                fileList={fileList}
                onChange={handleUploadChange}
                maxCount={1} // Ограничение на один загружаемый файл
                beforeUpload={() => false} // Отменяем автоматическую загрузку
                className={ProfileStyle["Upload"]}
              >
                {fileList.length === 0 && ( // Отображаем кнопку загрузки, если список пуст
                  <IconComponent
                    className={"absolute bottom-0 right-0 "}
                    icon={<PiCameraLight />}
                  />
                )}
              </Upload>

              <div className="space-y-2.5">
                <Title>Hasanboy Nurmuhammadov</Title>
                <Paragraph>
                  Your account is ready, you can now apply for advice.
                </Paragraph>
              </div>
            </div>
          </Form.Item>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-5">
              <Form.Item label={"Staff Type"} name={"staff_type"}>
                <CustomSelect
                  placeholder={"Owner"}
                  className={"h-[50px]"}
                  options={[
                    { value: "Instructor", label: "Instructor" },
                    {
                      value: "Instructor / Teacher",
                      label: "Instructor / Teacher",
                    },
                    { value: "Junior Admin", label: "Junior Admin" },
                    { value: "Office Manager", label: "Office Manager" },
                    { value: "Owner", label: "Owner" },
                    { value: "Senior Admin", label: "Senior Admin" },
                    { value: "Teacher", label: "Teacher" },
                  ]}
                />
              </Form.Item>

              <Form.Item label={"Location"} name={"location"}>
                <CustomSelect
                  placeholder={"Location"}
                  className={"h-[50px]"}
                  options={Location}
                />
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
                <CustomInput classNames={"w-full"} placeholder={"First name"} />
              </Form.Item>

              <Form.Item label={"Middle name"} name={"mid_name"}>
                <CustomInput
                  classNames={"w-full"}
                  placeholder={"Middle name"}
                />
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
                <CustomInput classNames={"w-full"} placeholder={"Last name"} />
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
                <CustomInput classNames={"w-full"} placeholder={"Address"} />
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
                <CustomInput classNames={"w-full"} placeholder={"City"} />
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
                <CustomSelect
                  placeholder={"State"}
                  className={"h-[50px]"}
                  options={[{ value: "USA", label: "USA" }]}
                />
              </Form.Item>

              <Form.Item label={"Zip Code"} name={"zip"}>
                <CustomInput classNames={"w-full"} placeholder={"Zip"} />
              </Form.Item>

              <Form.Item label={"Home phone"} name={"home_phone"}>
                <CustomInput
                  classNames={"w-full"}
                  placeholder={"phone number"}
                />
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
                <CustomInput classNames={"w-full"} placeholder={"phone"} />
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
                <CustomInput
                  type={"email"}
                  classNames={"w-full"}
                  placeholder={"email"}
                />
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
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item
                label={"Emergency Contact Name"}
                name={"emergency_name"}
              >
                <CustomInput
                  classNames={"w-full"}
                  placeholder={"Emergency Contact Name"}
                />
              </Form.Item>

              <Form.Item
                label={"Emergency Contact Phone"}
                name={"emergency_phone"}
              >
                <CustomInput
                  classNames={"w-full"}
                  placeholder={"Emergency Contact Phone"}
                />
              </Form.Item>

              <Form.Item
                label={"Emergency Contact Relation"}
                name={"emergency_relation"}
              >
                <CustomInput
                  classNames={"w-full"}
                  placeholder={"Emergency Contact Relation"}
                />
              </Form.Item>

              <Form.Item label={"Permit Issued Date"} name={"car_permit_data"}>
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item
                label={"Permit Expiration Date"}
                name={"car_permit_expire"}
              >
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item label={"Instructor/Staff License#"} name={"license"}>
                <CustomInput classNames={"w-full"} placeholder={"License#"} />
              </Form.Item>

              <Form.Item
                label={"Instructor/Staff Expiration"}
                name={"staff_expiration"}
              >
                <CustomInput
                  classNames={"w-full"}
                  placeholder={"Instructor/Staff Expiration"}
                />
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
                <CustomInput classNames={"w-full"} placeholder={"Username"} />
              </Form.Item>

              <ButtonComponent
                type={"button"}
                defaultColor={colorsObject.black}
                defaultHoverColor={colorsObject.black}
                defaultBorderColor={colorsObject.black}
                onClick={handleOpen}
              >
                Password
              </ButtonComponent>
            </div>
          </div>

          <ButtonComponent
            type={"submit"}
            defaultColor={colorsObject.black}
            defaultHoverColor={colorsObject.black}
            defaultBorderColor={colorsObject.black}
          >
            UPDATE
          </ButtonComponent>
        </Form>

        {IsOpen && (
          <Form form={form} onFinish={onFinishPassword} layout={"vertical"}>
            <Modal setIsOpen={setIsOpen}>
              <div className="bg-white max-w-[630px] w-full px-24 py-14">
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
                  <Input.Password />
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
                  <Input.Password />
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
                  <Input.Password />
                </Form.Item>

                <ButtonComponent
                  type={"submit"}
                  defaultColor={colorsObject.black}
                  defaultHoverColor={colorsObject.black}
                  defaultBorderColor={colorsObject.black}
                >
                  Upgrade
                </ButtonComponent>

                <Link to={"/"}>Forgot Current Password?</Link>
              </div>
            </Modal>
          </Form>
        )}
      </section>
    </Fragment>
  );
};

export default InstructorProfile;
