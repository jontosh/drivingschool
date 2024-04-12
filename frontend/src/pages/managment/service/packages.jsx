import { Table } from "antd";

export const Packages = ({ columns, data }) => {
  return <Table columns={columns} dataSource={data} pagination={false} />;
};
