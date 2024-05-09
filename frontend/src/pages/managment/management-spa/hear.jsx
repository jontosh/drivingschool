import TableComponent from "@/components/table/index.jsx";
import { Table } from "antd";

export const Hear = ({ columns, data }) => {
  return <TableComponent columns={columns} data={data} />;
};
