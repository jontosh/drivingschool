import { Table } from "antd";

export const Fees = ({ columns, data }) => {
  return <Table columns={columns} dataSource={data} pagination={false} />;
};
