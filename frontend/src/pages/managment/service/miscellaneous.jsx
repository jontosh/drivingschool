import { Table } from "antd";

export const Miscellaneous = ({ columns, data }) => {
  return <Table columns={columns} dataSource={data} pagination={false} />;
};
