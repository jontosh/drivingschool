import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import { Space } from "antd";

export const FeesModule = () => {
  const columns = [
    {
      title: "Location name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span className={"text-lg"}>${price}</span>,
    },
    {
      title: "Sub type",
      dataIndex: "subtype",
      key: "subtype",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const { bg, hover } = CheckProgress(text);
        return (
          <Space size={"middle"}>
            <ButtonComponent
              defaultBg={bg}
              defaultHoverBg={hover}
              controlHeight={50}
              borderRadius={5}
              style={{ width: "128px" }}
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
      render: () => (
        <div className={"text-center space-x-2.5"}>
          <IconComponent
            className={"text-xl text-red-600 border border-indigo-600"}
            style={{
              borderRadius: 5,
              paddingLeft: 4,
              paddingRight: 4,
            }}
            icon={<DeleteOutlined />}
          />

          <IconComponent
            className={"text-xl text-indigo-500 border border-indigo-600"}
            style={{
              borderRadius: 5,
              paddingLeft: 4,
              paddingRight: 4,
            }}
            icon={<ExportOutlined />}
          />
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "Mason Location",
      price: 75.0,
      subtype: "Fee Miscellaneous",
      status: "Active",
    },
    {
      key: "2",
      name: "Mason Location",
      price: 75.0,
      subtype: "Fee Miscellaneous",
      status: "Process",
    },
    {
      key: "3",
      name: "Mason Location",
      price: 75.0,
      subtype: "Fee Miscellaneous",
      status: "Close",
    },
  ];
  return { columns, data };
};
