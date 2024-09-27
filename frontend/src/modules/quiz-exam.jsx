import IconComponent from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import { ModalReducer } from "@/hooks/reducer.jsx";
import {
  useRequestDeleteMutation,
  useRequestGetQuery,
} from "@/redux/query/index.jsx";
import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import { Fragment, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

export const ExamModule = () => {
  const { data } = useRequestGetQuery({
    path: "/account_management/services/test/",
  });

  const [state, dispatch] = useReducer(ModalReducer, { modal: null });
  const [requestDelete, { reset }] = useRequestDeleteMutation();
  const [action, setAction] = useState({ id: undefined });
  const [IsOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await requestDelete({
        path: "/account_management/services/test/" + data[action.id]?.id,
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

  const handleDeleteClick = (index) => {
    setIsOpen(true);
    setAction({ id: index });
  };

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
      render: (text) => (
        <Paragraph fontSize="text-lg flex gap-2" fontWeightStrong={400}>
          {text?.map((number) => (
            <span key={number}>{number}</span>
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
      render: (item, _, index) => (
        <Fragment>
          <div className="space-x-2.5">
            <IconComponent
              className="text-xl text-red-600 border border-indigo-600"
              style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 4 }}
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteClick(index)}
            />
            <Link
              to={`/admin/modals/management-service/quiz-exam/${item?.id}`}
              target="_blank"
            >
              <IconComponent
                className="text-xl text-indigo-500 border border-indigo-600"
                style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 4 }}
                icon={<ExportOutlined />}
              />
            </Link>
          </div>
          {index === action.id && state?.modal}
        </Fragment>
      ),
    },
  ];

  return { data, columns };
};
