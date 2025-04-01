import { Fragment, useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Form, Input, Select, Upload, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useRequestPostMutation, useRequestGetQuery } from "@/redux/query/index.jsx";
import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { LuMail, LuArrowLeft } from "react-icons/lu";
import { InboxOutlined } from "@ant-design/icons";
import { CustomSelect } from "@/components/form/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import classNames from "classnames";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const CreateTemplate = () => {
  const navigate = useNavigate();
  const { subpage } = useParams();
  const [form] = Form.useForm();
  const [requestPost] = useRequestPostMutation();
  const [loading, setLoading] = useState(false);
  const { colorsObject } = useContext(ColorsContext);
  
  const portalPath = subpage === "student-portal"
    ? "/page_api/student_email_templates"
    : "/page_api/instructor_email_templates";
    
  const { data: KeywordsData } = useRequestGetQuery({ path: portalPath });

  const handleCreateTemplate = async (values) => {
    setLoading(true);
    try {
      await requestPost({
        path: "/communication/template",
        data: {
          ...values,
          status: values.status || "ACTIVE",
          template: values.template || ""
        }
      }).unwrap();
      
      // Navigate back to the templates list after successful creation
      navigate(`/admin/communication/email-templates/${subpage}`);
    } catch (error) {
      console.error("Error creating template:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/admin/communication/email-templates/${subpage}`);
  };

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

  const keywords = KeywordsData?.map((keyword) => `{{${keyword}}}`) || [];

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
    <Fragment>
      <Helmet>
        <title>Create New Email Template</title>
      </Helmet>

      <div className="pb-5">
        <div className="flex items-center mb-4">
          <ButtonComponent
            defaultColor={colorsObject?.primary || "#4f46e5"}
            defaultHoverColor={colorsObject?.primaryHover || "#4338ca"}
            className="mr-3"
            onClick={handleCancel}
          >
            <LuArrowLeft className="text-xl" />
          </ButtonComponent>
          
          <IconComponent
            vertical={classNames("items-center")}
            spaceIconX={2.5}
            icon={<LuMail />}
            iconClass={classNames("text-2xl text-indigo-600")}
            className={"cursor-default"}
          >
            Create New Email Template
          </IconComponent>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-indigo-600">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateTemplate}
            initialValues={{ status: "ACTIVE" }}
          >
            <div className="flex gap-5">
              <div className="flex-grow space-y-5">
                <Title level={1} fontSize={"text-xl font-extrabold"}>
                  CREATE EMAIL TEMPLATE
                </Title>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please select status",
                    },
                  ]}
                  name={"status"}
                  label={"Status"}
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
                      message: "Please input template name!",
                    },
                  ]}
                  name={"name"}
                  label={"Template Name"}
                >
                  <Input className={"w-full h-[50px]"} placeholder={"Template Name"} />
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input subject!",
                    },
                  ]}
                  name={"subject"}
                  label={"Email Subject"}
                >
                  <Input className={"w-full h-[50px]"} placeholder={"Subject"} />
                </Form.Item>

                <Form.Item 
                  name="template"
                  label="Email Content"
                  rules={[
                    {
                      required: true,
                      message: "Please enter email content",
                    },
                  ]}
                >
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
                      <p>Enter your email content here...</p>
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
              </div>

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
                      defaultBg={colorsObject.success || "#10b981"}
                      defaultHoverBg={colorsObject.successHover || "#059669"}
                      paddingInline={43}
                      borderRadius={5}
                      type={"submit"}
                      loading={loading}
                    >
                      Save
                    </ButtonComponent>

                    <ButtonComponent
                      defaultBg={colorsObject.secondary || "#6b7280"}
                      defaultHoverBg={colorsObject.secondaryHover || "#4b5563"}
                      paddingInline={43}
                      borderRadius={5}
                      type={"reset"}
                    >
                      CLEAR
                    </ButtonComponent>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};
