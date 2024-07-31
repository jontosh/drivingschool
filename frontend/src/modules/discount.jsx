import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { ModalReducer } from "@/hooks/reducer.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import {
  useRequestDeleteMutation,
  useRequestGetQuery,
} from "@/redux/query/index.jsx";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { Fragment, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

export const DiscountsModule = () => {
  const { data } = useRequestGetQuery({
    path: "/account_management/services/discount/",
  });

  const [state, dispatch] = useReducer(ModalReducer, { modal: null });
  const [requestDelete, { reset }] = useRequestDeleteMutation();
  const [action, setAction] = useState({ id: undefined });
  const [IsOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await requestDelete({
        path: "/account_management/services/discount/" + data[action.id]?.id,
      }).unwrap();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      reset();
    }
  };

  useEffect(() => {
    dispatch({
      type: "CONFIRM",
      onOk: handleDelete,
      onCancel: () => setIsOpen(false),
      open: IsOpen,
    });
  }, [IsOpen, action.id, data]);

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
      render: (item, _, index) => (
        <Fragment>
          <div className="space-x-2.5">
            <IconComponent
              className="text-xl text-red-600 border border-indigo-600"
              style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 4 }}
              icon={<DeleteOutlined />}
              onClick={() => {
                setIsOpen(true);
                setAction({ id: index });
              }}
            />
            <Link
              to={`/admin/modals/management-service/discounts/${item?.id}`}
              target="_blank"
            >
              <IconComponent
                className="text-xl text-indigo-500 border border-indigo-600"
                style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 4 }}
                icon={<ExportOutlined />}
              />
            </Link>
          </div>
          {index === action?.id ? state?.modal : null}
        </Fragment>
      ),
    },
  ];

  return { columns, data };
};
