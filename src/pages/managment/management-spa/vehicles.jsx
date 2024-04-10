import { Table } from "antd";

export const Vehicles = ({ columns, data }) => {
  return <Table pagination={false} columns={columns} dataSource={data} />;
};
