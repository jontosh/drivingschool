import { Table } from "antd";

export const Exam = ({ columns, data }) => {
  return <Table columns={columns} dataSource={data} pagination={false} />;
};
