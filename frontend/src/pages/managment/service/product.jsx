import { Table } from "antd";

export const Product = ({ columns, data }) => {
  return <Table columns={columns} dataSource={data} pagination={false} />;
};
