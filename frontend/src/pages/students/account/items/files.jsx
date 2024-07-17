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
          FILES
        </IconComponent>
      </Title>

      <div className="grid grid-cols-2 gap-5 max-[1160px]:grid-cols-1">
        <div className="space-y-5">
          <FileItem />
          <FileItem />
          <FileItem />
          <FileItem />
        </div>

        <div className={"border p-5 rounded-xl space-y-5"}>
          <Title fontSize={"text-xl font-semibold"} className={"border-b border-b-[#E3E3E3] pb-3"}>Upload File</Title>
          <Paragraph colorText="#9D9D9D">
            (Only jpg, png, and pdf file formats are allowed)
          </Paragraph>

          <Form>
            <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
              <StudentFileUpload />
            </Form.Item>

            <div className="flex max-[500px]:flex-col gap-5 justify-end">
              <ButtonComponent
                type={"reset"}
                paddingInline={43}
                controlHeight={40}
                borderRadius={8}
                defaultBg={colorsObject.main}
                defaultColor={colorsObject.black}
                defaultHoverColor={colorsObject.black}
                defaultBorderColor="#CBCBCB"
              >
                Cancel
              </ButtonComponent>

              <ButtonComponent
                type={"submit"}
                paddingInline={43}
                controlHeight={40}
                borderRadius={8}
                defaultBg={colorsObject.info}
                defaultHoverBg={colorsObject.infoHover}
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
