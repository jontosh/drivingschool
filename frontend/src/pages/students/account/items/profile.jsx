import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { ProfileForm } from "@/pages/students/account/items/profile-form.jsx";
import { Form, Upload, message, Tabs, ConfigProvider } from "antd";
import { Fragment, useContext, useState } from "react";
import { PiCameraLight } from "react-icons/pi";
import ProfileStyle from "@/pages/instructor/profile/profile.module.scss";
import ProfileAccountStyle from "./../account.module.scss";

const TabItems = () => {
  return [
    {
      key: "1",
      label: <span className={"px-3"}>Edit Profile</span>,
      children: <ProfileForm />,
    },
    {
      key: "2",
      label: <span className={"px-3"}>Notifications</span>,
      children: 2,
    },
    {
      key: "3",
      label: <span className={"px-3"}>Choose Plan</span>,
      children: 3,
    },
    {
      key: "4",
      label: <span className={"px-3"}>Password & Security</span>,
      children: 4,
    },
  ].map((item) => {
    return { ...item };
  });
};

export const Profile = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

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
    console.log(values);
  };

  return (
    <Fragment>
      <Form
        form={form}
        onFinish={onFinish}
        className="bg-white rounded-xl space-y-5"
        layout={"vertical"}
      >
        <Form.Item
          name={"picture"}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <div className="flex items-center gap-2 max-[950px]:block">
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
                  className={"absolute bottom-1 right-1"}
                  icon={<PiCameraLight />}
                />
              )}
            </Upload>

            <div className="space-y-2.5">
              <Title fontSize={"text-2xl text-[#083A50]"}>
                Hasanboy Nurmuhammadov
              </Title>
              <Paragraph fontSize={"text-xl text-[#083A50]"}>
                Your account is ready, you can now apply for advice.
              </Paragraph>
            </div>
          </div>
        </Form.Item>
      </Form>

      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemColor: colorsObject.secondary,
              itemSelectedColor: colorsObject.primary,
              itemHoverColor: colorsObject.primary,
              titleFontSize: 16,
              inkBarColor: "transparent",
            },
          },
        }}
      >
        <Tabs
          className={ProfileAccountStyle["Profile"]}
          defaultActiveKey="1"
          items={TabItems()}
        />
      </ConfigProvider>
    </Fragment>
  );
};
