import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { AlertDelete, AlertEdit } from "@/hooks/alert.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import {
  useRequestDeleteMutation,
  useRequestGetQuery,
} from "@/redux/query/index.jsx";
import {
  DeleteOutlined,
  ExportOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import { Fragment, useEffect, useState } from "react";

export const ProductModule = () => {
  const { data: ProductData } = useRequestGetQuery({
    path: "/account_management/services/component/",
  });

  const [IsOpen, setIsOpen] = useState(false);
  const [ModalType, setModalType] = useState("");
  const [ActionIndex, setActionIndex] = useState(-1);
  const { AlertDeleteComponent, Confirm, setConfirm } = AlertDelete();
  const [requestDelete] = useRequestDeleteMutation();

  useEffect(() => {
    if (Confirm) {
      requestDelete({
        path: `/account_management/services/component/${data[ActionIndex]?.id}`,
      }).reset();
      setConfirm(false);
    }
  }, [Confirm, ActionIndex]);

  const columns = [
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Code number",
      dataIndex: "code",
      key: "code",
      render: (text) => (
        <div className={"text-center"}>
          <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
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
        <div className={"text-center"}>
          <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
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
        <div className={"text-center"}>
          <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
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
        <div className={"text-center"}>
          <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
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
        <div className={"text-center"}>
          <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
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
          <Space size={"middle"}>
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
      render: (text, _, index) => {
        let id = 0;
        return (
          <Fragment>
            <div className={"space-x-2.5"}>
              <IconComponent
                className={"text-xl text-indigo-500 border border-indigo-600"}
                style={{
                  borderRadius: 5,
                  paddingLeft: 4,
                  paddingRight: 4,
                }}
                icon={<FormOutlined />}
                onClick={() => {
                  setIsOpen(true);
                  setModalType("edit");
                  setActionIndex(index);
                }}
              />

              <IconComponent
                className={"text-xl text-red-600 border border-indigo-600"}
                style={{
                  borderRadius: 5,
                  paddingLeft: 4,
                  paddingRight: 4,
                }}
                icon={<DeleteOutlined />}
                onClick={() => {
                  setIsOpen(true);
                  setModalType("delete");
                  setActionIndex(index);
                }}
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
            {ActionIndex === index && IsOpen && ModalType === "delete" && (
              <AlertDeleteComponent setIsOpen={setIsOpen} />
            )}

            {ActionIndex === index && IsOpen && ModalType === "edit" && (
              <AlertEdit setIsOpen={setIsOpen} />
            )}
          </Fragment>
        );
      },
    },
  ];

  const data = ProductData;

  return { data, columns };
};

export const ProductModalValidate = (values) => {
  const errors = {};
  if (!values.code) {
    errors.code = "Component name";
  }
  return errors;
};
