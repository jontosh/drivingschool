import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import {
  useRequestDeleteMutation,
  useRequestGetQuery,
  useRequestPatchMutation,
} from "@/redux/query/index.jsx";
import {
  DeleteOutlined,
  ExportOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Form, Space, Modal } from "antd";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export const ProductModule = () => {
  const { data: ProductData } = useRequestGetQuery({
    path: "/account_management/services/component/",
  });

  const [form] = Form.useForm();

  const [requestDelete, { reset: DeleteReset }] = useRequestDeleteMutation();
  const [requestPatch, { reset: PatchReset }] = useRequestPatchMutation();

  const columns = [
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Paragraph fontSize="text-lg" fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Code number",
      dataIndex: "code",
      key: "code",
      render: (text) => (
        <div className="text-center">
          <Paragraph fontSize="text-lg" fontWeightStrong={400}>
            {text}
          </Paragraph>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type_component",
      key: "type_component",
      render: (text) => (
        <div className="text-center">
          <Paragraph fontSize="text-lg" fontWeightStrong={400}>
            {text}
          </Paragraph>
        </div>
      ),
    },
    {
      title: "Sub type",
      dataIndex: "subtype_btw",
      key: "subtype_btw",
      render: (text) => (
        <div className="text-center">
          <Paragraph fontSize="text-lg" fontWeightStrong={400}>
            {text}
          </Paragraph>
        </div>
      ),
    },
    {
      title: "BTW HOURS",
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
          <Paragraph fontSize="text-lg" fontWeightStrong={400}>
            {text ?? 0}
          </Paragraph>
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
      render: (item, record) => {
        const onEdit = () => {
          Modal.info({
            title: "Edit form",
            content: <>content</>,
            onOk: () => console.log("ok"),
            onCancel: () => console.log("cancel"),
          });
        };
        const onDelete = () => {
          Modal.error({
            title: "Delete " + record.name,
            content: <>content</>,
            onOk: () => console.log("ok", record),
          });
        };

        return (
          <Fragment>
            <div className="space-x-2.5">
              <IconComponent
                className="text-xl text-indigo-500 border border-indigo-600"
                style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 4 }}
                icon={<FormOutlined />}
                onClick={onEdit}
              />
              <IconComponent
                className="text-xl text-red-600 border border-indigo-600"
                style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 4 }}
                icon={<DeleteOutlined />}
                onClick={onDelete}
              />
              <Link
                to={"/admin/modals/management-service/product/" + item?.id}
                target={"_blank"}
              >
                <IconComponent
                  className="text-xl text-indigo-500 border border-indigo-600"
                  style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 4 }}
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
