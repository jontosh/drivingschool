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
import { Fragment, useEffect, useMemo, useState } from "react";

export const ProductModule = () => {
  const { data: ProductData } = useRequestGetQuery({
    path: "/account_management/services/component/",
  });

  const [modalState, setModalState] = useState({
    isOpen: false,
    modalType: "",
    actionIndex: -1,
  });

  const { AlertDeleteComponent, Confirm, setConfirm } = AlertDelete();
  const [requestDelete] = useRequestDeleteMutation();

  useEffect(() => {
    if (Confirm && modalState.actionIndex !== -1) {
      requestDelete({
        path: `/account_management/services/component/${ProductData[modalState.actionIndex]?.id}`,
      }).reset();
      setConfirm(false);
    }
  }, [Confirm, modalState.actionIndex, ProductData, requestDelete, setConfirm]);

  const columns = useMemo(
    () => [
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
        render: (text, _, index) => (
          <Fragment>
            <div className="space-x-2.5">
              <IconComponent
                className="text-xl text-indigo-500 border border-indigo-600"
                style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 4 }}
                icon={<FormOutlined />}
                onClick={() =>
                  setModalState({
                    isOpen: true,
                    modalType: "edit",
                    actionIndex: index,
                  })
                }
              />
              <IconComponent
                className="text-xl text-red-600 border border-indigo-600"
                style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 4 }}
                icon={<DeleteOutlined />}
                onClick={() =>
                  setModalState({
                    isOpen: true,
                    modalType: "delete",
                    actionIndex: index,
                  })
                }
              />
              <IconComponent
                className="text-xl text-indigo-500 border border-indigo-600"
                style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 4 }}
                icon={<ExportOutlined />}
              />
            </div>
            {modalState.actionIndex === index &&
              modalState.isOpen &&
              modalState.modalType === "delete" && (
                <AlertDeleteComponent
                  setIsOpen={(isOpen) =>
                    setModalState({ ...modalState, isOpen })
                  }
                />
              )}
            {modalState.actionIndex === index &&
              modalState.isOpen &&
              modalState.modalType === "edit" && (
                <AlertEdit
                  setIsOpen={(isOpen) =>
                    setModalState({ ...modalState, isOpen })
                  }
                />
              )}
          </Fragment>
        ),
      },
    ],
    [modalState, ProductData],
  );

  const data = ProductData;

  return { data, columns };
};
