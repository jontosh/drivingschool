import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { ModalReducer } from "@/hooks/reducer.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import {
  useRequestDeleteMutation,
  useRequestGetQuery,
} from "@/redux/query/index.jsx";
import { DeleteOutlined, ExportOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Space } from "antd";
import { Fragment, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

export const DiscountsModule = () => {
  const { data } = useRequestGetQuery({
    path: "/account_management/services/discount/",
  });

  const [state, dispatch] = useReducer(ModalReducer, { modal: null });
  const [requestDelete, { reset }] = useRequestDeleteMutation();
  const [actionId, setActionId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    if (actionId === null) return;

    try {
      await requestDelete({
        path: `/account_management/services/discount/${data[actionId]?.id}`,
      }).unwrap();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      reset();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      dispatch({
        type: "CONFIRM",
        onOk: handleDelete,
        onCancel: () => setIsModalOpen(false),
        open: isModalOpen,
      });
    }
  }, [isModalOpen, actionId, data]);

  const columns = [
    {
      title: "Item name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Paragraph fontSize="text-lg" fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Discount",
      dataIndex: "amount",
      key: "amount",
      render: (discount) => <span className="text-lg">$ {discount}</span>,
    },
    {
      title: "Sub type",
      dataIndex: "subtype",
      key: "subtype",
      render: (text) => (
        <Paragraph fontSize="text-lg" fontWeightStrong={400}>
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
        const onDelete = () => {
          setActionId(item.id);
          Modal.confirm({
            title: `Delete ${item.name}`,
            icon: <ExclamationCircleOutlined />,
            content: <p className="text-gray-500 text-center">You won't be able to revert this!</p>,
            okText: 'Yes',
            cancelText: 'No',
            okType: 'danger',
            onOk: handleDelete,
          });
        };

        return (
          <Fragment>
            <div className="space-x-2.5">
              <IconComponent
                className="text-xl text-red-600 border border-indigo-600 rounded-md px-1"
                icon={<DeleteOutlined />}
                onClick={onDelete}
              />
              <Link
                to={`/admin/modals/management-service/discounts/${item?.id}`}
                target="_blank"
              >
                <IconComponent
                  className="text-xl text-indigo-500 border border-indigo-600 rounded-md px-1"
                  icon={<ExportOutlined />}
                />
              </Link>
            </div>
          </Fragment>
        );
      },
    },
  ];

  return { columns, data };
};
