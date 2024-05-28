import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { AlertDelete, AlertEdit } from "@/hooks/alert.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { Fragment, useState } from "react";

export const FeesModule = () => {
  const { data } = useRequestGetQuery({
    path: "/account_management/services/fee/",
  });
  const [IsOpen, setIsOpen] = useState(false);
  const [ModalType, setModalType] = useState("");
  const { AlertDeleteComponent } = AlertDelete();

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
              //
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
        <Fragment>
          <div className={"text-center space-x-2.5"}>
            <IconComponent
              className={"text-xl text-red-600 border border-indigo-600"}
              style={{
                borderRadius: 5,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              icon={<DeleteOutlined />}
              onClick={() => setIsOpen(true)}
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
          {IsOpen && ModalType === "delete" && (
            <AlertDeleteComponent setIsOpen={setIsOpen} />
          )}
          {IsOpen && ModalType === "edit" && (
            <AlertEdit setIsOpen={setIsOpen} />
          )}
        </Fragment>
      ),
    },
  ];

  return { columns, data };
};
