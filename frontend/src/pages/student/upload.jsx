import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useRequestPostMutation } from "@/redux/query/index.jsx";
import { Form, Upload as UPLOAD } from "antd";
import { useContext, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

const Upload = ({ id }) => {
  const [form] = Form.useForm();
  const [requestPost] = useRequestPostMutation();
  const [Save, setSave] = useState(false);

  const { colorsObject } = useContext(ColorsContext);

  const normFile = (e) => {
    console.log("Upload event:", e);
    e?.fileList?.length === 0 ? setSave(false) : setSave(true);

    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props = {
    name: "file",
    action: import.meta.env.VITE_API_URL + "/media/files/student/",
    className: "w-full",
    listType: "picture",
    beforeUpload(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement("img");
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = "red";
            ctx.textBaseline = "middle";
            ctx.font = "33px Arial";
            ctx.fillText("Ant Design", 20, 20);
            canvas.toBlob((result) => resolve(result));
          };
        };
      });
    },
  };

  const onFinish = async (values) => {
    try {
      // console.log("Received values of form: ", values);
      // console.log("Received values of file: ", values["file"][0]);
      const response = await requestPost({
        path: "/student_account/files/",
        data: {
          ...values,
          name: values["file"][0]?.name,
          file: values["file"][0],
          date: values["file"][0]?.lastModifiedDate,
          student: id,
          by: "094b1a3c-88b4-464d-8ea6-2ef273ffcde3", // default value @todo
        },
      });

      // console.log("Received values of response: ", response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout={"vertical"}>
      <Form.Item className={"w-full"}>
        <Form.Item name={"file"}>
          <UPLOAD.Dragger {...props}>
            <IconComponent
              className={"text-indigo-700 text-6xl mb-2.5"}
              icon={<AiOutlineCloudUpload />}
            />
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </UPLOAD.Dragger>
        </Form.Item>
      </Form.Item>
      {Save && (
        <div className="text-center">
          <ButtonComponent
            defaultBg={colorsObject.info}
            defaultHoverBg={colorsObject.infoHover}
            controlHeight={40}
            paddingInline={43}
            borderRadius={5}
            type={"submit"}
          >
            Save
          </ButtonComponent>
        </div>
      )}
    </Form>
  );
};
export default Upload;
