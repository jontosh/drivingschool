import TableComponent from "@/components/table/index.jsx";

export const Exam = ({ columns, data }) => {
  return (
    <TableComponent columns={columns} dataSource={data} pagination={false} />
  );
};
