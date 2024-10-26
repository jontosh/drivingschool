import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { ModalReducer } from "@/hooks/reducer.jsx";
import {
  useRequestDeleteMutation,
  useRequestGetQuery,
} from "@/redux/query/index.jsx";
import { DeleteOutlined, ExportOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Fragment, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";

export const ExamModule = () => {
  const { data } = useRequestGetQuery({
    path: "/account_management/services/test/",
  });

  const [state, dispatch] = useReducer(ModalReducer, { modal: null });
  const [requestDelete, { reset }] = useRequestDeleteMutation();
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    if (selectedId === null) return;

    try {
      await requestDelete({
        path: `/account_management/services/test/${data[selectedId]?.id}`,
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
  }, [isModalOpen, selectedId, data]);

  // const handleDeleteClick = (index) => {
  //   setSelectedId(index);
  //   setIsModalOpen(true);
  // };

  const columns = [
    {
      title: "Quiz name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Questions Per Quiz",
      dataIndex: "questions",
      key: "questions",
      render: (questions) => (
        <Paragraph fontSize="text-lg flex gap-2" fontWeightStrong={400}>
          {questions?.map((question) => (
            <span key={question}>{question}</span>
          ))}
        </Paragraph>
      ),
    },
    {
      title: "Question Pool",
      dataIndex: "questionPool",
      key: "questionPool",
    },
    {
      title: "Passing grade",
      dataIndex: "passing_grade",
      key: "passing_grade",
    },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        const onDelete = () => {
          setSelectedId(item.id);
          Modal.confirm({
            title: `Delete ${item.name}`,
            icon: <ExclamationCircleOutlined />,
            content: <p className="text-gray-500 text-center">You won't be able to revert this!</p>,
            okText: "Yes",
            cancelText: "No",
            okType: "danger",
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
                to={`/admin/modals/management-service/quiz-exam/${item?.id}`}
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

  return { data, columns };
};
