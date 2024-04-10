import { Table } from "antd";

export const Hear = ({ columns, data }) => {
  return <Table pagination={false} columns={columns} dataSource={data} />;
};
