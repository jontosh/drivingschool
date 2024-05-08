import TableComponent from "@/components/table/index.jsx";

export const Packages = ({ columns, data }) => {
  return (
    <TableComponent columns={columns} dataSource={data} pagination={false} />
  );
};
