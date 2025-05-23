import ColorsContext from "@/context/colors.jsx";
import { ConfigProvider, Table } from "antd";
import { useContext } from "react";

const TableComponent = ({
  className,
  data,
  columns,
  pagination = false,
  cellPaddingInline = 16,
  scroll,
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
              cellPaddingInline,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          scroll={scroll}
          {...props}
        />
      </ConfigProvider>
    </div>
  );
};

export default TableComponent;
