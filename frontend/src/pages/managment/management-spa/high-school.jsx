import TableComponent from "@/components/table/index.jsx";
import { Table } from "antd";

export const HighSchool = ({ columns, data }) => {
  return <TableComponent columns={columns} data={data} />;
};
