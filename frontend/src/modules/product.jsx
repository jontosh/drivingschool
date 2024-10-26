import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import {
  useRequestDeleteMutation,
  useRequestGetQuery,
  useRequestPatchMutation,
} from "@/redux/query/index.jsx";
import { DeleteOutlined, ExclamationCircleOutlined, ExportOutlined, FormOutlined } from "@ant-design/icons";
import { Form, Space, Modal, Input, Select } from "antd";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export const ProductModule = () => {
  const { data: ProductData } = useRequestGetQuery({
    path: "/account_management/services/component/",
  });

  const [form] = Form.useForm();
  const [requestDelete] = useRequestDeleteMutation();
  const [requestPatch] = useRequestPatchMutation();

  const columns = [
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Paragraph fontSize="text-lg" fontWeightStrong={400}>{text}</Paragraph>
      ),
    },
    {
      title: "Code Number",
      dataIndex: "code",
      key: "code",
      render: (text) => (
        <div className="text-center">
          <Paragraph fontSize="text-lg" fontWeightStrong={400}>{text}</Paragraph>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type_component",
      key: "type_component",
      render: (text) => (
        <div className="text-center">
          <Paragraph fontSize="text-lg" fontWeightStrong={400}>{text}</Paragraph>
        </div>
      ),
    },
    {
      title: "Sub Type",
      dataIndex: "subtype_btw",
      key: "subtype_btw",
      render: (text) => (
        <div className="text-center">
          <Paragraph fontSize="text-lg" fontWeightStrong={400}>{text}</Paragraph>
        </div>
      ),
    },
    {
      title: "BTW Hours",
      dataIndex: "driving_hours",
      key: "driving_hours",
      render: (text) => (
        <div className="text-center">
          <Paragraph fontSize="text-lg" fontWeightStrong={400}>
            {text?.substring(0, text?.indexOf(":")).toUpperCase()}
          </Paragraph>
        </div>
      ),
    },
    {
      title: "Observation Hours",
      dataIndex: "observation",
      key: "observation",
      render: (text) => (
        <div className="text-center">
          <Paragraph fontSize="text-lg" fontWeightStrong={400}>{text ?? 0}</Paragraph>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const { bg, hover } = CheckProgress(text);
        return (
          <Space size="middle">
            <ButtonComponent
              defaultBg={bg}
              defaultHoverBg={hover}
              borderRadius={5}
              style={{ width: 128 }}
            >
              {text.toUpperCase()}
            </ButtonComponent>
          </Space>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        const onEdit = () => {
          Modal.info({
            title: "Edit Form",
            width: 700,
            content: (
              <Form layout="vertical" form={form} className="flex gap-5">
                <div className="w-full">
                  <Form.Item
                    name="name"
                    label="Component Name:"
                    initialValue={item.name}
                    rules={[{ required: true, message: "Name is empty" }]}
                  >
                    <Input placeholder="Component Name" className="h-[50px]" />
                  </Form.Item>
                  <Form.Item
                    name="status"
                    label="Status:"
                    initialValue={item.status}
                    rules={[{ required: true, message: "Status is empty" }]}
                  >
                    <Input placeholder="Select status" className="h-[50px]" />
                  </Form.Item>
                  <Form.Item
                    name="type_component"
                    label="Type:"
                    initialValue={item.type_component}
                    rules={[{ required: true, message: "Type is empty" }]}
                  >
                    <Select
                      placeholder="Select type"
                      className="h-[50px]"
                      options={[
                        { value: "BTW", label: "BTW" },
                        { value: "CR", label: "CR" },
                        { value: "WEB", label: "WEB" },
                      ]}
                    />
                  </Form.Item>
                </div>
                <div className="w-full">
                  <Form.Item
                    name="code"
                    label="Item#/Code:"
                    initialValue={item.code}
                    rules={[{ required: true, message: "Code is empty" }]}
                  >
                    <Input placeholder="Item#/Code" className="h-[50px]" />
                  </Form.Item>
                  <Form.Item
                    name="public_name"
                    label="Public Name:"
                    initialValue={item.public_name}
                    rules={[{ required: true, message: "Public name is empty" }]}
                  >
                    <Input placeholder="Public Name" className="h-[50px]" />
                  </Form.Item>
                  <Form.Item name="subtype_web" label="Sub Type:" initialValue={item.subtype_web}>
                    <Select
                      placeholder="Please Select"
                      className="h-[50px]"
                      options={[
                        { value: "EZ DRIVE", label: "EZ DRIVE" },
                        { value: "OTHER ONLINE COURSE", label: "OTHER ONLINE COURSE" },
                        { value: "SAFEWAY LMS", label: "SAFEWAY LMS" },
                      ]}
                    />
                  </Form.Item>
                </div>
              </Form>
            ),
            onOk: async () => {
              await requestPatch({ id: item.id, ...form.getFieldsValue() });
            },
          });
        };

        const onDelete = () => {
          Modal.confirm({
            title: `Delete ${item.name}`,
            icon: <ExclamationCircleOutlined />,
            content: <p className="text-gray-500 text-center">You won't be able to revert this!</p>,
            okText: "Yes",
            cancelText: "No",
            okType: "danger",
            onOk: () => requestDelete({ id: item.id }),
          });
        };

        return (
          <Fragment>
            <div className="space-x-2.5">
              <IconComponent
                className="text-xl text-indigo-500 border border-indigo-600 rounded px-1"
                icon={<FormOutlined />}
                onClick={onEdit}
              />
              <IconComponent
                className="text-xl text-red-600 border border-indigo-600 rounded px-1"
                icon={<DeleteOutlined />}
                onClick={onDelete}
              />
              <Link to={`/admin/modals/management-service/product/${item.id}`} target="_blank">
                <IconComponent
                  className="text-xl text-indigo-500 border border-indigo-600 rounded px-1"
                  icon={<ExportOutlined />}
                />
              </Link>
            </div>
          </Fragment>
        );
      },
    },
  ];

  return { data: ProductData, columns };
};
