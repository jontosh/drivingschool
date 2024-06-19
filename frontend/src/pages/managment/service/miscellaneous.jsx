import TableComponent from "@/components/table/index.jsx";

export const Miscellaneous = ({ columns, data }) => {
  return (
    <TableComponent columns={columns} dataSource={data} pagination={false} />
  );
};
