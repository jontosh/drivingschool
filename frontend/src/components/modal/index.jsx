import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { InboxOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { useContext, useEffect, useMemo, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import ModalStyle from "./modal.module.scss";
import {
  Form,
  Input,
  Modal as ModalComponent,
  Steps,
  message,
  Upload,
} from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Modal = ({ className, setIsOpen, children, width }) => {
  className = classNames(className, ModalStyle["Modal"]);
  const handleClick = (e) => {
    if (e.target.dataset.modal) {
      setIsOpen(false);
    }
  };
  return (
    <div
      data-modal={true}
      onClick={handleClick}
      className={`fixed flex items-center justify-center flex-col top-0 left-0 z-20 w-full h-full ${className}`}
      style={{ width: width }}
    >
      {children}
    </div>
  );
};

export const ModalSuccess = ({ title, open, onEvent, footer, width }) => {
  return (
    <ModalComponent
      title={title}
      centered
      open={open}
      onCancel={onEvent}
      footer={footer}
      width={width}
    >
      <div className="bg-white max-w-[490px] w-full px-10 py-8 text-center">
        <div className="relative mb-6">
          <span className="block w-14 p-1.5 bg-[#24C18F] mx-auto text-white rounded-lg">
            <CiCircleCheck className={"text-3xl"} />
          </span>
        </div>

        <Title
          fontSize={"text-3xl"}
          titleMarginBottom={8}
          fontWeightStrong={600}
        >
          Successfully !
        </Title>

        <Paragraph fontWeightStrong={400} fontSize={"text-xs text-[#54595E99]"}>
          Malesuada tellus tincidunt fringilla enim, id mauris. Id etiam nibh
          suscipit aliquam dolor. Nunc sit nunc aliquet justo, facilisi leo.
          Nulla a eget tincidunt integer orci.
        </Paragraph>
      </div>
    </ModalComponent>
  );
};

export const ModalError = ({
  title,
  open,
  onCancel,
  footer,
  data = {},
  width,
}) => {
  const items = useMemo(() => {
    return Object.values(data).map((item) => ({ title: item[0] }));
  }, [data]);

  return (
    <ModalComponent
      title={title}
      centered
      open={open}
      onCancel={onCancel}
      footer={footer}
      width={width}
    >
      <div className="bg-white max-w-[490px] w-full px-10 py-8 text-center">
        <div className="relative mb-6">
          <span className="block w-14 p-1.5 bg-[#FF333F] mx-auto text-white rounded-lg">
            <MdErrorOutline className="text-3xl" />
          </span>
        </div>

        <Title fontSize="text-3xl" titleMarginBottom={8} fontWeightStrong={600}>
          Error!
        </Title>

        <Steps progressDot direction="vertical" items={items} />
      </div>
    </ModalComponent>
  );
};

export const ModalConfirm = ({
  title,
  onOk,
  onCancel,
  footer,
  open,
  width,
}) => {
  const { colorsObject } = useContext(ColorsContext);

  return (
    <ModalComponent
      title={title}
      centered
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={footer}
      width={width}
    >
      <div className="bg-white max-w-[490px] w-full px-10 py-8 text-center">
        <div className="relative mb-6">
          <Title
            fontSize={"text-3xl"}
            titleMarginBottom={8}
            fontWeightStrong={600}
          >
            Are you sure?
          </Title>

          <Paragraph
            fontWeightStrong={400}
            fontSize={"text-xs text-[#54595E99]"}
          >
            You won't be able to revert this!
          </Paragraph>
        </div>

        <div className="space-x-4">
          <ButtonComponent
            defaultHoverColor={colorsObject.dangerHover}
            defaultColor={colorsObject.danger}
            defaultHoverBorderColor={colorsObject.dangerHover}
            defaultBorderColor={colorsObject.danger}
            borderRadius={5}
            paddingInline={43}
            onClick={onCancel}
          >
            No, cancel
          </ButtonComponent>
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            borderRadius={5}
            paddingInline={43}
            onClick={onOk}
          >
            Yes, confirm
          </ButtonComponent>
        </div>
      </div>
    </ModalComponent>
  );
};

export const ModalEdit = ({
  title,
  onOk,
  onCancel,
  footer,
  children,
  form,
  onFinish,
  open,
  width,
}) => {
  const { colorsObject } = useContext(ColorsContext);

  return (
    <ModalComponent
      title={title}
      centered
      open={open}
      onCancel={onCancel}
      footer={footer}
      className={"space-y-5"}
      width={width}
    >
      <Title fontSize={"text-3xl"} titleMarginBottom={8} fontWeightStrong={600}>
        Edit
      </Title>

      <Form
        form={form}
        onFinish={onFinish}
        className={"space-y-5"}
        layout={"vertical"}
      >
        {children}

        <div className="space-x-4">
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            borderRadius={5}
            paddingInline={43}
            onClick={onOk}
            type={"submit"}
          >
            SAVE
          </ButtonComponent>

          <ButtonComponent
            defaultHoverColor={colorsObject.dangerHover}
            defaultColor={colorsObject.danger}
            defaultHoverBorderColor={colorsObject.dangerHover}
            defaultBorderColor={colorsObject.danger}
            borderRadius={5}
            paddingInline={43}
            onClick={onCancel}
          >
            CLOSE
          </ButtonComponent>
        </div>
      </Form>
    </ModalComponent>
  );
};

export const ModalEmail = ({
  title,
  onOk,
  onCancel,
  footer,
  open,
  width,
  onFinish,
  form,
  data,
  keywords = [],
}) => {
  const { colorsObject } = useContext(ColorsContext);

  useEffect(() => {
    form?.setFieldsValue(data);
  }, [form, data]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const { Dragger } = Upload;
  const props = {
    maxCount: 3,
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const insertKeyword = (editor, keyword) => {
    const viewFragment = editor.data.processor.toView(keyword);
    const modelFragment = editor.data.toModel(viewFragment);
    editor.model.insertContent(modelFragment);
  };

  const keyword = keywords.map((keyword) => (
    <div
      key={keyword}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", keyword);
      }}
      onDrop={(e) => {
        e.preventDefault();
        const keyword = e.dataTransfer.getData("text");
        insertKeyword(editor, keyword);
      }}
      className="cursor-pointer text-blue-500 hover:underline"
    >
      {keyword}
    </div>
  ));

  return (
    <ModalComponent
      title={title}
      centered
      open={open}
      onCancel={onCancel}
      footer={footer}
      className={"space-y-5"}
      onOk={onOk}
      width={width}
    >
      <Form
        onFinish={onFinish}
        form={form}
        className="flex gap-5 p-3"
        layout={"vertical"}
        initialValues={{ send: true }}
      >
        <article className={"flex-grow space-y-5"}>
          <Title level={1} fontSize={"text-xl font-extrabold"}>
            EDIT EMAIL TEMPLATE
          </Title>

          <Form.Item
            rules={[
              {
                required: true,
                message: "Please select status",
              },
            ]}
            name={"status"}
            label={"Send Email"}
          >
            <CustomSelect
              placeholder={"STATUS"}
              className={"h-[50px]"}
              options={[
                { value: "ACTIVE", label: "ACTIVE" },
                { value: "DELETED", label: "DELETED" },
                { value: "INACTIVE", label: "INACTIVE" },
              ]}
            />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input subject!",
              },
            ]}
            name={"name"}
            label={"Email Subject"}
          >
            <Input className={"w-full h-[50px]"} placeholder={"Subject"} />
          </Form.Item>

          <Form.Item name="template">
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: {
                  items: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "strikethrough",
                    "subscript",
                    "superscript",
                    "code",
                    "|",
                    "alignment",
                    "|",
                    "fontfamily",
                    "fontsize",
                    "fontColor",
                    "fontBackgroundColor",
                    "|",
                    "alignment",
                    "|",
                    "link",
                    "|",
                    "bulletedList",
                    "numberedList",
                    "todoList",
                    "|",
                    "blockQuote",
                    "|",
                    "insertTable",
                    "tableColumn",
                    "tableRow",
                    "mergeTableCells",
                    "|",
                    "imageUpload",
                    "mediaEmbed",
                    "|",
                    "undo",
                    "redo",
                  ],
                },
                image: {
                  toolbar: [
                    "imageTextAlternative",
                    "imageStyle:full",
                    "imageStyle:side",
                  ],
                  upload: {
                    types: ["jpeg", "png", "gif", "bmp", "webp", "tiff"],
                  },
                },
                table: {
                  contentToolbar: [
                    "tableColumn",
                    "tableRow",
                    "mergeTableCells",
                  ],
                  tableToolbar: ["bold", "italic"],
                },
                heading: {
                  options: [
                    {
                      model: "paragraph",
                      title: "Paragraph",
                      class: "ck-heading_paragraph",
                    },
                    {
                      model: "heading1",
                      view: "h1",
                      title: "Heading 1",
                      class: "ck-heading_heading1",
                    },
                    {
                      model: "heading2",
                      view: "h2",
                      title: "Heading 2",
                      class: "ck-heading_heading2",
                    },
                    {
                      model: "heading3",
                      view: "h3",
                      title: "Heading 3",
                      class: "ck-heading_heading3",
                    },
                  ],
                },
                mediaEmbed: {
                  previewsInData: true,
                },
                simpleUpload: {
                  uploadUrl:
                    import.meta.env.VITE_API_URL + "/student_account/files/",
                },
              }}
              data={`
                    ${data?.template}
                    <br>
                    
                    <img src="${import.meta.env.VITE_LOGO}" alt="Logo" height="200" width="400" />
                    
                    <p class="footer-text">This is an automatically generated email. Please do not reply to this email.</p>
                `}
              onReady={(editor) => {
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                form?.setFieldsValue({
                  template: data,
                });
              }}
            />
          </Form.Item>
        </article>

        <div className={"w-[400px] space-y-5"}>
          <code className="p-4 block border overflow-y-scroll bg-white rounded-3xl">
            <Title level={2} fontSize={"text-base font-extrabold"}>
              Keywords:
            </Title>
            <code className={"max-h-[800px] h-full overflow-y-scroll"}>
              {keyword.length === 0 ? "EMPTY" : keyword}
            </code>
          </code>

          <div className="p-4 border overflow-y-scroll bg-white rounded-3xl space-y-5">
            <Title level={3} fontSize={"font-extrabold text-lg"}>
              Files
            </Title>

            <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Dragger>
            </Form.Item>

            <div className="space-x-5">
              <ButtonComponent
                defaultBg={colorsObject.success}
                defaultHoverBg={colorsObject.successHover}
                paddingInline={43}
                borderRadius={5}
                type={"submit"}
              >
                Save
              </ButtonComponent>

              <ButtonComponent
                defaultBg={colorsObject.secondary}
                defaultHoverBg={colorsObject.secondaryHover}
                paddingInline={43}
                borderRadius={5}
                type={"reset"}
              >
                CLEAR
              </ButtonComponent>
            </div>
          </div>
        </div>
      </Form>
    </ModalComponent>
  );
};

export default Modal;
