import TableComponent from "@/components/table/index.jsx";
import { Table } from "antd";

export const Vehicles = ({ columns, data }) => {
  return <TableComponent columns={columns} data={data} />;
};
