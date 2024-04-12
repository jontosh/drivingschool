import { Table } from "antd";

export const Location = ({ columns, data }) => {
  return <Table pagination={false} columns={columns} dataSource={data} />;
};
