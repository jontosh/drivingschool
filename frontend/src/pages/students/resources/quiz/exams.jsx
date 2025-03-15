import { Table } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { ExamsModules } from "../../../../modules/exams";

const Exams = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { columns, data } = ExamsModules();

  const updatedColumns = [
    ...columns.slice(0, -1),
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => navigate(`/student/resource/quiz/${studentId}/view/test/${record.id}`)}
          className="bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700 transition-colors text-sm"
          disabled={record.status !== "ACTIVE"}
        >
          Start Test
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white p-5 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Available Tests</h2>
      <Table 
        columns={updatedColumns} 
        dataSource={data}
        pagination={false}
        className="w-full"
      />
    </div>
  );
};

export default Exams;
