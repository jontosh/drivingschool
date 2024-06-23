import TableComponent from "@/components/table/index.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { ExamModule } from "@/modules/quiz-exam.jsx";

export const Exam = ({ status, search }) => {
  const { columns, data } = ExamModule();
  const { Data } = useFilterStatus({ data, status, search });

  return (
    <TableComponent columns={columns} dataSource={Data} pagination={false} />
  );
};
