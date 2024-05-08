import ButtonComponent from "@/components/button/index.jsx";
import IconComponent, { Icons } from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import {
  DeleteOutlined,
  ExportOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Space } from "antd";

export const PackagesModule = () => {
  const columns = [
    {
      title: "Service name",
      key: "name",
      dataIndex: "name",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
      align: "center",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Service price",
      key: "price",
      dataIndex: "price",
      align: "center",
      render: (text) => (
        <div className={"text-center"}>
          <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
            {text}
          </Paragraph>
        </div>
      ),
    },
    {
      title: "Service content",
      key: "content",
      dataIndex: "content",
      align: "center",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
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
      title: "Web Purchase",
      key: "web",
      dataIndex: "web",
      align: "center",
      render: (access) => {
        return (
          <div className={"text-center"}>
            <IconComponent
              className={"text-3xl"}
              icon={
                access ? <Icons type={"checked"} /> : <Icons type={"cross"} />
              }
            />
          </div>
        );
      },
    },
    {
      title: "Student Portal Purchase",
      key: "portal",
      dataIndex: "portal",
      align: "center",
      render: (access) => {
        return (
          <div className={"text-center"}>
            <IconComponent
              className={"text-3xl"}
              icon={
                access ? <Icons type={"checked"} /> : <Icons type={"cross"} />
              }
            />
          </div>
        );
      },
    },
    {
      title: "Students Enrolled",
      key: "enrolled",
      dataIndex: "enrolled",
      align: "center",
      render: (access) => {
        return (
          <div className={"text-center"}>
            <IconComponent
              className={"text-3xl"}
              icon={
                access ? <Icons type={"checked"} /> : <Icons type={"cross"} />
              }
            />
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      align: "center",
      render: () => (
        <div className={"space-x-2.5 text-center"}>
          <IconComponent
            className={"text-xl text-indigo-500 border border-indigo-600"}
            style={{
              borderRadius: 5,
              paddingLeft: 4,
              paddingRight: 4,
            }}
            icon={<FormOutlined />}
          />

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
      name: "Advanced Parking",
      code: "001",
      price: 649.99,
      content: "Advanced Parking",
      status: "Active",
      web: true,
      portal: false,
      enrolled: true,
    },
    {
      key: "2",
      name: "Advanced Parking",
      code: "001",
      price: 649.99,
      content: "Advanced Parking",
      status: "Close",
      web: true,
      portal: true,
      enrolled: true,
    },
    {
      key: "3",
      name: "Advanced Parking",
      code: "001",
      price: 649.99,
      content: "Advanced Parking",
      status: "Process",
      web: true,
      portal: false,
      enrolled: false,
    },
  ];

  return { columns, data };
};
