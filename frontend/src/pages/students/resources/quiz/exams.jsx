import TableComponent from "@/components/table/index.jsx";
import { ExamsModules } from "@/modules/exams.jsx";

const StudentExams = () => {
  const { columns, data } = ExamsModules();

  return (
    <TableComponent
      columns={columns}
      dataSource={data}
      showSorterTooltip={{
        target: "sorter-icon",
      }}
    />
  );
};

export default StudentExams;
