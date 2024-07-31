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

export const FeesModule = () => {
  const { data } = useRequestGetQuery({
    path: "/account_management/services/fee/",
  });
  const [state, dispatch] = useReducer(ModalReducer, { modal: null });
  const [requestDelete, { reset }] = useRequestDeleteMutation();
  const [Action, setAction] = useState({ id: undefined });
  const [IsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch({
      type: "CONFIRM",
      onOk: async () => {
        try {
          await requestDelete({
            path: "/account_management/services/fee/" + data[Action.id]?.id,
          })
            .unwrap()
            .then(() => setIsOpen(false));
        } catch (error) {
          console.error(error);
        } finally {
          reset();
        }
      },
      onCancel: () => {
        setIsOpen(false);
      },
      open: IsOpen,
    });
  }, [IsOpen, Action, data]);

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
      dataIndex: "amount",
      key: "amount",
      render: (price) => <span className={"text-lg"}>$ {price}</span>,
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
      render: (item, _, index) => {
        return (
          <Fragment>
            <div className={"space-x-2.5"}>
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
                  setAction({ id: index });
                }}
              />
              {/*/admin/modals/management-service/fees*/}

              <Link
                to={"/admin/modals/management-service/fees/" + item?.id}
                target={"_blank"}
              >
                <IconComponent
                  className={"text-xl text-indigo-500 border border-indigo-600"}
                  style={{
                    borderRadius: 5,
                    paddingLeft: 4,
                    paddingRight: 4,
                  }}
                  icon={<ExportOutlined />}
                />
              </Link>
            </div>
            {index === Action?.id ? state?.modal : null}
          </Fragment>
        );
      },
    },
  ];

  return { columns, data };
};
