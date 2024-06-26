import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { FileItem } from "@/pages/students/account/items/file-item.jsx";
import { StudentFileUpload } from "@/pages/students/account/items/upload.jsx";
import { Form } from "antd";
import { useContext } from "react";
import { BiSolidFileBlank } from "react-icons/bi";

export const Files = ({ ...props }) => {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const { colorsObject } = useContext(ColorsContext);

  return (
    <div className={"space-y-8"}>
      <Title level={2} fontSize={"text-xl space-x-2"}>
        <IconComponent
          vertical={"items-center"}
          spaceIconX={2.5}
          icon={<BiSolidFileBlank />}
        >
          APPOINTMENTS
        </IconComponent>
      </Title>

      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-5">
          <FileItem />
          <FileItem />
          <FileItem />
        </div>

        <div className={"border p-5 rounded-xl space-y-5"}>
          <Title>Upload File</Title>
          <Paragraph>
            (Only jpg, png, and pdf file formats are allowed)
          </Paragraph>

          <Form>
            <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
              <StudentFileUpload />
            </Form.Item>

            <div className="space-x-5 text-right">
              <ButtonComponent
                type={"reset"}
                paddingInline={43}
                controlHeight={40}
                defaultColor={colorsObject.black}
                defaultHoverColor={colorsObject.black}
                defaultBorderColor={colorsObject.black}
                defaultHoverBorderColor={colorsObject.black}
              >
                Cancel
              </ButtonComponent>

              <ButtonComponent
                type={"submit"}
                paddingInline={43}
                controlHeight={40}
                defaultColor={colorsObject.black}
                defaultHoverColor={colorsObject.black}
                defaultBorderColor={colorsObject.black}
                defaultHoverBorderColor={colorsObject.black}
              >
                Continue
              </ButtonComponent>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
