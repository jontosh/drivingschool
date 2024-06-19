import TableComponent from "@/components/table/index.jsx";

export const Fees = ({ columns, data }) => {
  return <TableComponent columns={columns} dataSource={data} />;
};
