import { Table } from "antd";

export const Discount = ({ columns, data }) => {
  return <Table columns={columns} dataSource={data} pagination={false} />;
};
