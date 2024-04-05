import { Table } from "antd";
import { Fragment } from "react";

export const Product = ({ columns, data }) => {
  return (
    <Fragment>
      <div className={"-mx-5"}>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </Fragment>
  );
};
