export const ExamModule = () => {
  const columns = [
    {
      title: "Quiz name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Questions Per Quiz",
      dataIndex: "questionsPer",
      key: "questionsPer",
    },
    {
      title: "Question Pool",
      dataIndex: "questionPool",
      key: "questionPool",
    },
    {
      title: "Passing grade",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const data = [];

  return { columns, data };
};
