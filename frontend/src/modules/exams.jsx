import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import { ExportOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";

export const ExamsModules = () => {
  const { studentId } = useParams();

  const columns = useMemo(
    () => [
      {
        title: "Exam Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: "Course Name",
        dataIndex: "course",
        sorter: (a, b) => a.course.localeCompare(b.course),
      },
      {
        title: "Number of questions",
        dataIndex: "question_number",
        sorter: (a, b) => a.question_number - b.question_number,
      },
      {
        title: "Time",
        dataIndex: "time",
        sorter: (a, b) => a.time - b.time,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        sorter: (a, b) => a.status.localeCompare(b.status),
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
        dataIndex: "id",
        render: (id) => (
          <Link to={`/student/resource/quiz/${studentId ?? 0}/test/${id}`}>
            <IconComponent
              className="text-xl text-indigo-500 border border-indigo-600"
              style={{ borderRadius: 5, paddingLeft: 4, paddingRight: 4 }}
              icon={<ExportOutlined />}
            />
          </Link>
        ),
      },
    ],
    [studentId],
  );

  const data = useMemo(
    () => [
      {
        id: "1",
        name: "John Brown",
        course: "Course 1",
        question_number: 32,
        time: 10,
        status: "ACTIVE",
      },
      {
        id: "2",
        name: "Jim Green",
        course: "Course 2",
        question_number: 42,
        time: 2,
        status: "ACTIVE",
      },
      {
        id: "3",
        name: "Joe Black",
        course: "Course 3",
        question_number: 32,
        time: 4,
        status: "DELETED",
      },
      {
        id: "4",
        name: "Jim Red",
        course: "Course 4",
        question_number: 32,
        time: 9,
        status: "INACTIVE",
      },
    ],
    [],
  );

  return { data, columns };
};
