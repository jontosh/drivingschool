import ColorsContext from "@/context/colors.jsx";
import { ConfigProvider, Table } from "antd";
import { useContext } from "react";

const TableComponent = ({
  className,
  data,
  columns,
  pagination = false,
  ...props
}) => {
  const { colorsObject } = useContext(ColorsContext);
  return (
    <div className={className}>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: colorsObject.main,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          {...props}
        />
      </ConfigProvider>
    </div>
  );
};

export default TableComponent;
