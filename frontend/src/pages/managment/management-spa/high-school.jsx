import { Table } from "antd";

export const HighSchool = ({ columns, data }) => {
  return <Table pagination={false} columns={columns} dataSource={data} />;
};
